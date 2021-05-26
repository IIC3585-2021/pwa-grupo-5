var cacheName = 'pwitter';
var staticAssets = [
    './',
    './profile.js',
    './profile.html',
    './pweets.js',
    './pweets.html',
    './css/style.css'
];

self.addEventListener('install', async function () {
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
      event.respondWith(cacheFirst(request));
    } else {
      event.respondWith(networkFirst(request));
    }
  });
  
  async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
  }
  
  async function networkFirst(request) {
    const dynamicCache = await caches.open('feed-dynamic');
    try {
      const networkResponse = await fetch(request);
      dynamicCache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      const cachedResponse = await dynamicCache.match(request);
      return cachedResponse || await caches.match('./fallback.json');
    }
  }

// -----------------------------------------------

// self.addEventListener('install', async e => {
//     const cache = await caches.open(cacheName);
//     cache.addAll(staticAssets);
// });

// //
// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             return r || fetch(e.request).then(function (response) {
//                 return caches.open(cacheName).then(function (cache) {
//                     console.log('[Service Worker] Caching new resource: ' + e.request.url);
//                     cache.put(e.request, response.clone());
//                     return response;
//                 });
//             });
//         })
//     );
// });

// -----------------------------------------------


// self.addEventListener('install', function(e) {
//     console.log('[Service Worker] Install');
//     e.waitUntil(
//         caches.open(cacheName).then(function(cache) {
//             console.log('[Service Worker] Caching all: app shell and content');
//             return cache.addAll(appShellFiles);
//         })
//     );
// });