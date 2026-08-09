(() => {
  "use strict";
  const BOOKS = [
    ["1 Moseboken","GEN",50,"Gud skapar, människan faller och förbundslöftet tar form genom patriarkerna.","skapelse, fall, löfte och förbund"],
    ["2 Moseboken","EXO",40,"Gud befriar Israel ur slaveriet och formar ett förbundsfolk.","befrielse, påsk, lag och tabernakel"],
    ["3 Moseboken","LEV",27,"Israel lär sig om helighet, tillbedjan, offer och ett helgat liv.","helighet och vägen att närma sig Gud"],
    ["4 Moseboken","NUM",36,"Ökenvandringen visar både folkets otro och Guds trofasthet.","prövning, uppror och trofast ledning"],
    ["5 Moseboken","DEU",34,"Förbundet och lagen upprepas inför livet i det utlovade landet.","minnas, älska Gud och välja liv"],
    ["Josua","JOS",24,"Israel går in i landet och ställs inför valet att tjäna Gud troget.","löftets land, mod och trohet"],
    ["Domarboken","JDG",21,"En återkommande spiral av avfall, förtryck, rop och räddning.","behovet av trofast ledarskap"],
    ["Rut","RUT",4,"Trofast kärlek och återlösning bär en utsatt familj mot nytt hopp.","lojalitet, omsorg och återlösning"],
    ["1 Samuelsboken","1SA",31,"Israel går från domare till kungadöme medan hjärtats trohet prövas.","Samuel, Saul och Davids framväxt"],
    ["2 Samuelsboken","2SA",24,"Davids kungadöme rymmer förbundslöfte, segrar, synd och konsekvenser.","kungen, löftet och behovet av nåd"],
    ["1 Kungaboken","1KI",22,"Templet byggs, riket delas och kungarnas trohet bedöms.","Salomo, delningen och profetrösten"],
    ["2 Kungaboken","2KI",25,"Båda rikena faller efter långvarig otro, trots profeternas varningar.","avfall, varning och exil"],
    ["1 Krönikeboken","1CH",29,"Israels historia återberättas med fokus på David, tillbedjan och templet.","förbundslinjen och förberedelsen för templet"],
    ["2 Krönikeboken","2CH",36,"Judas kungar och templet står i centrum fram till exilen och hoppets öppning.","sök Gud, reform, dom och återkomst"],
    ["Esra","EZR",10,"Exilfolket återvänder, bygger templet och återupprättar livet kring Guds ord.","återkomst, tempel och förnyelse"],
    ["Nehemja","NEH",13,"Jerusalems murar byggs upp samtidigt som folket förnyar sitt förbund.","bön, uthålligt ledarskap och reform"],
    ["Ester","EST",10,"Guds folk räddas från utplåning genom mod och oväntade vändningar.","försyn, mod och räddning"],
    ["Job","JOB",42,"En lidande rättfärdig brottas med enkla svar och möter Guds storhet.","lidande, vishet och ödmjuk tillit"],
    ["Psaltaren","PSA",150,"Böner och sånger ger språk för lovsång, klagan, tillit och hopp.","ärlig bön i hela livets register"],
    ["Ordspråksboken","PRO",31,"Vishet börjar i vördnad för Gud och formas i vardagens val.","ord, arbete, relationer och klok karaktär"],
    ["Predikaren","ECC",12,"Livet under solen prövas och får mening i relation till Gud.","förgänglighet, gåvor och gudsfruktan"],
    ["Höga visan","SNG",8,"Poetiska sånger firar trogen och ömsesidig kärlek.","kärlekens glädje, längtan och trohet"],
    ["Jesaja","ISA",66,"Dom över synd förenas med stort hopp om tröst, tjänaren och ny skapelse.","Guds helighet, Messias och framtidshopp"],
    ["Jeremia","JER",52,"Profeten varnar Juda men pekar också mot ett nytt förbund.","dom, hjärtats förnyelse och hopp"],
    ["Klagovisorna","LAM",5,"Jerusalems fall sörjs i böner som ändå söker Guds barmhärtighet.","klagan, bekännelse och hopp mitt i ruiner"],
    ["Hesekiel","EZK",48,"I exilen visar syner både dom, Guds närvaro och löftet om upprättelse.","nytt hjärta, ny herde och återupprättelse"],
    ["Daniel","DAN",12,"Trofasthet i exil möter syner om Guds herravälde över rikena.","mod, bön och Guds slutliga rike"],
    ["Hosea","HOS",14,"Profetens äktenskap speglar Guds trofasta kärlek till ett otroget folk.","otrohet, omvändelse och trofast kärlek"],
    ["Joel","JOL",3,"En katastrof blir kallelse till omvändelse och hopp om Andens utgjutande.","Herrens dag, återvändande och Anden"],
    ["Amos","AMO",9,"Gud förkastar tom religion när rättvisa och rättfärdighet saknas.","social rättvisa, dom och upprättelse"],
    ["Obadja","OBA",1,"Edom döms för högmod och våld mot sitt broderfolk.","högmodets fall och Guds rättvisa"],
    ["Jona","JON",4,"En motvillig profet möter Guds barmhärtighet mot en främmande stad.","omvändelse och Guds medlidande"],
    ["Mika","MIC",7,"Dom över orättvisa balanseras av hopp om en kommande härskare och förlåtelse.","rätt, barmhärtighet och ödmjuk vandring"],
    ["Nahum","NAM",3,"Nineves fall förkunnas som rättvis dom över brutalt förtryck.","Guds rättvisa mot våldsmakt"],
    ["Habackuk","HAB",3,"Profeten frågar om ondskan och lär sig leva i trofast tillit.","ärliga frågor, tro och glädje i Gud"],
    ["Sefanja","ZEP",3,"Herrens dag innebär dom men också rening, glädje och återupprättelse.","ödmjukhet, dom och Guds glädje"],
    ["Haggai","HAG",2,"Det återvända folket uppmanas att prioritera återuppbyggnaden av templet.","rätt prioriteringar och Guds närvaro"],
    ["Sakarja","ZEC",14,"Syner uppmuntrar tempelbygget och pekar mot den kommande kungen.","rening, hopp och Guds kung"],
    ["Malaki","MAL",4,"Gud avslöjar slentrian och kallar folket till trofast tillbedjan.","trohet, rättvisa och den kommande budbäraren"],
    ["Matteusevangeliet","MAT",28,"Jesus presenteras som Messias och kung som uppfyller Skrifterna.","rikets undervisning, kors och uppståndelse"],
    ["Markusevangeliet","MRK",16,"Jesus handlar med auktoritet och ger sitt liv som den tjänande Messias.","lärjungaskap, tjänande och korset"],
    ["Lukasevangeliet","LUK",24,"Jesus för med sig räddning till de förbisedda och fullbordar Guds plan.","bön, Anden, glädje och omsorg om utsatta"],
    ["Johannesevangeliet","JHN",21,"Tecken och samtal visar vem Jesus är och kallar till tro och liv.","Jesus identitet, tro, kärlek och liv"],
    ["Apostlagärningarna","ACT",28,"Den heliga Anden driver evangeliet från Jerusalem ut till folken.","Andens kraft, vittnesbörd och församling"],
    ["Romarbrevet","ROM",16,"Evangeliet visar Guds rättfärdighet och formar ett förvandlat folk.","synd, nåd, tro och ett nytt liv"],
    ["1 Korinthierbrevet","1CO",16,"En splittrad församling vägleds om helighet, kärlek, gåvor och uppståndelse.","korset, enhet, kärlek och kroppens uppståndelse"],
    ["2 Korinthierbrevet","2CO",13,"Apostoliskt ledarskap visas genom svaghet, försoning och generositet.","Guds kraft i svaghet"],
    ["Galaterbrevet","GAL",6,"Människan förklaras rättfärdig genom tro och får leva i Andens frihet.","nåd, frihet och Andens frukt"],
    ["Efesierbrevet","EPH",6,"I Kristus skapar Gud ett enat folk som lever i kärlek och mognad.","ny identitet, enhet och andlig rustning"],
    ["Filipperbrevet","PHP",4,"Glädje, ödmjukhet och uthållighet växer ur livet i Kristus.","Kristi sinnelag och glädje i alla lägen"],
    ["Kolosserbrevet","COL",4,"Kristus står över allt och det nya livet formas kring honom.","Kristi överhöghet och den nya människan"],
    ["1 Thessalonikerbrevet","1TH",5,"En ung församling uppmuntras i helighet, hopp och väntan på Jesus.","trofast vardag och uppståndelsehopp"],
    ["2 Thessalonikerbrevet","2TH",3,"Församlingen får stadga kring Herrens dag och trofast arbete.","uthållighet, urskiljning och ansvar"],
    ["1 Timotheosbrevet","1TI",6,"Undervisning, ledarskap och omsorg ordnas i Guds hushåll.","sund lära och mogen församlingskultur"],
    ["2 Timotheosbrevet","2TI",4,"En erfaren apostel uppmanar sin medarbetare att bevara och förkunna evangeliet.","trofasthet, Skriften och uthållighet"],
    ["Titusbrevet","TIT",3,"Sund lära ska synas i god karaktär och goda gärningar.","nåd som formar ett gott liv"],
    ["Filemonbrevet","PHM",1,"Evangeliet omformar en ojämlik relation till syskonskap och försoning.","förlåtelse, värdighet och frivillig kärlek"],
    ["Hebreerbrevet","HEB",13,"Jesus är den fullkomlige översteprästen och det nya förbundet är bättre.","trofast uthållighet och tillträde till Gud"],
    ["Jakobsbrevet","JAS",5,"Äkta tro blir synlig i handling, ord, uthållighet och omsorg.","praktisk vishet och en verksam tro"],
    ["1 Petrusbrevet","1PE",5,"Kristna i motvind kallas till heligt hopp och gott vittnesbörd.","hopp, lidande och trofast liv"],
    ["2 Petrusbrevet","2PE",3,"Församlingen varnas för villolära och uppmanas växa i nåd.","sanning, karaktär och Herrens återkomst"],
    ["1 Johannesbrevet","1JN",5,"Visshet om livet med Gud syns i sann tro, kärlek och lydnad.","ljus, kärlek och trygg tro"],
    ["2 Johannesbrevet","2JN",1,"Sanning och kärlek ska hållas ihop med vaksamhet.","vandra i kärlek utan att släppa sanningen"],
    ["3 Johannesbrevet","3JN",1,"Gästfrihet och trofast tjänst ställs mot maktbegär.","stöd sanningen och efterlikna det goda"],
    ["Judasbrevet","JUD",1,"De troende kallas att kämpa för tron och visa barmhärtighet med urskiljning.","bevara tron och hjälp dem som tvivlar"],
    ["Uppenbarelseboken","REV",22,"Jesus segrar över ondskan och gör allting nytt.","trofast vittnesbörd, dom och ny skapelse"]
  ].map((book, index) => ({ name: book[0], code: book[1], chapters: book[2], summary: book[3], focus: book[4], testament: index < 39 ? "GT" : "NT" }));

  const TOTAL_CHAPTERS = BOOKS.reduce((sum, book) => sum + book.chapters, 0);
  const STORAGE_KEY = "spelportal-bibelresan-progress-v1";
  const PACE_KEY = "spelportal-bibelresan-pace-v1";
  const state = { read: new Set(), filter: "ALLA", selected: null, chapter: 1, pace: Number(localStorage.getItem(PACE_KEY) || 365), sound: true };
  const $ = selector => document.querySelector(selector);
  const stage = $("#bibleStage");
  const status = $("#bibleStatus");
  try { JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").forEach(key => state.read.add(key)); } catch (_) {}

  function key(book, chapter) { return `${book.code}.${chapter}`; }
  function bibleUrl(book, chapter) { return `https://www.bible.com/sv/bible/916/${book.code}.${chapter}.NUB`; }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.read])); }
  function countRead(book) { let count = 0; for (let chapter = 1; chapter <= book.chapters; chapter += 1) if (state.read.has(key(book, chapter))) count += 1; return count; }
  function completedBooks() { return BOOKS.filter(book => countRead(book) === book.chapters).length; }
  function updateHud() { $("#scoreVal").textContent = state.read.size.toLocaleString("sv-SE"); $("#stepVal").textContent = `${completedBooks()}/66`; }
  function nextUnread() { for (const book of BOOKS) for (let chapter = 1; chapter <= book.chapters; chapter += 1) if (!state.read.has(key(book, chapter))) return { book, chapter }; return null; }
  function dailyList() {
    const goal = state.pace ? Math.ceil(TOTAL_CHAPTERS / state.pace) : 3; const items = [];
    for (const book of BOOKS) for (let chapter = 1; chapter <= book.chapters && items.length < goal; chapter += 1) if (!state.read.has(key(book, chapter))) items.push(`${book.name} ${chapter}`);
    return { goal, text: items.length ? items.join(" · ") : "Hela Bibeln är markerad som läst!" };
  }
  function shuffle(list) { return [...list].sort(() => Math.random() - .5); }

  function renderDashboard() {
    state.selected = null;
    const percent = Math.round(state.read.size / TOTAL_CHAPTERS * 100);
    const today = dailyList();
    stage.innerHTML = `<div class="journey-dashboard"><div class="journey-hero"><div><h2>Din resa genom hela Bibeln</h2><p>${state.read.size.toLocaleString("sv-SE")} av ${TOTAL_CHAPTERS.toLocaleString("sv-SE")} kapitel · ${completedBooks()} färdiga böcker</p></div><div class="journey-ring" style="--progress:${percent * 3.6}deg"><span>${percent}%</span></div></div><div class="journey-today"><div><strong>Dagens läsning · ${today.goal} kapitel</strong><span>${today.text}</span></div><button class="bible-btn" id="continueBtn" type="button">FORTSÄTT</button></div><div class="journey-toolbar"><button type="button" data-filter="ALLA" class="${state.filter === "ALLA" ? "active" : ""}">Alla 66</button><button type="button" data-filter="GT" class="${state.filter === "GT" ? "active" : ""}">Gamla testamentet</button><button type="button" data-filter="NT" class="${state.filter === "NT" ? "active" : ""}">Nya testamentet</button><label>Tempo <select id="paceSelect" aria-label="Välj lästempo"><option value="365">1 år</option><option value="180">6 månader</option><option value="90">90 dagar</option><option value="0">Egen takt</option></select></label></div><div class="book-grid" id="bookGrid"></div></div>`;
    stage.querySelector("#paceSelect").value = String(state.pace);
    stage.querySelector("#paceSelect").addEventListener("change", event => { state.pace = Number(event.target.value); localStorage.setItem(PACE_KEY, String(state.pace)); renderDashboard(); });
    stage.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => { state.filter = button.dataset.filter; renderDashboard(); }));
    stage.querySelector("#continueBtn").addEventListener("click", () => { const next = nextUnread(); if (next) openBook(next.book, next.chapter); });
    const grid = stage.querySelector("#bookGrid");
    BOOKS.filter(book => state.filter === "ALLA" || book.testament === state.filter).forEach(book => {
      const read = countRead(book); const button = document.createElement("button"); button.type = "button"; button.className = `book-card${read === book.chapters ? " complete" : ""}`;
      button.innerHTML = `<span class="book-name">${book.name}</span><span class="book-meta">${read}/${book.chapters} kapitel · ${book.testament}</span><span class="book-progress"><i style="width:${read / book.chapters * 100}%"></i></span>`;
      button.addEventListener("click", () => openBook(book)); grid.append(button);
    });
    updateHud();
  }

  function openBook(book, requestedChapter) {
    state.selected = book;
    const unread = Array.from({ length: book.chapters }, (_, index) => index + 1).find(chapter => !state.read.has(key(book, chapter)));
    state.chapter = requestedChapter || unread || 1;
    renderBook();
  }
  function renderBook() {
    const book = state.selected; const read = countRead(book);
    const distractors = shuffle(BOOKS.filter(candidate => candidate !== book && candidate.testament === book.testament)).slice(0, 2);
    const options = shuffle([book, ...distractors]);
    stage.innerHTML = `<div class="book-panel"><div class="book-panel-head"><button class="icon-button" id="backBooks" type="button" aria-label="Till boköversikten">←</button><div><h2>${book.name}</h2><p>${read} av ${book.chapters} kapitel lästa · ${book.testament}</p></div><button class="icon-button" id="openBible" type="button" aria-label="Öppna valt kapitel i nuBibeln">↗</button></div><div class="book-insight"><div class="insight-card"><b>Röd tråd</b><span>${book.summary}</span></div><div class="insight-card"><b>Leta efter</b><span>${book.focus}</span></div></div><div class="chapter-grid" id="chapterGrid"></div><div class="chapter-actions"><a class="bible-btn" id="readChapter" target="_blank" rel="noopener">LÄS KAPITEL ${state.chapter} I NUBIBELN ↗</a><button class="bible-btn secondary" id="toggleRead" type="button"></button></div><div class="quiz-card"><h3>Kunskapsstopp: vilken röd tråd hör till ${book.name}?</h3><div class="quiz-options" id="quizOptions"></div></div></div>`;
    const grid = stage.querySelector("#chapterGrid");
    for (let chapter = 1; chapter <= book.chapters; chapter += 1) {
      const button = document.createElement("button"); button.type = "button"; button.className = `chapter${state.read.has(key(book, chapter)) ? " read" : ""}${chapter === state.chapter ? " current" : ""}`; button.textContent = chapter; button.setAttribute("aria-label", `${book.name} kapitel ${chapter}${state.read.has(key(book, chapter)) ? ", läst" : ""}`); button.addEventListener("click", () => { state.chapter = chapter; renderBook(); }); grid.append(button);
    }
    const updateActions = () => {
      stage.querySelector("#readChapter").href = bibleUrl(book, state.chapter);
      const marked = state.read.has(key(book, state.chapter)); stage.querySelector("#toggleRead").textContent = marked ? "ÅNGRA LÄST" : "MARKERA SOM LÄST ✓";
    };
    updateActions();
    stage.querySelector("#backBooks").addEventListener("click", renderDashboard);
    stage.querySelector("#openBible").addEventListener("click", () => window.open(bibleUrl(book, state.chapter), "_blank", "noopener"));
    stage.querySelector("#toggleRead").addEventListener("click", () => { const chapterKey = key(book, state.chapter); if (state.read.has(chapterKey)) state.read.delete(chapterKey); else state.read.add(chapterKey); save(); status.textContent = state.read.has(chapterKey) ? `${book.name} ${state.chapter} sparat som läst på den här enheten.` : "Markeringen togs bort."; updateHud(); renderBook(); });
    const quiz = stage.querySelector("#quizOptions");
    options.forEach(optionBook => { const button = document.createElement("button"); button.type = "button"; button.className = "quiz-option"; button.textContent = optionBook.summary; button.addEventListener("click", () => { quiz.querySelectorAll("button").forEach(item => item.disabled = true); const correct = optionBook === book; button.classList.add(correct ? "correct" : "wrong"); if (!correct) [...quiz.children].find(item => item.textContent === book.summary)?.classList.add("correct"); status.textContent = correct ? "Rätt – du fångade bokens röda tråd." : `Läs den gröna sammanfattningen och leta efter den i ${book.name}.`; }); quiz.append(button); });
  }

  $("#startBtn").addEventListener("click", () => { $("#bibleOverlay").hidden = true; document.body.classList.add("session-active"); renderDashboard(); });
  $("#soundBtn").addEventListener("click", event => { state.sound = !state.sound; event.currentTarget.textContent = state.sound ? "🔊" : "🔇"; event.currentTarget.setAttribute("aria-label", state.sound ? "Stäng av ljud" : "Slå på ljud"); });
  updateHud();
  window.BIBLE_JOURNEY_DATA = { BOOKS, TOTAL_CHAPTERS };
})();
