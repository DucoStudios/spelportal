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
    assert.ok(html.includes(`data-game-id="${id}"`), `${file} har fel data-game-id`);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">/);
  }
});

test("delade visuella resurser finns", () => {
  assert.ok(existsSync("games/game-polish.css"));
  assert.ok(existsSync("interaction-guard.js"));
  assert.ok(existsSync("french-speech.js"));
  assert.ok(existsSync("games/lib/three.min.js"));
});

test("alla spel har en unik, spelanpassad thumbnail", () => {
  const thumbnailIds = [...index.matchAll(/^\s+'([^']+)': \['/gm)].map(match => match[1]).sort();
  assert.deepEqual(thumbnailIds, gameFiles.map(file => file.replace(/\.html$/, "")));
  assert.ok(index.includes('class="thumb-main"'));
  assert.ok(index.includes('class="thumb-secondary"'));
});

test("synliga varumärkesreferenser och personnamn är borttagna", () => {
  const visibleReferences = /Netflix|Wordle|Rich Dad Poor Dad|Klassisk Snake|Gain-frön|David och Goljat|Kung Saul|Josef|Ester/;
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

test("Ormens mat och segment använder samma responsiva 18×18-rutnät", () => {
  const html = readFileSync("games/ormen.html", "utf8");
  assert.ok(html.includes("--grid-size: 18"));
  assert.ok(html.includes("food.x * 100 / COLS"));
  assert.ok(html.includes("food.y * 100 / ROWS"));
  assert.ok(html.includes("s.x * 100 / COLS"));
  assert.ok(html.includes("const freeCells = []"));
  assert.ok(!html.includes("food.x * CELL"));
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
