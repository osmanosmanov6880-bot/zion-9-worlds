(function () {
  "use strict";
  const STORAGE_KEY = "zion9-language";
  const translations = {
    "ZION-9 — Infinite Worlds": "ZION-9 — Бесконечные миры",
    "ZION-9 — Transmission Index": "ZION-9 — Архив сигналов",
    "BASALT LULLABY — ZION-9": "БАЗАЛЬТОВАЯ КОЛЫБЕЛЬ — ZION-9",
    "THE SILENT ARCHIVE — ZION-9": "ТИХИЙ АРХИВ — ZION-9",
    "GLASS ORCHARD — ZION-9": "СТЕКЛЯННЫЙ САД — ZION-9",
    "THE LAST TIDE ENGINE — ZION-9": "ПОСЛЕДНИЙ ПРИЛИВНЫЙ МЕХАНИЗМ — ZION-9",
    "VELVET FREQUENCY — ZION-9": "БАРХАТНАЯ ЧАСТОТА — ZION-9",
    "THE PALE EQUATION — ZION-9": "БЛЕДНОЕ УРАВНЕНИЕ — ZION-9",
    "POLAR COMPASS — ZION-026": "ПОЛЯРНЫЙ КОМПАС — ZION-026",
    "THE BRONZE HOUR — ZION-9": "БРОНЗОВЫЙ ЧАС — ZION-9",
    "MIRROR WEATHER — ZION-9": "ЗЕРКАЛЬНАЯ ПОГОДА — ZION-9",
    "THE BLUE INTERVAL — ZION-9": "СИНИЙ ИНТЕРВАЛ — ZION-9",
    "ZION-9 Infinite Worlds — ten interactive narrative prototypes.": "ZION-9 — десять интерактивных сюжетных миров.",
    "Public ZION-9 world archive.": "Публичный архив миров ZION-9.",
    "An abandoned observatory sends three pulses through a field of black glass.": "Заброшенная обсерватория посылает три импульса через поле чёрного стекла.",
    "A paper archive remembers every visitor except the person who built it.": "Бумажный архив помнит каждого посетителя, кроме того, кто его создал.",
    "A glass orchard rings softly as distant planets cross its reflected sky.": "Стеклянный сад тихо звенит, когда далёкие планеты пересекают отражённое в нём небо.",
    "A tidal machine keeps a lost city alive in carefully timed waves.": "Приливный механизм поддерживает жизнь затонувшего города точно рассчитанными волнами.",
    "A tidal machine keeps a drowned city breathing in carefully timed waves.": "Приливный механизм поддерживает дыхание затонувшего города точно рассчитанными волнами.",
    "A velvet-dark radio room receives a melody from a station that has no location.": "В окутанной бархатом тьмы радиорубке ловят мелодию станции, которой нет ни на одной карте.",
    "A chalk equation moves one symbol each time the room's light changes.": "В меловом уравнении один символ сдвигается каждый раз, когда меняется освещение комнаты.",
    "A compass in a snowbound field turns only when someone listens to the stillness.": "Компас среди снегов поворачивается лишь тогда, когда кто-то вслушивается в тишину.",
    "A snowbound compass turns only when a player listens to the stillness.": "Компас среди снегов поворачивается лишь тогда, когда игрок вслушивается в тишину.",
    "A bronze clock has thirteen hands, though only three cast shadows.": "У бронзовых часов тринадцать стрелок, но тени отбрасывают лишь три.",
    "Mirrors predict weather for a place that no longer exists on any map.": "Зеркала предсказывают погоду в месте, которого больше нет ни на одной карте.",
    "A blue interval appears between two notes and opens an impossible door.": "Между двумя нотами возникает синий интервал, открывающий невозможную дверь.",
    "There is more": "Существует больше",
    "than one reality.": "одной реальности.",
    "Ten signals. Ten doors. Each world starts with a small anomaly — and opens when you learn how to listen.": "Десять сигналов. Десять дверей. Каждый мир начинается с небольшой аномалии — и раскрывается, когда вы учитесь слушать.",
    "World archive / 10 transmissions": "Архив миров / 10 сигналов",
    "Free static release · story prototypes": "Бесплатная версия · сюжетные прототипы",
    "Explore worlds": "Исследовать миры",
    "EXPLORE WORLDS": "ИССЛЕДОВАТЬ МИРЫ",
    "TRANSMISSION INDEX": "АРХИВ СИГНАЛОВ",
    "Available transmissions": "Доступные сигналы",
    "10 WORLDS / STATIC PROTOTYPES": "10 МИРОВ / ИНТЕРАКТИВНЫЕ ПРОТОТИПЫ",
    "Interactive worlds": "Интерактивные миры",
    "ENTER WORLD": "ВОЙТИ В МИР",
    "OPEN WORLD": "ОТКРЫТЬ МИР",
    "Every signal": "Каждый сигнал",
    "opens a world.": "открывает мир.",
    "Public world directory": "Каталог миров",
    "Ten self-contained narrative prototypes. Open a transmission to explore its world. No account required.": "Десять самостоятельных сюжетных прототипов. Откройте сигнал, чтобы исследовать мир. Регистрация не нужна.",
    "← MAIN ARCHIVE": "← ГЛАВНЫЙ АРХИВ",
    "← ALL WORLDS": "← ВСЕ МИРЫ",
    "← WORLD ARCHIVE": "← АРХИВ МИРОВ",
    "Public story build · static HTML · no private operator data in this archive": "Публичная версия · статический HTML · без внутренних данных оператора",
    "Public story prototype · no account needed": "Публичный сюжетный прототип · регистрация не нужна",
    "Transmission index ↗": "Архив сигналов ↗",
    "Transmission index": "Архив сигналов",
    "Archive index ↗": "Архив миров ↗",
    "Operator dashboard ↗": "Панель оператора ↗",
    "Operator dashboard": "Панель оператора",
    "Signal study / QUARTZ-ORBIT-3": "Исследование сигнала / QUARTZ-ORBIT-3",
    "Signal study / PAPER-MOON-8": "Исследование сигнала / PAPER-MOON-8",
    "Read the resonance": "Считайте резонанс",
    "Tap the signals from lowest resonance to highest. An incorrect choice resets the sequence.": "Нажимайте на сигналы от самого слабого резонанса к сильному. Ошибочный выбор сбрасывает последовательность.",
    "Three signals are waiting. Start with the quietest.": "Ожидают три сигнала. Начните с самого тихого.",
    "Signal decoded": "Сигнал расшифрован",
    "The quiet signal was a lighthouse, not a distress call.": "Тихий сигнал оказался маяком, а не призывом о помощи.",
    "The missing page was never destroyed; it was waiting to be read aloud.": "Пропавшую страницу не уничтожили — она ждала, когда её прочтут вслух.",
    "Reset signal": "Сбросить сигнал",
    "Field note / 01": "Заметка исследователя / 01",
    "Field note / 02": "Заметка исследователя / 02",
    "Some worlds open when you notice what is already there.": "Некоторые миры открываются, когда замечаешь то, что уже рядом.",
    "There is no timer and no penalty. Explore the signals at your own pace. This unpublished prototype uses a narrative reveal, not a private ARG key.": "Здесь нет таймера и штрафов. Исследуйте сигналы в своём темпе. Это сюжетный прототип, а не закрытая головоломка с секретным ключом.",
    "Touch • Keyboard • Reduced motion": "Сенсорный экран • Клавиатура • Без лишней анимации",
    "ZION-9 • Draft build": "ZION-9 • Черновая версия",
    "Interactive transmission · ZION-022": "Интерактивный сигнал · ZION-022",
    "Wake the orchard without breaking its silence.": "Разбудите сад, не нарушив его тишину.",
    "Bloom": "Цветение",
    "One transparent petal warms in your hand.": "Прозрачный лепесток теплеет у вас в руке.",
    "Fruit": "Плод",
    "A small sun rolls inside a crystal shell.": "Внутри хрустальной оболочки перекатывается маленькое солнце.",
    "Root": "Корень",
    "The ground answers with a low, patient note.": "Земля отвечает низкой, терпеливой нотой.",
    "Transmission received": "Сигнал принят",
    "Each fruit stores a decision that was never made. The orchard offers no way to choose again — only a place to finally let the old choice go.": "Каждый плод хранит решение, которое так и не было принято. Сад не даёт выбрать заново — он лишь позволяет наконец отпустить старый выбор.",
    "Interactive transmission · ZION-023": "Интерактивный сигнал · ZION-023",
    "Read the machine's rhythm.": "Прочитайте ритм механизма.",
    "01 · Rise": "01 · Подъём",
    "A bronze wheel turns against the current.": "Бронзовое колесо вращается против течения.",
    "02 · Hold": "02 · Пауза",
    "The water pauses at the edge of a doorway.": "Вода замирает на пороге.",
    "03 · Return": "03 · Возвращение",
    "A lantern drifts home through the dark water.": "Фонарь плывёт домой сквозь тёмную воду.",
    "Open transmission / reveal": "Открыть послание",
    "The city is not beneath the water. It is the memory carried by it — and the engine has been keeping that memory alive one wave at a time.": "Город не под водой. Он — память, которую несёт вода. И механизм сохраняет её живой, волна за волной.",
    "Interactive transmission · ZION-024": "Интерактивный сигнал · ZION-024",
    "Build a receiver from the sounds that remain.": "Соберите приёмник из оставшихся звуков.",
    "01 · Hiss": "01 · Шипение",
    "The static takes the shape of distant rain.": "Помехи складываются в звук далёкого дождя.",
    "02 · Hum": "02 · Гул",
    "A warm note settles beneath your ribs.": "Тёплая нота оседает где-то под рёбрами.",
    "03 · Silence": "03 · Тишина",
    "For one second, the whole room listens back.": "На одну секунду вся комната начинает слушать вас.",
    "The broadcast is a map whose distance is measured in trust. The last coordinate appears only when you stop trying to force the signal.": "Передача — это карта, расстояние на которой измеряется доверием. Последняя координата появляется, когда вы перестаёте заставлять сигнал звучать.",
    "Interactive transmission · ZION-025": "Интерактивный сигнал · ZION-025",
    "Observe what the room changes when you look away.": "Заметьте, что меняется в комнате, когда вы отворачиваетесь.",
    "01 · Light": "01 · Свет",
    "The shadow shifts, leaving a clean square on the wall.": "Тень смещается, оставляя на стене чистый квадрат.",
    "02 · Chalk": "02 · Мел",
    "A white line continues under the locked door.": "Белая линия продолжается под запертой дверью.",
    "03 · Window": "03 · Окно",
    "A reflection reveals stars on the inside of the glass.": "Отражение показывает звёзды по внутреннюю сторону стекла.",
    "The equation describes the room's forgotten window. It measures the light needed to remember the outside.": "Уравнение описывает забытое окно комнаты. Оно измеряет, сколько света нужно, чтобы вспомнить внешний мир.",
    "Interactive transmission · ZION-026": "Интерактивный сигнал · ZION-026",
    "POLAR COMPASS": "ПОЛЯРНЫЙ КОМПАС",
    "01 · Listen": "01 · Слушать",
    "The wind moves across the white field.": "Ветер проходит над белым полем.",
    "02 · Look": "02 · Смотреть",
    "One star stays still as the sky turns.": "Одна звезда остаётся неподвижной, пока вращается небо.",
    "03 · Follow": "03 · Следовать",
    "A line of footprints appears beyond the ridge.": "За гребнем появляется цепочка следов.",
    "Open transmission": "Открыть послание",
    "North is a direction chosen by the promise you keep.": "Север — это направление, которое выбирает данное вами обещание.",
    "Interactive transmission · ZION-027": "Интерактивный сигнал · ZION-027",
    "Find the hour the mechanism forgot.": "Найдите час, который забыл механизм.",
    "01 · Gear": "01 · Шестерня",
    "A tooth clicks into place without touching another.": "Зубец встаёт на место, не касаясь соседнего.",
    "02 · Shadow": "02 · Тень",
    "A fourth shadow points beneath the dial.": "Четвёртая тень указывает под циферблат.",
    "03 · Bell": "03 · Колокол",
    "A low note rings once, though no hammer falls.": "Раздаётся низкая нота, хотя молоток не ударял.",
    "The extra hour belongs to anyone who chooses to begin again. It can only be spent on something that matters.": "Дополнительный час принадлежит тому, кто решает начать заново. Потратить его можно лишь на то, что действительно важно.",
    "Interactive transmission · ZION-028": "Интерактивный сигнал · ZION-028",
    "Compare the forecasts.": "Сравните прогнозы.",
    "01 · Rain": "01 · Дождь",
    "Silver droplets gather on the inside of the glass.": "Серебряные капли собираются на внутренней стороне стекла.",
    "02 · Wind": "02 · Ветер",
    "A curtain moves in a room with no open window.": "В комнате без открытого окна шевелится занавеска.",
    "03 · Sun": "03 · Солнце",
    "A warm horizon appears behind your reflection.": "За вашим отражением возникает тёплый горизонт.",
    "The forecast describes a world that has not yet been made. Your next decision will change the view.": "Прогноз описывает мир, который ещё не создан. Ваше следующее решение изменит картину.",
    "Interactive transmission · ZION-029": "Интерактивный сигнал · ZION-029",
    "Listen for the space between the notes.": "Прислушайтесь к пространству между нотами.",
    "01 · First note": "01 · Первая нота",
    "A blue thread appears in the air.": "В воздухе возникает синяя нить.",
    "02 · Interval": "02 · Интервал",
    "The silence becomes wide enough to step through.": "Тишина становится достаточно широкой, чтобы шагнуть в неё.",
    "03 · Answer": "03 · Ответ",
    "A second voice joins the melody from the other side.": "С другой стороны к мелодии присоединяется второй голос.",
    "The interval was the space left for someone else to answer. The door opens only as wide as the conversation allows.": "Интервал был пространством, оставленным для чужого ответа. Дверь открывается ровно настолько, насколько позволяет разговор.",
    "World 027": "Мир 027",
    "A room contains a strange dial and four shifting shadows.": "В комнате находятся странный циферблат и четыре движущиеся тени.",
    "Signal one": "Сигнал один",
    "A narrow line of light moves across the wall.": "Узкая полоска света скользит по стене.",
    "Signal two": "Сигнал два",
    "A quiet sound comes from behind the dial.": "Из-за циферблата доносится тихий звук.",
    "Signal three": "Сигнал три",
    "A small mark appears where no mark was before.": "Там, где ничего не было, появляется маленькая отметка.",
    "The room gives an extra moment to anyone ready to begin again.": "Комната дарит лишнее мгновение тому, кто готов начать заново.",
    "Transmission 028": "Передача 028",
    "A quiet signal appears where the glass catches the last light.": "Когда стекло ловит последний свет, возникает тихий сигнал.",
    "One drop glimmers on the other side.": "По ту сторону мерцает одна капля.",
    "A curtain moves without a breeze.": "Занавеска движется без ветра.",
    "A warm line settles across the horizon.": "На горизонте ложится тёплая полоса света.",
    "The image waits for the next choice to give it a future.": "Отражение ждёт следующего выбора, который определит его будущее.",
    "Resonance": "Резонанс",
    "Sequence stable. The signal is yours.": "Последовательность устойчива. Теперь сигнал принадлежит вам.",
    "Sequence reset. Start with the quietest.": "Последовательность сброшена. Начните с самого тихого сигнала.",
    "The sequence has reset. Try again, lowest to highest.": "Последовательность сброшена. Попробуйте снова — от слабого резонанса к сильному.",
    "Transmission index ↗": "Архив сигналов ↗"
  };
  const english = Object.fromEntries(Object.entries(translations).map(([en, ru]) => [ru, en]));
  function getLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ru") return saved;
    } catch (_) {}
    return (navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "en";
  }
  let language = getLanguage();
  function toRu(value) {
    if (translations[value] !== undefined) return translations[value];
    let match = value.match(/^Resonance (\d+)$/);
    if (match) return "Резонанс " + match[1];
    match = value.match(/^Signal held\. (\d+) remain\.$/);
    if (match) return "Сигнал удержан. Осталось: " + match[1] + ".";
    match = value.match(/^([A-Z]+), resonance (\d+)$/);
    if (match) return (translations[match[1]] || match[1]) + ", резонанс " + match[2];
    if (value === "EMBER") return "УГОЛЁК";
    if (value === "TIDE") return "ПРИЛИВ";
    if (value === "LENS") return "ЛИНЗА";
    if (value === "INDEX") return "УКАЗАТЕЛЬ";
    if (value === "INK") return "ЧЕРНИЛА";
    if (value === "MARGIN") return "ПОЛЕ";
    return value;
  }
  function toEn(value) {
    if (english[value] !== undefined) return english[value];
    let match = value.match(/^Резонанс (\d+)$/);
    if (match) return "Resonance " + match[1];
    match = value.match(/^Сигнал удержан\. Осталось: (\d+)\.$/);
    if (match) return "Signal held. " + match[1] + " remain.";
    match = value.match(/^(.+), резонанс (\d+)$/);
    if (match) return ((english[match[1]] || match[1])) + ", resonance " + match[2];
    const reverseNames = {"УГОЛЁК":"EMBER","ПРИЛИВ":"TIDE","ЛИНЗА":"LENS","УКАЗАТЕЛЬ":"INDEX","ЧЕРНИЛА":"INK","ПОЛЕ":"MARGIN"};
    return reverseNames[value] || value;
  }
  function translateValue(value) {
    const trimmed = value.trim();
    if (!trimmed) return value;
    const translated = language === "ru" ? toRu(trimmed) : toEn(trimmed);
    if (translated === trimmed) return value;
    return value.replace(trimmed, translated);
  }
  function translateTree(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = translateValue(node.nodeValue); });
    const elements = [root, ...root.querySelectorAll("*")];
    elements.forEach(el => {
      ["aria-label", "title", "alt"].forEach(attr => {
        if (el.hasAttribute && el.hasAttribute(attr)) {
          const oldValue = el.getAttribute(attr);
          const newValue = translateValue(oldValue);
          if (newValue !== oldValue) el.setAttribute(attr, newValue);
        }
      });
    });
  }
  function addStyles() {
    const style = document.createElement("style");
    style.textContent = ".z9-language-bar{display:flex;justify-content:flex-end;align-items:center;gap:4px;margin:0 0 12px;font:11px/1.2 system-ui,sans-serif;letter-spacing:.08em}.z9-language-label{color:#8290a6;margin-right:6px;font-size:10px}.z9-language-btn{border:1px solid rgba(255,255,255,.17);border-radius:99px;background:rgba(255,255,255,.025);color:#c2cee0;padding:7px 11px;cursor:pointer;font:600 10px/1 system-ui,sans-serif;letter-spacing:.1em}.z9-language-btn:hover,.z9-language-btn:focus-visible{border-color:#91e7f5;outline:none}.z9-language-btn[aria-pressed=true]{color:#071018;background:#91e7f5;border-color:#91e7f5}";
    document.head.appendChild(style);
  }
  function addSwitcher() {
    const main = document.querySelector("main") || document.body;
    const bar = document.createElement("nav");
    bar.className = "z9-language-bar";
    bar.setAttribute("aria-label", "Language / Язык");
    const label = document.createElement("span");
    label.className = "z9-language-label";
    label.textContent = language === "ru" ? "ЯЗЫК" : "LANGUAGE";
    const en = document.createElement("button");
    en.type = "button"; en.className = "z9-language-btn"; en.textContent = "EN"; en.dataset.language = "en";
    const ru = document.createElement("button");
    ru.type = "button"; ru.className = "z9-language-btn"; ru.textContent = "RU"; ru.dataset.language = "ru";
    [en, ru].forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
    bar.append(label, en, ru);
    main.insertBefore(bar, main.firstChild);
    updateSwitcher();
  }
  function updateSwitcher() {
    const label = document.querySelector(".z9-language-label");
    if (label) label.textContent = language === "ru" ? "ЯЗЫК" : "LANGUAGE";
    document.querySelectorAll(".z9-language-btn").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
  }
  function setLanguage(next) {
    language = next === "ru" ? "ru" : "en";
    try { localStorage.setItem(STORAGE_KEY, language); } catch (_) {}
    document.documentElement.lang = language;
    translateTree(document.body);
    if (document.title) document.title = translateValue(document.title);
    document.querySelectorAll('meta[name="description"]').forEach(meta => meta.content = translateValue(meta.content));
    updateSwitcher();
  }
  addStyles();
  addSwitcher();
  setLanguage(language);
  const observer = new MutationObserver(records => {
    if (!records.length) return;
    records.forEach(record => {
      record.addedNodes && record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.nodeValue = translateValue(node.nodeValue);
        else if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
      });
      if (record.type === "characterData") record.target.nodeValue = translateValue(record.target.nodeValue);
    });
  });
  observer.observe(document.body, {subtree:true,childList:true,characterData:true});
})();