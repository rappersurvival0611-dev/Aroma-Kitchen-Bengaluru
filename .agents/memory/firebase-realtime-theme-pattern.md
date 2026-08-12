---
name: Firebase realtime theme pattern
description: Festival appearance changes are read live from Firebase Realtime Database while writes stay protected.
---

The customer site should subscribe to a public-read `festivalThemes` node and apply only the currently active, date-bounded theme. Firebase Console is the source of truth for festival records; the site does not need a redeploy for appearance changes.

**Why:** Restaurant owners need to turn seasonal themes on or off and schedule them without editing or rebuilding the customer website, while public database writes would be unsafe.

**How to apply:** Keep `festivalThemes` read-only for the public client, use Firebase Authentication or a protected admin service for writes, and keep Firebase web configuration in `VITE_FIREBASE_*` environment variables.