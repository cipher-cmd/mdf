# MDF Enterprises

J&K's Premier Equipment Hub · Est. 1997

A modern, high-performance website for MDF Enterprises built with Next.js 16, Framer Motion, and Tailwind CSS. This project replaces the legacy static site with a dynamic, highly scalable web application designed to support future eCommerce and CMS capabilities.

## Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Animation:** [Framer Motion v12](https://www.framer.com/motion/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Scroll:** [Lenis](https://github.com/studio-freight/lenis) for smooth scrolling
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Data Structure:** Data-driven architecture via `/lib/data` (prepped for CMS transition)

## Project Architecture

The application is structured to be "CMS-Ready". All content is currently driven by typed arrays in `lib/data/*.ts`.

*   `app/` - Next.js App Router pages and layouts.
*   `components/` - Reusable UI elements and sections.
    *   `home/` - Components specific to the landing page.
    *   `layout/` - Global components (Navbar, Footer).
    *   `ui/` - Highly reusable primitives (MagneticButton, CustomCursor, etc.).
*   `lib/` - Utilities, config, and static data.

## Getting Started

### Prerequisites

*   Node.js (v18.18.0 or later, v20/v22 LTS recommended)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/cipher-cmd/mdf.git
    cd mdfSite-
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

*   `npm run dev` - Starts the development server.
*   `npm run build` - Creates an optimized production build.
*   `npm run start` - Starts the production server.
*   `npm run lint` - Runs ESLint to check for code quality issues.

## Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com).

### Vercel Settings Configuration

When importing this project into Vercel, use the following settings for the best experience:

*   **Framework Preset:** `Next.js` (Vercel will automatically detect this. Do NOT use "Other").
*   **Root Directory:** `./` (Leave as default or blank unless you put the code in a subfolder).
*   **Node.js Version:** `20.x` or `22.x` LTS (Recommended for stability with Next.js 15+).
*   **Build Command:** `npm run build` (Default Next.js build command).
*   **Install Command:** `npm install` (Default).

Once configured, pushing to the `main` branch will automatically trigger a deployment.

---
*Built for MDF Enterprises.*

## Store manager panel (`/admin`)

Everything customers see is editable at `/admin`: products and photos, departments, every piece of website text, blog articles, and the automatic Article Writer. Saving anything refreshes the cached website instantly; normal visits never touch the database.

### Environment variables (Vercel → Settings → Environment Variables)

| Name | What it is |
| --- | --- |
| `DATABASE_URL` | Neon connection string. The database is shared; this site only uses tables starting with `mdf_`. |
| `ADMIN_PASSWORD` | Owner's password for `/admin` (always works, even after a panel password change). |
| `GROQ_API_KEY` | Free key from console.groq.com for the Article Writer. |
| `CRON_SECRET` | Any long random string. Vercel sends it to `/api/cron/auto-blog`; without it nobody can trigger the writer. |
| `ADMIN_SESSION_SECRET` | Optional. Signs admin sessions; defaults to `ADMIN_PASSWORD`. |

### Database

```bash
npm run db:setup                      # create/upgrade mdf_* tables, add missing starter content (safe to re-run)
npm run db:setup -- --reset-content   # DESTRUCTIVE: replace departments, products and articles with the built-in starter set
```

Uploaded pictures are shrunk to WebP in the browser (~100–300 KB) and stored in `mdf_media`, then served from `/media/<id>.webp` with a one-year cache, so each picture is read from the database about once.

### Article Writer

Vercel Cron calls `/api/cron/auto-blog` once a day (`vercel.json`, 06:00 UTC ≈ 11:30 IST). It writes at most one article per day (a unique `run_day` row is the lock), honours the panel's on/off, "every N days" and "publish or keep as draft" settings, rotates through the admin's topics, grounds each article in fresh Google News reports, then runs an anti-AI-tone pass (`lib/ai/writer.ts`; self-check: `npm run check:writer`). It uses Groq's free `openai/gpt-oss-120b` for writing and `gpt-oss-20b` for editing, so the two calls never share a rate limit.
