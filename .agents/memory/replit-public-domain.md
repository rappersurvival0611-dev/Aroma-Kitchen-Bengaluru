---
name: Replit public domain lifecycle
description: Old repl.co URLs are retired and should not be used for public app links.
---

The app's public URL must come from an active deployment and use the generated `*.replit.app` address or a configured custom domain. `*.repl.co` development/public links can become invalid and return DNS errors.

**Why:** Replit retired the `repl.co` subdomain; a working local preview does not imply that an old public hostname still resolves.

**How to apply:** Check deployment metadata before diagnosing code, publish the artifact when no active deployment exists, and replace old bookmarks, shared links, and integrations with the current production URL.