import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ids = [
  "fruktfangaren", "bistroblixten", "accentjakten", "ordbron",
  "dansstopp", "reaktionsraketen", "balansbanan", "andningsdykaren",
  "brobyggarna", "fargfusion", "molnhoppet", "tornverkstan",
  "minimarknaden", "myntmatchen", "spargrissprint", "ideverkstan",
  "vanskapskompassen", "hjalparjakten", "talamodstornet", "tacksamhetstradet"
];
const viewports = [
  { name: "mobile", width: 390, height: 844, mobile: true },
  { name: "tablet", width: 820, height: 1180, mobile: true },
  { name: "desktop", width: 1440, height: 900, mobile: false }
];
const screenshotCases = new Set(["fruktfangaren-mobile", "fargfusion-tablet", "molnhoppet-desktop"]);
const outputDir = "/tmp/spelportal-kids-mix-smoke";
mkdirSync(outputDir, { recursive: true });

const port = 9300 + process.pid % 300;
const browser = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/spelportal-smoke-${process.pid}`, "about:blank"
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
  if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
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
  await call("Page.navigate", { url: pathToFileURL(resolve("index.html")).href });
  for (let attempt = 0; attempt < 40; attempt++) {
    if (await evaluate("document.readyState === 'complete'")) break;
    await pause(50);
  }
  const portalBackground = await evaluate(`({
    root: getComputedStyle(document.documentElement).backgroundColor,
    body: getComputedStyle(document.body).backgroundColor
  })`);
  assert.notEqual(portalBackground.root, "rgba(0, 0, 0, 0)", `portalen/${viewport.name}: transparent rotbakgrund`);
  assert.notEqual(portalBackground.body, "rgba(0, 0, 0, 0)", `portalen/${viewport.name}: transparent bodybakgrund`);

  for (const id of ids) {
    exceptions = [];
    const url = pathToFileURL(resolve(`games/${id}.html`)).href;
    await call("Page.navigate", { url });
    for (let attempt = 0; attempt < 40; attempt++) {
      if (await evaluate("document.readyState === 'complete'")) break;
      await pause(50);
    }
    const loaded = await evaluate(`({
      title: document.querySelector('#gameTitle')?.textContent,
      button: Boolean(document.querySelector('#startBtn')),
      fits: document.documentElement.scrollWidth <= innerWidth + 1,
      stageHeight: Math.round(document.querySelector('.mix-stage-wrap')?.getBoundingClientRect().height || 0),
      rootBackground: getComputedStyle(document.documentElement).backgroundColor,
      bodyBackground: getComputedStyle(document.body).backgroundColor
    })`);
    assert.ok(loaded.title && loaded.title !== "Laddar…", `${id}/${viewport.name}: titel laddades inte`);
    assert.ok(loaded.button, `${id}/${viewport.name}: startknapp saknas`);
    assert.ok(loaded.fits, `${id}/${viewport.name}: horisontell overflow`);
    assert.ok(loaded.stageHeight >= 250, `${id}/${viewport.name}: spelplanen är för låg`);
    assert.notEqual(loaded.rootBackground, "rgba(0, 0, 0, 0)", `${id}/${viewport.name}: transparent rotbakgrund`);
    assert.notEqual(loaded.bodyBackground, "rgba(0, 0, 0, 0)", `${id}/${viewport.name}: transparent bodybakgrund`);

    await evaluate("document.querySelector('#startBtn').click(); true");
    await pause(320);
    const started = await evaluate(`({
      active: document.body.classList.contains('session-active'),
      overlayHidden: document.querySelector('#mixOverlay').hidden,
      stageChildren: document.querySelector('#mixStage').children.length,
      controls: document.querySelector('#mixControls').children.length
    })`);
    assert.ok(started.active && started.overlayHidden, `${id}/${viewport.name}: spelet startade inte`);
    assert.ok(started.stageChildren > 0, `${id}/${viewport.name}: tom spelplan`);
    assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel ${exceptions.join(", ")}`);

    const screenshotKey = `${id}-${viewport.name}`;
    if (screenshotCases.has(screenshotKey)) {
      const shot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      writeFileSync(`${outputDir}/${basename(id)}-${viewport.name}.png`, Buffer.from(shot.data, "base64"));
    }
    checks += 1;
  }
}

ws.close();
browser.kill("SIGTERM");
console.log(`Responsiv röktest klar: ${checks} starter, ${ids.length} spel × ${viewports.length} skärmstorlekar.`);
console.log(`Skärmbilder: ${outputDir}`);
