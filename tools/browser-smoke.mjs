import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.ZION_BASE_URL || "http://127.0.0.1:8000";
const errors = [];
const results = {};
await mkdir("test-results", { recursive: true });

const browser = await chromium.launch({
  headless: true,
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
  page.on("pageerror", error => errors.push(error.message));

  const home = await page.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
  assert.equal(home.status(), 200, "Homepage must respond with HTTP 200");
  await page.locator(".z9-language-btn[data-language='en']").waitFor();
  assert.match(await page.locator(".featured-episode").innerText(), /THE SHADE PROTOCOL/i);
  const worldRoutes = [];
  for (let n = 20; n <= 30; n++) {
    const id = "ZION-" + String(n).padStart(3, "0");
    const route = n === 30 ? "/queue/ZION-030/index.html" : "/queue/" + id + "/index.html";
    const response = await context.request.get(base + route);
    assert.equal(response.status(), 200, id + " must respond with HTTP 200");
    worldRoutes.push(id);
  }
  const structured = await context.request.get(base + "/episodes/ZION-030.json");
  assert.equal(structured.status(), 200, "Structured episode data must be public");
  await page.screenshot({ path: "test-results/home-en.png", fullPage: false });

  await page.locator(".z9-language-btn[data-language='ru']").click();
  await page.getByText("ТЕНЕВОЙ ПРОТОКОЛ", { exact: true }).first().waitFor();
  assert.equal(await page.locator("html").getAttribute("lang"), "ru");
  await page.screenshot({ path: "test-results/home-ru.png", fullPage: false });
  await page.locator(".z9-language-btn[data-language='en']").click();
  await page.getByText("THE SHADE PROTOCOL", { exact: true }).first().waitFor();
  results.home = { http: home.status(), localeToggle: "EN<->RU", publicWorldRoutes: worldRoutes, episodeJsonHttp: structured.status(), screenshots: 2 };

  const world = await context.newPage();
  world.on("pageerror", error => errors.push(error.message));
  const worldResponse = await world.goto(base + "/queue/ZION-030/index.html?test=1", { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.equal(worldResponse.status(), 200, "3D world must respond with HTTP 200");
  await world.waitForFunction(() => window.__ZION9_TEST__ && document.querySelector("#scene canvas"), undefined, { timeout: 20000 });
  await world.waitForTimeout(900);
  const renderer = await world.evaluate(() => ({
    context: !!document.querySelector("#scene canvas")?.getContext("webgl2"),
    calls: window.__ZION9_TEST__.state().rendererCalls,
    webgl: window.__ZION9_TEST__.state().webgl
  }));
  assert.equal(renderer.context, true, "WebGL2 context must be created by Three.js");
  assert.equal(renderer.webgl, true, "Three.js renderer must exist");
  assert.ok(renderer.calls > 0, "Three.js must render draw calls");

  await world.bringToFront();
  const fps = await world.evaluate(async () => {
    const start = performance.now();
    const startFrames = window.__ZION9_TEST__.state().frameCounter;
    await new Promise(resolve => setTimeout(resolve, 1500));
    const elapsed = performance.now() - start;
    const renderedFrames = window.__ZION9_TEST__.state().frameCounter - startFrames;
    return Math.round(renderedFrames * 1000 / elapsed);
  });
  console.log("Three.js rendered FPS sample: " + fps);
  assert.ok(fps >= 10, `Three.js rendered FPS sample too low: ${fps}`);
  await world.locator(".z9-language-btn[data-language='ru']").click();
  await world.waitForFunction(() => document.documentElement.lang === "ru");
  await world.locator("#sound").click();
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
  await world.screenshot({ path: "test-results/zion-030-victory-ru.png", fullPage: false });
  const reset = await world.evaluate(() => window.__ZION9_TEST__.reset());
  assert.deepEqual(reset, { placed: 0, won: false, lost: false });
  results.world = { http: worldResponse.status(), threeRender: true, webglContextCreated: true, drawCalls: renderer.calls, fpsSample: fps, allHotspotsCovered: true, winState: true, russianWinMessage: true, reset: true };

  const dossier = await context.newPage();
  dossier.on("pageerror", error => errors.push(error.message));
  const dossierResponse = await dossier.goto(base + "/episodes/ZION-030.html", { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.equal(dossierResponse.status(), 200, "Episode dossier must respond with HTTP 200");
  await dossier.locator(".z9-language-btn[data-language='ru']").click();
  await dossier.waitForFunction(() => document.documentElement.lang === "ru");
  const dossierHeading = (await dossier.locator(".hero h1").innerText()).replace(/\s+/g, " ").trim();
  assert.match(dossierHeading, /ТЕНЕВОЙ ПРОТОКОЛ/i, "Dossier H1 should be translated even when split across markup: " + dossierHeading);
  await dossier.screenshot({ path: "test-results/dossier-ru.png", fullPage: false });
  results.dossier = { http: dossierResponse.status(), localeToggle: true, heading: dossierHeading };

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
  mobile.on("pageerror", error => errors.push(error.message));
  const mobileResponse = await mobile.goto(base + "/queue/ZION-030/index.html", { waitUntil: "domcontentloaded", timeout: 30000 });
  assert.equal(mobileResponse.status(), 200);
  await mobile.waitForFunction(() => !!document.querySelector("#scene canvas"), undefined, { timeout: 20000 });
  const layout = await mobile.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    canvas: !!document.querySelector("#scene canvas"),
    canvasWidth: Math.round(document.querySelector("#scene canvas")?.getBoundingClientRect().width || 0)
  }));
  assert.ok(layout.document <= layout.viewport + 1, `Unexpected mobile horizontal overflow: ${JSON.stringify(layout)}`);
  assert.ok(layout.canvas && layout.canvasWidth > 300, "3D canvas must fit the phone viewport");
  await mobile.screenshot({ path: "test-results/world-mobile.png", fullPage: false });
  results.mobile = { http: mobileResponse.status(), ...layout };

  assert.deepEqual(errors, [], "Unexpected JavaScript page errors");
  results.pageErrors = errors.length;
  console.log(JSON.stringify({ status: "PASS", base, results }, null, 2));
} finally {
  await browser.close();
}
