import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

const gamesDir = new URL("../games/", import.meta.url);
const files = readdirSync(gamesDir).filter(file => file.endsWith(".html")).sort();

for (const file of files) {
  const path = join(gamesDir.pathname, file);
  let html = readFileSync(path, "utf8");
  const gameId = basename(file, ".html");

  if (!html.includes('href="game-polish.css"')) {
    html = html.replace("</head>", '<link rel="stylesheet" href="game-polish.css">\n</head>');
  }

  if (!html.includes('src="../interaction-guard.js"')) {
    html = html.replace("</head>", '<script src="../interaction-guard.js" defer></script>\n</head>');
  }

  if (!html.includes('src="arcade-objects.js"')) {
    html = html.replace("</head>", '<script src="arcade-objects.js" defer></script>\n</head>');
  }

  html = html.replace(
    /<meta name="viewport"[^>]*>/,
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">'
  );

  if (!html.includes("data-game-id=")) {
    html = html.replace(/<body([^>]*)>/, `<body data-game-id="${gameId}"$1>`);
  }

  writeFileSync(path, html);
}

console.log(`Visuellt lager kopplat till ${files.length} spel.`);
