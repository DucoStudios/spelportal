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
  "memory-plattorna-desktop", "poppa-ballongerna-mobile", "schack-mobile",
  "malarboken-mobile", "brobyggarna-mobile"
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
        const button = document.querySelector('#startBtn, #playBtn, #startOverlay .level-btn:not(:disabled), #mapGrid .map-card, button.start-btn, .overlay:not(.hidden) button.cta, .start-overlay button');
        button?.click();
        return true;
      })()`);
      await pause(500);
      assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel efter start ${exceptions.join(", ")}`);
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
