# PinCart – Vue 3 E-Commerce Application

> A modern e-commerce frontend built with **Vue 3**, **TypeScript**, **Pinia**, and **Tailwind CSS** — demonstrating component-driven architecture, reactive state management, and mobile-first UI design.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://pin-cart.vercel.app/)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-State%20Management-yellow)](https://pinia.vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Utility--first-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite)](https://vitejs.dev/)

---

## Live Demo

| Resource | URL |
|-----------|------|
| Frontend (Live Demo) | https://pin-cart.vercel.app/ |
| Frontend Repo | https://github.com/bhagyaks/PinCart |

---

## Why This Project

Built to demonstrate **real-world Vue 3 patterns** — Composition API, feature-based architecture, Pinia stores, and accessible component design. Goes beyond basic tutorials by applying production conventions: strict TypeScript, component testing with Vitest, and a modular folder structure that scales.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Vue 3 (Composition API) | Component-driven UI architecture |
| TypeScript (Strict) | Type safety and maintainable code |
| Pinia | State management for products, cart, wishlist, and auth |
| Vue Router (with guards) | Client-side routing with auth and guest route protection |
| Vite | Fast build tool and dev server with lazy-loaded routes |
| Tailwind CSS | Utility-first responsive styling |
| Vitest | Component and unit testing |
| Axios | HTTP client for API integration |

---

## Features

- **Product Grid** — Dynamic product listing with hover effects and quick view
- **Product Detail Modal** — View full product info without leaving the page
- **Search & Filter** — Real-time product filtering via `useProductSearch` composable
- **Cart** — Fully functional cart with Pinia-managed state, item counts, and a dedicated Cart page
- **Cart Icon with Badge** — Live item count badge in the navbar (desktop & mobile)
- **Wishlist** — Add/remove items with Pinia-managed state
- **Authentication** — Login and register with token persistence via `localStorage`
- **Route Guards** — Protected routes (`/cart` requires auth) and guest-only routes (`/auth` redirects when logged in)
- **Toast Notifications** — Global `useToast` composable for success/error feedback (e.g. logout confirmation)
- **404 Page** — Custom Not Found view for unmatched routes
- **Responsive Design** — Mobile-first layout optimized for all screen sizes
- **Accessibility** — ARIA labels, `aria-expanded`, keyboard focus support, semantic HTML

---

## Architecture Highlights

- **Feature-based folder structure** — each domain (products, cart, auth, notFound) is self-contained
- **Composition API throughout** — no Options API, consistent use of `<script setup>`
- **Pinia stores** — typed, modular state with actions and getters per feature; `authStore` persists token to `localStorage` on init
- **Shared composables** — `useToast` and `useProductSearch` extracted into `src/shared/composables` for reuse across features
- **Vue Router with navigation guards** — `beforeEach` guard enforces `requiresAuth` and `requiresGuest` meta on routes; all routes are lazy-loaded
- **Component testing with Vitest** — unit tests alongside components (`cartStore.test.ts`, `useProductSearch.test.ts`, `HomeView.test.ts`)
- **Strict TypeScript** — typed props, emits, store state, getters, and API responses
- **Vite** — sub-second HMR and optimized production builds

---

## Project Structure

```
src/
├── app/
│   ├── layout/          # Navbar (with cart badge & auth state)
│   └── router/          # Vue Router config with lazy routes & nav guards
├── assets/              # Static assets and global styles
├── features/
│   ├── auth/            # Login/register views, authStore (token persisted to localStorage)
│   ├── cart/            # cartStore, CartView, cart tests
│   ├── notFound/        # 404 NotFoundView
│   └── products/        # Product grid, cards, detail modal, useProductSearch composable
├── shared/
│   ├── api/             # Shared Axios instance
│   ├── components/      # Reusable UI: Button, Modal, Badge, Toast, ProductCardSkeleton
│   └── composables/     # useToast
├── types/               # Shared TypeScript interfaces
├── App.vue              # Root component with global <Toast />
├── main.ts
└── style.css
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bhagyaks/PinCart.git
cd PinCart

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Running Tests

```bash
# Unit and component tests
npm run test

# With coverage
npm run test:coverage
```

---

## Roadmap

### Completed
- [x] Product grid with search & filter
- [x] Product detail modal
- [x] Cart store with Pinia (add, remove, item count badge)
- [x] Dedicated Cart page (`/cart`, auth-protected)
- [x] Authentication — login, register, token persistence
- [x] Route guards (auth & guest protection)
- [x] Global Toast notification system
- [x] 404 Not Found page
- [x] Mobile-responsive navbar with cart badge

### In Progress
- [ ] Checkout flow with order summary
- [ ] Filter and sort by category, price, rating
- [ ] Persist cart and wishlist to localStorage

### Planned
- [ ] Backend API integration
- [ ] User profile and order history
- [ ] Expanded test coverage

---

## Contact

**Bhagya K S**

GitHub: [@bhagyaks](https://github.com/bhagyaks)
