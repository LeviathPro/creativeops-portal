# Creative Ops Portal

This build packages the luminous white-and-gold landing experience, role-based authentication, and administrative dashboard that the Creative Deck & Fence, LLC team requested.

## Quick start

```bash
npm install
npm run dev
```

The app runs on http://localhost:5173/ by default.

## Default accounts

| Role        | Email                          | Password   | Notes                                      |
|-------------|--------------------------------|------------|--------------------------------------------|
| Admin       | leviathproductions@gmail.com   | Freyja1!   | Grants full control to Levi.               |
| Admin       | stacygrohoske@gmail.com        | Kendall929!| Grants full control to Stacy.              |
| Foreman     | foreman@creativeops.test       | crewlead   | Scheduling, crew assignment, inventory.    |
| Team Lead   | teamlead@creativeops.test      | deckteam   | Uploads reports and project media.         |
| Crew        | crew@creativeops.test          | buildcrew  | Field visibility without financial data.   |
| Apprentice  | apprentice@creativeops.test    | learnandbuild | Training access and onboarding flows.  |
| Client      | client@creativeops.test        | clientview | View-only access to their project records. |

All provider buttons on the sign-in view will also respect the role that is currently highlighted in the selector, so you can demo access tiers without re-entering passwords.

## Dashboard editing

Once an administrator signs in, every module inside the portal exposes inline edit controls. Changes are persisted to local state so Stacy and Levi can configure tables, cards, and task lists directly from the UI without modifying source code.

## Visual design

The landing portal features the geometric mandala gateway placed over the glowing vacuum background of mathematical particles, gold string rings, and aurora haze. Administrative shells, sidebars, and cards render on translucent charcoal glass to maintain contrast with the radiant scene while keeping typography legible.
