(() => {
  "use strict";

  if (!document.body?.dataset.gameId || document.querySelector("#gameFeedbackLaunch")) return;

  const settings = window.SPELPORTAL_FEEDBACK || {};
  if (!settings.endpoint) return;
  const maxLength = Number(settings.maxMessageLength) || 240;
  const gameId = document.body.dataset.gameId;
  const gameTitle = (document.querySelector("h1")?.textContent || document.title.split("·")[0] || gameId).trim();
  const cooldownKey = `spelportal-feedback-sent-${gameId}`;
  const cooldownMs = 10 * 60 * 1000;
  let rating = 0;
  let previouslyFocused = null;

  const launch = document.createElement("button");
  launch.type = "button";
  launch.className = "gf-launch";
  launch.id = "gameFeedbackLaunch";
  launch.setAttribute("aria-haspopup", "dialog");
  launch.innerHTML = '<span class="gf-launch-icon" aria-hidden="true">💬</span><span class="gf-launch-text">Tyck till</span>';

  const modal = document.createElement("div");
  modal.className = "gf-modal";
  modal.id = "gameFeedbackModal";
  modal.hidden = true;
  modal.innerHTML = `
    <section class="gf-dialog" role="dialog" aria-modal="true" aria-labelledby="gfTitle" aria-describedby="gfCopy">
      <button class="gf-close" type="button" aria-label="Stäng feedback">×</button>
      <p class="gf-eyebrow">Hjälp spelet bli bättre</p>
      <h2 id="gfTitle">Vad tyckte du?</h2>
      <p class="gf-copy" id="gfCopy">Betygsätt <strong></strong> och skriv gärna vad som var roligt, svårt eller kunde bli bättre.</p>
      <form id="gameFeedbackForm">
        <fieldset class="gf-fieldset">
          <legend>Ditt betyg</legend>
          <div class="gf-stars" role="radiogroup" aria-label="Betyg från 1 till 5"></div>
        </fieldset>
        <label class="gf-label" for="gfMessage">Kort meddelande <span aria-hidden="true">(valfritt)</span></label>
        <div class="gf-textarea-wrap">
          <textarea class="gf-textarea" id="gfMessage" maxlength="${maxLength}" placeholder="Till exempel: styrningen var rolig men nivå två var svår."></textarea>
          <span class="gf-count" aria-live="polite">0/${maxLength}</span>
        </div>
        <label class="gf-honeypot" aria-hidden="true">Lämna detta fält tomt<input name="company" tabindex="-1" autocomplete="off"></label>
        <p class="gf-private"><span aria-hidden="true">🔒</span><span>Anonymt: inget namn, mejl eller användarkonto samlas in.</span></p>
        <div class="gf-actions">
          <button class="gf-submit" type="submit" disabled>SKICKA</button>
          <p class="gf-status" role="status" aria-live="polite"></p>
        </div>
      </form>
    </section>`;

  document.body.append(launch, modal);

  const dialog = modal.querySelector(".gf-dialog");
  const closeButton = modal.querySelector(".gf-close");
  const form = modal.querySelector("form");
  const stars = modal.querySelector(".gf-stars");
  const message = modal.querySelector("textarea");
  const counter = modal.querySelector(".gf-count");
  const submit = modal.querySelector(".gf-submit");
  const status = modal.querySelector(".gf-status");
  modal.querySelector(".gf-copy strong").textContent = gameTitle;

  for (let value = 1; value <= 5; value++) {
    const star = document.createElement("button");
    star.type = "button";
    star.className = "gf-star";
    star.dataset.rating = String(value);
    star.setAttribute("role", "radio");
    star.setAttribute("aria-checked", "false");
    star.setAttribute("aria-label", `${value} av 5`);
    star.textContent = "★";
    star.addEventListener("click", () => setRating(value));
    stars.appendChild(star);
  }

  function setRating(value) {
    rating = value;
    stars.querySelectorAll(".gf-star").forEach(star => {
      const active = Number(star.dataset.rating) <= rating;
      star.classList.toggle("is-active", active);
      star.setAttribute("aria-checked", Number(star.dataset.rating) === rating ? "true" : "false");
    });
    submit.disabled = false;
    status.textContent = `${value} av 5 valt.`;
    navigator.vibrate?.(8);
  }

  function openModal() {
    previouslyFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("feedback-open");
    closeButton.focus({ preventScroll: true });
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("feedback-open");
    previouslyFocused?.focus?.({ preventScroll: true });
  }

  function makeFeedbackId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
  }

  launch.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("pointerdown", event => { if (event.target === modal) closeModal(); });
  message.addEventListener("input", () => { counter.textContent = `${message.value.length}/${maxLength}`; });

  document.addEventListener("keydown", event => {
    if (modal.hidden) return;
    if (event.key === "Escape") { event.preventDefault(); closeModal(); return; }
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll('button:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!rating || submit.disabled) return;
    const lastSent = Number(localStorage.getItem(cooldownKey) || 0);
    if (Date.now() - lastSent < cooldownMs) {
      status.textContent = "Du har redan skickat feedback om det här spelet nyligen.";
      return;
    }
    if (!navigator.onLine) {
      status.textContent = "Du verkar vara offline. Försök igen när internet är tillbaka.";
      return;
    }

    submit.disabled = true;
    submit.textContent = "SKICKAR…";
    status.textContent = "";
    const payload = {
      gameId,
      rating,
      message: message.value.trim().slice(0, maxLength),
      page: `${location.origin}${location.pathname}`,
      version: String(settings.version || "unknown").slice(0, 80),
      feedbackId: makeFeedbackId(),
      company: String(form.elements.company.value || "")
    };

    try {
      await fetch(settings.endpoint, {
        method: "POST",
        mode: "no-cors",
        cache: "no-store",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload)
      });
      localStorage.setItem(cooldownKey, String(Date.now()));
      status.textContent = "Tack! Din feedback hjälper spelet att bli bättre.";
      submit.textContent = "SKICKAT ✓";
      navigator.vibrate?.([12, 35, 12]);
      window.setTimeout(closeModal, 1400);
    } catch (_) {
      status.textContent = "Det gick inte att skicka just nu. Försök igen om en stund.";
      submit.disabled = false;
      submit.textContent = "FÖRSÖK IGEN";
    }
  });
})();
