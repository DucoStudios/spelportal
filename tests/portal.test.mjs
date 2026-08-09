import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";

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

test("ingen HTML-fil innehåller en GitHub-token", () => {
  for (const file of ["index.html", ...gameFiles.map(name => `games/${name}`)]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /ghp_[A-Za-z0-9]+/);
  }
});
