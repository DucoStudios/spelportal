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
  "blockrutan-mobile", "blockrutan-desktop",
  "kubkrossaren-mobile",
  "klossfall-mobile",
  "kulrullaren-mobile", "memory-plattorna-mobile", "memory-plattorna-desktop",
  "saftstand-erbjudandet-mobile", "ordmastaren-mobile", "poppa-ballongerna-mobile", "schack-mobile",
  "malarboken-mobile", "brobyggarna-mobile", "ormen-mobile", "traffa-ratt-mobile", "raddaagget-mobile", "sikta-ratt-mobile", "kulbanan-mobile",
  "superhjalte-spranget-mobile", "flykten-mobile", "reaktionsraketen-mobile", "dansstopp-mobile",
  "balansbanan-mobile", "molnhoppet-mobile", "tornverkstan-mobile", "talamodstornet-mobile", "fargfusion-mobile",
  "fruktfangaren-mobile", "bistroblixten-mobile", "accentjakten-mobile", "ordbron-mobile"
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
  assert.ok(await evaluate("document.documentElement.scrollHeight > innerHeight * 2"), `portalen/${viewport.name}: katalogen skapar ingen vertikal scrollyta`);
  const scrollX = Math.round(viewport.width / 2);
  const scrollY = Math.round(viewport.height / 2);
  if (viewport.mobile) {
    await call("Input.synthesizeScrollGesture", { x: scrollX, y: scrollY, yDistance: -720, speed: 1200, gestureSourceType: "touch" });
  } else {
    await call("Input.dispatchMouseEvent", { type: "mouseMoved", x: scrollX, y: scrollY });
    await call("Input.dispatchMouseEvent", { type: "mouseWheel", x: scrollX, y: scrollY, deltaX: 0, deltaY: 720 });
  }
  await pause(180);
  const scrollState = await evaluate(`({
    y: scrollY,
    htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
    bodyOverflowY: getComputedStyle(document.body).overflowY
  })`);
  assert.ok(scrollState.y > 0, `portalen/${viewport.name}: ${viewport.mobile ? "svepgesten" : "mushjulet"} kan inte scrolla katalogen (${JSON.stringify(scrollState)})`);
  await evaluate("scrollTo(0, 0)");
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
      if (id === "blockrutan") {
        const blockMove = await evaluate(`(() => {
          const piece = document.querySelector('.tray-piece');
          const firstCell = document.querySelector('.cell');
          if (!piece || !firstCell) return { ok: false, reason: 'bricka eller spelcell saknas' };
          const pieceRect = piece.getBoundingClientRect();
          const cellRect = firstCell.getBoundingClientRect();
          const pointerId = 17;
          piece.dispatchEvent(new PointerEvent('pointerdown', {
            bubbles: true, pointerId, clientX: pieceRect.left + pieceRect.width / 2,
            clientY: pieceRect.top + pieceRect.height / 2, pointerType: 'touch'
          }));
          const ghostRect = document.querySelector('.drag-ghost')?.getBoundingClientRect();
          if (!ghostRect) return { ok: false, reason: 'dragspöket skapades inte' };
          const lift = Math.max(72, cellRect.width * 1.65);
          const targetX = cellRect.left + ghostRect.width / 2;
          const targetY = cellRect.top + ghostRect.height / 2 + lift;
          document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId, clientX: targetX, clientY: targetY, pointerType: 'touch' }));
          document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId, clientX: targetX, clientY: targetY, pointerType: 'touch' }));
          return {
            ok: Number(document.querySelector('#scoreVal')?.textContent) > 0,
            cells: document.querySelectorAll('.cell').length,
            pieces: document.querySelectorAll('.tray-piece').length,
            settings: Boolean(document.querySelector('#settingsBtn')),
            filled: document.querySelectorAll('.cell.filled').length
          };
        })()`);
        assert.ok(blockMove.ok, `${id}/${viewport.name}: en riktig dragplacering gav ingen poäng (${blockMove.reason || JSON.stringify(blockMove)})`);
        assert.equal(blockMove.cells, 64, `${id}/${viewport.name}: spelbrädet är inte 8×8`);
        assert.equal(blockMove.pieces, 2, `${id}/${viewport.name}: använd bricka försvann inte ur setet`);
        assert.ok(blockMove.settings && blockMove.filled > 0, `${id}/${viewport.name}: referensens spel-UI eller placerade block saknas`);
      }
      const shot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      writeFileSync(`${outputDir}/${id}-${viewport.name}.png`, Buffer.from(shot.data, "base64"));
      if (["balansbanan", "molnhoppet", "tornverkstan", "talamodstornet", "fargfusion"].includes(id)) {
        const mechanic = await evaluate(`(() => {
          const extra = document.querySelector('#extraVal');
          if (!extra) return { ok: false, reason: 'extra HUD saknas' };
          if ('${id}' === 'balansbanan') {
            const toggle = document.querySelector('.calm-toggle');
            toggle?.click();
            return { ok: toggle?.getAttribute('aria-pressed') === 'true', extra: extra.textContent };
          }
          if ('${id}' === 'molnhoppet') {
            return { ok: Boolean(document.querySelector('#jumpCanvas')) && document.querySelector('#jumpRescues')?.textContent.includes('×2'), extra: extra.textContent };
          }
          if ('${id}' === 'tornverkstan') {
            document.querySelector('.mix-controls .accent')?.click();
            return { ok: Number(document.querySelector('#scoreVal')?.textContent) > 0 && document.querySelectorAll('.stack-block').length > 1, extra: extra.textContent };
          }
          if ('${id}' === 'talamodstornet') {
            document.querySelector('.mix-controls .accent')?.click();
            return { ok: document.querySelector('#patienceTower') !== null && extra.textContent.startsWith('×'), extra: extra.textContent };
          }
          const cells = [...document.querySelectorAll('.merge-cell')];
          const pair = cells.find((cell, index) => cells.findIndex(other => other.textContent === cell.textContent) !== index);
          pair?.click();
          const match = [...document.querySelectorAll('.merge-cell')].find(cell => !cell.classList.contains('selected') && cell.textContent === pair?.textContent);
          match?.click();
          return { ok: Number(document.querySelector('#scoreVal')?.textContent) > 0 && document.querySelector('#mergeNext') !== null, extra: extra.textContent };
        })()`);
        assert.ok(mechanic.ok, `${id}/${viewport.name}: den nya kärnmekaniken svarar inte (${mechanic.reason || mechanic.extra})`);
        await pause(80);
        assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel i den nya kärnmekaniken ${exceptions.join(", ")}`);
      }
      if (["fruktfangaren", "bistroblixten", "accentjakten", "ordbron", "brobyggarna"].includes(id)) {
        const learningMechanic = await evaluate(`(() => {
          const extra = document.querySelector('#extraVal');
          if (!extra) return { ok: false, reason: 'extra HUD saknas' };
          if ('${id}' === 'fruktfangaren') {
            const hint = document.querySelector('#catchHint');
            return { ok: hint?.getAttribute('role') === 'button' && extra.textContent.startsWith('×'), extra: extra.textContent };
          }
          if ('${id}' === 'bistroblixten') {
            const labels = [...document.querySelectorAll('.order-token small')].map(el => el.textContent);
            for (const label of labels) document.querySelector('.stock-card[aria-label="' + label + '"]:not(:disabled)')?.click();
            return { ok: Number(document.querySelector('#scoreVal')?.textContent) > 0 && extra.textContent.includes('⭐'), extra: extra.textContent };
          }
          if ('${id}' === 'accentjakten') {
            document.querySelector('.choice-card')?.click();
            return { ok: document.querySelector('#choiceExplainer')?.textContent.trim().length > 12 && extra.textContent.includes('/6'), extra: extra.textContent };
          }
          if ('${id}' === 'ordbron') {
            [...document.querySelectorAll('.choice-card')].find(el => el.textContent === 'le chien')?.click();
            return { ok: document.querySelectorAll('.bridge-part.built').length === 1 && extra.textContent === '1/6', extra: extra.textContent };
          }
          const canvas = document.querySelector('#drawCanvas');
          canvas.setPointerCapture = () => {};
          const rect = canvas.getBoundingClientRect();
          const route = [[.08,.82],[.24,.72],[.25,.22],[.72,.2],[.9,.16]];
          const fire = (type, x, y) => canvas.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 1, clientX: rect.left + x * rect.width, clientY: rect.top + y * rect.height }));
          fire('pointerdown', route[0][0], route[0][1]);
          for (let segment = 1; segment < route.length; segment++) {
            const from = route[segment - 1], to = route[segment];
            for (let step = 1; step <= 12; step++) fire('pointermove', from[0] + (to[0] - from[0]) * step / 12, from[1] + (to[1] - from[1]) * step / 12);
          }
          fire('pointerup', route.at(-1)[0], route.at(-1)[1]);
          return { ok: document.querySelector('#materialText')?.textContent !== '100%' && document.querySelector('#timeVal')?.textContent === '1/5', extra: extra.textContent };
        })()`);
        assert.ok(learningMechanic.ok, `${id}/${viewport.name}: den nya lärmekaniken svarar inte (${learningMechanic.reason || learningMechanic.extra})`);
        await pause(80);
        assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel i den nya lärmekaniken ${exceptions.join(", ")}`);
      }
      if (["traffa-ratt", "poppa-ballongerna", "raddaagget", "sikta-ratt", "kulbanan"].includes(id)) {
        const physicsMechanic = await evaluate(`(() => {
          if ('${id}' === 'traffa-ratt') {
            const board = document.querySelector('#board');
            const rect = board.getBoundingClientRect();
            board.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 4, clientX: rect.left + 60, clientY: rect.top + 80 }));
            board.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 4, clientX: rect.left + 190, clientY: rect.top + 220 }));
            window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 4 }));
            return { ok: document.querySelector('#materialVal')?.textContent !== '100%' && !document.querySelector('#goBtn')?.disabled };
          }
          if ('${id}' === 'poppa-ballongerna') {
            return { ok: document.querySelector('#nextVal')?.textContent === '1' && document.querySelector('#starsVal')?.textContent === '0' };
          }
          if ('${id}' === 'raddaagget') {
            const material = document.querySelector('.material-btn');
            material?.click();
            return { ok: document.querySelector('.material-btn.active')?.textContent.includes('SILKE') && document.querySelector('#linePoly')?.getAttribute('stroke') === '#2FE6D6' };
          }
          if ('${id}' === 'sikta-ratt') {
            return { ok: document.querySelector('#timeVal')?.textContent === '60' && document.querySelector('#windVal')?.textContent !== '—' };
          }
          const piece = document.querySelector('.piece-btn:not(:disabled)');
          piece?.click();
          document.querySelector('.cell:not(.blocker)')?.click();
          const undo = document.querySelector('#undoBtn');
          const previewed = document.querySelectorAll('.cell.preview').length;
          const enabled = !undo?.disabled;
          undo?.click();
          return { ok: enabled && previewed > 0 && document.querySelector('#previewVal')?.textContent.length > 0 };
        })()`);
        assert.ok(physicsMechanic.ok, `${id}/${viewport.name}: den nya fysikmekaniken svarar inte`);
        await pause(80);
        assert.deepEqual(exceptions, [], `${id}/${viewport.name}: körfel i den nya fysikmekaniken ${exceptions.join(", ")}`);
      }
    }
    checks += 1;
  }
}

ws.close();
browser.kill("SIGTERM");
console.log(`Alla spel laddade: ${checks} kontroller, ${ids.length} spel × ${viewports.length} skärmstorlekar.`);
console.log(`Skärmbilder: ${outputDir}`);
