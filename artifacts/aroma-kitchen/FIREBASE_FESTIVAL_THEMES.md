# Firebase festival themes

The customer website listens in real time to the `festivalThemes` node in
Firebase Realtime Database. The public website only reads this node; theme
changes in Firebase Console appear without a redeploy.

## Firebase Console setup

1. Create or open a Firebase project.
2. Create a **Realtime Database**.
3. Register a Web App under **Project settings > Your apps**.
4. Add the Web App values to the Aroma Kitchen environment using the
   `VITE_FIREBASE_*` names in `.env.example`.
5. For a public customer website, allow read-only access to this node:

```json
{
  "rules": {
    "festivalThemes": {
      ".read": true,
      ".write": false
    }
  }
}
```

Use Firebase Authentication or a separate protected admin service for writes.
Never enable public writes.

## Database shape

In Realtime Database, create a `festivalThemes` node and add one child per
festival. The active theme is selected by `active`, `festivalDate`,
`beforeDays`, `afterDays`, and then highest `priority`.

The recommended schedule is `beforeDays: 7` and `afterDays: 3`. The website
clamps the pre-festival window to 5–7 days so a theme automatically starts
within the requested range. You can also keep using explicit `startDate` and
`endDate` values for a custom schedule.

```json
{
  "festivalThemes": {
    "independenceDay": {
      "name": "Independence Day",
      "emoji": "🇮🇳",
      "bannerText": "Happy Independence Day from Aroma Kitchen!",
      "active": true,
      "festivalDate": "2026-08-15",
      "beforeDays": 7,
      "afterDays": 3,
      "priority": 10,
      "primary": "#FF7A00",
      "primaryForeground": "#FFFFFF",
      "accent": "#138808",
      "accentForeground": "#FFFFFF",
      "background": "#FFF8EE",
      "foreground": "#1E293B",
      "secondary": "#0F172A",
      "secondaryForeground": "#FFFFFF",
      "muted": "#FFF0D9"
    },
    "christmas": {
      "name": "Christmas",
      "emoji": "🎄",
      "bannerText": "Merry Christmas — enjoy a festive meal!",
      "active": true,
      "festivalDate": "2026-12-25",
      "beforeDays": 7,
      "afterDays": 3,
      "priority": 10,
      "primary": "#B91C1C",
      "primaryForeground": "#FFFFFF",
      "accent": "#15803D",
      "accentForeground": "#FFFFFF",
      "background": "#FFF7F2",
      "foreground": "#271515",
      "secondary": "#14532D",
      "secondaryForeground": "#FFFFFF",
      "muted": "#FEE2E2"
    }
  }
}
```

Set `active` to `false` to disable a festival immediately. If multiple themes
overlap, the one with the highest `priority` wins.

## Indian festival seed

The project includes a Firebase Console import-ready starter file at
`firebase/festivalThemes.seed.json`. It includes Indian national, Hindu,
Sikh, regional, and Christian celebrations and intentionally does not include
Eid or any other Islamic festival. Lunar festival dates should be updated in
Firebase each year.