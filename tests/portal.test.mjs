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
    assert.ok(html.includes(`data-game-id="${id}"`), `${file} har fel data-game-id`);
  }
});

test("delade visuella resurser finns", () => {
  assert.ok(existsSync("games/game-polish.css"));
  assert.ok(existsSync("games/lib/three.min.js"));
});

test("ingen HTML-fil innehåller en GitHub-token", () => {
  for (const file of ["index.html", ...gameFiles.map(name => `games/${name}`)]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /ghp_[A-Za-z0-9]+/);
  }
});
