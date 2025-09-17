# Tourna — Tournament Management Client

Single‑page app for creating and managing competitive tournaments. Organizers can create teams, seed single‑elimination brackets, progress winners, and track champions. Built with React 19, Vite 7, Tailwind CSS 4, and DaisyUI.

Live: https://tourna-nine.vercel.app

## Features

- Authentication: Login and Signup pages persist a `user` in `localStorage`
- Protected routes: gate Teams/Tournaments; redirects unauthenticated users with a toast
- Teams: create/list/delete teams, dynamic member fields, search and sorting
- Tournaments: create single‑elimination brackets, auto‑advance byes, manage winners, delete tournaments
- Bracket details: per‑round view, pick winners, status updates, champion highlight
- Polished UI: Tailwind CSS 4 + DaisyUI components; subtle animations with Framer Motion
- Notifications: React Toastify container in the root layout


## Tech Stack

- React 19 + React DOM 19
- MySQL, NodeJS, ExpressJS (Backend)
- Tailwind CSS 4 with DaisyUI 5 (via CSS `@plugin`)
- React Router 7
- React Hook Form
- React Toastify
- Framer Motion animations (see “Known Issues” about the dependency name)


## Requirements

- Node.js 18.18+ or 20+
- npm 9+ (or pnpm/yarn equivalent)


## Getting Started

```bash
# from the repo root
cd client

# install dependencies
npm install

# start dev server
npm run dev

# production build
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

SPA dev server runs on the default Vite port (e.g., http://localhost:5173).


## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build to `dist/`
- `npm run preview` — preview the `dist/` build
- `npm run lint` — run ESLint per `eslint.config.js`


## Project Structure

```
client/
├─ index.html
├─ vercel.json               # SPA rewrites for Vercel
├─ vite.config.js            # Vite + React + Tailwind plugin
├─ eslint.config.js          # Flat ESLint config
├─ .prettierrc               # 2-space indentation
├─ public/                   # static assets (favicon et al.)
└─ src/
   ├─ main.jsx               # App entry, router + AuthProvider
   ├─ index.css              # Tailwind v4 + DaisyUI via CSS @plugin
   ├─ assets/                # images and SVGs
   ├─ components/
   │  ├─ Navbar.jsx          # top nav, login/logout controls
   │  └─ Footer.jsx
   ├─ contexts/
   │  ├─ AuthContext.jsx     # React context
   │  └─ AuthProvider.jsx    # reads user from localStorage
   ├─ layouts/
   │  └─ MainLayout.jsx      # includes <ToastContainer/>, navbar/footer
   ├─ pages/
   │  ├─ Auth/
   │  │  ├─ Login.jsx        # POST /login → persist user
   │  │  └─ Signup.jsx       # POST /signup → persist user
   │  ├─ Home/               # Landing page sections
   │  ├─ Teams/Teams.jsx     # CRUD + filtering + modals
   │  └─ Tournaments/
   │     ├─ Tournaments.jsx  # list/create tournaments
   │     └─ Details.jsx      # bracket rounds + pick winners
   └─ routes/
      ├─ router.jsx          # React Router routes
      └─ Private.jsx         # gated route wrapper
```


## Routing Overview

- `/` — Home
- `/login` — Login
- `/signup` — Signup
- `/about` — About
- `/teams` — Protected
- `/tournaments` — Protected
- `/tournaments/:id` — Protected, manage a specific bracket

Protected routes are wrapped by `src/routes/Private.jsx` and will redirect to `/login` while showing a toast if no `user` is present in context.


## Data Flow & Auth

- On successful Login/Signup, the server returns a `user` object. The app stores it in `localStorage` under the key `user`.
- `src/contexts/AuthProvider.jsx` reads `localStorage.getItem('user')` and exposes `user` in context.
- Navbar shows user info and a Logout option; Logout clears local storage and reloads.


## Backend Endpoints Used

Base URL: `https://project-tourna-server.vercel.app`

- POST `/signup` — body `{ name, email, password }` → persists `user` in localStorage on success
- POST `/login` — body `{ email, password }` → persists `user` in localStorage on success
- GET `/teams?user_id={userId}` — returns `{ teams: [...] }`
  - Client parses `team.members` if returned as a JSON string and shows `members_count`
- POST `/teams` — body `{ name, owner_user_id, members: string[] }`
- DELETE `/teams/{id}` — delete a team
- GET `/tournaments?userId={userId}` — returns `{ tournaments: [...] }` with counts
- POST `/tournaments` — body `{ name, format, start_date, status, created_by, data_json }`
- GET `/tournaments/{id}` — returns a tournament with `data_json.matches`
- PATCH `/tournaments/{id}` — body `{ data_json, status }` to persist bracket changes
- DELETE `/tournaments/{id}` — delete a tournament

Bracket data (`data_json.matches`) follows a simple DB-friendly shape:

```jsonc
{
  "match_id": 3,
  "round": 2,
  "slot": 1,
  "status": "scheduled",
  "participants": [
    { "side": 1, "team_id": 101, "score": 0, "is_winner": 0 },
    { "side": 2, "team_id": 202, "score": 0, "is_winner": 0 }
  ],
  "next_match_id": 5,
  "next_slot": 1
}
```


## Bracket Generation Logic

Both `src/pages/Tournaments/Tournaments.jsx` and `src/pages/Tournaments/Details.jsx` include a generator that:

1. Pads seeds to the next power of two with `null` for byes
2. Builds Round 1 from seeds
3. Generates subsequent rounds and links children to their parent match via `next_match_id` + `next_slot`
4. Auto‑advances byes into their parents
5. Tracks a `root_match_id` and a `next_local_id` counter for IDs

Winners propagate forward by setting the appropriate parent participant slot.


## Styling & UI

- Tailwind CSS v4 is imported in `src/index.css` with `@import "tailwindcss";`
- DaisyUI is registered via `@plugin "daisyui";`
- Google Fonts (Bebas Neue, Poppins, Quando, Roboto, etc.) are imported in `src/index.css`
- Toasts are configured globally in `src/layouts/MainLayout.jsx`


## Deployment

Build and deploy the static `dist/` folder. For Vercel deployments, `vercel.json` contains an SPA rewrite so that deep links route back to `index.html`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

## Acknowledgements

- React, Vite, Tailwind CSS, DaisyUI, React Router, React Hook Form, React Toastify, Framer Motion communities and docs.
