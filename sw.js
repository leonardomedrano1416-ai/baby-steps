/* Baby Steps v6.3 — Firebase Cloud Messaging + faster PWA updates */

importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCwfU01fplKAmMjF9AGrpfh3_dID11jpyQ",
  authDomain: "baby-steps-2c470.firebaseapp.com",
  projectId: "baby-steps-2c470",
  storageBucket: "baby-steps-2c470.firebasestorage.app",
  messagingSenderId: "737826285998",
  appId: "1:737826285998:web:1f743af1106ec802f2c03f"
});

const messaging = firebase.messaging();

/*
  Activate a newly downloaded service worker immediately
  instead of waiting for the old one to disappear.
*/
self.addEventListener("install", () => {
  self.skipWaiting();
});

/*
  Take control of open Baby Steps pages as soon as
  the new service worker activates.
*/
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Remove any old Cache Storage entries if they exist.
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );

      await clients.claim();
    })()
  );
});

/*
  Keep navigation requests network-first so index.html
  doesn't get stuck on an older cached version.
*/
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).catch(() => {
        return fetch(event.request);
      })
    );
  }
});

/*
  Keep existing notification behavior.
*/
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow("./");
        }
      })
  );
});
