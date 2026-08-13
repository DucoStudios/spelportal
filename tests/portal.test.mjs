import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { runInNewContext } from "node:vm";

const index = readFileSync("index.html", "utf8");
const gameFiles = readdirSync("games").filter(file => file.endsWith(".html")).sort();
const listed = [...index.matchAll(/href:\s*'games\/([^']+\.html)'/g)].map(match => match[1]).sort();

test("alla spelfiler finns i portalens katalog exakt en gång", () => {
  assert.deepEqual(listed, gameFiles);
  assert.equal(new Set(listed).size, listed.length);
});

test("alla spel använder det visuella lagret och har korrekt spel-id", () => {
  for (const file of gameFiles) {
    const html = readFileSync(`games/${file}`, "utf8");
    const id = file.replace(/\.html$/, "");
    assert.ok(html.includes('href="game-polish.css"'), `${file} saknar game-polish.css`);
    assert.ok(html.includes('src="../interaction-guard.js"'), `${file} saknar interaction-guard.js`);
    assert.ok(html.includes('src="arcade-objects.js"'), `${file} saknar arcade-objects.js`);
    assert.ok(html.includes(`data-game-id="${id}"`), `${file} har fel data-game-id`);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">/);
  }
});

test("objektnära arkaddesign täcker samtliga spel och dynamiska spelobjekt", () => {
  const source = readFileSync("games/arcade-objects.js", "utf8");
  const supportedBlock = source.match(/const SUPPORTED_GAME_IDS = \[([\s\S]*?)\];/);
  assert.ok(supportedBlock, "listan över spel med objektdesign saknas");
  const supported = [...supportedBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map(match => match[1]).sort();
  assert.deepEqual(supported, gameFiles.map(file => file.replace(/\.html$/, "")));
  assert.equal(new Set(supported).size, gameFiles.length);
  assert.ok(source.includes("new MutationObserver"), "dynamiskt skapade spelobjekt dekoreras inte");
  assert.ok(source.includes('world: "arcade-world"'));
  assert.ok(source.includes('tile: "arcade-tile"'));
  assert.ok(source.includes('sprite: "arcade-sprite"'));
  assert.ok(source.includes('target: "arcade-target"'));
});

test("delade visuella resurser finns", () => {
  assert.ok(existsSync("games/game-polish.css"));
  assert.ok(existsSync("games/arcade-objects.js"));
  assert.ok(existsSync("interaction-guard.js"));
  assert.ok(existsSync("french-speech.js"));
  assert.ok(existsSync("games/lib/three.min.js"));
  assert.ok(existsSync("game-feedback.css"));
  assert.ok(existsSync("game-feedback.js"));
  assert.ok(existsSync("feedback-config.js"));
});

test("alla spel har en unik, spelanpassad thumbnail", () => {
  const thumbnailIds = [...index.matchAll(/^\s+'([^']+)': \['/gm)].map(match => match[1]).sort();
  assert.deepEqual(thumbnailIds, gameFiles.map(file => file.replace(/\.html$/, "")));
  assert.ok(index.includes('class="thumb-canvas"'));
  assert.ok(index.includes('pixel-thumbnails.js'));
  assert.ok(index.includes("window.PixelThumbnails.draw"));
  const pixelScenes = readFileSync("pixel-thumbnails.js", "utf8");
  for (const id of thumbnailIds) assert.ok(pixelScenes.includes(`case '${id}':`), `${id} saknar individuell pixelscen`);
  assert.equal((pixelScenes.match(/case '[a-z0-9-]+':/g) || []).length, gameFiles.length);
});

test("synliga varumärkesreferenser är borttagna", () => {
  const visibleReferences = /Netflix|Wordle|Rich Dad Poor Dad|Klassisk Snake|Gain-frön/;
  for (const file of ["index.html", ...gameFiles.map(name => `games/${name}`)]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), visibleReferences, `${file} innehåller en namngiven referens`);
  }
});

test("Ordmästaren erbjuder manuell godkänning när taligenkänningen är osäker", () => {
  const html = readFileSync("games/ordmastaren.html", "utf8");
  assert.ok(html.includes('id="approveSpeechBtn"'));
  assert.ok(html.includes("offerManualApproval"));
  assert.ok(html.includes(".replace(/œ/g, 'oe')"));
});

test("Rör på dig använder tidsintervaller med paus och automatiskt byteslarm", () => {
  const html = readFileSync("games/ror-pa-dig.html", "utf8");
  assert.ok(html.includes('id="timerRing"'));
  assert.ok(html.includes('id="pauseBtn"'));
  assert.ok(html.includes("seconds: 20"));
  assert.ok(html.includes("function playSwitchAlarm()"));
  assert.ok(html.includes("startPhase('ready', 3)"));
  assert.ok(html.includes("setInterval(tick, 100)"));
  assert.ok(!html.includes('id="doneBtn"'));
});

test("Ormens mat och sammanhängande kropp använder samma responsiva 18×18-canvas", () => {
  const html = readFileSync("games/ormen.html", "utf8");
  assert.ok(html.includes("--grid-size: 18"));
  assert.ok(html.includes('id="snakeCanvas"'));
  assert.ok(html.includes("const cell = size / COLS"));
  assert.ok(html.includes("(point.x + .5) * cell"));
  assert.ok(html.includes("snakeCtx.lineJoin = 'round'"));
  assert.ok(html.includes("snakeCtx.ellipse(0, 0, cell * .52, cell * .43"));
  assert.ok(html.includes("const freeCells = []"));
  assert.ok(!html.includes("className = 'seg'"));
});

test("Ormen kan styras med tillgängliga knappar och korta svep på spelplanen", () => {
  const html = readFileSync("games/ormen.html", "utf8");
  assert.ok(html.includes('aria-label="Styr Ormen"'));
  assert.ok(html.includes('aria-label="Styr upp"'));
  assert.ok(html.includes("boardEl.addEventListener('pointerdown'"));
  assert.ok(html.includes("boardEl.addEventListener('pointerup'"));
  assert.ok(html.includes("boardEl.clientWidth * 0.035"));
  assert.ok(html.includes("navigator.vibrate(10)"));
  assert.ok(html.includes('id="bestVal"'));
  assert.ok(html.includes("const BEST_KEY = 'ormen-best-v1'"));
});

test("gemensam spel-UX ger tydligt fokus och respekterar minskad rörelse", () => {
  const polish = readFileSync("games/game-polish.css", "utf8");
  const guard = readFileSync("interaction-guard.js", "utf8");
  assert.ok(polish.includes(":focus-visible"));
  assert.ok(polish.includes("prefers-reduced-motion: reduce"));
  assert.ok(polish.includes("animation-duration: .01ms !important"));
  assert.ok(guard.includes("function setupOverlayFocus()"));
  assert.ok(guard.includes("aria-modal"));
  assert.ok(guard.includes("MutationObserver"));
});

test("portalens rotlager är mörkt även vid överscroll och siduppdatering", () => {
  const polish = readFileSync("games/game-polish.css", "utf8");
  assert.match(index, /html, body \{[\s\S]*background-color: var\(--bg\);/);
  assert.match(index, /html \{ color-scheme: dark; \}/);
  assert.match(polish, /html:has\(body\[data-game-id\]\) \{[\s\S]*background-color: var\(--bg, #170f2e\);/);
  assert.ok(polish.includes("color-scheme: dark"));
});

test("arkadspelens mobilkontroller är riktiga knappar med tillgängliga namn", () => {
  for (const file of ["flykten.html", "bokstavsbilen.html", "klossfall.html", "superhjalte-spranget.html", "kulrullaren.html", "blockvarlden.html"]) {
    const html = readFileSync(`games/${file}`, "utf8");
    assert.doesNotMatch(html, /<div class="(?:tbtn|steer-btn|abtn[^\"]*)" id="btn/);
    assert.match(html, /<button class="(?:tbtn|steer-btn|abtn[^\"]*)" id="btn[^>]+aria-label=/);
  }
  const hero = readFileSync("games/superhjalte-spranget.html", "utf8");
  const roller = readFileSync("games/kulrullaren.html", "utf8");
  const blocks = readFileSync("games/blockvarlden.html", "utf8");
  assert.ok(hero.includes("'pointercancel'"));
  assert.ok(hero.includes("function releaseControls()"));
  assert.ok(roller.includes("'pointerup', 'pointercancel', 'lostpointercapture'"));
  assert.ok(blocks.includes("window.addEventListener('touchcancel', releaseJoysticks)"));
});

test("centrala spelval och nivåkort fungerar med tangentbord", () => {
  const expectations = [
    ["kulrullaren.html", "document.createElement('button')", "Spela bana"],
    ["memory-plattorna.html", "document.createElement('button')", "Nedvänt minneskort"],
    ["ordmastaren.html", "document.createElement('button')", "Starta paket"],
    ["kubkrossaren.html", "document.createElement('button')", "Starta "],
    ["gardsriket.html", "document.createElement('button')", "Starta karta"],
    ["ordresan.html", "document.createElement('button')", "Öppna "]
  ];
  for (const [file, buttonCode, label] of expectations) {
    const html = readFileSync(`games/${file}`, "utf8");
    assert.ok(html.includes(buttonCode), `${file} skapar inga knappar`);
    assert.ok(html.includes(label), `${file} saknar tillgängligt namn`);
  }
});

test("Blockkrossaren förklarar bollroller, har poäng-HUD och döljbar bollväljare", () => {
  const html = readFileSync("games/kubkrossaren.html", "utf8");
  assert.ok(html.includes("<title>Blockkrossaren</title>"));
  assert.ok(html.includes('id="scoreVal"'));
  assert.ok(html.includes('id="ballCountVal"'));
  assert.ok(html.includes('id="turnVal"'));
  assert.ok(html.includes('id="bestVal"'));
  assert.ok(html.includes('id="ballToggle"'));
  assert.ok(html.includes("function setBallPanel(open)"));
  assert.ok(html.includes("aria-expanded"));
  for (const explanation of [
    "Jämn fart · 1 skada · lätt att styra",
    "Långsam · 2 skada · stor träffyta",
    "Snabbast · 1 skada · liten träffyta",
    "1 skada · skadar block bredvid"
  ]) assert.ok(html.includes(explanation), `bollförklaring saknas: ${explanation}`);
  assert.ok(html.includes("const SCORE_BEST_KEY"));
  assert.ok(html.includes("function addScore(points"));
  assert.ok(index.includes("title: 'Blockkrossaren'"));
});

test("alla franska lyssningsspel använder samma förbättrade röstmotor", () => {
  const speechEngine = readFileSync("french-speech.js", "utf8");
  assert.ok(speechEngine.includes("function voiceScore(voice)"));
  assert.ok(speechEngine.includes("natural|neural|premium|enhanced"));
  assert.ok(speechEngine.includes("synthesis.addEventListener?.('voiceschanged'"));
  for (const file of ["alfabetet-fargerna.html", "malarboken.html", "ljudmatchen.html", "ordmastaren.html"]) {
    const html = readFileSync(`games/${file}`, "utf8");
    assert.ok(html.includes('src="../french-speech.js"'), `${file} saknar den gemensamma rösten`);
    assert.ok(html.includes("window.FrenchSpeech?.speak"), `${file} använder inte den gemensamma rösten`);
    assert.ok(!html.includes("new SpeechSynthesisUtterance"), `${file} har kvar en lokal röstmotor`);
  }
});

test("den franska röstmotorn prioriterar en enhanced fr-FR-röst", () => {
  const spoken = [];
  class MockUtterance {
    constructor(text) { this.text = text; }
  }
  const voices = [
    { name: "Compact", voiceURI: "compact", lang: "fr-FR", localService: true, default: true },
    { name: "Natural Enhanced", voiceURI: "enhanced", lang: "fr-FR", localService: true, default: false },
    { name: "Eddy", voiceURI: "novelty", lang: "fr-FR", localService: true, default: false },
    { name: "Natural", voiceURI: "natural", lang: "sv-SE", localService: true, default: false }
  ];
  const synthesis = {
    paused: false,
    cancel() {},
    getVoices: () => voices,
    speak: utterance => spoken.push(utterance),
    addEventListener() {}
  };
  const window = {
    speechSynthesis: synthesis,
    SpeechSynthesisUtterance: MockUtterance,
    setInterval,
    clearInterval
  };
  runInNewContext(readFileSync("french-speech.js", "utf8"), {
    window,
    SpeechSynthesisUtterance: MockUtterance,
    console
  });
  assert.equal(window.FrenchSpeech.speak("bonjour"), true);
  assert.equal(spoken[0].voice, voices[1]);
  assert.equal(spoken[0].lang, "fr-FR");
  assert.equal(spoken[0].rate, 0.88);
});

test("ingen HTML-fil innehåller en GitHub-token", () => {
  for (const file of ["index.html", ...gameFiles.map(name => `games/${name}`)]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /ghp_[A-Za-z0-9]+/);
  }
});

test("den nya barnmixen innehåller exakt 20 spel och minst tio spelmekaniker", () => {
  const engine = readFileSync("games/kids-mix.js", "utf8");
  const newGameIds = [
    "fruktfangaren", "bistroblixten", "accentjakten", "ordbron",
    "dansstopp", "reaktionsraketen", "balansbanan", "andningsdykaren",
    "brobyggarna", "fargfusion", "molnhoppet", "tornverkstan",
    "minimarknaden", "myntmatchen", "spargrissprint", "ideverkstan",
    "vanskapskompassen", "hjalparjakten", "talamodstornet", "tacksamhetstradet"
  ];
  assert.equal(newGameIds.length, 20);
  for (const id of newGameIds) {
    assert.ok(existsSync(`games/${id}.html`), `${id} saknar spelfil`);
    assert.ok(engine.includes(`"${id}": {`), `${id} saknar spelkonfiguration`);
    const html = readFileSync(`games/${id}.html`, "utf8");
    assert.ok(html.includes('href="kids-mix.css"'));
    assert.ok(html.includes('src="kids-mix.js"'));
    assert.ok(html.includes('id="startBtn"'));
    assert.ok(html.includes('aria-live="polite"'));
  }
  const mechanics = new Set([...engine.matchAll(/mode: "([a-z]+)"/g)].map(match => match[1]));
  assert.ok(mechanics.size >= 10, `bara ${mechanics.size} spelmekaniker hittades`);
});

test("barnmixens spel är ändliga och saknar köp-, chatt- och lootloopar", () => {
  const engine = readFileSync("games/kids-mix.js", "utf8");
  assert.ok(engine.includes('levels.length'));
  assert.ok((engine.match(/duration: /g) || []).length >= 20);
  assert.doesNotMatch(engine, /lootbox|lootlåda|köp nu|in-app purchase|chatta/i);
});

test("de fem bibelspelen är källmärkta och använder olika spelmekaniker", () => {
  const engine = readFileSync("games/bible-games.js", "utf8");
  const ids = ["barmhartighetsresan", "bygg-pa-klippan", "andens-frukttradgard", "ord-som-bygger"];
  for (const id of ids) {
    const html = readFileSync(`games/${id}.html`, "utf8");
    assert.ok(html.includes('href="bible-games.css"'));
    assert.ok(html.includes('src="bible-games.js"'));
    assert.ok(html.includes("Källkontrollerad mot nuBibeln"));
    assert.ok(engine.includes(`"${id}": {`));
  }
  assert.ok(existsSync("games/bibelresan-66.html"));
  assert.match(engine, /Lukas 10:25–37/);
  assert.match(engine, /Matteus 7:24–27/);
  assert.match(engine, /Galaterbrevet 5:22–23/);
  assert.match(engine, /Ordspråksboken 15:1 · Efesierbrevet 4:29 · Jakobsbrevet 1:19/);
  assert.deepEqual(new Set([...engine.matchAll(/mode: "([a-z]+)"/g)].map(match => match[1])), new Set(["mercy", "builder", "fruit", "words"]));
  assert.ok(readFileSync("games/bible-games.css", "utf8").includes(".choice-grid[hidden]"), "samtalssvaren måste döljas tills lyssningspausen är klar");
});

test("Bibelresan omfattar protestantiska Bibelns 66 böcker och 1 189 kapitel", () => {
  const journey = readFileSync("games/bibelresan-66.js", "utf8");
  const entries = [...journey.matchAll(/^\s+\["[^"]+","[A-Z0-9]+",(\d+),/gm)];
  assert.equal(entries.length, 66);
  assert.equal(entries.reduce((sum, match) => sum + Number(match[1]), 0), 1189);
  assert.ok(journey.includes("https://www.bible.com/sv/bible/916/"));
  assert.ok(journey.includes("spelportal-bibelresan-progress-v1"));
  assert.ok(journey.includes("Kunskapsstopp"));
  const html = readFileSync("games/bibelresan-66.html", "utf8");
  assert.ok(html.includes("återger inte den upphovsrättsskyddade texten"));
});

test("alla spel har samma säkra anonyma feedbackflöde förberett", () => {
  const guard = readFileSync("interaction-guard.js", "utf8");
  const feedback = readFileSync("game-feedback.js", "utf8");
  const receiver = readFileSync("feedback-apps-script/Code.gs", "utf8");
  assert.ok(guard.includes("document.body?.dataset.gameId"));
  assert.ok(guard.includes("feedback-config.js"));
  assert.ok(guard.includes("game-feedback.js"));
  assert.ok(guard.includes("game-feedback.css"));
  assert.ok(feedback.includes('role="radiogroup"'));
  assert.ok(feedback.includes("if (!settings.endpoint) return;"));
  assert.ok(feedback.includes("value <= 5"));
  assert.ok(feedback.includes("maxMessageLength"));
  assert.ok(feedback.includes("Anonymt: inget namn, mejl eller användarkonto samlas in."));
  assert.doesNotMatch(feedback, /userAgent|geolocation|email|e-mail|ipAddress/);
  const receiverIds = [...receiver.matchAll(/"([a-z0-9-]+)":\s*"[^"]+"/g)].map(match => match[1]).sort();
  assert.deepEqual(receiverIds, gameFiles.map(file => file.replace(/\.html$/, "")));
});
