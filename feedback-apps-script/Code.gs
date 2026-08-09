const FEEDBACK_SHEET_ID = "1FzPUzIYnBkm68JGsFJZglbdOBFts0bWfdlH_bPvMu9w";
const FEEDBACK_TAB = "Feedback";
const MAX_MESSAGE_LENGTH = 240;
const ALLOWED_PAGE_PREFIX = "https://ducostudios.github.io/spelportal/";
const GAMES = Object.freeze({
  "ordspraks-pusslet": "Ordspråks-pusslet", "sex-burkar-sortern": "Sex burkar-sortern",
  "gap-monstren": "Gap-monstren", "saftstand-erbjudandet": "Saftstånd-erbjudandet",
  "sikta-ratt": "Sikta rätt", "bibelhjalten": "Bibelhjälten",
  "superhjalte-spranget": "Superhjälte-språnget", "bokstavsbilen": "Bokstavsbilen",
  "gavokedjan": "Gåvokedjan", "klossfall": "Klossfall", "ordracet": "Ordracet",
  "ormen": "Ormen", "ljudmatchen": "Ljudmatchen", "meningsbyggaren": "Meningsbyggaren",
  "memory-plattorna": "Memory-plattorna", "pusselvridaren": "Pusselvridaren",
  "traffa-ratt": "Träffa rätt", "flykten": "Flykten",
  "alfabetet-fargerna": "Alfabetet & Färgerna", "malarboken": "Målarboken",
  "ordresan": "Ordresan", "ordgatan": "Ordgåtan", "poppa-ballongerna": "Poppa ballongerna",
  "raddaagget": "Rädda ägget", "blockvarlden": "Blockvärlden", "schack": "Schack",
  "ekorrhjulet": "Ekorrhjulet", "kroppens-tempel": "Kroppens Tempel",
  "ror-pa-dig": "Rör på dig!", "byggkost-eller-sallanmat": "Byggkost eller Sällanmat",
  "vishetens-vag": "Vishetens Väg", "kulbanan": "Kulbanan", "kulrullaren": "Kulrullaren",
  "gardsriket": "Gårdsriket", "kubkrossaren": "Kubkrossaren", "ordmastaren": "Ordmästaren",
  "fruktfangaren": "Fruktfångaren", "bistroblixten": "Bistroblixten",
  "accentjakten": "Accentjakten", "ordbron": "Ordbron", "dansstopp": "Dansstopp",
  "reaktionsraketen": "Reaktionsraketen", "balansbanan": "Balansbanan",
  "andningsdykaren": "Andningsdykaren", "brobyggarna": "Brobyggarna",
  "fargfusion": "Färgfusion", "molnhoppet": "Molnhoppet", "tornverkstan": "Tornverkstan",
  "minimarknaden": "Minimarknaden", "myntmatchen": "Myntmatchen",
  "spargrissprint": "Spargrissprint", "ideverkstan": "Idéverkstan",
  "vanskapskompassen": "Vänskapskompassen", "hjalparjakten": "Hjälparjakten",
  "talamodstornet": "Tålamodstornet", "tacksamhetstradet": "Tacksamhetsträdet",
  "barmhartighetsresan": "Barmhärtighetsresan", "bygg-pa-klippan": "Bygg på klippan",
  "andens-frukttradgard": "Andens fruktträdgård", "ord-som-bygger": "Ord som bygger",
  "bibelresan-66": "Bibelresan 66"
});

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value, maxLength) {
  const text = String(value || "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function doGet() {
  return jsonResponse({ ok: true, service: "spelportal-feedback", anonymous: true });
}

function doPost(event) {
  try {
    const data = JSON.parse(event && event.postData && event.postData.contents || "{}");
    if (data.company) return jsonResponse({ ok: true });

    const gameId = safeCell(data.gameId, 80);
    const gameName = GAMES[gameId];
    const rating = Number(data.rating);
    const feedbackId = safeCell(data.feedbackId, 100);
    const page = safeCell(data.page, 300);
    if (!gameName) throw new Error("unknown_game");
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("invalid_rating");
    if (!/^[a-zA-Z0-9-]{8,100}$/.test(feedbackId)) throw new Error("invalid_feedback_id");
    if (page && !page.startsWith(ALLOWED_PAGE_PREFIX)) throw new Error("invalid_page");

    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      const sheet = SpreadsheetApp.openById(FEEDBACK_SHEET_ID).getSheetByName(FEEDBACK_TAB);
      if (!sheet) throw new Error("missing_sheet");
      const duplicate = sheet.getRange("H:H").createTextFinder(feedbackId).matchEntireCell(true).findNext();
      if (duplicate) return jsonResponse({ ok: true, duplicate: true });
      sheet.appendRow([
        new Date(),
        gameId,
        gameName,
        rating,
        safeCell(data.message, MAX_MESSAGE_LENGTH),
        page,
        safeCell(data.version, 80),
        feedbackId
      ]);
    } finally {
      lock.releaseLock();
    }
    return jsonResponse({ ok: true });
  } catch (error) {
    console.warn("Feedback rejected", error && error.message);
    return jsonResponse({ ok: false, error: "invalid_request" });
  }
}
