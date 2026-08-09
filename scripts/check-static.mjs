import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { Script } from "node:vm";

const gameFiles = readdirSync("games").filter(file => file.endsWith(".html")).sort();
const htmlFiles = ["index.html", ...gameFiles.map(file => `games/${file}`)];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => match[1].trim())
    .filter(Boolean);
  for (const [index, source] of scripts.entries()) {
    new Script(source, { filename: `${file}:inline-${index + 1}.js` });
  }
}

new Script(readFileSync("interaction-guard.js", "utf8"), { filename: "interaction-guard.js" });
new Script(readFileSync("feedback-config.js", "utf8"), { filename: "feedback-config.js" });
new Script(readFileSync("game-feedback.js", "utf8"), { filename: "game-feedback.js" });
new Script(readFileSync("feedback-apps-script/Code.gs", "utf8"), { filename: "feedback-apps-script/Code.gs" });
new Script(readFileSync("games/bible-games.js", "utf8"), { filename: "games/bible-games.js" });
new Script(readFileSync("games/bibelresan-66.js", "utf8"), { filename: "games/bibelresan-66.js" });

const css = readFileSync("games/game-polish.css", "utf8");
assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length, "obalanserade CSS-klamrar");
const feedbackCss = readFileSync("game-feedback.css", "utf8");
assert.equal((feedbackCss.match(/{/g) || []).length, (feedbackCss.match(/}/g) || []).length, "obalanserade CSS-klamrar i feedback");
for (const file of ["games/bible-games.css", "games/bibelresan-66.css"]) {
  const source = readFileSync(file, "utf8");
  assert.equal((source.match(/{/g) || []).length, (source.match(/}/g) || []).length, `obalanserade CSS-klamrar i ${file}`);
}
console.log(`Statisk kontroll klar för portalen och ${gameFiles.length} spel.`);
