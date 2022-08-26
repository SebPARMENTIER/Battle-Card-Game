const BASE = location.protocol + "//" + location.host;
const PREFIX = "V2";
const CACHED_FILES = [
  // `${BASE}/src/main.jsx`,
  // `${BASE}/src/App.jsx`,
  // `${BASE}/src/App.scss`,
  // `${BASE}/src/index.css`,
  // `${BASE}/src/assets/data/cards.js`,
  `${BASE}/src/assets/sounds/battle.mp3`,
  `${BASE}/src/assets/sounds/draw.mp3`,
  `${BASE}/src/assets/sounds/win.mp3`,
  `${BASE}/images/0C.png`,
  `${BASE}/images/0D.png`,
  `${BASE}/images/0H.png`,
  `${BASE}/images/0S.png`,
  `${BASE}/images/7C.png`,
  `${BASE}/images/7D.png`,
  `${BASE}/images/7H.png`,
  `${BASE}/images/7S.png`,
  `${BASE}/images/8C.png`,
  `${BASE}/images/8D.png`,
  `${BASE}/images/8H.png`,
  `${BASE}/images/8S.png`,
  `${BASE}/images/9C.png`,
  `${BASE}/images/9D.png`,
  `${BASE}/images/9H.png`,
  `${BASE}/images/9S.png`,
  `${BASE}/images/AC.png`,
  `${BASE}/images/AD.png`,
  `${BASE}/images/AH.png`,
  `${BASE}/images/AS.png`,
  `${BASE}/images/JC.png`,
  `${BASE}/images/JD.png`,
  `${BASE}/images/JH.png`,
  `${BASE}/images/JS.png`,
  `${BASE}/images/KC.png`,
  `${BASE}/images/KD.png`,
  `${BASE}/images/KH.png`,
  `${BASE}/images/KS.png`,
  `${BASE}/images/QC.png`,
  `${BASE}/images/QD.png`,
  `${BASE}/images/QH.png`,
  `${BASE}/images/QS.png`
];

console.log('Cached_files', CACHED_FILES);

const LAZY_CACHE = [
  // `${BASE}/src/assets/data/card.js`,
  // `${BASE}/images/0C.png`,
  // `${BASE}/images/0D.png`,
  // `${BASE}/images/0H.png`,
  // `${BASE}/images/0S.png`,
  // `${BASE}/images/7C.png`,
  // `${BASE}/images/7D.png`,
  // `${BASE}/images/7H.png`,
  // `${BASE}/images/7S.png`,
  // `${BASE}/images/8C.png`,
  // `${BASE}/images/8D.png`,
  // `${BASE}/images/8H.png`,
  // `${BASE}/images/8S.png`,
  // `${BASE}/images/9C.png`,
  // `${BASE}/images/9D.png`,
  // `${BASE}/images/9H.png`,
  // `${BASE}/images/9S.png`,
  // `${BASE}/images/AC.png`,
  // `${BASE}/images/AD.png`,
  // `${BASE}/images/AH.png`,
  // `${BASE}/images/AS.png`,
  // `${BASE}/images/JC.png`,
  // `${BASE}/images/JD.png`,
  // `${BASE}/images/JH.png`,
  // `${BASE}/images/JS.png`,
  // `${BASE}/images/KC.png`,
  // `${BASE}/images/KD.png`,
  // `${BASE}/images/KH.png`,
  // `${BASE}/images/KS.png`,
  // `${BASE}/images/QC.png`,
  // `${BASE}/images/QD.png`,
  // `${BASE}/images/QH.png`,
  // `${BASE}/images/QS.png`
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      await cache.addAll([...CACHED_FILES]);
    })()
  );
  console.log(`${PREFIX} Install`);
});

self.addEventListener("activate", (event) => {
  clients.claim();
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((key) => {
        if (!key.includes(PREFIX)) {
          return caches.delete(key);
        }
      })
    )
  })()
  );
  console.log(`${PREFIX} Active`);
});

self.addEventListener("fetch", (event) => {
  console.log(
    `${PREFIX} Fetching : ${event.request.url}, Mode : ${event.request.mode}`
  );
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            return preloadResponse
          }
          return await fetch(event.request)
        } catch (e) {
          const cache = await caches.open(PREFIX);
          return await cache.match("/offline.html");
        }
      })()
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  } else if (LAZY_CACHE.includes(event.request.url)) {
    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open(PREFIX);
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            cache.put(event.request, preloadResponse.clone());
            return preloadResponse
          }
          const networkResponse = await fetch(event.request);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (e) {
          return await caches.match(event.request);
        }
      })()
    );
  }
});