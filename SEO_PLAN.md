# Search Visibility Plan: mdfenterprisesjk.in

Date: 24 October 2026. Scope: classic search (Google, Bing), local pack and Maps, and AI answers (Google AI Overviews, ChatGPT, Perplexity, Gemini, Copilot).

## Where the site stands

The technical base is already good, so most remaining gains are off-site.

- Every public route sets its own title, description, canonical and Open Graph URL on the server.
- Structured data covers LocalBusiness/SportingGoodsStore, WebSite, BreadcrumbList, ItemList, BlogPosting, and FAQPage on the home page and each department page.
- robots.txt allows all major AI crawlers and keeps `/admin` and `/api` out. The sitemap carries images and honest lastmod dates, and unreviewed AI articles are noindexed and left out of it.
- Department pages target "X shop in Srinagar" phrasing and carry their own FAQ blocks.

No code change can promise the top spot. For "sports shop Srinagar" type searches, the local pack is decided mostly by the Google Business Profile, distance from the searcher, and reviews. The site supports that but cannot replace it.

## Gaps found in the code

| # | Problem | Effect | Fix |
|---|---|---|---|
| 1 | `public/llms.txt` is a static file. It links a retired URL (`/blog/best-cricket-equipment-brands-india-2026`, which now redirects) and never shows new articles or admin edits. | AI crawlers read stale facts. | Generate `/llms.txt` from the database: contact, departments and published articles. |
| 2 | The LocalBusiness schema hardcodes the street, hours and map link. The admin edits these in "Phone, WhatsApp & address". | Changing the hours in the admin leaves the schema wrong. Google flags the mismatch, and AI answers quote stale hours. | Build the schema from the admin's contact details. |
| 3 | The home page FAQ, which is also the FAQPage schema, lives in code. The admin cannot edit it, and the phone, email and address are typed into the answers. | It goes out of sync whenever contact details change. | Move the FAQ into the admin's text system and fill phone, email and address in automatically. |
| 4 | `sameAs` is empty. | Search engines and AI models can't tie the site to its Maps, GeM or IndiaMART listings. | Add a "Business profiles" list to the admin. The owner pastes the real URLs, and nothing is invented. |
| 5 | The hero video lists the 5 MB mp4 before the 0.8 MB webm, so every browser, phones included, downloads the larger file. | Slow LCP and heavy data use on mobile. | Choose the file by screen width. |
| 6 | Preconnects to fonts.googleapis.com and fonts.gstatic.com remain, but `next/font` self-hosts the fonts. | Two wasted connections on every page. | Remove them. |
| 7 | There is no Terms page, and Privacy is dated 21 Oct. | Weaker trust signals (E-E-A-T). | Add `/terms`, refresh `/privacy` with Indian law (DPDP Act 2023) and a grievance contact, and give both one shared date. |
| 8 | The schema has no founder entity. | The founder story ("Syed Mumtaz, 1997") is only in prose. | Add `founder` as a Person in the schema, using the admin's founder name. |

All eight are done in this pass. See "What changed" below.

## Owner-only actions (highest ranking value)

These need the business owner's own logins. They matter more than any further code change.

1. **Google Business Profile.** Claim and verify it. Use "Sporting goods store" as the primary category, plus "Fitness equipment store", "Musical instrument store" and "Trophy shop". Use the same name, address and phone as the site. Add 20+ real photos of the showroom and stock, set the hours, and post weekly.
2. **Reviews.** After each order, send the review link over WhatsApp. Reply to every review. Review count and recency are the biggest movable local-pack factors.
3. **Search Console and Bing Webmaster.** Create both properties and put the codes into Vercel as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`. The code already reads them. Then submit `https://mdfenterprisesjk.in/sitemap.xml` and run `npm run indexnow` after big changes.
4. **Citations.** List the business on IndiaMART, JustDial, Sulekha and TradeIndia, and keep the GeM seller page current. Name, address and phone must match the site exactly. Paste each profile URL into Admin → Text → "Google & sharing" → Business profiles.
5. **Links that count locally.** Get mentioned in J&K news (a tournament sponsorship, a school gym installation), on supplier lists of the schools and departments you serve, and through local sports association sponsorships.
6. **Confirm the legal details.** Check the Terms page. Governing law and Srinagar jurisdiction, payment methods and the warranty wording are standard text. Change anything that doesn't match how you work. No refund window, GSTIN or delivery time was added, because none was confirmed.

## Content plan (next, not done in this pass)

- **Location pages.** Write them only where there is real local proof, such as `/supply/jammu` or `/supply/baramulla`, each listing actual institutions served, delivery times and installation photos from that district. Template pages that only swap the city name get filtered as doorway pages, so skip them until real material exists.
- **Buyer guides the AI writer should cover.** GeM bid process for schools, Khelo India equipment lists, how to set up an outdoor gym for a panchayat, cricket kit lists by age, choosing between harmonium and keyboard for a school music room. Each answer should open with a direct two-sentence reply, which is what AI Overviews quote.
- **Review the AI articles.** Unreviewed articles stay noindexed. Once someone reads one and marks it reviewed in the admin, it gets indexed, so a weekly review habit turns the writer into ranking pages.

## Your question: per-route server-side meta on the Vercel free tier

Yes. Per-route `generateMetadata` is plain Next.js. It renders on the server at build time or on revalidation, with no paid feature involved, and this site already uses it on every route.

One separate caveat: Vercel's Hobby plan is for personal, non-commercial use under its fair-use terms. A business website technically belongs on Pro. That is a billing and terms point, not a technical limit. See https://vercel.com/docs/limits/fair-use-guidelines.

## What changed in this pass

- `app/llms.txt/route.ts` is a new route built from live data. The old static `public/llms.txt` is removed.
- `app/layout.tsx`: the schema now comes from the admin contact details and adds a founder and `sameAs`. The dead font preconnects are gone.
- `lib/content/copy.ts`: new `home_faq` section and `seo.profiles` field in the admin. `{phone}`, `{email}` and `{address}` placeholders work in any text.
- `components/home/Faq.tsx` now reads the admin FAQ, and `lib/content/faq.ts` is removed.
- The department page FAQs (`lib/content/departments.ts`) use `{phone}` and `{email}`, so they follow the admin's contact details too. The "Monday to Saturday, 10:00 to 19:00" line in the sports FAQ is still typed by hand.
- `app/terms/page.tsx` is new. `app/privacy/page.tsx` is refreshed. `lib/content/legal.ts` holds the shared date. The sitemap and footer now include Terms.
- Hero video: screens under 1280px get the 0.8 MB webm, and wide screens keep the 720p mp4.
- The JSON-LD that carries admin-typed text escapes `<`, so a stray `</script>` can't break the page.

## Verified

- Build, typecheck, lint, `npm run check` and `npm run check:ui` pass with 0 failures. The 6 warnings were already there.
- Rendered HTML has the right canonical and title on /, /products, /products/sports, /blog, /privacy and /terms.
- The home schema shows the admin's hours, address, founder and map link, and the FAQ schema has 10 questions with the phone and email filled in.
- `/llms.txt` serves live data with no retired links. `/terms` is in sitemap.xml and the footer.
- No horizontal scroll at 320, 375, 768, 1024, 1440 or 1920 px on home, products, a department, the blog, an article, privacy, terms and admin login.
