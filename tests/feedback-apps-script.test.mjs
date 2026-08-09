import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

function createReceiver() {
  const rows = [];
  const output = text => ({
    text,
    mimeType: "",
    setMimeType(value) { this.mimeType = value; return this; }
  });
  const sheet = {
    getRange() {
      return {
        createTextFinder(value) {
          return {
            matchEntireCell() { return this; },
            findNext() { return rows.some(row => row[7] === value) ? {} : null; }
          };
        }
      };
    },
    appendRow(row) { rows.push(row); }
  };
  const context = {
    console: { warn() {} },
    Date,
    JSON,
    Math,
    Number,
    Object,
    RegExp,
    String,
    ContentService: {
      MimeType: { JSON: "application/json" },
      createTextOutput: output
    },
    LockService: {
      getScriptLock: () => ({ waitLock() {}, releaseLock() {} })
    },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet })
    }
  };
  runInNewContext(readFileSync("feedback-apps-script/Code.gs", "utf8"), context);
  return { context, rows };
}

function event(payload) {
  return { postData: { contents: JSON.stringify(payload) } };
}

test("feedbackmottagaren skriver validerad anonym feedback och stoppar dubbletter", () => {
  const { context, rows } = createReceiver();
  const payload = {
    gameId: "ormen",
    rating: 5,
    message: "=IMPORTXML(hemligt)",
    page: "https://ducostudios.github.io/spelportal/games/ormen.html",
    version: "test-v1",
    feedbackId: "12345678-abcd-4321-abcd-123456789012",
    company: ""
  };
  const first = JSON.parse(context.doPost(event(payload)).text);
  assert.deepEqual(first, { ok: true });
  assert.equal(rows.length, 1);
  assert.equal(rows[0][1], "ormen");
  assert.equal(rows[0][2], "Ormen");
  assert.equal(rows[0][3], 5);
  assert.equal(rows[0][4], "'=IMPORTXML(hemligt)");
  assert.equal(rows[0].length, 8);

  const duplicate = JSON.parse(context.doPost(event(payload)).text);
  assert.deepEqual(duplicate, { ok: true, duplicate: true });
  assert.equal(rows.length, 1);
});

test("feedbackmottagaren avvisar okända spel, fel betyg och främmande sidor", () => {
  const cases = [
    { gameId: "okant", rating: 5, page: "", feedbackId: "abcdefgh-1234" },
    { gameId: "ormen", rating: 6, page: "", feedbackId: "abcdefgh-1234" },
    { gameId: "ormen", rating: 4, page: "https://example.com/falsk", feedbackId: "abcdefgh-1234" }
  ];
  for (const payload of cases) {
    const { context, rows } = createReceiver();
    assert.deepEqual(JSON.parse(context.doPost(event(payload)).text), { ok: false, error: "invalid_request" });
    assert.equal(rows.length, 0);
  }
});

test("honeypot-fältet ignorerar robotinlägg utan att skriva en rad", () => {
  const { context, rows } = createReceiver();
  const response = context.doPost(event({ company: "spam", gameId: "ormen", rating: 5 }));
  assert.deepEqual(JSON.parse(response.text), { ok: true });
  assert.equal(rows.length, 0);
});
