(() => {
  "use strict";

  const CONFIGS = {
    "fruktfangaren": {
      mode: "catcher", icon: "🍓", kicker: "FRANSKA · SNABBLYSSNING", title: "Fruktfångaren",
      intro: "Hör och läs ordet – fånga rätt frukt innan den landar.", instructions: "Flytta korgen med fingret eller pilarna. Fånga bara frukten som det franska ordet ber om.", duration: 45,
      targeted: true, speakTarget: true, player: "🧺", pool: [
        { label: "la pomme", emoji: "🍎" }, { label: "la poire", emoji: "🍐" }, { label: "la fraise", emoji: "🍓" },
        { label: "le citron", emoji: "🍋" }, { label: "la banane", emoji: "🍌" }, { label: "le raisin", emoji: "🍇" }
      ]
    },
    "bistroblixten": {
      mode: "sequence", icon: "🥐", kicker: "FRANSKA · MINNE & TEMPO", title: "Bistroblixten",
      intro: "Bygg gästernas beställningar i rätt ordning.", instructions: "Titta på beställningen och tryck på varorna i samma ordning. Nästa gäst väntar!", duration: 55, speakPrompt: true,
      orders: [
        [{ e: "🥐", t: "un croissant" }, { e: "🥛", t: "du lait" }],
        [{ e: "🍞", t: "du pain" }, { e: "🧀", t: "du fromage" }, { e: "🍎", t: "une pomme" }],
        [{ e: "🥕", t: "une carotte" }, { e: "🍲", t: "une soupe" }],
        [{ e: "🍓", t: "une fraise" }, { e: "🧁", t: "un gâteau" }, { e: "💧", t: "de l’eau" }]
      ]
    },
    "accentjakten": {
      mode: "choice", icon: "É", kicker: "FRANSKA · ORDBLICK", title: "Accentjakten",
      intro: "Se den svenska ledtråden och hitta rätt franska ord.", instructions: "Välj rätt stavning. Tryck på högtalaren om du vill höra ordet efter svaret.", duration: 50,
      questions: [
        { p: "Vilket ord betyder skola?", a: "l’école", o: ["l’ecole", "l’école", "l’ècole", "l’êcole"] },
        { p: "Vilket ord betyder pappa?", a: "le père", o: ["le pere", "le pére", "le père", "le pêre"] },
        { p: "Vilket ord betyder sommar?", a: "l’été", o: ["l’ete", "l’été", "l’ète", "l’êté"] },
        { p: "Vilket ord betyder cykel?", a: "le vélo", o: ["le velo", "le vèlo", "le vélo", "le vêlo"] },
        { p: "Vilket ord betyder fönster?", a: "la fenêtre", o: ["la fenetre", "la fénêtre", "la fenêtre", "la fènétre"] },
        { p: "Vilket ord betyder jul?", a: "Noël", o: ["Noel", "Nöel", "Noël", "Nôel"] }
      ]
    },
    "ordbron": {
      mode: "choice", icon: "🌉", kicker: "FRANSKA · VÄLJ VÄGEN", title: "Ordbron",
      intro: "Varje rätt ord lägger ut nästa sten över floden.", instructions: "Läs den svenska ledtråden och välj rätt franska sten. Bygg bron så långt du kan.", duration: 55, bridge: true,
      questions: [
        { p: "hund", a: "le chien", o: ["le chat", "le chien", "la souris", "le cheval"] },
        { p: "hus", a: "la maison", o: ["la porte", "la maison", "la rue", "la ville"] },
        { p: "glad", a: "heureux", o: ["triste", "fatigué", "heureux", "petit"] },
        { p: "att springa", a: "courir", o: ["dormir", "manger", "courir", "lire"] },
        { p: "i morgon", a: "demain", o: ["hier", "demain", "maintenant", "toujours"] },
        { p: "tillsammans", a: "ensemble", o: ["vite", "seul", "ensemble", "loin"] }
      ]
    },
    "dansstopp": {
      mode: "movement", variant: "dance", icon: "🕺", kicker: "RÖRELSE · MUSIKLEK", title: "Dansstopp",
      intro: "Dansa när färgen lyser – frys blixtsnabbt när den slocknar.", instructions: "Ställ enheten säkert. Tryck TAKT medan du dansar. När det står FRYS ska hela kroppen stå still.", duration: 45
    },
    "reaktionsraketen": {
      mode: "reaction", icon: "🚀", kicker: "RÖRELSE · REAKTION", title: "Reaktionsraketen",
      intro: "Träffa energikärnorna och bygg en snabb kombo.", instructions: "Tryck på kärnan så fort den dyker upp. Den blir mindre ju längre du kommer.", duration: 35
    },
    "balansbanan": {
      mode: "balance", icon: "🏄", kicker: "RÖRELSE · KONTROLL", title: "Balansbanan",
      intro: "Håll energiklotet i mitten trots vindpustarna.", instructions: "Dra på banan eller använd pilarna för att luta åt motsatt håll. Tid i målzonen ger poäng.", duration: 40
    },
    "andningsdykaren": {
      mode: "movement", variant: "breathe", icon: "🤿", kicker: "HÄLSA · LUGN FOKUS", title: "Andningsdykaren",
      intro: "Dyk djupare med lugna andetag och samla pärlor.", instructions: "Följ bubblan: andas in när den växer, håll stilla och andas ut när den krymper.", duration: 48
    },
    "brobyggarna": {
      mode: "draw", icon: "✏️", kicker: "SKAPA · RITA LÖSNINGEN", title: "Brobyggarna",
      intro: "Rita en säker bro runt hindren och hjälp resenären över.", instructions: "Dra en sammanhängande linje från den gröna starten till den gula flaggan utan att nudda klipporna.", duration: 0
    },
    "fargfusion": {
      mode: "merge", icon: "🎨", kicker: "LOGIK · MERGE", title: "Färgfusion",
      intro: "Slå ihop lika färger och upptäck nya glödande former.", instructions: "Tryck på två likadana brickor. De smälter ihop till nästa nivå. Nå regnbågsstjärnan!", duration: 60,
      tiers: ["🔴", "🟠", "🟡", "🟢", "🔵", "🌈", "⭐"]
    },
    "molnhoppet": {
      mode: "jumper", icon: "☁️", kicker: "SKICKLIGHET · HINDERBANA", title: "Molnhoppet",
      intro: "Studsa uppåt från moln till moln och jaga stjärnor.", instructions: "Håll vänster eller höger för att styra i luften. Figuren hoppar automatiskt när den landar.", duration: 60
    },
    "tornverkstan": {
      mode: "stack", icon: "🏗️", kicker: "SKAPA · TIMING", title: "Tornverkstan",
      intro: "Släpp varje våning rakt och bygg högre än molnen.", instructions: "Tryck SLÄPP när blocket ligger över tornet. Dålig träff gör nästa våning smalare.", duration: 60
    },
    "minimarknaden": {
      mode: "sequence", icon: "🛒", kicker: "FÖRETAGANDE · SERVICE", title: "Minimarknaden",
      intro: "Packa rätt varor, håll tempot och gör kunderna glada.", instructions: "Läs kundens lista och tryck på varorna i exakt samma ordning.", duration: 55,
      orders: [
        [{ e: "🍎", t: "äpple" }, { e: "🥛", t: "mjölk" }],
        [{ e: "🍞", t: "bröd" }, { e: "🧀", t: "ost" }, { e: "🥒", t: "gurka" }],
        [{ e: "🧼", t: "tvål" }, { e: "🧻", t: "papper" }],
        [{ e: "🍌", t: "banan" }, { e: "🥚", t: "ägg" }, { e: "🥕", t: "morot" }, { e: "💧", t: "vatten" }]
      ]
    },
    "myntmatchen": {
      mode: "coins", icon: "🪙", kicker: "EKONOMI · HUVUDRÄKNING", title: "Myntmatchen",
      intro: "Bygg den exakta summan med så få euromynt som möjligt.", instructions: "Tryck på mynten tills summan stämmer. Ångra om du går för långt och lämna sedan betalningen.", duration: 65
    },
    "spargrissprint": {
      mode: "catcher", icon: "🐷", kicker: "EKONOMI · SNABBA VAL", title: "Spargrissprint",
      intro: "Fånga smarta val och undvik sådant som tömmer spargrisen.", instructions: "Flytta spargrisen. Fånga sparmål och genomtänkta val, men låt impulsköpen falla förbi.", duration: 45, player: "🐷",
      pool: [
        { label: "spara", emoji: "🪙", good: true }, { label: "planera", emoji: "📝", good: true }, { label: "jämför", emoji: "⚖️", good: true },
        { label: "impulsköp", emoji: "💥", good: false }, { label: "låna direkt", emoji: "⚡", good: false }, { label: "släng", emoji: "🗑️", good: false }
      ]
    },
    "ideverkstan": {
      mode: "merge", icon: "💡", kicker: "FÖRETAGANDE · BYGG EN IDÉ", title: "Idéverkstan",
      intro: "Kombinera små idéer till en färdig lösning som hjälper någon.", instructions: "Tryck på två likadana steg för att utveckla dem. Nå raketen innan tiden tar slut.", duration: 65,
      tiers: ["💭", "✏️", "🧪", "🛠️", "📦", "🤝", "🚀"]
    },
    "vanskapskompassen": {
      mode: "choice", icon: "🧭", kicker: "KLOKA VAL · EMPATI", title: "Vänskapskompassen",
      intro: "Välj det modiga och omtänksamma nästa steget.", instructions: "Läs situationen och välj det svar som bäst hjälper relationen framåt.", duration: 60, scenarios: true,
      questions: [
        { p: "Någon står ensam på rasten.", a: "Fråga om personen vill vara med", o: ["Gå förbi", "Fråga om personen vill vara med", "Peka och viska", "Vänta på någon annan"] },
        { p: "Du råkade förstöra en kompis bygge.", a: "Berätta, be om ursäkt och hjälp till", o: ["Skyll på någon annan", "Göm bitarna", "Berätta, be om ursäkt och hjälp till", "Låtsas som inget"] },
        { p: "Två personer vill använda samma sak.", a: "Föreslå turordning", o: ["Ta den först", "Föreslå turordning", "Skrik högst", "Gå därifrån med saken"] },
        { p: "En kompis säger något som känns dumt.", a: "Säg lugnt hur det kändes", o: ["Säg något elakare", "Säg lugnt hur det kändes", "Sprid ett rykte", "Knuffas"] },
        { p: "Du ser någon göra ett svårt försök.", a: "Uppmuntra ansträngningen", o: ["Skratta åt misstaget", "Ta över direkt", "Uppmuntra ansträngningen", "Jämför med dig själv"] }
      ]
    },
    "hjalparjakten": {
      mode: "hidden", icon: "🔎", kicker: "KLOKA VAL · UPPTÄCK", title: "Hjälparjakten",
      intro: "Hitta de små handlingarna som gör en stor skillnad.", instructions: "Tryck på tre saker i scenen som visar hjälpsamhet. Varje ny scen blandas om.", duration: 55,
      items: [
        { e: "🧹", t: "sopa tillsammans", good: true }, { e: "🤝", t: "bjuda in", good: true }, { e: "💬", t: "fråga hur det är", good: true },
        { e: "🌱", t: "vattna åt någon", good: true }, { e: "🪑", t: "ställa tillbaka", good: true }, { e: "🙈", t: "låtsas inte se", good: false },
        { e: "👉", t: "skylla ifrån sig", good: false }, { e: "📣", t: "avbryta", good: false }, { e: "🚪", t: "smita först", good: false }
      ]
    },
    "talamodstornet": {
      mode: "timing", icon: "⏳", kicker: "KLOKA VAL · TÅLAMOD", title: "Tålamodstornet",
      intro: "Vänta in rätt ögonblick – snabbast är inte alltid bäst.", instructions: "Markören rör sig fram och tillbaka. Tryck när den är i det gröna lugna fältet.", duration: 50
    },
    "tacksamhetstradet": {
      mode: "catcher", icon: "🌳", kicker: "VÄLMÅENDE · SE DET GODA", title: "Tacksamhetsträdet",
      intro: "Samla fina vardagsögonblick och låt trädet blomma.", instructions: "Flytta korgen och fånga det som är värt att uppskatta. Undvik stressmolnen.", duration: 45, player: "🧺", growth: true,
      pool: [
        { label: "vän", emoji: "🤝", good: true }, { label: "natur", emoji: "🌤️", good: true }, { label: "måltid", emoji: "🍲", good: true },
        { label: "skratt", emoji: "😄", good: true }, { label: "stress", emoji: "🌪️", good: false }, { label: "jämförelse", emoji: "👀", good: false }
      ]
    }
  };

  const id = document.body.dataset.gameId;
  const config = CONFIGS[id];
  if (!config) return;

  const $ = selector => document.querySelector(selector);
  const stage = $("#mixStage");
  const controls = $("#mixControls");
  const overlay = $("#mixOverlay");
  const overlayIcon = $("#overlayIcon");
  const overlayTitle = $("#overlayTitle");
  const overlayText = $("#overlayText");
  const startBtn = $("#startBtn");
  const scoreEl = $("#scoreVal");
  const timeEl = $("#timeVal");
  const bestEl = $("#bestVal");
  const statusEl = $("#mixStatus");
  const soundBtn = $("#soundBtn");
  const BEST_KEY = `spelportal-best-${id}-v1`;
  const state = { score: 0, time: config.duration || 0, best: Number(localStorage.getItem(BEST_KEY) || 0), timers: [], rafs: [], running: false, sound: true };
  let audioContext;

  $("#gameTitle").textContent = config.title;
  $("#gameKicker").textContent = config.kicker;
  $("#gameIntro").textContent = config.intro;
  document.title = `${config.title} · Spelportalen`;
  overlayIcon.textContent = config.icon;
  overlayTitle.textContent = config.title;
  overlayText.textContent = config.instructions;
  bestEl.textContent = state.best;
  timeEl.textContent = config.duration ? `${config.duration}s` : "∞";

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function random(list) { return list[Math.floor(Math.random() * list.length)]; }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function tone(freq = 440, duration = .09, type = "sine", delay = 0) {
    if (!state.sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = audioContext.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(.12, start + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
      osc.connect(gain).connect(audioContext.destination);
      osc.start(start);
      osc.stop(start + duration + .02);
    } catch (_) {}
  }

  function successSound() { tone(523, .08); tone(659, .09, "sine", .08); tone(784, .12, "sine", .16); }
  function failSound() { tone(180, .12, "square"); }
  function vibrate(pattern = 12) { navigator.vibrate?.(pattern); }

  function later(fn, ms) {
    const timer = window.setTimeout(fn, ms);
    state.timers.push({ kind: "timeout", id: timer });
    return timer;
  }

  function every(fn, ms) {
    const timer = window.setInterval(fn, ms);
    state.timers.push({ kind: "interval", id: timer });
    return timer;
  }

  function animate(fn) {
    const loop = now => {
      if (!state.running) return;
      fn(now);
      const raf = requestAnimationFrame(loop);
      state.rafs.push(raf);
    };
    const raf = requestAnimationFrame(loop);
    state.rafs.push(raf);
  }

  function clearRuntime() {
    state.timers.forEach(timer => timer.kind === "interval" ? clearInterval(timer.id) : clearTimeout(timer.id));
    state.rafs.forEach(cancelAnimationFrame);
    state.timers.length = 0;
    state.rafs.length = 0;
  }

  function updateScore(delta, message = "") {
    state.score = Math.max(0, state.score + delta);
    scoreEl.textContent = state.score;
    if (message) setStatus(message);
  }

  function setStatus(message) { statusEl.textContent = message; }

  function toast(message) {
    const old = stage.querySelector(".toast");
    old?.remove();
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    stage.appendChild(el);
    later(() => el.remove(), 850);
  }

  function startCountdown(seconds, onEnd = finish) {
    const started = performance.now();
    state.time = seconds;
    timeEl.textContent = `${seconds}s`;
    every(() => {
      const remaining = Math.max(0, Math.ceil(seconds - (performance.now() - started) / 1000));
      if (remaining !== state.time) {
        state.time = remaining;
        timeEl.textContent = `${remaining}s`;
        if (remaining <= 5 && remaining > 0) tone(290 + (5 - remaining) * 55, .05, "square");
      }
      if (remaining === 0 && state.running) onEnd();
    }, 120);
  }

  function finish(message = "Snyggt spelat!") {
    if (!state.running) return;
    state.running = false;
    clearRuntime();
    if (state.score > state.best) {
      state.best = state.score;
      localStorage.setItem(BEST_KEY, String(state.best));
      bestEl.textContent = state.best;
      message = "Nytt rekord!";
    }
    successSound();
    overlayIcon.textContent = state.score >= 20 ? "🏆" : config.icon;
    overlayTitle.textContent = message;
    overlayText.textContent = `Du fick ${state.score} poäng. Vill du försöka slå det?`;
    startBtn.textContent = "SPELA IGEN";
    overlay.hidden = false;
    document.body.classList.remove("session-active");
  }

  function startGame() {
    clearRuntime();
    state.running = true;
    state.score = 0;
    state.time = config.duration || 0;
    scoreEl.textContent = "0";
    timeEl.textContent = config.duration ? `${config.duration}s` : "∞";
    statusEl.textContent = "";
    stage.replaceChildren();
    controls.replaceChildren();
    overlay.hidden = true;
    document.body.classList.add("session-active");
    const mode = MODES[config.mode];
    mode?.();
  }

  function speak(text) {
    if (window.FrenchSpeech?.speak) window.FrenchSpeech.speak(text, { rate: .86 });
  }

  function makeButton(text, className = "mix-btn") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    return button;
  }

  function choiceMode() {
    let index = 0;
    startCountdown(config.duration);
    const render = () => {
      const q = config.questions[index % config.questions.length];
      stage.innerHTML = `<h2 class="mode-title">${config.scenarios ? "Vad gör du?" : "Hitta rätt: " + q.p}</h2>${config.scenarios ? `<p class="mode-subtitle">${q.p}</p>` : ""}<div class="choice-grid" id="choiceGrid"></div>`;
      const grid = stage.querySelector("#choiceGrid");
      shuffle(q.o).forEach(label => {
        const button = makeButton(label, "choice-card");
        button.addEventListener("click", () => {
          if (!state.running || button.disabled) return;
          grid.querySelectorAll("button").forEach(el => { el.disabled = true; });
          if (label === q.a) {
            button.classList.add("correct");
            updateScore(config.scenarios ? 4 : 3, config.scenarios ? "Ett omtänksamt steg framåt." : "Rätt väg!");
            successSound();
            vibrate();
            if (id === "accentjakten") speak(q.a);
          } else {
            button.classList.add("wrong");
            updateScore(-1, `Nästan – rätt svar är ${q.a}.`);
            failSound();
            [...grid.children].find(el => el.textContent === q.a)?.classList.add("correct");
          }
          index += 1;
          later(render, 760);
        });
        grid.appendChild(button);
      });
    };
    render();
  }

  function sequenceMode() {
    let orderIndex = 0;
    let picked = 0;
    startCountdown(config.duration);
    const render = () => {
      picked = 0;
      const order = config.orders[orderIndex % config.orders.length];
      const stock = shuffle([...order, ...random(config.orders)].slice(0, Math.max(order.length + 2, 5)));
      stage.innerHTML = `<h2 class="mode-title">Beställning ${orderIndex + 1}</h2><div class="order-row">${order.map(item => `<span class="order-token">${item.e}<small>${item.t}</small></span>`).join("")}</div><div class="picked-row" id="pickedRow"><span class="mode-subtitle">Din bricka</span></div><div class="choice-grid" id="stock"></div>`;
      if (config.speakPrompt) speak(order.map(item => item.t).join(", "));
      const pickedRow = stage.querySelector("#pickedRow");
      const stockEl = stage.querySelector("#stock");
      stock.forEach(item => {
        const button = makeButton(`${item.e} ${item.t}`, "choice-card");
        button.addEventListener("click", () => {
          if (!state.running) return;
          const expected = order[picked];
          if (item.e === expected.e && item.t === expected.t) {
            pickedRow.querySelector(".mode-subtitle")?.remove();
            const token = document.createElement("span");
            token.className = "order-token";
            token.textContent = item.e;
            pickedRow.appendChild(token);
            picked += 1;
            tone(500 + picked * 80, .06);
            if (picked === order.length) {
              updateScore(order.length * 2 + 1, "Beställningen är klar!");
              successSound();
              orderIndex += 1;
              later(render, 650);
            }
          } else {
            updateScore(-1, "Fel vara – börja om brickan.");
            failSound();
            later(render, 450);
          }
        });
        stockEl.appendChild(button);
      });
    };
    render();
  }

  function catcherMode() {
    stage.innerHTML = `<div class="catch-lane" id="catchLane"><div class="catch-hint" id="catchHint"></div><div class="catch-player" id="catchPlayer">${config.player}</div>${config.growth ? '<div class="catch-tree" id="catchTree">🌱</div>' : ""}</div>`;
    const lane = stage.querySelector("#catchLane");
    const player = stage.querySelector("#catchPlayer");
    const hint = stage.querySelector("#catchHint");
    let playerX = 50;
    let target = config.targeted ? random(config.pool) : null;
    const falling = [];
    let lastFrame = performance.now();
    let speed = 88;
    const setPlayer = value => {
      playerX = clamp(value, 8, 92);
      player.style.left = `${playerX}%`;
    };
    const updateHint = () => {
      if (!target) {
        hint.textContent = config.growth ? "Fånga fina ögonblick" : "Fånga smarta val";
        return;
      }
      hint.innerHTML = `FÅNGA: ${target.label} 🔊`;
      hint.onclick = () => speak(target.label);
      if (config.speakTarget) speak(target.label);
    };
    updateHint();

    function spawn() {
      let item;
      if (target && Math.random() < .46) item = target;
      else item = random(config.pool);
      const el = document.createElement("div");
      el.className = "catch-item";
      el.textContent = item.emoji;
      el.setAttribute("aria-label", item.label);
      const data = { el, item, x: 8 + Math.random() * 84, y: 38, dead: false };
      el.style.left = `${data.x}%`;
      lane.appendChild(el);
      falling.push(data);
    }

    function resolve(data, caught) {
      if (data.dead) return;
      data.dead = true;
      const good = target ? data.item.label === target.label : data.item.good;
      if (caught && good) {
        updateScore(2, "Fin fångst!");
        tone(660, .08);
        vibrate(8);
        if (target) {
          target = random(config.pool.filter(item => item !== target));
          updateHint();
        }
        if (config.growth) {
          const tree = stage.querySelector("#catchTree");
          tree.textContent = state.score > 17 ? "🌳✨" : state.score > 7 ? "🌳" : "🌱";
          tree.style.transform = `scale(${1 + Math.min(state.score, 25) / 35})`;
        }
      } else if (caught && !good) {
        updateScore(-2, "Hoppsan – låt den falla förbi.");
        failSound();
        vibrate([20, 30, 20]);
      }
      data.el.remove();
    }

    lane.addEventListener("pointerdown", event => {
      const rect = lane.getBoundingClientRect();
      setPlayer((event.clientX - rect.left) / rect.width * 100);
      lane.setPointerCapture?.(event.pointerId);
    });
    lane.addEventListener("pointermove", event => {
      if (!lane.hasPointerCapture?.(event.pointerId)) return;
      const rect = lane.getBoundingClientRect();
      setPlayer((event.clientX - rect.left) / rect.width * 100);
    });
    const left = makeButton("◀ VÄNSTER", "mix-btn alt");
    const right = makeButton("HÖGER ▶", "mix-btn alt");
    left.addEventListener("click", () => setPlayer(playerX - 14));
    right.addEventListener("click", () => setPlayer(playerX + 14));
    controls.append(left, right);
    spawn();
    every(spawn, 780);
    startCountdown(config.duration);
    animate(now => {
      const dt = Math.min(.04, (now - lastFrame) / 1000);
      lastFrame = now;
      speed = Math.min(170, speed + dt * 1.2);
      const height = lane.clientHeight;
      falling.forEach(data => {
        if (data.dead) return;
        data.y += speed * dt;
        data.el.style.transform = `translate(-50%, ${data.y}px) rotate(${data.y * .08}deg)`;
        if (data.y > height - 112 && data.y < height - 40 && Math.abs(data.x - playerX) < 12) resolve(data, true);
        else if (data.y > height) resolve(data, false);
      });
    });
  }

  function reactionMode() {
    stage.innerHTML = `<h2 class="mode-title">Träffa kärnan!</h2><div class="reaction-field" id="reactionField"></div>`;
    const field = stage.querySelector("#reactionField");
    let born = performance.now();
    const place = () => {
      field.replaceChildren();
      const button = makeButton("⚡", "reaction-target");
      const size = Math.max(48, 76 - state.score * .65);
      button.style.width = `${size}px`;
      button.style.height = `${size}px`;
      button.style.left = `${Math.random() * 78}%`;
      button.style.top = `${Math.random() * 72}%`;
      born = performance.now();
      button.addEventListener("click", () => {
        const quick = performance.now() - born < 520;
        updateScore(quick ? 3 : 2, quick ? "BLIXTSNABBT!" : "Träff!");
        tone(540 + state.score * 8, .06, "square");
        vibrate(8);
        place();
      });
      field.appendChild(button);
    };
    place();
    startCountdown(config.duration);
  }

  function movementMode() {
    stage.innerHTML = `<div class="movement-wrap"><div class="movement-card"><div class="movement-orb" id="movementOrb">${config.icon}</div><h2 class="movement-command" id="movementCommand"></h2><p class="mode-subtitle" id="movementHint"></p></div></div>`;
    const orb = stage.querySelector("#movementOrb");
    const command = stage.querySelector("#movementCommand");
    const hint = stage.querySelector("#movementHint");
    if (config.variant === "dance") {
      let moving = true;
      let phaseEnds = performance.now() + 6000;
      let lastTap = 0;
      const beat = makeButton("👏 TAKT", "mix-btn accent");
      controls.appendChild(beat);
      const setPhase = next => {
        moving = next;
        phaseEnds = performance.now() + (moving ? 6000 : 2300);
        command.textContent = moving ? "DANSA!" : "FRYS!";
        hint.textContent = moving ? "Hela kroppen – hitta din egen stil" : "Stå helt stilla…";
        orb.textContent = moving ? random(["🕺", "💃", "🤸", "🪩"]) : "🧊";
        orb.style.background = moving ? "radial-gradient(circle at 35% 25%, white 0 6%, var(--accent) 30%, var(--accent2))" : "linear-gradient(145deg,#bceeff,#3f8fd5)";
        tone(moving ? 620 : 190, .13, moving ? "sine" : "square");
      };
      beat.addEventListener("click", () => {
        const now = performance.now();
        if (now - lastTap < 260) return;
        lastTap = now;
        if (moving) { updateScore(1, "Bra rytm!"); tone(360 + state.score * 5, .045); }
        else { updateScore(-1, "Frys betyder helt stilla!"); failSound(); }
      });
      setPhase(true);
      every(() => { if (performance.now() >= phaseEnds) setPhase(!moving); orb.style.transform = moving ? `scale(${1 + Math.sin(performance.now() / 160) * .08})` : "scale(1)"; }, 100);
    } else {
      const phases = [
        { name: "ANDAS IN", seconds: 4, scale: 1.2, hint: "Lugnt genom näsan" },
        { name: "HÅLL", seconds: 2, scale: 1.2, hint: "Axlarna mjuka" },
        { name: "ANDAS UT", seconds: 6, scale: .72, hint: "Långsamt och mjukt" }
      ];
      let phase = 0;
      let ends = 0;
      const setPhase = () => {
        const item = phases[phase];
        command.textContent = item.name;
        hint.textContent = item.hint;
        orb.style.setProperty("--p", item.scale);
        ends = performance.now() + item.seconds * 1000;
        tone(phase === 0 ? 420 : phase === 1 ? 520 : 330, .12);
      };
      setPhase();
      every(() => {
        if (performance.now() < ends) return;
        phase = (phase + 1) % phases.length;
        if (phase === 0) { updateScore(5, "En pärla för ett lugnt andetag."); orb.textContent = state.score >= 15 ? "🫧🦪" : "🫧"; }
        setPhase();
      }, 100);
    }
    startCountdown(config.duration);
  }

  function balanceMode() {
    stage.innerHTML = `<h2 class="mode-title">Stanna i den gula cirkeln</h2><div class="balance-board" id="balanceBoard"><div class="balance-zone"></div><div class="balance-orb" id="balanceOrb">⚪</div></div>`;
    const board = stage.querySelector("#balanceBoard");
    const orb = stage.querySelector("#balanceOrb");
    let x = .5, y = .5, vx = 0, vy = 0, ax = 0, ay = 0, last = performance.now(), insideMs = 0, lastPoint = 0;
    const setTilt = (nx, ny) => { ax = nx * .42; ay = ny * .42; };
    const buttons = [["←", -1, 0], ["↑", 0, -1], ["↓", 0, 1], ["→", 1, 0]].map(([label, dx, dy]) => {
      const button = makeButton(label, "mix-btn alt");
      button.setAttribute("aria-label", `Luta ${label}`);
      button.addEventListener("pointerdown", event => { setTilt(dx, dy); button.setPointerCapture?.(event.pointerId); });
      ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => button.addEventListener(type, () => setTilt(0, 0)));
      return button;
    });
    controls.append(...buttons);
    board.addEventListener("pointerdown", event => {
      const rect = board.getBoundingClientRect();
      setTilt(((event.clientX - rect.left) / rect.width - .5) * 2, ((event.clientY - rect.top) / rect.height - .5) * 2);
      board.setPointerCapture?.(event.pointerId);
    });
    board.addEventListener("pointermove", event => {
      if (!board.hasPointerCapture?.(event.pointerId)) return;
      const rect = board.getBoundingClientRect();
      setTilt(((event.clientX - rect.left) / rect.width - .5) * 2, ((event.clientY - rect.top) / rect.height - .5) * 2);
    });
    ["pointerup", "pointercancel"].forEach(type => board.addEventListener(type, () => setTilt(0, 0)));
    startCountdown(config.duration);
    animate(now => {
      const dt = Math.min(.035, (now - last) / 1000); last = now;
      const wind = Math.sin(now / 1250) * .08;
      vx = (vx + (ax + wind) * dt) * .994; vy = (vy + (ay + Math.cos(now / 1700) * .06) * dt) * .994;
      x = clamp(x + vx, .06, .94); y = clamp(y + vy, .08, .92);
      if (x <= .061 || x >= .939) vx *= -.7; if (y <= .081 || y >= .919) vy *= -.7;
      orb.style.transform = `translate(calc(${x * 100}% - 26px), calc(${y * 100}% - 26px))`;
      const inside = Math.hypot(x - .5, y - .5) < .14;
      if (inside) insideMs += dt * 1000;
      if (insideMs - lastPoint >= 1000) { lastPoint += 1000; updateScore(2, "Stabilt!"); tone(520, .04); }
    });
  }

  function drawMode() {
    stage.innerHTML = `<h2 class="mode-title">Bana <span id="drawLevel">1</span> av 5</h2><canvas class="draw-canvas" id="drawCanvas" aria-label="Rita en bro från start till mål"></canvas>`;
    const canvas = stage.querySelector("#drawCanvas");
    const ctx = canvas.getContext("2d");
    const levels = [
      [{ x: .42, y: .42, w: .15, h: .23 }],
      [{ x: .27, y: .28, w: .15, h: .3 }, { x: .58, y: .56, w: .16, h: .28 }],
      [{ x: .22, y: .5, w: .18, h: .22 }, { x: .48, y: .22, w: .16, h: .28 }, { x: .7, y: .55, w: .13, h: .22 }],
      [{ x: .3, y: .2, w: .12, h: .5 }, { x: .58, y: .38, w: .12, h: .5 }],
      [{ x: .2, y: .25, w: .15, h: .22 }, { x: .43, y: .47, w: .15, h: .22 }, { x: .68, y: .25, w: .14, h: .3 }]
    ];
    let level = 0, path = [], drawing = false, traveler = -1;
    const resize = () => { const rect = canvas.getBoundingClientRect(); canvas.width = Math.max(300, Math.round(rect.width)); canvas.height = Math.max(220, Math.round(rect.height)); draw(); };
    const point = event => { const rect = canvas.getBoundingClientRect(); return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }; };
    function draw() {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, "#8bddff"); sky.addColorStop(1, "#465cb0"); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(31,83,142,.65)"; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc((i * 97) % w, h * .82, 32, 0, Math.PI * 2); ctx.fill(); }
      levels[level].forEach(r => { ctx.fillStyle = "#5f496f"; ctx.strokeStyle = "#160b29"; ctx.lineWidth = 4; ctx.fillRect(r.x*w,r.y*h,r.w*w,r.h*h); ctx.strokeRect(r.x*w,r.y*h,r.w*w,r.h*h); });
      ctx.fillStyle = "#4ee18b"; ctx.beginPath(); ctx.arc(w*.08,h*.82,15,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.font = "26px system-ui"; ctx.fillText("🏁", w*.88, h*.2);
      if (path.length) { ctx.strokeStyle = "#ffd64d"; ctx.lineWidth = 10; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath(); ctx.moveTo(path[0].x,path[0].y); path.slice(1).forEach(p => ctx.lineTo(p.x,p.y)); ctx.stroke(); }
      if (traveler >= 0 && path[traveler]) { ctx.font = "28px system-ui"; ctx.fillText("🧒", path[traveler].x-14,path[traveler].y+8); }
    }
    function invalidPath() {
      const w=canvas.width,h=canvas.height, start=path[0], end=path[path.length-1];
      if (!start || Math.hypot(start.x-w*.08,start.y-h*.82)>45 || Math.hypot(end.x-w*.9,end.y-h*.16)>60) return true;
      return path.some(p => levels[level].some(r => p.x>r.x*w-7&&p.x<(r.x+r.w)*w+7&&p.y>r.y*h-7&&p.y<(r.y+r.h)*h+7));
    }
    canvas.addEventListener("pointerdown", event => { if (traveler >= 0) return; drawing=true; path=[point(event)]; canvas.setPointerCapture?.(event.pointerId); draw(); });
    canvas.addEventListener("pointermove", event => { if (!drawing) return; const p=point(event); if (!path.length || Math.hypot(p.x-path.at(-1).x,p.y-path.at(-1).y)>5) path.push(p); draw(); });
    canvas.addEventListener("pointerup", () => {
      if (!drawing) return; drawing=false;
      if (invalidPath()) { failSound(); toast("Bron måste gå från grönt till flaggan utan klippor"); later(()=>{path=[];draw();},700); return; }
      traveler=0; successSound();
      const walk=every(()=>{ traveler+=Math.max(1,Math.floor(path.length/35)); draw(); if(traveler>=path.length-1){ clearInterval(walk); updateScore(8+level*2,"Bron håller!"); level+=1; if(level>=levels.length){ finish("Alla broar är klara!"); } else { $("#drawLevel").textContent=level+1; traveler=-1; path=[]; later(draw,450); } } },35);
    });
    const reset=makeButton("↻ RITA OM","mix-btn alt"); reset.addEventListener("click",()=>{path=[];traveler=-1;draw();}); controls.appendChild(reset);
    requestAnimationFrame(resize); window.addEventListener("resize", resize, { passive: true });
  }

  function mergeMode() {
    stage.innerHTML = `<h2 class="mode-title">Nå ${config.tiers.at(-1)}</h2><p class="mode-subtitle">Välj två likadana brickor</p><div class="merge-grid" id="mergeGrid"></div>`;
    const grid = stage.querySelector("#mergeGrid");
    const values = Array.from({length:16},()=>Math.random()<.72?0:1);
    let selected = -1;
    const render = () => {
      grid.replaceChildren();
      values.forEach((value,index)=>{
        const button=makeButton(config.tiers[value],`merge-cell level-${value}`);
        button.setAttribute("aria-label",`Nivå ${value+1}: ${config.tiers[value]}`);
        if(index===selected)button.classList.add("selected");
        button.addEventListener("click",()=>{
          if(selected<0){selected=index;tone(360,.04);render();return;}
          if(selected===index){selected=-1;render();return;}
          if(values[selected]===value){const next=Math.min(config.tiers.length-1,value+1);values[index]=next;values[selected]=Math.random()<.78?0:1;selected=-1;updateScore((next+1)*2,"Fusion!");successSound();if(next===config.tiers.length-1)finish("Du nådde mästarnivån!");else render();}
          else{failSound();toast("Välj två likadana");selected=index;render();}
        });grid.appendChild(button);
      });
    };
    render(); startCountdown(config.duration);
  }

  function jumperMode() {
    stage.innerHTML = `<h2 class="mode-title">Hoppa högre!</h2><canvas class="jump-canvas" id="jumpCanvas" aria-label="Molnhoppets spelplan"></canvas>`;
    const canvas=stage.querySelector("#jumpCanvas"),ctx=canvas.getContext("2d"); let W,H,dir=0,last=performance.now();
    const player={x:80,y:0,vx:0,vy:-420,r:15}; let platforms=[];
    const resize=()=>{const r=canvas.getBoundingClientRect();W=canvas.width=Math.max(300,Math.round(r.width));H=canvas.height=Math.max(240,Math.round(r.height));player.y ||= H-70; if(!platforms.length){platforms=[{x:30,y:H-35,w:120}];for(let i=1;i<9;i++)platforms.push({x:20+Math.random()*(W-120),y:H-35-i*62,w:80+Math.random()*45});}};
    const setDir=value=>{dir=value;};
    [["◀",-1],["▶",1]].forEach(([label,value])=>{const b=makeButton(label,"mix-btn alt");b.setAttribute("aria-label",value<0?"Styr vänster":"Styr höger");b.addEventListener("pointerdown",e=>{setDir(value);b.setPointerCapture?.(e.pointerId)});["pointerup","pointercancel","lostpointercapture"].forEach(t=>b.addEventListener(t,()=>setDir(0)));controls.appendChild(b);});
    canvas.addEventListener("pointerdown",e=>{const r=canvas.getBoundingClientRect();setDir(e.clientX<r.left+r.width/2?-1:1);canvas.setPointerCapture?.(e.pointerId)});["pointerup","pointercancel"].forEach(t=>canvas.addEventListener(t,()=>setDir(0)));
    requestAnimationFrame(resize); startCountdown(config.duration);
    animate(now=>{if(!W)return;const dt=Math.min(.03,(now-last)/1000);last=now;player.vx+=(dir*620-player.vx*5)*dt;player.vy+=920*dt;const oldY=player.y;player.x+=player.vx*dt;player.y+=player.vy*dt;if(player.x<-player.r)player.x=W+player.r;if(player.x>W+player.r)player.x=-player.r;
      if(player.vy>0)for(const p of platforms){if(oldY+player.r<=p.y&&player.y+player.r>=p.y&&player.x>p.x-player.r&&player.x<p.x+p.w+player.r){player.y=p.y-player.r;player.vy=-470;updateScore(2,"Boing!");tone(520,.04);break;}}
      if(player.y<H*.38&&player.vy<0){const shift=(H*.38-player.y);player.y=H*.38;platforms.forEach(p=>p.y+=shift);platforms=platforms.filter(p=>p.y<H+40);while(platforms.length<9){const top=Math.min(...platforms.map(p=>p.y));platforms.push({x:15+Math.random()*(W-115),y:top-58-Math.random()*18,w:72+Math.random()*55});}}
      if(player.y>H+40){finish("Du föll – men nådde högt!");return;}
      ctx.clearRect(0,0,W,H);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#645ee8");g.addColorStop(1,"#65d9f3");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.fillStyle="#fff";ctx.strokeStyle="#130b2b";ctx.lineWidth=3;platforms.forEach(p=>{ctx.beginPath();ctx.roundRect(p.x,p.y,p.w,18,9);ctx.fill();ctx.stroke();});ctx.font="27px system-ui";ctx.fillText("🧒",player.x-15,player.y+12);});
  }

  function stackMode() {
    stage.innerHTML=`<h2 class="mode-title">Bygg 12 våningar</h2><div class="stack-zone" id="stackZone"></div>`;const zone=stage.querySelector("#stackZone");let width=.56,left=.22,y=0,direction=1,last=performance.now(),fixed=[];let current=document.createElement("div");
    const buildCurrent=()=>{current=document.createElement("div");current.className="stack-block";current.style.width=`${width*100}%`;current.style.bottom=`${30+fixed.length*29}px`;zone.appendChild(current);};buildCurrent();
    const drop=()=>{if(!state.running)return;const previous=fixed.at(-1)||{left:.22,width:.56};const overlapLeft=Math.max(left,previous.left),overlapRight=Math.min(left+width,previous.left+previous.width),overlap=overlapRight-overlapLeft;if(overlap<.055){failSound();finish("Tornet välte!");return;}width=overlap;left=overlapLeft;current.style.left=`${left*100}%`;current.style.width=`${width*100}%`;fixed.push({left,width,el:current});updateScore(3,"Stadigt!");tone(420+fixed.length*25,.06);if(fixed.length>=12){finish("Tornet når molnen!");return;}buildCurrent();};
    const button=makeButton("SLÄPP!","mix-btn accent");button.addEventListener("click",drop);controls.appendChild(button);zone.addEventListener("pointerdown",drop);startCountdown(config.duration);animate(now=>{const dt=Math.min(.04,(now-last)/1000);last=now;left+=direction*(.28+fixed.length*.012)*dt;if(left<0){left=0;direction=1;}if(left+width>1){left=1-width;direction=-1;}current.style.left=`${left*100}%`;});
  }

  function timingMode() {
    stage.innerHTML=`<h2 class="mode-title">Vänta in grönt</h2><div class="patience-track"><div class="patience-sweet"></div><div class="patience-marker" id="marker"></div></div><div class="patience-tower" id="patienceTower"></div>`;const marker=stage.querySelector("#marker"),tower=stage.querySelector("#patienceTower");let position=0,direction=1,last=performance.now(),streak=0;
    const stop=()=>{const good=position>=.41&&position<=.59;if(good){streak++;updateScore(3+Math.min(streak,3),streak>1?`Tålmodighetskombo ×${streak}!`:"Precis rätt ögonblick!");tower.textContent="🧱".repeat(Math.floor(Math.min(12,state.score/3)));successSound();}else{streak=0;updateScore(-1,"Lite för tidigt eller sent – försök igen.");failSound();}position=direction>0?0:1;};
    const button=makeButton("NU!","mix-btn accent");button.addEventListener("click",stop);controls.appendChild(button);startCountdown(config.duration);animate(now=>{const dt=Math.min(.04,(now-last)/1000);last=now;position+=direction*.52*dt;if(position>=1){position=1;direction=-1;}if(position<=0){position=0;direction=1;}marker.style.left=`calc(${position*100}% - 7px)`;});
  }

  function coinsMode() {
    const coins=[1,2,5,10,20,50,100,200];let target=0,total=0,used=[];
    const newRound=()=>{target=random([7,12,18,24,37,45,63,85,120,175,230,340]);total=0;used=[];render();};
    const money=cents=>cents<100?`${cents} c`:`${(cents/100).toFixed(cents%100?2:0).replace(".",",")} €`;
    const render=()=>{stage.innerHTML=`<h2 class="mode-title">Betala exakt</h2><div class="coin-target">${money(target)}</div><div class="coin-total">${used.length?used.map(money).join(" + "):"0 €"}<br><small>= ${money(total)}</small></div><div class="coin-bank" id="coinBank"></div>`;const bank=stage.querySelector("#coinBank");coins.forEach(value=>{const b=makeButton(money(value),"mix-btn coin-btn");b.addEventListener("click",()=>{used.push(value);total+=value;tone(400+value,.04);render();});bank.appendChild(b);});};
    const undo=makeButton("↶ ÅNGRA","mix-btn alt"),pay=makeButton("BETALA","mix-btn accent");undo.addEventListener("click",()=>{total-=used.pop()||0;render();});pay.addEventListener("click",()=>{if(total===target){updateScore(Math.max(3,10-used.length),"Exakt betalt!");successSound();newRound();}else{updateScore(-1,total>target?"För mycket – ta bort ett mynt.":"Det saknas lite till.");failSound();}});controls.append(undo,pay);newRound();startCountdown(config.duration);
  }

  function hiddenMode() {
    let found=0,round=1;startCountdown(config.duration);
    const render=()=>{found=0;stage.innerHTML=`<h2 class="mode-title">Scen ${round}: hitta tre hjälpande val</h2><div class="hidden-scene" id="hiddenScene"></div>`;const scene=stage.querySelector("#hiddenScene");shuffle(config.items).forEach(item=>{const b=makeButton("","scene-item");b.innerHTML=`<b>${item.e}</b>${item.t}`;b.addEventListener("click",()=>{if(b.disabled)return;if(item.good){b.disabled=true;b.classList.add("found");found++;updateScore(3,"Där gjorde du skillnad!");tone(620,.06);if(found===3){round++;successSound();later(render,650);}}else{b.classList.add("miss");updateScore(-1,"Det finns ett mer hjälpsamt val.");failSound();later(()=>b.classList.remove("miss"),350);}});scene.appendChild(b);});};render();
  }

  const MODES = { choice: choiceMode, sequence: sequenceMode, catcher: catcherMode, reaction: reactionMode, movement: movementMode, balance: balanceMode, draw: drawMode, merge: mergeMode, jumper: jumperMode, stack: stackMode, timing: timingMode, coins: coinsMode, hidden: hiddenMode };

  startBtn.addEventListener("click", startGame);
  soundBtn.addEventListener("click", () => { state.sound = !state.sound; soundBtn.textContent = state.sound ? "🔊" : "🔇"; soundBtn.setAttribute("aria-label", state.sound ? "Stäng av ljud" : "Slå på ljud"); if (state.sound) tone(520, .06); });
})();
