-- ============================================================================
-- YSIDRA — SUPABASE SCHEMA
-- Run this once in the Supabase SQL editor (or via `supabase db push`).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ── PRODUCT CATALOGUE ────────────────────────────────────────────────────
create table if not exists product_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  collection text,
  category_id uuid references product_categories(id),
  tagline text,
  description text,
  inspired_by text,
  binding_style text,
  materials text,
  images text[] not null default '{}',      -- Cloudinary URLs; placeholder SVG paths until replaced
  featured boolean not null default false,
  available boolean not null default true,   -- false = listed but purchase disabled
  unavailable_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,                        -- e.g. "A5", "A6 with lining + pockets"
  sku text not null unique,
  price integer not null check (price >= 0),  -- NGN, whole naira, no kobo
  created_at timestamptz not null default now()
);

create index if not exists idx_product_variants_product_id on product_variants(product_id);

-- ── CUSTOMERS (lightweight — full accounts not required for guest checkout) ─
create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

-- ── ORDERS ───────────────────────────────────────────────────────────────
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_id uuid references customers(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  delivery_address text not null,
  city text not null,
  state text not null,
  country text not null default 'Nigeria',
  subtotal integer not null,
  delivery_fee integer not null default 0,
  total_amount integer not null,
  currency text not null default 'NGN',
  payment_status text not null default 'pending'
    check (payment_status in ('pending','paid','failed','refunded')),
  order_status text not null default 'pending'
    check (order_status in ('pending','paid','processing','in_production','ready','shipped','delivered','cancelled')),
  paystack_reference text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_paystack_reference on orders(paystack_reference);
create index if not exists idx_orders_email on orders(customer_email);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  product_name_snapshot text not null,   -- frozen at time of order — see note below
  variant_label_snapshot text,
  unit_price integer not null,           -- frozen price at time of order
  quantity integer not null check (quantity > 0),
  subtotal integer not null
);
-- NOTE: product_name_snapshot / unit_price are intentionally duplicated from
-- products/product_variants so that editing a product later never changes
-- the historical record of what a customer actually paid for.

-- ── PAYMENTS LOG (raw Paystack events, for audit + idempotency) ───────────
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id),
  paystack_reference text not null,
  amount integer not null,
  status text not null,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  unique (paystack_reference, status)   -- guards against double-processing the same event
);

-- ── CONTACT FORM ─────────────────────────────────────────────────────────
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  services text[] default '{}',
  message text,
  created_at timestamptz not null default now()
);

-- ── ADMIN ROLES ──────────────────────────────────────────────────────────
-- Links a Supabase Auth user to admin privileges. Create the auth user
-- first (Supabase Dashboard → Authentication → Add user), then insert
-- their user_id here to grant admin access.
create table if not exists admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_categories enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table contact_messages enable row level security;
alter table customers enable row level security;
alter table admin_profiles enable row level security;

-- Public catalogue is readable by anyone (needed for the storefront).
create policy if not exists "public read products" on products for select using (true);
create policy if not exists "public read variants" on product_variants for select using (true);
create policy if not exists "public read categories" on product_categories for select using (true);

-- Anyone can submit the contact form, but cannot read messages back.
create policy if not exists "anyone can submit contact form" on contact_messages
  for insert with check (true);

-- Orders, payments and customer records are NOT readable/writable by the
-- anon key at all. All order creation, payment verification and admin
-- writes go through server-side API routes using the service role key,
-- which bypasses RLS after the route itself checks admin auth where needed.
-- (No public policies are created for orders / order_items / payments /
-- customers / admin_profiles — default-deny applies.)

-- Admins can manage products once authenticated (used by the admin dashboard).
create policy if not exists "admins manage products" on products
  for all using (exists (select 1 from admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from admin_profiles where user_id = auth.uid()));

create policy if not exists "admins manage variants" on product_variants
  for all using (exists (select 1 from admin_profiles where user_id = auth.uid()))
  with check (exists (select 1 from admin_profiles where user_id = auth.uid()));

create policy if not exists "admins read orders" on orders
  for select using (exists (select 1 from admin_profiles where user_id = auth.uid()));

create policy if not exists "admins update orders" on orders
  for update using (exists (select 1 from admin_profiles where user_id = auth.uid()));

create policy if not exists "admins read order items" on order_items
  for select using (exists (select 1 from admin_profiles where user_id = auth.uid()));
