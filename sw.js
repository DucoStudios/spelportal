// Servicearbetare för Familjens spelportal som Safari-webbapp (Lägg till på hemskärmen).
// HTML hämtas från nätet först så att uppdateringar syns direkt, med cachen som reserv
// offline. Bilder, skript och stilar visas från cachen och uppdateras i bakgrunden.
// Höj VERSION för att tvinga ny cache.
const VERSION = "v2";
const CACHE = `spelportal-${VERSION}`;
const SHELL = ["./", "index.html", "manifest.json", "icon-180.png", "icon-512.png", "interaction-guard.js", "pixel-thumbnails.js", "game-feedback.css", "game-feedback.js", "feedback-config.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("spelportal-") && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match("index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((hit) => {
      const refresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});
