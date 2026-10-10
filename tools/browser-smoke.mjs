import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.ZION_BASE_URL || "http://127.0.0.1:8000";
const errors = [];
const results = {};
await mkdir("test-results", { recursive: true });

function logPhase(name, data = {}) {
  console.log(JSON.stringify({ phase: name, at: new Date().toISOString(), ...data }));
}

const browser = await chromium.launch({
  headless: true,
  timeout: 20000,
  args: [
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
    "--use-gl=angle",
    "--disable-frame-rate-limit",
    "--disable-gpu-vsync",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows"
  ]
});

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  page.setDefaultNavigationTimeout(15000);
  page.on("pageerror", error => errors.push(error.message));

  logPhase("home-navigation-start");
  const home = await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 15000 });
  assert.equal(home.status(), 200, "Homepage must respond with HTTP 200");
  await page.locator(".z9-language-btn[data-language='en']").waitFor();
  assert.match(await page.locator(".featured-episode").innerText(), /THE SHADE PROTOCOL/i);
  logPhase("home-loaded", { http: home.status() });

  const worldRoutes = [];
  for (let n = 20; n <= 30; n++) {
    const id = "ZION-" + String(n).padStart(3, "0");
    const route = n === 30 ? "/queue/ZION-030/index.html" : "/queue/" + id + "/index.html";
    const response = await context.request.get(base + route, { timeout: 8000 });
    assert.equal(response.status(), 200, id + " must respond with HTTP 200");
    worldRoutes.push(id);
  }
  const structured = await context.request.get(base + "/episodes/ZION-030.json", { timeout: 8000 });
  assert.equal(structured.status(), 200, "Structured episode data must be public");

  await page.locator(".z9-language-btn[data-language='ru']").click();
  await page.waitForFunction(() => document.documentElement.lang === "ru");
  assert.match((await page.locator(".featured-episode").innerText()).replace(/\s+/g, " "), /ТЕНЕВОЙ ПРОТОКОЛ/i);

  await page.locator(".z9-language-btn[data-language='en']").click();
  await page.waitForFunction(() => document.documentElement.lang === "en");
  results.home = { http: home.status(), localeToggle: "EN<->RU", publicWorldRoutes: worldRoutes, episodeJsonHttp: structured.status() };
  logPhase("home-and-routes-pass", { count: worldRoutes.length });

  const world = await context.newPage();
  world.setDefaultTimeout(8000);
  world.setDefaultNavigationTimeout(15000);
  world.on("pageerror", error => errors.push(error.message));
  logPhase("world-navigation-start");
  const worldResponse = await world.goto(base + "/queue/ZION-030/index.html?test=1", { waitUntil: "domcontentloaded", timeout: 15000 });
  assert.equal(worldResponse.status(), 200, "3D world must respond with HTTP 200");
  await world.waitForFunction(
    () => window.__ZION9_TEST__ && document.querySelector("#scene canvas"),
    undefined,
    { timeout: 18000 }
  );
  await world.waitForTimeout(500);
  const renderer = await world.evaluate(() => ({
    context: !!document.querySelector("#scene canvas")?.getContext("webgl2"),
    calls: window.__ZION9_TEST__.state().rendererCalls,
    webgl: window.__ZION9_TEST__.state().webgl
  }));
  assert.equal(renderer.context, true, "WebGL2 context must be created by Three.js");
  assert.equal(renderer.webgl, true, "Three.js renderer must exist");
  assert.ok(renderer.calls > 0, "Three.js must render draw calls");
  logPhase("webgl-ready", renderer);

  await world.bringToFront();
  const fps = await world.evaluate(async () => {
    const start = performance.now();
    const startFrames = window.__ZION9_TEST__.state().frameCounter;
    await new Promise(resolve => setTimeout(resolve, 1200));
    const elapsed = performance.now() - start;
    const renderedFrames = window.__ZION9_TEST__.state().frameCounter - startFrames;
    return Math.round(renderedFrames * 1000 / elapsed);
  });
  console.log("Three.js rendered FPS sample: " + fps);
  assert.ok(fps >= 10, `Three.js rendered FPS sample too low: ${fps}`);

  const worldLocale = await world.evaluate(() => {
    const button = document.querySelector(".z9-language-btn[data-language='ru']");
    if (!button) throw new Error("In-game RU language button is missing");
    let clickObserved = false;
    button.addEventListener("click", () => { clickObserved = true; }, { once: true });
    button.click();
    return { lang: document.documentElement.lang, clickObserved, pressed: button.getAttribute("aria-pressed") };
  });
  logPhase("world-language-switch", worldLocale);
  assert.equal(worldLocale.clickObserved, true, "In-game language button click event must fire");
  assert.equal(worldLocale.lang, "ru", "In-game language click must set html lang to ru");
  logPhase("world-language-switch-pass", worldLocale);
  const placements = await world.evaluate(() => {
    const api = window.__ZION9_TEST__;
    const spots = api.hotSpots();
    const types = ["tree", "shade", "water"];
    const result = [];
    for (let i = 0; i < spots.length; i++) result.push(api.placeAt(spots[i].x, spots[i].z, types[i]));
    return { result, state: api.state(), statusTitle: document.querySelector("#statusTitle").textContent };
  });
  assert.equal(placements.result.length, 3);
  assert.ok(placements.result.every(x => x.ok), "All three hotspot placements should succeed");
  assert.equal(placements.state.score, 3, "All three hotspots must be covered");
  assert.equal(placements.state.won, true, "Game must reach the win state");
  await world.waitForFunction(() => document.querySelector("#statusTitle").textContent === "Миссия выполнена");

  const reset = await world.evaluate(() => window.__ZION9_TEST__.reset());
  assert.deepEqual(reset, { placed: 0, won: false, lost: false });
  results.world = { http: worldResponse.status(), threeRender: true, webglContextCreated: true, drawCalls: renderer.calls, fpsSample: fps, allHotspotsCovered: true, winState: true, russianWinMessage: true, reset: true };
  logPhase("world-mission-pass", { fps, win: true, reset: true });

  const dossier = await context.newPage();
  dossier.setDefaultTimeout(8000);
  dossier.setDefaultNavigationTimeout(15000);
  dossier.on("pageerror", error => errors.push(error.message));
  const dossierResponse = await dossier.goto(base + "/episodes/ZION-030.html", { waitUntil: "domcontentloaded", timeout: 15000 });
  assert.equal(dossierResponse.status(), 200, "Episode dossier must respond with HTTP 200");
  await dossier.locator(".z9-language-btn[data-language='ru']").click();
  await dossier.waitForFunction(() => document.documentElement.lang === "ru");
  const dossierHeading = (await dossier.locator(".hero h1").innerText()).replace(/\s+/g, " ").trim();
  assert.equal(dossierHeading, "ТЕНЕВОЙ ПРОТОКОЛ", "Dossier heading should be translated: " + dossierHeading);

  results.dossier = { http: dossierResponse.status(), localeToggle: true, heading: dossierHeading };
  logPhase("dossier-translation-pass");

  // Reuse the already verified WebGL context and resize it to a narrow, touch-sized viewport.
  // This tests responsive layout without creating a second software-GPU context in headless CI.
  await world.setViewportSize({ width: 390, height: 844 });
  await world.waitForTimeout(250);
  const layout = await world.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    sceneShell: !!document.querySelector("#scene"),
    canvas: !!document.querySelector("#scene canvas"),
    canvasWidth: Math.round(document.querySelector("#scene canvas")?.getBoundingClientRect().width || 0)
  }));
  assert.ok(layout.sceneShell, "Mobile page must contain the 3D scene shell");
  assert.ok(layout.canvas, "The proven WebGL canvas must remain mounted at mobile width");
  assert.ok(layout.document <= layout.viewport + 1, `Unexpected mobile horizontal overflow: ${JSON.stringify(layout)}`);
  assert.ok(layout.canvasWidth > 300 && layout.canvasWidth <= layout.viewport, "3D canvas must fit the phone viewport");
  results.mobile = { http: worldResponse.status(), ...layout };
  logPhase("mobile-layout-pass", layout);

  assert.deepEqual(errors, [], "Unexpected JavaScript page errors");
  results.pageErrors = errors.length;
  const report = { status: "PASS", base, results };
  console.log(JSON.stringify(report, null, 2));
} finally {
  await Promise.race([
    browser.close(),
    new Promise(resolve => setTimeout(resolve, 5000))
  ]);
}
