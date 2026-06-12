/* ═══════════════════════════════════════════════════════════
   AARYAN GUPTA PORTFOLIO — SERVICE WORKER
   Cache Strategy: Cache-first for assets, Network-first for pages
   ═══════════════════════════════════════════════════════════ */

'use strict';

const CACHE_VERSION = 'ag-v1.0';
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/data/config.json',
  '/manifest.webmanifest',
  '/offline.html'
];

const NEVER_CACHE = [
  '/api/',
  '/admin/',
  'google-analytics',
  'googletagmanager',
  'calendly.com'
];

// ─── INSTALL ───
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS.filter(url => {
        try { new URL(url, self.location.origin); return true; }
        catch { return false; }
      })))
      .then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ───
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH ───
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and excluded URLs
  if (request.method !== 'GET') return;
  if (NEVER_CACHE.some(pattern => request.url.includes(pattern))) return;
  if (url.origin !== self.location.origin && !isFont(request.url)) return;

  // HTML pages → Network-first
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets → Cache-first
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else → Network-first with dynamic cache
  event.respondWith(networkFirst(request));
});

function isStaticAsset(url) {
  return /\.(css|js|woff2?|png|jpg|jpeg|webp|avif|svg|ico)$/i.test(url);
}

function isFont(url) {
  return url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com');
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Asset unavailable offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Fallback to offline page for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline.html');
    }
    return new Response('Offline', { status: 503 });
  }
}
