const CACHE_NAME = 'calculator-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.js',
  '/manifest.json',
  '/styles.css',  // Check if this file exists; remove it if it doesn't
  '/icons/calc.png',
  '/icons/calc2.png'
];


// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).catch(function(error) {
        console.error('Failed to cache resources', error);
      });
    })
  );
});

// Fetch event to intercept network requests and serve cached files when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Activate event to update the cache if any changes are made
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
