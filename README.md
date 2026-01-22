# HT NEXUS AI 🔷

**HT NEXUS AI** is an intelligent logistics platform featuring a modern, responsive dashboard for operations, analytics, and fleet management. Built with React + TypeScript and a focus on accessibility and performance, the application includes a production-ready frontend skeleton for authentication, real-time analytics, routing, compliance, and AI-driven tooling.

---

## 🚀 Key features

- **Dashboard Overview** — High-level operational insights and quick access to core tools.
- **Fleet Management** — Manage vehicles, assets, and routing at scale.
- **Routing & Optimization** — Route planning interfaces and route details for operations teams.
- **AI Engine Page** — Interfaces to manage and interact with AI-driven features and configuration.
- **Analytics & Charts** — Time-series and KPI visualizations using Recharts.
- **Network & Compliance** — Tools to track compliance items and network health.
- **Map & Geolocation** — Geospatial views and visualizations for routes and assets.
- **Authentication & Account Management** — Registration, login, profile management, and secure API integration.
- **Theming & Accessibility** — Light/dark theme, responsive layout, and accessible components.
- **Modular Components** — Reusable UI primitives, animations, and utilities (Radix + Tailwind + shadcn/ui).

> Note: This repository contains the front-end application and UI for HT NEXUS AI. It integrates with a backend API via a configurable base URL.

---

## 🛠️ Tech stack

- Framework: React + TypeScript
- Bundler: Vite
- Styling: Tailwind CSS, shadcn UI components
- UI primitives: Radix UI, Lucide icons
- Animations: Framer Motion
- Data fetching & caching: @tanstack/react-query
- Charts: Recharts
- HTTP client: Axios
- Testing: Vitest

---

## 🔧 Getting started

Prerequisites:

- Node.js (LTS recommended)
- pnpm or npm (this repo includes a pnpm lockfile)

Clone and run:

```bash
# clone
git clone <YOUR_REPO_URL>
cd ht-nexus-ai

# install
pnpm install
# or
npm install

# development
pnpm dev
# or
npm run dev
```

Build for production:

```bash
pnpm build
# serve locally
pnpm preview
```

Run tests:

```bash
pnpm test
# or watch
pnpm test:watch
```

Lint:

```bash
pnpm lint
```

---

## ⚙️ Environment variables

Create a `.env` file in the project root or set these secrets in your deployment environment:

- `VITE_API_BASE_URL` (optional) — Base URL for the backend API. Defaults to `https://api.ht-techsolutions.com` when not set.
- `VITE_RECAPTCHA_SITE_KEY` — Site key for reCAPTCHA v3 (used on registration and contact forms).

Example `.env` (do not commit secrets):

```env
VITE_API_BASE_URL=https://api.ht-techsolutions.com
VITE_RECAPTCHA_SITE_KEY=REPLACE_WITH_YOUR_SITE_KEY
```

---

## 📁 Project structure (high level)

- `src/pages/` — Page routes including `dashboard/*` (Overview, Analytics, Fleet, Routing, Compliance, AI Engine)
- `src/components/` — Shared UI components, layout primitives, and sections used across the site
- `src/components/animate-ui/` — Reusable animated UI components and primitives
- `src/lib/api.ts` — Axios instance and API helpers (API base URL and auth helper)
- `src/hooks/` & `src/context/` — Custom hooks and React context for shared state
- `src/pages/Legal.tsx` — Policy and legal content rendering (styled, accessible)

---

## 🧩 Development notes

- The UI uses `prose` (Tailwind Typography) for rich content and a scoped `.legal-content` stylesheet for legal pages.
- The `RippleButton` and other animated UI primitives live under `src/components/animate-ui` and are used across pages.
- Authentication state and API requests are handled by `src/lib/api.ts` and the app stores an optional token when present.

---

## 📦 Deployment

Build the app using `pnpm build` and deploy the static output (`dist`). The site can be hosted on platforms such as Vercel, Netlify, or any static host that can provide the required env variables.

CI workflows in `.github/workflows/` already show an example of injecting `VITE_RECAPTCHA_SITE_KEY` during deploy.

---

## 📬 Contact & support

For questions or help integrating the frontend with your backend API, reach out to: `support@ht-techsolutions.com`.

Thank you for using HT NEXUS AI — a cleaner, faster, and more focused interface for logistics operations and AI-driven insights. ✨
