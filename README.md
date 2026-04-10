# SMART Collection System — Frontend

React + TypeScript frontend for the SMART Collection System. Provides a UI for authentication, organization management, and system configuration.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Zustand | Global state management |
| React Hook Form + Zod | Form handling and validation |
| Axios | HTTP requests |
| Lucide React | Icons |

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| npm | 9+ |

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd collector-app-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Ensure the backend is running

The frontend proxies all `/api` requests to the backend at `https://localhost:7008`. Make sure the backend API is running before starting the dev server. See the backend README for setup instructions.

### 4. Start the development server

```bash
npm run dev
```

The app is available at: `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check and build for production (output: `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
src/
├── api/                  # Axios client and API call functions
│   ├── axios.ts          # Configured Axios instance
│   ├── auth.api.ts       # Auth endpoints
│   ├── organization.api.ts # Organization endpoints
│   └── system.api.ts     # System endpoints
│
├── features/             # Feature-based UI modules
│   ├── auth/             # Login page and auth forms
│   ├── dashboard/        # Dashboard page
│   └── organizations/    # Organization list, create, and edit pages
│
├── components/           # Shared UI components
├── store/
│   └── auth.store.ts     # Zustand auth store (token + user state)
├── router/               # React Router configuration
├── types/                # Shared TypeScript types
├── utils/                # Utility functions
├── constants.ts          # App-wide constants (routes, API base URL, app name)
├── App.tsx               # Root component
└── main.tsx              # Entry point
```

---

## Routing

Routes are defined in `src/constants.ts`:

| Route | Page | Auth Required |
|-------|------|---------------|
| `/login` | Login | No |
| `/dashboard` | Dashboard | Yes |
| `/organizations` | Organization list | Yes |
| `/organizations/new` | Create organization | Yes |
| `/organizations/:id` | Organization detail | Yes |
| `/organizations/:id/edit` | Edit organization | Yes |

---

## API Proxy

In development, Vite proxies `/api/*` requests to the backend to avoid CORS issues:

```
/api/* → https://localhost:7008/api/*
```

This is configured in `vite.config.ts`. No changes to this file are needed unless the backend runs on a different port.

---

## Authentication

- JWT tokens are stored in Zustand state via `src/store/auth.store.ts` with the key `collector-auth`.
- The Axios instance in `src/api/axios.ts` automatically attaches the token as a `Bearer` header on every request.
- Protected routes redirect unauthenticated users to `/login`.

---

## Production Build

```bash
npm run build
```

Output is placed in the `dist/` folder. The build includes a `_redirects` file for proper React Router support on platforms like Netlify:

```
/* /index.html 200
```

Deploy the contents of `dist/` to any static hosting service (Netlify, Vercel, etc.).
