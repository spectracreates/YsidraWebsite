# Ysidra — Website & Store

A production-ready Next.js rebuild of the Ysidra website: strategy/design/books
marketing site + a working e-commerce flow (Paystack) for the Mansa Vintage
Leather notebook collection, following the CEO's minimal "catalogue, not
agency site" brief with full shop/cart/checkout functionality underneath.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase
(database + storage) · Paystack (payments) · Vercel (hosting)

---

## 1. What's in this repo

```
app/
  page.tsx                 Home
  books/page.tsx           Book catalogue (shop)
  books/[slug]/page.tsx    Product detail page
  about/page.tsx           About + Impact + Contact (merged, per CEO brief)
  cart/page.tsx            Cart
  checkout/page.tsx        Checkout form
  checkout/success/        Order confirmation (verifies payment)
  admin/                   Staff-only dashboard (orders, products)
  api/
    orders/                 Creates an order — recalculates prices server-side
    paystack/initialize/    Starts a Paystack transaction
    paystack/verify/        Verifies payment when the customer returns
    paystack/webhook/       Independent server-to-server payment confirmation
    contact/                Contact form submission

components/                 UI, product, cart, checkout, admin, contact components
lib/
  supabase/client.ts        Browser Supabase client (anon key)
  supabase/server.ts        Server Component / Route Handler client (anon key + cookies)
  supabase/admin.ts         SERVER-ONLY service-role client (bypasses RLS)
  paystack/index.ts         Paystack initialize/verify/webhook-signature helpers
  cart-context.tsx          Cart state, persisted to localStorage
data/products.ts            Local fallback catalogue (mirrors Supabase seed data)
supabase/schema.sql          Full database schema + Row Level Security policies
supabase/seed.sql            Seeds the real Mansa Vintage Leather catalogue
scripts/seed.ts              Alternative seed script (run via `npm run seed`)
middleware.ts                Protects /admin/* server-side (not just hiding links)
public/images/products/*.svg Placeholder product photography (see §4)
```

---

## 2. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site will run at `http://localhost:3000` and is fully browsable
immediately — product pages, cart, and the catalogue all work using the
local fallback data in `data/products.ts` even before Supabase is connected.
**Checkout, orders, and the admin dashboard require Supabase to be connected**
(see §3) because those must never trust unverified client-side data.

### Environment variables (`.env.local`)

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (⚠️ server-only, never commit, never prefix with `NEXT_PUBLIC_`) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack Dashboard → Settings → API Keys & Webhooks |
| `PAYSTACK_SECRET_KEY` | Paystack Dashboard → Settings → API Keys & Webhooks (⚠️ server-only) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally; your Vercel URL in production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, e.g. `2348183650000` |

Use **Paystack test keys** (`pk_test_...` / `sk_test_...`) until you've fully
tested the flow with test cards. Only switch to live keys at launch (§7).

---

## 3. Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run, in order:
   - `supabase/schema.sql` — creates all tables, constraints, and Row Level
     Security policies.
   - `supabase/seed.sql` — inserts the real Mansa Vintage Leather catalogue
     (Toni Heritage, Zaba Coptic, Tai Longstitch, Devo Pocket Journal). **The
     Ajala Travellers Folio is deliberately inserted as `available: false`**
     because its catalogue price was shown struck-through / under revision —
     do not flip it to available until the correct price is confirmed and
     updated in the `product_variants` table.
   - Alternatively, run `npm run seed` instead of `seed.sql` — same result,
     driven from `data/products.ts`.
3. Create your first admin user: Supabase Dashboard → Authentication → Add
   user (set a password). Then in the SQL editor:
   ```sql
   insert into admin_profiles (user_id, full_name)
   values ('<paste-the-user-id-here>', 'Your Name');
   ```
4. Paste your project's URL and keys into `.env.local` (and into Vercel's
   environment variables for production — see §6).

### Why product photography uses placeholders

The images in `products.images` are plain labelled placeholder SVGs
(`/public/images/products/*.svg`), not the catalogue PDF photos — those are
print-resolution and print-cropped, not clean web assets. To add real photos:

1. Upload the photo to **Cloudinary** (recommended — auto-optimizes format
   and size per device, which matters for slower Nigerian mobile connections).
2. Copy the resulting URL.
3. Update the `images` column for that product in Supabase (Table Editor, or
   via the admin dashboard's product form).

No code change or redeploy is needed — the site reads whatever URL is in
that column.

---

## 4. Connecting Paystack

1. Get your test keys from the Paystack Dashboard and add them to
   `.env.local`.
2. Test the full flow with a
   [Paystack test card](https://paystack.com/docs/payments/test-payments/).
3. Set the webhook URL in the Paystack Dashboard (Settings → API Keys &
   Webhooks → Webhook URL):
   ```
   https://<your-vercel-domain>/api/paystack/webhook
   ```
   This is a **second, independent confirmation path** — it fires even if a
   customer closes their browser before the on-page verification runs, so
   an order is never stuck "pending" just because someone didn't wait for
   the redirect.
4. Only switch `PAYSTACK_SECRET_KEY` / `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` to
   live keys once you've tested pending, successful, and failed payments in
   test mode.

### How payment security works here (per the original brief's requirements)

- The browser **never** determines whether a payment succeeded.
- `/api/orders` recalculates the order total from the database — a
  manipulated client-side price is simply ignored.
- `/api/paystack/verify` re-checks the transaction directly with Paystack's
  API before marking anything paid.
- `/api/paystack/webhook` independently verifies Paystack's signature
  (HMAC SHA512) and re-confirms the same way.
- Both paths write to a `payments` table with a unique constraint on
  `(paystack_reference, status)`, so a duplicate webhook delivery or a
  refreshed success page can never double-process the same payment.

---

## 5. Admin dashboard

Visit `/admin/login`. Only accounts listed in the `admin_profiles` table can
sign in and reach `/admin/*` — this is enforced in `middleware.ts` on the
server, not by hiding the link. From there you can:

- View, search, and filter orders; update order status
- View products and toggle visibility; add new products
- Dashboard shows order counts and paid revenue

This is a working first version — extending it (e.g. per-variant editing,
image upload directly to Cloudinary from the dashboard, CSV export) is
straightforward from here but wasn't in the initial build.

---

## 6. Deploying to Vercel (without touching the live Blogger site)

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all the environment variables from §2 in Vercel's project settings
   (Production, and Preview if you want test-mode previews too).
4. Deploy — you'll get a `*.vercel.app` URL immediately. Use this (or a
   `new.ysidra.com` subdomain, if you'd prefer something more presentable
   for internal review) to test everything before touching the live domain.
5. **The current Blogger site keeps running on `ysidra.com` the entire
   time** — nothing here affects it.
6. When you're ready to switch: in your domain's DNS settings (currently
   pointed at Blogger), replace the A/CNAME records with the ones Vercel
   gives you under Project Settings → Domains. This is a DNS change, not a
   migration — it takes a few minutes to update and up to 24–48 hours to
   fully propagate, and can be reverted the same way if needed.

---

## 7. Pre-launch checklist

- [ ] Confirm Ajala Travellers Folio pricing, update in Supabase, flip
      `available` to `true`
- [ ] Replace all placeholder product images with real Cloudinary URLs
- [ ] Confirm which corporate client names/logos are approved for the
      "Selected Work" section on the homepage (currently generic
      placeholders — see comment in `app/page.tsx`)
- [ ] Create real admin account(s), remove any test accounts
- [ ] Switch Paystack keys from test to live
- [ ] Test: add to cart → checkout → pay → webhook fires → order shows
      "paid" in admin
- [ ] Test on an actual slow mobile connection, not just desktop Wi-Fi
- [ ] Point the domain at Vercel (§6, step 6)
- [ ] Submit `/sitemap.xml` to Google Search Console

---

## 8. Notes on scope decisions

- **Delivery fee is currently ₦0** for every order (per instruction — books
  are being sold without shipping charges for now). The `delivery_fee`
  column exists and is wired through the whole order flow already, so
  turning it on later (flat rate or state-based) is a config change, not a
  rebuild.
- **Corporate/bespoke work** (the diary portfolio — AXA Mansard, Siemens,
  Coronation, etc.) is shown as a "Selected Work" section on the homepage,
  not as purchasable shop items — that's real client work, not catalogue
  stock, per the source material.
- **Currency is NGN only.** No multi-currency logic is included.
