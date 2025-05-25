const CACHE_NAME = 'offline-v1';
const OFFLINE_URL = 'off.html';
const INDEX_URL = 'index.html';

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([OFFLINE_URL, INDEX_URL]))
  );
});

// Intercept network requests
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  }
});

// Listen for online status
self.addEventListener('message', (event) => {
  if (event.data === 'online') {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage('redirect-to-index');
      });
    });
  }
});
