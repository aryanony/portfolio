/**
 * PWA Service Worker Registration
 * Registers a service worker if available and handles updates.
 */
(function () {
  'use strict';

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.log('[PWA] Service workers not supported.');
      return;
    }

    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
          console.log('[PWA] Service Worker registered, scope:', registration.scope);

          // Check for updates periodically
          registration.addEventListener('updatefound', function () {
            var newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', function () {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New content available; please refresh.');
              }
            });
          });
        })
        .catch(function (err) {
          console.log('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  registerServiceWorker();
})();
