const CACHE_NAME = "nextsem-cache-v4";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/logo.svg",
  "/next.svg",
  "/globe.svg"
];

// Install Event
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Force active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event (Delete old caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim()) // Claim clients immediately
  );
});

// Intelligent Fetch Handler (Network-First for Documents & Scripts/Stylesheets, Cache-First for media)
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Network-First strategy for pages, scripts, and stylesheet chunks
  if (
    event.request.mode === "navigate" ||
    url.pathname.endsWith(".css") ||
    url.pathname.includes("/_next/static/") ||
    url.pathname.endsWith(".js")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If valid response, cache it and return
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(event.request);
        })
    );
  } else {
    // Cache-First strategy for static media files (Images, fonts, svg, icons)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response && response.status === 200 && event.request.method === "GET") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
            });
          }
          return response;
        });
      })
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
