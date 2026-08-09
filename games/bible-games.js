(() => {
  "use strict";

  const CONFIGS = {
    "barmhartighetsresan": {
      mode: "mercy", icon: "🫶", title: "Barmhärtighetsresan", kicker: "BIBELN · SE OCH HJÄLP",
      intro: "Ta dig fram längs vägen genom att upptäcka vem som behöver din hjälp.",
      instructions: "Fem vardagssituationer väntar. Välj den handling som visar verklig barmhärtighet – inte bara goda ord.",
      source: "Lukas 10:25–37", url: "https://www.bible.com/sv/bible/916/LUK.10.NUB",
      questions: [
        { p: "En ny elev står ensam när lagen väljs.", a: "Gå fram, fråga vad personen heter och bjud in", o: ["Vänta tills någon annan gör något", "Gå fram, fråga vad personen heter och bjud in"] },
        { p: "Någon tappar sina saker i trappan och du har bråttom.", a: "Stanna, plocka upp och fråga om mer hjälp behövs", o: ["Ropa att någon borde hjälpa", "Stanna, plocka upp och fråga om mer hjälp behövs"] },
        { p: "En kompis har blivit ledsen efter ett misstag.", a: "Sätt dig bredvid, lyssna och stanna kvar en stund", o: ["Säg snabbt att det nog går över", "Sätt dig bredvid, lyssna och stanna kvar en stund"] },
        { p: "Du ser att någon inte har någon matsäck.", a: "Dela det du kan och gör det utan att visa upp dig", o: ["Berätta för alla att personen glömde", "Dela det du kan och gör det utan att visa upp dig"] },
        { p: "En person utanför din vanliga grupp behöver hjälp.", a: "Hjälp ändå – medmänniskan är viktigare än gruppen", o: ["Hjälp bara om ni redan känner varandra", "Hjälp ändå – medmänniskan är viktigare än gruppen"] }
      ]
    },
    "bygg-pa-klippan": {
      mode: "builder", icon: "🏠", title: "Bygg på klippan", kicker: "BIBELN · HÖR OCH GÖR",
      intro: "Bygg ett hus som håller när regnet, vinden och vardagen prövar det.",
      instructions: "Välj handlingen som omsätter Jesu undervisning i praktiken. Varje klokt val bygger en stadig våning.",
      source: "Matteus 7:24–27", url: "https://www.bible.com/sv/bible/916/MAT.7.NUB",
      questions: [
        { p: "Du hör att man ska förlåta. Vad bygger stabilt?", a: "Ta första steget till att reda ut det", o: ["Hålla fast vid att du vann", "Ta första steget till att reda ut det"] },
        { p: "Du vet att sanningen är viktig.", a: "Berätta ärligt även när det kostar", o: ["Dölj det tills ingen frågar", "Berätta ärligt även när det kostar"] },
        { p: "Du lär dig att älska din medmänniska.", a: "Gör plats för den som lätt glöms bort", o: ["Tyck att principen låter fin", "Gör plats för den som lätt glöms bort"] },
        { p: "Du hör att man inte ska döma snabbt.", a: "Fråga och lyssna innan du bestämmer dig", o: ["Gissa varför personen gjorde så", "Fråga och lyssna innan du bestämmer dig"] },
        { p: "Du vet att givmildhet är gott.", a: "Dela konkret med den som behöver", o: ["Planera att kanske göra det senare", "Dela konkret med den som behöver"] },
        { p: "Du har hört hur Jesus vill att vi lever.", a: "Öva ett litet steg redan idag", o: ["Samla fler råd utan att börja", "Öva ett litet steg redan idag"] }
      ]
    },
    "andens-frukttradgard": {
      mode: "fruit", icon: "🌿", title: "Andens fruktträdgård", kicker: "BIBELN · VÄX I VARDAGEN",
      intro: "Känn igen nio sätt som Andens frukt kan märkas i verkliga situationer.",
      instructions: "Läs situationen och välj den del av Andens frukt som handlingen bäst visar. Odla hela trädgården.",
      source: "Galaterbrevet 5:22–23", url: "https://www.bible.com/sv/bible/916/GAL.5.NUB",
      fruits: [
        ["kärlek","❤️"],["glädje","☀️"],["frid","🕊️"],["tålamod","⏳"],["vänlighet","🌼"],
        ["godhet","🍯"],["trofasthet","🧭"],["mildhet","🪶"],["självbehärskning","🛡️"]
      ],
      questions: [
        { p: "Du gör gott för någon utan att kräva något tillbaka.", a: "kärlek" },
        { p: "Du kan uppskatta det goda även när dagen inte är perfekt.", a: "glädje" },
        { p: "Du söker försoning i stället för att driva konflikten vidare.", a: "frid" },
        { p: "Du väntar lugnt medan någon lär sig i sin egen takt.", a: "tålamod" },
        { p: "Du möter den nya personen med värme och omtanke.", a: "vänlighet" },
        { p: "Du väljer det som är rätt och hjälper den utsatta.", a: "godhet" },
        { p: "Du håller det du lovat även när ingen kontrollerar dig.", a: "trofasthet" },
        { p: "Du rättar någon varsamt i stället för att trycka ner.", a: "mildhet" },
        { p: "Du pausar och väljer klokt när impulsen vill styra.", a: "självbehärskning" }
      ]
    },
    "ord-som-bygger": {
      mode: "words", icon: "💬", title: "Ord som bygger", kicker: "BIBELN · LYSSNA FÖRST",
      intro: "Sänk temperaturen i samtalet genom att lyssna, pausa och svara uppbyggligt.",
      instructions: "Håll in LYSSNA tills mätaren är full. Vänta sedan in pausen och välj det svar som hjälper den andre.",
      source: "Ordspråksboken 15:1 · Efesierbrevet 4:29 · Jakobsbrevet 1:19", url: "https://www.bible.com/sv/bible/916/EPH.4.NUB",
      questions: [
        { p: "Du lyssnar ju aldrig på min idé!", a: "Berätta mer – vilken del vill du att jag ska förstå?", o: ["Det där är inte sant, du lyssnar aldrig själv!", "Berätta mer – vilken del vill du att jag ska förstå?"] },
        { p: "Det där blev faktiskt inte särskilt bra.", a: "Tack för att du säger det. Vad kan jag förbättra?", o: ["Gör det bättre själv då!", "Tack för att du säger det. Vad kan jag förbättra?"] },
        { p: "Jag vill inte vara med längre.", a: "Jag hör att något känns fel. Vill du berätta?", o: ["Okej, gå då.", "Jag hör att något känns fel. Vill du berätta?"] },
        { p: "Du glömde det du lovade igen.", a: "Du har rätt. Förlåt – jag vill göra det rätt nu.", o: ["Du glömmer också saker.", "Du har rätt. Förlåt – jag vill göra det rätt nu."] },
        { p: "Ingen frågade vad jag tyckte.", a: "Det borde vi ha gjort. Vad tänker du?", o: ["Det var för sent ändå.", "Det borde vi ha gjort. Vad tänker du?"] },
        { p: "Jag är arg och vill vara ifred.", a: "Jag respekterar det. Jag finns här när du vill prata.", o: ["Sluta överdriva och svara nu.", "Jag respekterar det. Jag finns här när du vill prata."] }
      ]
    }
  };

  const id = document.body.dataset.gameId;
  const config = CONFIGS[id];
  if (!config) return;
  const $ = selector => document.querySelector(selector);
  const stage = $("#bibleStage");
  const overlay = $("#bibleOverlay");
  const status = $("#bibleStatus");
  const scoreEl = $("#scoreVal");
  const stepEl = $("#stepVal");
  const bestEl = $("#bestVal");
  const sourceLink = $("#sourceLink");
  const state = { index: 0, score: 0, locked: false, sound: true, best: Number(localStorage.getItem(`spelportal-best-${id}-v1`) || 0) };
  let audioContext;

  $("#gameTitle").textContent = config.title;
  $("#gameKicker").textContent = config.kicker;
  $("#gameIntro").textContent = config.intro;
  $("#overlayIcon").textContent = config.icon;
  $("#overlayTitle").textContent = config.title;
  $("#overlayText").textContent = config.instructions;
  sourceLink.textContent = config.source;
  sourceLink.href = config.url;
  document.title = `${config.title} · Spelportalen`;
  bestEl.textContent = state.best;

  function tone(freq = 520, delay = 0) {
    if (!state.sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = audioContext.currentTime + delay;
      oscillator.frequency.value = freq;
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(.1, start + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, start + .12);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(start); oscillator.stop(start + .14);
    } catch (_) {}
  }
  function goodSound() { tone(523); tone(659, .08); tone(784, .16); }
  function badSound() { tone(180); }
  function shuffle(list) { return [...list].sort(() => Math.random() - .5); }
  function updateHud() { scoreEl.textContent = state.score; stepEl.textContent = `${Math.min(state.index + 1, config.questions.length)}/${config.questions.length}`; }
  function disableChoices() { stage.querySelectorAll("button").forEach(button => { button.disabled = true; }); }
  function finish() {
    state.best = Math.max(state.best, state.score);
    localStorage.setItem(`spelportal-best-${id}-v1`, state.best);
    bestEl.textContent = state.best;
    $("#overlayIcon").textContent = state.score === config.questions.length ? "🌟" : "🌱";
    $("#overlayTitle").textContent = state.score === config.questions.length ? "Hela principen levde!" : "Bra tränat!";
    $("#overlayText").textContent = `${state.score} av ${config.questions.length} kloka val. Bibeln blir ett bättre lager på livet när kunskap får bli handling.`;
    $("#startBtn").textContent = "SPELA IGEN";
    overlay.hidden = false;
    document.body.classList.remove("session-active");
  }
  function advance() {
    state.index += 1;
    if (state.index >= config.questions.length) return finish();
    updateHud();
    render();
  }
  function choose(button, correct) {
    if (state.locked) return;
    state.locked = true;
    disableChoices();
    button.classList.add(correct ? "correct" : "wrong");
    if (correct) { state.score += 1; goodSound(); status.textContent = "Bra – du gjorde principen konkret."; }
    else { badSound(); status.textContent = "Nästan. Leta efter handlingen som faktiskt hjälper."; }
    updateHud();
    window.setTimeout(() => { state.locked = false; advance(); }, 850);
  }
  function choiceButtons(question, onChoose) {
    const grid = document.createElement("div");
    grid.className = "choice-grid";
    shuffle(question.o).forEach(option => {
      const button = document.createElement("button");
      button.type = "button"; button.className = "choice"; button.textContent = option;
      button.addEventListener("click", () => onChoose(button, option === question.a));
      grid.append(button);
    });
    return grid;
  }
  function heading(question) {
    const fragment = document.createDocumentFragment();
    const title = document.createElement("h2"); title.className = "scene-title"; title.textContent = `Situation ${state.index + 1}`;
    const copy = document.createElement("p"); copy.className = "scene-copy"; copy.textContent = question.p;
    fragment.append(title, copy); return fragment;
  }

  function renderMercy() {
    const question = config.questions[state.index];
    const road = document.createElement("div"); road.className = "mercy-road";
    road.innerHTML = `<span class="traveler" style="--road:${5 + state.index * 18}%">🚶</span><span class="mercy-token">🤝</span>`;
    stage.append(road, heading(question), choiceButtons(question, choose));
  }
  function renderBuilder() {
    const question = config.questions[state.index];
    const area = document.createElement("div"); area.className = "build-area";
    const widths = Array.from({ length: state.score }, (_, index) => `<div class="tower-block" style="width:${150 + index * 13}px"></div>`).join("");
    area.innerHTML = `<div class="storm"></div><div class="tower">${widths}</div><div class="foundation">BERGGRUND</div>`;
    stage.append(area, heading(question), choiceButtons(question, (button, correct) => {
      area.querySelector(".storm").classList.add("active"); choose(button, correct);
    }));
  }
  function renderFruit() {
    const question = config.questions[state.index];
    stage.append(heading(question));
    const garden = document.createElement("div"); garden.className = "fruit-garden";
    config.fruits.forEach(([name, emoji], fruitIndex) => {
      const button = document.createElement("button"); button.type = "button"; button.className = "fruit-choice";
      if (fruitIndex < state.index && config.questions.slice(0, state.index).some(item => item.a === name)) button.classList.add("grown");
      button.innerHTML = `<b aria-hidden="true">${emoji}</b><span>${name}</span>`;
      button.addEventListener("click", () => choose(button, name === question.a));
      garden.append(button);
    });
    stage.append(garden);
  }
  function renderWords() {
    const question = config.questions[state.index];
    stage.append(heading({ p: "Den andre säger:" }));
    const bubble = document.createElement("div"); bubble.className = "speech-bubble"; bubble.textContent = `“${question.p}”`;
    const meter = document.createElement("div"); meter.className = "listen-meter"; meter.innerHTML = '<div class="listen-fill"></div>';
    const action = document.createElement("div"); action.className = "listen-action";
    const listen = document.createElement("button"); listen.type = "button"; listen.className = "bible-btn"; listen.textContent = "HÅLL IN · LYSSNA";
    const choices = choiceButtons(question, choose); choices.hidden = true;
    let timer = 0; let progress = 0;
    const stop = () => { window.clearInterval(timer); timer = 0; if (progress < 100) { progress = 0; meter.firstElementChild.style.width = "0"; } };
    const start = event => {
      event.preventDefault(); if (timer || progress >= 100) return;
      timer = window.setInterval(() => {
        progress += 5; meter.firstElementChild.style.width = `${progress}%`;
        if (progress >= 100) {
          stop(); listen.disabled = true; listen.textContent = "PAUSA…"; status.textContent = "Bra. En kort paus ger plats för ett mjukt svar.";
          window.setTimeout(() => { listen.textContent = "NU KAN DU SVARA"; choices.hidden = false; goodSound(); }, 900);
        }
      }, 70);
    };
    listen.addEventListener("pointerdown", start); listen.addEventListener("pointerup", stop); listen.addEventListener("pointercancel", stop); listen.addEventListener("lostpointercapture", stop);
    action.append(listen); stage.append(bubble, meter, action, choices);
  }
  function render() {
    stage.replaceChildren(); status.textContent = "";
    ({ mercy: renderMercy, builder: renderBuilder, fruit: renderFruit, words: renderWords })[config.mode]();
  }
  function start() {
    state.index = 0; state.score = 0; state.locked = false;
    overlay.hidden = true; document.body.classList.add("session-active");
    updateHud(); render();
  }

  $("#startBtn").addEventListener("click", start);
  $("#soundBtn").addEventListener("click", event => {
    state.sound = !state.sound; event.currentTarget.textContent = state.sound ? "🔊" : "🔇";
    event.currentTarget.setAttribute("aria-label", state.sound ? "Stäng av ljud" : "Slå på ljud");
  });
  updateHud();
})();
