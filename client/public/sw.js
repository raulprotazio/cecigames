const CACHE_NAME = 'ceciflags-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/flags/BR.svg',
  '/flags/US.svg',
  '/flags/DE.svg',
  '/flags/FR.svg',
  '/flags/IT.svg',
  '/flags/ES.svg',
  '/flags/GB.svg',
  '/flags/JP.svg',
  '/flags/CN.svg',
  '/flags/CA.svg',
  '/flags/AU.svg',
  '/flags/IN.svg',
  '/flags/MX.svg',
  '/flags/AR.svg',
  '/flags/ZA.svg',
  '/flags/EG.svg',
  '/flags/NG.svg',
  '/flags/KE.svg',
  '/flags/RU.svg',
  '/flags/NZ.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((fetchResponse) => {
          // Cache new requests for flags
          if (event.request.url.includes('/flags/')) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        });
      })
      .catch(() => {
        // Return offline fallback for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
