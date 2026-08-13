import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ids = readdirSync("games").filter(file => file.endsWith(".html")).map(file => basename(file, ".html")).sort();
const viewports = [
  { name: "mobile", width: 390, height: 844, mobile: true },
  { name: "desktop", width: 1440, height: 900, mobile: false }
];
const screenshotCases = new Set([
  "blockvarlden-desktop", "gardsriket-desktop", "kulrullaren-desktop",
  "kubkrossaren-mobile",
  "klossfall-mobile",
  "kulrullaren-mobile", "memory-plattorna-mobile", "memory-plattorna-desktop",
  "saftstand-erbjudandet-mobile", "ordmastaren-mobile", "poppa-ballongerna-mobile", "schack-mobile",
  "malarboken-mobile", "brobyggarna-mobile", "ormen-mobile",
  "superhjalte-spranget-mobile", "flykten-mobile", "reaktionsraketen-mobile", "dansstopp-mobile"
]);
const outputDir = "/tmp/spelportal-all-games-smoke";
mkdirSync(outputDir, { recursive: true });

const port = 9600 + process.pid % 250;
const browser = spawn(chrome, [
  "--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
  "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/spelportal-all-smoke-${process.pid}`, "about:blank"
], { stdio: "ignore" });

const pause = ms => new Promise(resolvePause => setTimeout(resolvePause, ms));
let version;
for (let attempt = 0; attempt < 60; attempt++) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/json/version`);
    if (response.ok) { version = await response.json(); break; }
  } catch (_) {}
  await pause(100);
}
assert.ok(version?.webSocketDebuggerUrl, "Chrome DevTools startade inte");

const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const pageTarget = targets.find(target => target.type === "page");
assert.ok(pageTarget?.webSocketDebuggerUrl, "Ingen webbsida hittades i Chrome");
const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
await new Promise((resolveOpen, rejectOpen) => {
  ws.addEventListener("open", resolveOpen, { once: true });
  ws.addEventListener("error", rejectOpen, { once: true });
});

let nextId = 1;
const pending = new Map();
let exceptions = [];
ws.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve: resolveCall, reject: rejectCall } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) rejectCall(new Error(message.error.message));
    else resolveCall(message.result);
  }
  if (message.method === "Runtime.exceptionThrown") {
    const detail = message.params.exceptionDetails;
    exceptions.push(detail.exception?.description || detail.text);
  }
});

function call(method, params = {}) {
  return new Promise((resolveCall, rejectCall) => {
    const id = nextId++;
    pending.set(id, { resolve: resolveCall, reject: rejectCall });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await call("Page.enable");
await call("Runtime.enable");
let checks = 0;

for (const viewport of viewports) {
  await call("Emulation.setDeviceMetricsOverride", {
    width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile,
    screenWidth: viewport.width, screenHeight: viewport.height
  });
  exceptions = [];
  await call("Page.navigate", { url: pathToFileURL(resolve("index.html")).href });
  for (let attempt = 0; attempt < 50; attempt++) {
    if (await evaluate("document.readyState === 'complete'")) break;
    await pause(50);
  }
  await pause(100);
  const portal = await evaluate(`({
    cards: document.querySelectorAll('.card').length,
    canvases: document.querySelectorAll('.thumb-canvas').length,
    painted: [...document.querySelectorAll('.thumb-canvas')].every(canvas => canvas.width === 240 && canvas.height === 132),
    fits: document.documentElement.scrollWidth <= innerWidth + 1
  })`);
  assert.equal(portal.cards, ids.length, `portalen/${viewport.name}: fel antal spelkort`);
  assert.equal(portal.canvases, ids.length, `portalen/${viewport.name}: pixelscener saknas`);
  assert.ok(portal.painted, `portalen/${viewport.name}: en eller flera pixelscener ritades inte`);
  assert.ok(portal.fits, `portalen/${viewport.name}: horisontell overflow`);
  assert.deepEqual(exceptions, [], `portalen/${viewport.name}: körfel ${exceptions.join(", ")}`);
  const portalShot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(`${outputDir}/portal-${viewport.name}.png`, Buffer.from(portalShot.data, "base64"));

  for (const id of ids) {
    exceptions = [];
    await call("Page.navigate", { url: pathToFileURL(resolve(`games/${id}.html`)).href });
    for (let attempt = 0; attempt < 50; attempt++) {
      if (await evaluate("document.readyState === 'complete'")) break;
      await pause(50);
    }
    await pause(80);
    const loaded = await evaluate(`({
      id: document.body.dataset.gameId,
      pass: document.body.classList.contains('arcade-object-pass'),
      profile: Boolean(window.__ARCADE_OBJECT_PROFILES__?.[document.body.dataset.gameId]),
      objects: document.querySelectorAll('.arcade-world,.arcade-tile,.arcade-sprite,.arcade-target,.arcade-feedback').length,
      fits: document.documentElement.scrollWidth <= innerWidth + 1
    })`);
    assert.equal(loaded.id, id, `${id}/${viewport.name}: fel spel-id`);
    assert.ok(loaded.pass && loaded.profile, `${id}/${viewport.name}: objektdesignen laddades inte`);
    assert.ok(loaded.objects > 0, `${id}/${viewport.name}: inga interna spelobjekt dekorerades`);
    assert.ok(loaded.fits, `${id}/${viewport.name}: horisontell overflow`);
    assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel ${exceptions.join(", ")}`);

    const screenshotKey = `${id}-${viewport.name}`;
    if (screenshotCases.has(screenshotKey)) {
      await evaluate(`(() => {
        const canvas = document.querySelector('canvas');
        if (canvas && 'requestPointerLock' in canvas) canvas.requestPointerLock = () => {
          Object.defineProperty(document, 'pointerLockElement', { configurable: true, get: () => canvas });
          document.dispatchEvent(new Event('pointerlockchange'));
          return Promise.resolve();
        };
        const button = document.querySelector('#startBtn, #playBtn, #startOverlay .level-btn:not(:disabled), #startOverlay .preset-card, #mapGrid .map-card, button.start-btn, .overlay:not(.hidden) button.cta, .start-overlay button');
        button?.click();
        return true;
      })()`);
      await pause(500);
      assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel efter start ${exceptions.join(", ")}`);
      if (id === "kubkrossaren") {
        const crusherUi = await evaluate(`(() => {
          const hud = document.querySelector('#hud');
          const toggle = document.querySelector('#ballToggle');
          const hudRect = hud.getBoundingClientRect();
          const toggleRect = toggle.getBoundingClientRect();
          toggle.click();
          const panel = document.querySelector('#ballSelect');
          const panelRect = panel.getBoundingClientRect();
          return {
            hudVisible: getComputedStyle(hud).display === 'grid' && hudRect.top >= 0 && hudRect.bottom <= innerHeight,
            stats: ['scoreVal','ballCountVal','turnVal','bestVal'].every(statId => document.getElementById(statId)?.textContent !== ''),
            toggleVisible: !toggle.hidden && toggleRect.width >= 44 && toggleRect.height >= 44,
            panelOpen: !panel.hidden && panelRect.width > 0 && panelRect.height > 0,
            options: panel.querySelectorAll('.ball-opt').length,
            explained: [...panel.querySelectorAll('.ball-effect')].every(el => el.textContent.trim().length > 8)
          };
        })()`);
        assert.ok(crusherUi.hudVisible && crusherUi.stats, `${id}/${viewport.name}: HUD syns inte korrekt`);
        assert.ok(crusherUi.toggleVisible && crusherUi.panelOpen, `${id}/${viewport.name}: bollväljaren kan inte öppnas`);
        assert.equal(crusherUi.options, 4, `${id}/${viewport.name}: fel antal bolltyper`);
        assert.ok(crusherUi.explained, `${id}/${viewport.name}: bollförklaringar saknas`);
      }
      const shot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      writeFileSync(`${outputDir}/${id}-${viewport.name}.png`, Buffer.from(shot.data, "base64"));
    }
    checks += 1;
  }
}

ws.close();
browser.kill("SIGTERM");
console.log(`Alla spel laddade: ${checks} kontroller, ${ids.length} spel × ${viewports.length} skärmstorlekar.`);
console.log(`Skärmbilder: ${outputDir}`);
