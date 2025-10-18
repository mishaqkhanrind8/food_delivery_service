// Le Catering - Food Delivery Service
// service-worker.js

const CACHE_NAME = "le-catering-cache-v1"; // Update version to refresh cache
const OFFLINE_URL = "/offline.html"; // Optional offline fallback page

// Files to cache for offline access
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/assets/android-chrome-192x192.png",
  "/assets/android-chrome-512x512.png",
  OFFLINE_URL
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch from cache, then network fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event
    .respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          // Cache the new response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        });
      })
  );
});
