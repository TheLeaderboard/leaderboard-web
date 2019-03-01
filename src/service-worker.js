// cache index.html

var CACHE_NAME = "version_02";
var URLs = ["/index.html"];

// respond with cached resources
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(request) {
      return request || fetch(event.request);
    })
  );
});

// cache resources
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLs);
    })
  );
});

// delete outdated caches
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key, i) {
          if (key !== CACHE_NAME) {
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
