---
name: WhatsApp notifications via wa.me links
description: Preferred default approach for "send a WhatsApp message" requests in restaurant/small-business style apps, absent an explicit ask for full automation.
---

When a user asks for a WhatsApp confirmation/notification (e.g. after a form submission like a table reservation), there are two viable approaches:

1. **wa.me pre-filled link** — build a `https://wa.me/<number>?text=<encoded message>` URL and `window.open()` it after the backend successfully stores the submission. Requires zero external setup, no account, no cost. The one tradeoff: the customer/browser must tap "Send" in WhatsApp themselves — it's not sent silently by the server.
2. **Twilio WhatsApp Business API** — a `connector:ccfg_twilio_*` integration exists in this environment for fully automated, no-tap sending, but requires the user to set up a Twilio account with WhatsApp approved (cost + approval lag).

**Why:** most small-business apps we build (e.g. Aroma Kitchen) already use the wa.me pattern elsewhere in the codebase (a floating "Order via WhatsApp" button), so option 1 is both cheaper and more consistent with existing UX. Always check for a pre-existing `wa.me/<number>` link in the codebase first — it usually tells you the business's canonical WhatsApp number.

**How to apply:** ask the user explicitly (single-select) which of the two they want before implementing, since it's a real product/cost tradeoff — don't assume. Default recommendation: wa.me link, using the number already found in the app if one exists.
