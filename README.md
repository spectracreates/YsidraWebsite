# YSIDRA website (v2)

Next.js 14 (App Router, JavaScript), plain CSS, no database. Deploys on Vercel with zero config.

## Pages
| Route | What |
|---|---|
| `/` | Home: hero slideshow (or video), quick rail, stats, use-case stack, client strip, signature pieces, cover marquees, finishes, process, projects, testimonials, gallery, impact, CTA |
| `/collections`, `/collections/[slug]` | 5 collections, 21 product pages (incl. branded gifts from the 2026 Q3 price list) |
| `/solutions/corporate` `events` `gifting` `keepsakes` | Industry pages with FAQs (FAQ schema) |
| `/customisation` | Finishes, inside pages, process |
| `/gallery` | Filterable mosaic with lightbox and WhatsApp enquiry |
| `/work`, `/work/[slug]` | 9 named client projects |
| `/about` | Story, founder, name and mark, values, YSIDRA standard, impact |
| `/journal`, `/journal/[slug]` | Articles (Article schema) |
| `/quote` | 4-step quote form, sends to WhatsApp (and email if a Web3Forms key is set) |
| `/sitemap.xml`, `/robots.txt` | Generated |

Old Blogger URLs (`/p/our-portfolio.html`, `/p/about-us.html`) redirect to the new pages.

## Edit content
Everything lives in `lib/content.js`: contact details, stats, clients, testimonials, products, solutions, finishes, projects, gallery, about text, journal posts.

- **Testimonials:** add `{ quote, name, role, company }` objects to `testimonials`. They appear on the home page in groups of four; the section stays hidden while the list is empty.
- **Hero video:** put the file in `public/video/hero.mp4` and set `heroVideo: "/video/hero.mp4"`.
- **Photos:** drop JPGs (about 1600px wide) into `public/img/`, then add their name to `lib/sizes.json` as `"name":[width,height]` and use the name in content.
- **Quote emails (optional):** create a free key at web3forms.com for hello@ysidra.com and add `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel > Settings > Environment Variables.

## Run locally
```
npm install
npm run dev
```

## Go live
1. Vercel > Add New Project > import `spectracreates/YsidraWebsite`, branch `redesign-2026` (preview), then merge to `main` when approved.
2. Domain: add `www.ysidra.com` in Vercel > Domains, then point the `www` CNAME at GoDaddy to `cname.vercel-dns.com` (this moves the site off Blogger, so only after Yeye signs off).
