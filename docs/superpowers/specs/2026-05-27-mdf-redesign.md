# MDF Enterprises — Full Website Redesign Spec
**Date:** 2026-05-27  
**Status:** Approved for implementation

---

## 1. Overview

Complete rebuild of `mdfSite-` from static Pixwell HTML into a **Next.js 16 + Framer Motion v12 + Tailwind v4** application. Maximum content density on one scrollable home page. Architecture is data-driven and DB-swappable from day one to support a future admin dashboard and CMS.

**Primary goal:** Single home page that serves as the complete brand experience — hero, products, clients, contact, everything. Separate `/products` and `/blog` pages extend the experience without requiring home page changes.

**Reference codebase:** `C:\Users\Furqan\Desktop\zzzSite` — port all components verbatim unless noted, then extend.

---

## 2. Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | SSG by default, RSC for data pages, API routes for future admin |
| Animation | Framer Motion v12 | Already battle-tested in zzzSite; `useReducedMotion` in every component |
| Styling | Tailwind v4 | Already in zzzSite |
| Smooth scroll | Lenis v1.3 | Already in zzzSite |
| Icons | Lucide React | Already in zzzSite |
| UI primitives | Shadcn/ui | Already in zzzSite |
| Toasts | Sonner | Already in zzzSite |
| Extra animations | Aceternity UI (selected) | Spotlight, FloatingNavbar, BorderBeam, SparklesCore |
| Extra animations | Magic UI (selected) | BlurFade, NumberTicker, Shimmer |
| Physics buttons | Custom (from zzzSite) | MagneticButton, TiltCard — already written |

**Deliberately excluded:** Three.js, Matter.js, GSAP — too heavy for low-end devices; Framer Motion + CSS covers all animation needs.

---

## 3. Scalability Architecture

### 3.1 Data Layer — Content as Typed Interfaces

All content lives in `lib/data/*.ts` as static arrays matching interface shapes.  
When admin dashboard is ready: replace static arrays with `fetch('/api/...')` — no component changes needed.

```typescript
// lib/data/products.ts
export interface Product {
  id: string
  slug: string
  name: string
  category: 'cricket' | 'uniform' | 'fitness' | 'music' | 'awards'  // extend as needed
  brand: string
  image: string
  description: string
  inStock: boolean
  featured: boolean
  whatsappText: string   // pre-filled message for enquiry
  createdAt: string      // ISO date — for future sorting
}

// lib/data/blog.ts
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: 'sports' | 'fitness' | 'awards' | 'gem-guides' | 'news'
  readTime: number
  publishedAt: string
  featured: boolean
  content: string        // MDX or plain HTML — future CMS replaces this field
}

// lib/data/categories.ts
export interface Category {
  id: string
  label: string
  tagline: string
  image: string
  href: string
  enabled: boolean       // flip to false to hide a category without deleting
}

// lib/data/clients.ts — already exists in zzzSite pattern
// lib/data/brands.ts   — already exists in zzzSite
// lib/data/testimonials.ts — already exists in zzzSite
// lib/data/process.ts  — already exists in zzzSite
```

### 3.2 API Routes (stub now, activate later)

```
app/api/
  products/route.ts     → GET /api/products?category=cricket&featured=true
  blog/route.ts         → GET /api/blog?limit=3&featured=true
  contact/route.ts      → POST /api/contact (future — replace WhatsApp redirect)
  admin/               → protected admin API (future — NextAuth or Clerk)
```

Stub these as empty route files now so the folder structure is in place.

### 3.3 Admin Dashboard (structure only, implement later)

```
app/admin/
  layout.tsx            → protected layout (redirect to login if no session)
  page.tsx              → dashboard overview
  products/
    page.tsx            → product CRUD table
    new/page.tsx        → add product form
    [id]/page.tsx       → edit product form
  blog/
    page.tsx            → post list
    new/page.tsx        → rich text editor
  clients/page.tsx      → manage client logos
  settings/page.tsx     → site settings
```

Auth: stub with `notFound()` for now. When ready: add NextAuth v5 or Clerk.

### 3.4 Feature Flags

```typescript
// lib/config/features.ts
export const FEATURES = {
  blogEnabled: true,
  productsPageEnabled: true,
  adminEnabled: false,   // flip when admin is ready
  testimonialsEnabled: true,
  threeJsHero: false,    // future 3D upgrade
} as const
```

Components check `FEATURES.blogEnabled` before rendering blog sections. No dead code ships to production.

---

## 4. File Structure

```
mdfSite- (repo root)
├── app/
│   ├── layout.tsx              ← global: Lenis init, fonts, Navbar, Footer, WhatsApp CTA, Preloader
│   ├── page.tsx                ← home page — all sections assembled here
│   ├── products/
│   │   ├── page.tsx            ← category selector
│   │   └── [category]/
│   │       └── page.tsx        ← filtered product grid
│   ├── blog/
│   │   ├── page.tsx            ← post listing
│   │   └── [slug]/
│   │       └── page.tsx        ← single post
│   ├── admin/                  ← stub (all pages return notFound() for now)
│   └── api/                    ← stub routes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← NEW: Aceternity floating nav
│   │   ├── Footer.tsx          ← port + enhance from mdfSite-
│   │   ├── Preloader.tsx       ← NEW: scoreboard flip animation
│   │   └── WhatsAppButton.tsx  ← NEW: sticky pulsing button
│   ├── home/
│   │   ├── Hero.tsx            ← PORT from zzzSite + Spotlight + sports particles
│   │   ├── TrustStrip.tsx      ← NEW: BorderBeam badges
│   │   ├── Categories.tsx      ← PORT from zzzSite (no changes)
│   │   ├── FeaturedProducts.tsx ← PORT from zzzSite + swap to cricket/uniform data
│   │   ├── About.tsx           ← PORT from zzzSite (no changes)
│   │   ├── BrandPartners.tsx   ← PORT from zzzSite + upgrade to logo images
│   │   ├── WhoWeServe.tsx      ← PORT from zzzSite (no changes)
│   │   ├── Process.tsx         ← PORT from zzzSite (no changes)
│   │   ├── Clients.tsx         ← NEW: rebuilt govt logo grid
│   │   ├── Testimonials.tsx    ← PORT from zzzSite (no changes)
│   │   ├── BlogPreview.tsx     ← NEW: 3 latest posts
│   │   ├── CtaBand.tsx         ← PORT from zzzSite (no changes)
│   │   └── Contact.tsx         ← PORT from zzzSite (no changes)
│   ├── products/
│   │   ├── ProductCard.tsx     ← PORT FeaturedProducts card as standalone
│   │   ├── ProductGrid.tsx     ← grid wrapper with filter bar
│   │   └── FilterBar.tsx       ← category/brand chip filters
│   ├── blog/
│   │   ├── PostCard.tsx        ← editorial dark card
│   │   ├── PostGrid.tsx        ← masonry-style grid
│   │   └── PostHeader.tsx      ← full-bleed hero post header
│   └── ui/
│       ├── MagneticButton.tsx  ← PORT from zzzSite (no changes)
│       ├── TiltCard.tsx        ← PORT from zzzSite (no changes)
│       ├── CountUp.tsx         ← PORT from zzzSite (no changes)
│       ├── InfiniteMarquee.tsx ← PORT from zzzSite (no changes)
│       ├── AnimatedSection.tsx ← PORT from zzzSite (no changes)
│       └── BorderBeam.tsx      ← NEW: Aceternity port
├── lib/
│   ├── animation.ts            ← PORT from zzzSite (EASE constants)
│   ├── utils.ts                ← PORT from zzzSite (cn helper)
│   ├── config/
│   │   └── features.ts         ← feature flags
│   └── data/
│       ├── products.ts         ← CRICKET + UNIFORMS (current); typed for future extension
│       ├── categories.ts       ← 4 categories (Sports/Fitness/Music/Awards)
│       ├── brands.ts           ← PORT from zzzSite
│       ├── clients.ts          ← all 8 govt institution logos
│       ├── testimonials.ts     ← PORT from zzzSite
│       ├── process.ts          ← PORT from zzzSite
│       └── blog.ts             ← 3–5 seed posts
├── public/
│   └── images/                 ← port all webp from mdfSite-/images/
├── package.json                ← based on zzzSite package.json
└── next.config.ts
```

---

## 5. Visual System

### Colors
```css
--bg-base:        #050505   /* page canvas, hero, alternating sections */
--bg-raised:      #0f0f0f   /* cards, navbar, footer */
--bg-sunken:      #111111   /* inputs, secondary surfaces */
--accent-orange:  #FF6B00   /* primary CTA, scoreboard numbers, active nav */
--accent-gold:    #C89B5E   /* editorial labels, decorative lines, hover borders */
--text-primary:   #FFFFFF
--text-muted:     rgba(255,255,255,0.50)
--text-ghost:     rgba(255,255,255,0.25)
--border-subtle:  rgba(255,255,255,0.06)
--border-hover:   rgba(255,107,0,0.30)   /* orange on interactive hover */
--border-gold:    rgba(200,155,94,0.30)  /* gold on editorial hover */
```

### Typography
```
Display headings:  Cormorant Garamond 700 — hero H1, all section H2s
Body / UI:         Inter (Google Fonts) — body, nav, labels, captions
Mono / Stats:      Geist Mono — CountUp numbers, scoreboard counter
Overline:          10px / 700 weight / 0.25em letter-spacing / uppercase
```

### Spacing
- Section padding: `py-20 md:py-28` (160px / 224px)
- Max content width: `1440px`
- Horizontal padding: `px-6 md:px-12 lg:px-[8%]`
- Card gap: `gap-4` (16px) to `gap-5` (20px)

### Sports Texture
Single `<pattern>` SVG court line at `opacity: 0.025` as CSS `background-image` on alternating `#050505` sections. ~600 bytes inline. Invisible on mobile (hidden via media query).

---

## 6. Home Page — Section Order

All sections live on `app/page.tsx`. Each section is a named component import.

```
1.  <Preloader />            — NEW
2.  <Navbar />               — NEW (Aceternity floating)
3.  <Hero />                 — PORT + extend
4.  <TrustStrip />           — NEW
5.  <Categories />           — PORT (no changes)
6.  <FeaturedProducts />     — PORT + cricket/uniform data
7.  <About />                — PORT (no changes)
8.  <BrandPartners />        — PORT + real logo images
9.  <WhoWeServe />           — PORT (no changes) ← scroll-pinned
10. <Process />              — PORT (no changes)
11. <Clients />              — NEW (rebuilt)
12. <Testimonials />         — PORT (no changes)
13. <BlogPreview />          — NEW (conditional on FEATURES.blogEnabled)
14. <CtaBand />              — PORT (no changes)
15. <Contact />              — PORT (no changes)
16. <Footer />               — PORT + enhance
17. <WhatsAppButton />       — NEW (sticky)
```

---

## 7. Section-by-Section Specification

### 7.1 Preloader
- Full-screen `#050505` overlay, `z-index: 9999`, `position: fixed`
- Animation sequence (Framer Motion timeline):
  1. Three scoreboard-flip spans animate letters M → D → F (50ms stagger each)
  2. 300ms hold
  3. MDF logo image fades in `scale(0.85)→scale(1)`, 400ms
  4. 400ms hold
  5. Entire overlay `opacity(1)→opacity(0)` + `y(0)→y(-20px)`, 500ms
  6. `pointer-events: none` + removed from DOM
- `prefers-reduced-motion`: skip to step 5 immediately (200ms fade)
- Stored in component local state — `useState(true)` → `false` after animation
- Does NOT block page content — content renders beneath, preloader overlays

### 7.2 Navbar
- Fixed top, `z-index: 100`
- Default state: transparent background, full height (72px)
- Scrolled >80px: `bg-black/60 backdrop-blur(16px)`, shrinks to 56px
- Logo: `mdfLogoWtext.webp`, height 48px
- Nav links (center): Home · Products · About · Clients · Blog · Contact
- CTA (right): "Get a Quote" — orange magnetic button → smooth scroll to `#contact`
- Mobile (<768px): hamburger → full-screen overlay with staggered link reveal (Framer Motion `AnimatePresence`)
- Active link detection via `usePathname()`

### 7.3 Hero
**Source:** `zzzSite/Hero.tsx` — structural port

**Changes from zzzSite:**
- Headline changes to: `"FIELD"` (outline stroke) + `"READY."` (orange `#FF6B00`)
- Eyebrow: `J&K's Premier Sports Equipment Hub · Est. 2006`
- Tag line: `Sports · Fitness · Music · Awards · Installation · Service`
- Primary CTA: "Explore Products" → `#products`
- Secondary CTA: "WhatsApp Us" → `https://wa.me/917006252334`
- Left side: Aceternity `SparklesCore` at 8% opacity — ultra-subtle floating particles (disabled mobile / reduced-motion)
- Right slanted panels: use existing `sportsGoods.webp`, `fitness.webp`, `music.webp`, `awards.webp`
- Stats bar bottom: `18+ Years · 1000+ Institutions · 500+ Installations · 25+ Brands` + GeM/MSME badges

**Entry animation:** inherited from zzzSite (`scale 1.06→1, opacity 0→1`, 900ms)

### 7.4 TrustStrip
**Source:** New — Aceternity BorderBeam pattern

- Full-width dark bar `bg-[#0f0f0f]`
- 4 badges in a flex row (2×2 on mobile):
  - 🏛️ GeM Registered — Government e-Marketplace
  - 🏭 MSME Certified — Ministry of MSME, India
  - ⭐ 18+ Years — Established 2006, Srinagar
  - 🏟️ 1000+ Institutions — Across J&K
- `BorderBeam`: gold light trace (`#C89B5E`) runs around the entire strip border, 8s loop
- Badge entry: `BlurFade` stagger 80ms each on scroll entry

### 7.5 Categories
**Source:** `zzzSite/Categories.tsx` — port verbatim

- 4 cards: Sports Goods / Fitness & Wellness / Musical Instruments / Awards & Trophies
- Links: `#products` (same-page anchor) — not separate pages yet
- Images: existing webp assets
- 3D physics tilt on hover (spring stiffness 300, damping 30)
- Gold top-line sweep on hover
- BlurFade stagger entry

### 7.6 FeaturedProducts
**Source:** `zzzSite/FeaturedProducts.tsx` — port + replace data

**Current products data (cricket + uniforms):**
```typescript
export const products: Product[] = [
  // Cricket Equipment
  {
    id: 'ce-1', slug: 'cricket-bat-kashmir-willow',
    name: 'Kashmir Willow Cricket Bat',
    category: 'cricket', brand: 'SS',
    image: '/images/sportsGoods.webp',
    description: 'Grade A Kashmir willow, full size. Ideal for school and club matches.',
    inStock: true, featured: true,
    whatsappText: 'Hi, I am interested in the Kashmir Willow Cricket Bat.',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-2', slug: 'cricket-bat-english-willow',
    name: 'English Willow Cricket Bat',
    category: 'cricket', brand: 'SG',
    image: '/images/sportsGoods.webp',
    description: 'Professional-grade English willow for competitive play.',
    inStock: true, featured: true,
    whatsappText: 'Hi, I am interested in the English Willow Cricket Bat.',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-3', slug: 'cricket-kit-complete',
    name: 'Complete Cricket Kit',
    category: 'cricket', brand: 'Cosco',
    image: '/images/sportsGoods.webp',
    description: 'Full kit: bat, pads, gloves, helmet, guard. School and institutional packs available.',
    inStock: true, featured: true,
    whatsappText: 'Hi, I am interested in a Complete Cricket Kit.',
    createdAt: '2026-01-01',
  },
  {
    id: 'ce-4', slug: 'cricket-ball-leather',
    name: 'Leather Cricket Ball',
    category: 'cricket', brand: 'SG',
    image: '/images/sportsGoods.webp',
    description: 'Red/white leather ball, tournament grade. Available in bulk for institutions.',
    inStock: true, featured: false,
    whatsappText: 'Hi, I am interested in Leather Cricket Balls (bulk).',
    createdAt: '2026-01-01',
  },
  // Uniforms / Jerseys
  {
    id: 'u-1', slug: 'cricket-jersey-custom',
    name: 'Custom Cricket Jersey',
    category: 'uniform', brand: 'MDF',
    image: '/images/sportsGoods.webp',
    description: 'Sublimation-printed custom jerseys. School/club/team branding. Min order 10 pcs.',
    inStock: true, featured: true,
    whatsappText: 'Hi, I want to order Custom Cricket Jerseys with team branding.',
    createdAt: '2026-01-01',
  },
  {
    id: 'u-2', slug: 'sports-uniform-set',
    name: 'Sports Uniform Set',
    category: 'uniform', brand: 'MDF',
    image: '/images/sportsGoods.webp',
    description: 'Jersey + trouser set. Multiple sports. Custom numbers and names.',
    inStock: true, featured: true,
    whatsappText: 'Hi, I am interested in Sports Uniform Sets.',
    createdAt: '2026-01-01',
  },
]
```

**Component changes from zzzSite FeaturedProducts:**
- Section heading: "What We Have In Stock" / "Cricket & Uniforms."
- Category filter chips at top: `All | Cricket | Uniforms` — client-side filter
- Each card: category badge (orange for Cricket, gold for Uniforms)
- "Enquire" button opens WhatsApp with product-specific pre-filled text
- "View All" link → `/products`
- Grid: 3-col desktop, 2-col tablet, 1-col mobile
- 3D tilt (inherited from zzzSite card)

### 7.7 About
**Source:** `zzzSite/About.tsx` — port verbatim

- Left: "More Than A Supplier. We're Your Partner." copy
- Right: parallax image (`sportsGoods.webp` as placeholder until real store photo)
- Stats bar: CountUp `18+ · 1000+ · 500+ · 25+`
- Features grid: 6 items (Wide Range, Quality Assurance, Expert Installation, Pan India Delivery, Custom Solutions, After-Sales Support)

### 7.8 BrandPartners
**Source:** `zzzSite/BrandPartners.tsx` — port + upgrade

**Change:** Switch from text-only grid to real logo images:
```
jonexLogo.webp, yonexLogo.webp, coscoLogo.webp, niviaLogo.webp,
spartanLogo.webp, sslogo.webp, sgLogo.webp, stagLogo.webp, netcoLogo.webp
```
Each logo in a white pill container (`bg-white rounded-full px-8 py-4`). Hover: scale 1.08, orange drop shadow. Filter: grayscale 0.4 → 0 on hover.

Dealer CTA strip kept from zzzSite.

### 7.9 WhoWeServe
**Source:** `zzzSite/WhoWeServe.tsx` — port verbatim, no changes

Scroll-pinned sticky left, 4 right-scrolling panels:
1. For Retail — Walk In. Walk Out Equipped.
2. For Institutions — Built for Schools, Colleges & Academies.
3. For Government — GeM Ready. MSME Certified.
4. Installation & Service — We Don't Just Sell.

### 7.10 Process (How We Work)
**Source:** `zzzSite/Process.tsx` — port verbatim

Steps already correct: Consult → Source → Deliver → Install & Support.

### 7.11 Clients
**Source:** New — rebuilt from `mdfSite-` client section

- Section: "Proven Experience" / "Trusted by Institutions & Departments."
- 4-col → 2-col → 1-col grid
- 8 cards: DYSS, Kashmir University, J&K Police, CRPF, Govt Medical College, SKAUST, DSEK, Cluster University
- Each card: `client-card` pattern — logo (white circle bg), name, type badge
- Entry: staggered `translateY(50px)→0, scale(0.94)→1` with 80ms delays
- Hover: lift 14px, orange glow border, logo scale 1.15 + rotate 4°
- Images: existing webp assets from `mdfSite-/images/`

Data typed as `Client` interface in `lib/data/clients.ts` for future admin CRUD.

### 7.12 Testimonials
**Source:** `zzzSite/Testimonials.tsx` — port verbatim

Two infinite marquee rows (left + right). Seed 6 testimonials from J&K institutions.

### 7.13 BlogPreview
**Source:** New — conditional on `FEATURES.blogEnabled`

- Section: "From The Field" / "Sports & Procurement Insights."
- Latest 3 posts from `lib/data/blog.ts` where `featured: true`
- 3-col desktop, 1-col mobile
- Each card: category tag (orange), headline (Cormorant), excerpt, read time, "Read →"
- "View All Articles →" link → `/blog`
- Entry: BlurFade stagger

**Seed blog posts:**
1. "How to Procure Sports Equipment Through GeM Portal" (GeM Guides)
2. "Top 5 Cricket Drills for School Teams in Kashmir" (Sports)
3. "Setting Up a School Gymnasium: What You Need to Know" (Fitness)

### 7.14 CtaBand
**Source:** `zzzSite/CtaBand.tsx` — port verbatim

Parallax grid background, large "Ready to Equip Your Institution?" CTA with 3 magnetic buttons.

### 7.15 Contact
**Source:** `zzzSite/Contact.tsx` — port verbatim

- `id="contact"` for scroll anchor from navbar CTA
- Left: phone, WhatsApp, address
- Right: form → WhatsApp pre-fill
- Floating WhatsApp button extracted to `WhatsAppButton.tsx` and moved to `layout.tsx`

### 7.16 Footer
**Source:** `mdfSite-` enhanced

3-col:
- MDF logo + "Sports. Fitness. Music. Awards. One call." + GeM badge
- Quick Links: Home, Products, About, Clients, Blog, Contact
- We Serve: Government Departments, Educational Institutions, Private Organisations, Sports Clubs & Academies

Bottom bar: © 2026 MDF Enterprises · `mdfenterprisesjk@gmail.com` · +91 70062 52334

Schema.org JSON-LD ported from existing `mdfSite-` (enhanced).

### 7.17 WhatsAppButton
**Source:** New — extracted from `zzzSite/Contact.tsx`

Fixed `bottom-6 right-6 z-50`. Green circle (`#25d366`). CSS keyframe `pulse` ring animation.  
Hover: expands right → "Chat with us" label slides in.  
After 30s on page: small tooltip "Need help?" appears once, auto-dismisses after 5s.

---

## 8. Products Page (`/products`)

### `/products` — Category Selector
Same 4 category cards as home `Categories` section, full-screen grid.  
Each card links to `/products/[category]`.

### `/products/[category]` — Product Grid
- Valid params: `cricket`, `uniform`, `fitness`, `music`, `awards`
- `generateStaticParams()` from categories list
- Filter bar: brand chips (client-side, no navigation)
- 3-col → 2-col → 1-col product grid
- Each card: `ProductCard` component (extracted from `FeaturedProducts`)
- "No products yet" empty state for categories with no data (Fitness/Music/Awards)
- Skeleton shimmer loading (Magic UI)

**Future:** swap `lib/data/products.ts` static array with `fetch('/api/products?category=...')`.

---

## 9. Blog Page (`/blog`)

### `/blog` — Post Listing
- Hero post (first featured): full-bleed image card, large Cormorant headline
- Below: 2-col grid of remaining posts
- Tag filter chips: All / Sports / Fitness / Awards / GeM Guides
- Client-side filter with `useState`

### `/blog/[slug]` — Single Post
- `generateStaticParams()` from blog data
- Full-bleed cover image header
- Cormorant headline, meta (date, read time, category tag)
- Body: rendered from `content` field (plain HTML for now; swap to MDX when needed)
- Related posts (same category, max 2) at bottom
- Back to blog link

**Future:** swap `lib/data/blog.ts` with `fetch('/api/blog/[slug]')` from headless CMS.

---

## 10. Performance & Device Support

### Animation Safety
- Every Framer Motion component checks `useReducedMotion()`
- On `true`: all enter animations set `initial={}`, motion values skip, no layout shift
- 3D tilt: disabled on touch devices (`'ontouchstart' in window` check)
- Particles (SparklesCore): disabled on mobile viewport (`window.innerWidth < 768`)

### Image Optimization
- All images via Next.js `<Image>` with `sizes` prop for responsive srcsets
- Existing webp assets: all already optimized (from `mdfSite-/images/`)
- `priority` flag on hero images (LCP)
- `loading="lazy"` on below-fold images

### JavaScript Budget
- Page-level code splitting via App Router (each route is its own chunk)
- No dynamic imports needed — Framer Motion tree-shakes well
- Target: <200kb JS on home page (gzip)

### CSS
- Tailwind v4 purge removes unused classes
- Court-line SVG texture: inline CSS background-image, ~600 bytes, not a network request

### Low-End Device Strategy
- Lenis smooth scroll: `lerp: 0.1` (same as current site)
- WhoWeServe scroll-pinned section: `minHeight: shouldReduce ? 'auto' : '400vh'` — stacks normally on reduced-motion
- No WebGL, no canvas animations, no Three.js

---

## 11. SEO & Metadata

### Metadata (Next.js `generateMetadata`)
```typescript
// app/layout.tsx — global defaults
export const metadata: Metadata = {
  title: { default: 'MDF Enterprises | Sports, Fitness, Music & Awards — Srinagar, J&K', template: '%s | MDF Enterprises' },
  description: 'Sports goods, fitness equipment, musical instruments & custom trophies in Srinagar. GeM-registered supplier for institutions, schools & clubs across J&K.',
  openGraph: { /* ... */ },
  robots: { index: true, follow: true },
}
```

### Schema.org
- `Store` type (ported from current site, enhanced with `product` and `review` fields)
- `BreadcrumbList` on `/products/[category]`
- `Article` on `/blog/[slug]`

### Technical
- `sitemap.ts` via Next.js (auto-generates from routes)
- `robots.ts` (allow all, disallow `/admin`)
- Canonical URLs via `metadataBase`

---

## 12. Responsive Breakpoints

| Breakpoint | Columns | Key Changes |
|-----------|---------|------------|
| Mobile <640px | 1 col | WhoWeServe unstacks, hero panels hidden, tilt disabled, particles off |
| Tablet 640–1024px | 2 col | Stats bar 2×2, category grid 2 col |
| Desktop >1024px | 3–4 col | All animations active, scroll-pinned WhoWeServe enabled, side panels visible |

---

## 13. Open Questions (Resolved)

| Question | Decision |
|----------|----------|
| Tech stack | Next.js 16 + Framer Motion v12 + Tailwind v4 |
| Home page strategy | Maximum on one page — all 15+ sections on `/` |
| Products now | Cricket Equipment + Uniforms/Jerseys only |
| Blog now | 3 seed posts, static data |
| Admin now | Folder structure stubbed, `notFound()` until auth added |
| DB now | Static data in `lib/data/*.ts` — typed for API swap |
| Deployment | Same domain `mdfenterprisesjk.in` — Vercel recommended |

---

## 14. Out of Scope (This Phase)

- Real admin dashboard UI (stub only)
- DB connection (Prisma / Supabase) — data layer typed and ready
- Payment or e-commerce
- Search functionality
- User accounts
- Three.js or WebGL hero effects
- Real product images (using existing webp as placeholders)
