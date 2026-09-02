(() => {
  "use strict";

  const SUPPORTED_GAME_IDS = [
    "accentjakten", "alfabetet-fargerna", "andens-frukttradgard", "andningsdykaren",
    "balansbanan", "barmhartighetsresan", "bibelhjalten", "bibelresan-66",
    "bistroblixten", "blockrutan", "blockvarlden", "bokstavsbilen", "brobyggarna",
    "bygg-pa-klippan", "byggkost-eller-sallanmat", "dansstopp", "ekorrhjulet",
    "fargfusion", "flykten", "fruktfangaren", "gap-monstren", "gardsriket",
    "gavokedjan", "hjalparjakten", "ideverkstan", "klossfall", "kroppens-tempel",
    "kubkrossaren", "kulbanan", "kulrullaren", "ljudmatchen", "malarboken",
    "memory-plattorna", "meningsbyggaren", "minimarknaden", "molnhoppet",
    "myntmatchen", "ord-som-bygger", "ordbron", "ordgatan", "ordmastaren",
    "ordracet", "ordresan", "ordspraks-pusslet", "ormen", "poppa-ballongerna",
    "pusselvridaren", "raddaagget", "reaktionsraketen", "ror-pa-dig",
    "saftstand-erbjudandet", "schack", "sex-burkar-sortern", "sikta-ratt",
    "spargrissprint", "superhjalte-spranget", "tacksamhetstradet",
    "talamodstornet", "tornverkstan", "traffa-ratt", "vanskapskompassen",
    "vishetens-vag"
  ];

  const kidsMix = [
    "accentjakten", "andningsdykaren", "balansbanan", "bistroblixten", "brobyggarna",
    "dansstopp", "fargfusion", "fruktfangaren", "hjalparjakten", "ideverkstan",
    "minimarknaden", "molnhoppet", "myntmatchen", "ordbron", "reaktionsraketen",
    "spargrissprint", "tacksamhetstradet", "talamodstornet", "tornverkstan",
    "vanskapskompassen"
  ];

  const bibleMix = [
    "andens-frukttradgard", "barmhartighetsresan", "bygg-pa-klippan",
    "ord-som-bygger"
  ];

  const PROFILES = Object.fromEntries(SUPPORTED_GAME_IDS.map(id => [id, {}]));

  const kidsProfile = {
    world: ".mix-stage, .catch-lane, .reaction-field, .balance-board, .stack-zone, .draw-canvas, .jump-canvas",
    tile: ".choice-card, .order-token, .merge-cell, .scene-item, .coin-btn",
    sprite: ".catch-item, .catch-player, .catch-tree, .movement-orb, .balance-orb, .stack-block, .patience-marker",
    target: ".reaction-target, .balance-zone, .patience-sweet, .coin-total, .picked-row",
    feedback: ".toast, .movement-command, .coin-target, .mix-status"
  };
  kidsMix.forEach(id => Object.assign(PROFILES[id], kidsProfile));

  const bibleProfile = {
    world: ".bible-stage, .mercy-road, .build-area, .fruit-garden",
    tile: ".choice, .fruit-choice, .tower-block",
    sprite: ".traveler, .mercy-token, .tower, .speech-bubble",
    target: ".foundation, .listen-meter, .listen-fill",
    feedback: ".bible-status, .storm, .bible-toast"
  };
  bibleMix.forEach(id => Object.assign(PROFILES[id], bibleProfile));

  Object.assign(PROFILES, {
    "alfabetet-fargerna": { world: ".game-area", tile: ".pick-btn, .mode-btn", sprite: ".letter, .color", feedback: ".feedback" },
    "bibelhjalten": { world: ".story-card", tile: ".choice-btn", sprite: ".scene-icon", feedback: ".feedback" },
    "bibelresan-66": { world: ".bible-stage, .map, .journey", tile: ".choice, .answer-btn, .book-card", sprite: ".traveler, .hero, .marker", target: ".stage-node, .destination", feedback: ".bible-status, .feedback" },
    "blockrutan": { world: "#board, .board-wrap", tile: ".tray-piece, .cell.filled", sprite: ".drag-ghost", target: ".cell.ghost-ok", feedback: ".hud-chip" },
    "blockvarlden": { world: "#gameCanvas, .game-wrap", tile: ".hotbar .slot", sprite: ".npc-toast", target: ".interact-prompt", feedback: ".toast" },
    "bokstavsbilen": { world: ".road, .game-area", tile: ".answer-btn", sprite: ".falling, .car", target: ".lane-line", feedback: ".feedback" },
    "byggkost-eller-sallanmat": { world: ".game-area", tile: ".food", target: ".zone", feedback: ".feedback" },
    "ekorrhjulet": { world: ".game-area", tile: ".invest-btn, .prof-card", target: ".assets-box", feedback: ".feedback" },
    "flykten": { world: ".game-area, .ocean", sprite: ".obstacle, .player", target: ".wave", feedback: ".feedback" },
    "gap-monstren": { world: ".game-area", tile: ".hole", sprite: ".bubble", feedback: ".gain-toast, .feedback" },
    "gardsriket": { world: "#gameCanvas, #gameWrap", tile: ".map-card, .build-item, .upgrade-item", target: ".build-hint", feedback: ".toast" },
    "gavokedjan": { world: "svg, .game-area", tile: ".harvest-item", target: ".meter, .meter-fill", feedback: ".feedback" },
    "klossfall": { world: "#board, .board, .grid", tile: ".cell.filled, .cell.ghost", feedback: ".feedback" },
    "kroppens-tempel": { world: "#board, .question-card", tile: ".answer-btn", sprite: ".question", target: ".verse-tag", feedback: ".explain, .feedback" },
    "kubkrossaren": { world: "#gameCanvas, .game-wrap", target: ".powerup-pill", feedback: ".combo-toast, .feedback" },
    "kulbanan": { world: "#board, .board, .grid", tile: ".piece-btn, .cell.blocker, .cell.start", sprite: ".ball, .piece-icon", target: ".goal-flag", feedback: ".feedback" },
    "kulrullaren": { world: "#gameCanvas, .game-wrap", tile: ".level-btn, .steer-btn", target: ".progress-track", feedback: ".feedback" },
    "ljudmatchen": { world: "#board, .game-area", tile: ".pick-btn", sprite: ".sound-icon, .replay-btn", feedback: ".replay-hint, .feedback" },
    "malarboken": { world: "#board, #drawCanvas, canvas, .canvas-wrap", tile: ".swatch, .scene-tab, .mode-tab", sprite: "#board svg [data-name]", target: ".brush-size", feedback: ".feedback" },
    "memory-plattorna": { world: "#board, .board, .grid", tile: ".card, .face", feedback: ".matched, .feedback" },
    "meningsbyggaren": { world: ".game-area", tile: ".chip", target: ".build-zone, .bank", feedback: ".feedback" },
    "ordgatan": { world: ".board, .game-area", tile: ".tile5, .key", feedback: ".present, .absent, .feedback" },
    "ordmastaren": { world: ".game-area", tile: ".pack-card, .answer-btn", sprite: ".prompt-word, .sound-btn", feedback: ".feedback" },
    "ordracet": { world: ".game-area", tile: ".answer-btn", target: ".word-zone, .timer-fill", feedback: ".feedback" },
    "ordresan": { world: "svg, .map, .game-area", tile: ".answer-btn", sprite: ".traveler", target: ".stage-node", feedback: ".feedback" },
    "ordspraks-pusslet": { world: ".game-area", tile: ".tile", target: ".blank", feedback: ".revealed, .feedback" },
    "ormen": { world: "#snakeCanvas, #gameCanvas, #board, .board", feedback: ".feedback" },
    "poppa-ballongerna": { world: "svg, .game-area", sprite: ".balloon, .num", feedback: ".feedback" },
    "pusselvridaren": { world: "#board, .board, .grid", tile: ".piece, .rot-btn", feedback: ".feedback" },
    "raddaagget": { world: "svg, .game-area", sprite: ".egg", target: ".nest, .speed-meter", feedback: ".feedback" },
    "ror-pa-dig": { world: ".game-area", sprite: ".move-icon, .pdot", target: ".timer-ring", feedback: ".feedback" },
    "saftstand-erbjudandet": { world: ".game-area", tile: ".offer-card", sprite: ".customer", target: ".patience-fill", feedback: ".feedback" },
    "schack": { world: "#board, .board", tile: ".sq", sprite: ".piece", target: ".dot, .ring", feedback: ".feedback" },
    "sex-burkar-sortern": { world: ".game-area", tile: ".jar", sprite: ".coin", feedback: ".feedback" },
    "sikta-ratt": { world: ".game-area", sprite: ".arrow, .band", target: ".anchor, .target", feedback: ".feedback" },
    "superhjalte-spranget": { world: ".game-area", sprite: ".player, .p-cape, .p-head, .p-body, .p-leg, .star", target: ".platform, .flag", feedback: ".feedback" },
    "traffa-ratt": { world: "svg, .game-area", sprite: ".ball", target: ".goal, .obstacle", feedback: ".feedback" },
    "vishetens-vag": { world: ".scenario-card, .game-area", tile: ".answer-btn", sprite: ".scenario-icon", target: ".verse-tag", feedback: ".feedback" }
  });

  const gameId = document.body?.dataset.gameId;
  const profile = PROFILES[gameId];
  if (!profile) return;

  document.body.classList.add("arcade-object-pass");
  const roles = {
    world: "arcade-world",
    tile: "arcade-tile",
    sprite: "arcade-sprite",
    target: "arcade-target",
    feedback: "arcade-feedback"
  };

  function decorate(root) {
    if (!(root instanceof Element || root instanceof Document)) return;
    for (const [role, selector] of Object.entries(profile)) {
      if (!selector) continue;
      if (root instanceof Element && root.matches(selector)) root.classList.add(roles[role]);
      root.querySelectorAll(selector).forEach(element => element.classList.add(roles[role]));
    }
  }

  decorate(document);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => decorate(node)));
  }).observe(document.body, { childList: true, subtree: true });

  window.__ARCADE_OBJECT_PROFILES__ = PROFILES;
})();
