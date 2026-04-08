# Country Coffee - Project Guide

## Overview
Premium coffee brand e-commerce website for an Indian market. Full-featured Next.js storefront with rich animations, 3D elements, and Sanity CMS integration.

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router)
- **React:** 19.2.4
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 (via @tailwindcss/postcss)
- **Animation:** Framer Motion 12
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **CMS:** Sanity (next-sanity 12)
- **Icons:** Lucide React
- **State:** React Context API (cart, wishlist, coupons, recently-viewed) with localStorage persistence

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home (14 sections)
│   ├── shop/         # Catalog + [id] detail
│   ├── checkout/     # Multi-step checkout
│   ├── order/[id]/   # Order confirmation
│   ├── tracking/[id]/# Delivery tracking
│   ├── about/        # About page
│   ├── contact/      # Contact form
│   ├── faq/          # FAQ accordion
│   └── wishlist/     # Saved products
├── components/
│   ├── navbar.tsx, footer.tsx, cart-drawer.tsx, search-modal.tsx
│   ├── product-card.tsx, product-image.tsx, splash-screen.tsx
│   ├── sections/     # 14 homepage section components
│   ├── svg/          # SVG illustrations
│   └── three/        # Three.js 3D scene
├── store/            # Context providers (cart, wishlist, coupon, recently-viewed, admin)
├── lib/              # Sanity client, queries, schemas, format utils, admin-auth
└── data/             # Mock products (12), reviews (17), mock-orders (10)
```

## Admin Dashboard (`/admin/*`)
- **Login:** `/admin/login` — credentials: `admin` / `country2024`
- **Dashboard:** `/admin` — KPIs, revenue chart, recent orders, quick actions
- **Products:** `/admin/products` — CRUD with form validation, search, category filters
- **Orders:** `/admin/orders` — status filters, detail view with tracking timeline, status updates, notes
- **Customers:** `/admin/customers` — derived from orders, detail with lifetime stats
- **Coupons:** `/admin/coupons` — card layout, add/toggle/delete, synced to storefront
- **Settings:** `/admin/settings` — store name, tax rate, shipping, contact info

### Admin Architecture
- State: `AdminProvider` (React Context) with localStorage persistence (keys: `cc-admin-*`)
- Layout: `LayoutShell` component conditionally hides storefront Navbar/Footer on `/admin` routes
- Bridge: `placeOrder()` in cart-context writes to `cc-admin-orders` localStorage
- Coupons: storefront reads active coupons from `cc-admin-coupons` localStorage
- Components: all in `src/components/admin/` (sidebar, header, stat-card, data-table, toast, etc.)
- Seed data: 10 mock orders with 7 customers pre-loaded on first visit

## Design System
- **Colors:** cream, espresso, mocha, latte, forest, sage, gold, warm-gray (CSS variables)
- **Fonts:** Playfair Display (display), Inter (body), Space Grotesk (accent)
- **Currency:** INR (₹) — all prices in Indian Rupees
- **Free shipping threshold:** ₹2,000

## Key Conventions
- All state uses React Context + localStorage (keys prefixed `cc-`)
- Images from Unsplash and Sanity CDN (configured in next.config.ts remotePatterns)
- Path alias: `@/*` maps to `./src/*`
- Zustand is installed but not used — Context API is the active pattern
- No API routes — frontend-only with Sanity CMS backend
- Co-authored commits with Claude

## Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
```
