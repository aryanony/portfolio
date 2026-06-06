'use strict';
var CACHE = 'ag-v2';
var STATIC = ['/', '/index.html', '/assets/css/dark.css', '/assets/css/light.css', '/assets/css/main.css', '/assets/css/animations.css'];
self.addEventListener('install', function(e){ e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(STATIC); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET') return;
  if(e.request.url.includes('google-analytics')||e.request.url.includes('googletagmanager')) return;
  e.respondWith(caches.match(e.request).then(function(c){
    var net = fetch(e.request).then(function(r){ if(r&&r.ok&&r.type!=='opaque'){ var clone=r.clone(); caches.open(CACHE).then(function(cache){ cache.put(e.request,clone); }); } return r; }).catch(function(){ return c; });
    return c || net;
  }));
});
