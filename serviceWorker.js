const staticCacheName = "cache-v2";
const assets = [
  "/index.html",
  "/src",
  "/images/0C.png",
  "/images/0D.png",
  "/images/0H.png",
  "/images/0S.png",
  "/images/7C.png",
  "/images/7D.png",
  "/images/7H.png",
  "/images/7S.png",
  "/images/8C.png",
  "/images/8D.png",
  "/images/8H.png",
  "/images/8S.png",
  "/images/9C.png",
  "/images/9D.png",
  "/images/9H.png",
  "/images/9S.png",
  "/images/AC.png",
  "/images/AD.png",
  "/images/AH.png",
  "/images/AS.png",
  "/images/JC.png",
  "/images/JD.png",
  "/images/JH.png",
  "/images/JS.png",
  "/images/KC.png",
  "/images/KD.png",
  "/images/KH.png",
  "/images/KS.png",
  "/images/mute.png",
  "/images/QC.png",
  "/images/QD.png",
  "/images/QH.png",
  "/images/QS.png",
  "/images/volume.png"
];

console.log('assets', assets[2])

// ajout fichiers en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Cloner la requête.
      // Une requete est un flux et est à consommation unique
      // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
        var responseToCache = response.clone();

        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// supprimer caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});