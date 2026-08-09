import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { Script } from "node:vm";

const files = readdirSync("games").filter(file => file.endsWith(".html")).sort();
for (const file of files) {
  const html = readFileSync(`games/${file}`, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => match[1].trim())
    .filter(Boolean);
  for (const [index, source] of scripts.entries()) {
    new Script(source, { filename: `${file}:inline-${index + 1}.js` });
  }
}

const css = readFileSync("games/game-polish.css", "utf8");
assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length, "obalanserade CSS-klamrar");
console.log(`Statisk kontroll klar för ${files.length} spel.`);
