/* Baby Steps v6.2 — Firebase Cloud Messaging background notifications */

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
