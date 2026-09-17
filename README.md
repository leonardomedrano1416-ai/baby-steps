# Baby Steps v5

Adds Firebase Authentication and Firestore syncing while preserving the v4 design.

- Dad and Microbia sign in with their Firebase Email/Password accounts.
- Dad's Corner syncs Dad's latest message through Firestore.
- Prenatal completion syncs by date across devices.
- Firestore remains protected by the UID allow-list rules configured in Firebase.
- Push notifications are not enabled yet; that is the next phase after v5 sync testing.
