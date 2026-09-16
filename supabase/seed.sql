-- Run after schema.sql. Safe to re-run — uses ON CONFLICT DO NOTHING on slug/sku.
-- Placeholder image paths point at the bundled SVG placeholders; replace with
-- real Cloudinary URLs any time by updating the `images` column — no redeploy needed.

insert into product_categories (name, slug) values
  ('Bespoke Leather Journals', 'bespoke-leather'),
  ('Pocket Journals', 'pocket-journal')
on conflict (slug) do nothing;

do $$
declare
  cat_leather uuid;
  cat_pocket uuid;
  p_id uuid;
begin
  select id into cat_leather from product_categories where slug = 'bespoke-leather';
  select id into cat_pocket from product_categories where slug = 'pocket-journal';

  -- TONI HERITAGE ------------------------------------------------------
  insert into products (slug, name, collection, category_id, tagline, description, inspired_by, binding_style, materials, images, featured, available)
  values (
    'toni-heritage-leather-journal', 'Toni Heritage Leather Journal', 'Mansa Vintage Leather', cat_leather,
    'Where Tradition Meets Bold, Modern Design',
    'A blend of genuine leather and African gele fabric, each piece unique. A contemporary African interpretation of the half-bound binding style, used in fine bookmaking since the 18th century.',
    'Toni Akhibi — who exudes strength, joy, and bold self-expression.',
    'Half-bound', 'Genuine leather and African gele fabric',
    array['/images/products/toni-heritage.svg'], true, true
  ) on conflict (slug) do nothing returning id into p_id;
  if p_id is not null then
    insert into product_variants (product_id, label, sku, price) values (p_id, 'A5', 'YSD-TONI-A5', 105000);
  end if;

  -- ZABA COPTIC ---------------------------------------------------------
  insert into products (slug, name, collection, category_id, tagline, description, inspired_by, binding_style, materials, images, featured, available)
  values (
    'zaba-coptic-leather-journal', 'Zaba Coptic Leather Journal', 'Mansa Vintage Leather', cat_leather,
    'Ancient Technique, Contemporary Form',
    'One of the earliest bookbinding techniques, dating back to early Christian Egypt (2nd–4th century AD). Reinterpreted with modern African materials and craft.',
    'Hajiya Gambo Sawaba — courage and social change.',
    'Coptic-bound', 'Genuine leather',
    array['/images/products/zaba-coptic.svg'], true, true
  ) on conflict (slug) do nothing returning id into p_id;
  if p_id is not null then
    insert into product_variants (product_id, label, sku, price) values
      (p_id, 'A6', 'YSD-ZABA-A6', 70000),
      (p_id, 'A5', 'YSD-ZABA-A5', 130000);
  end if;

  -- TAI LONGSTITCH --------------------------------------------------------
  insert into products (slug, name, collection, category_id, tagline, description, inspired_by, binding_style, materials, images, featured, available)
  values (
    'tai-longstitch-leather-journal', 'Tai Longstitch Leather Journal', 'Mansa Vintage Leather', cat_leather,
    'Vintage Binding · Genuine Leather · Boldly African',
    'A historic European binding method from the medieval period, known for strength and flexibility. Reimagined with bold materials and African character.',
    'Tai Solarin — fearless thinking and independence.',
    'Longstitch', 'Genuine leather',
    array['/images/products/tai-longstitch.svg'], true, true
  ) on conflict (slug) do nothing returning id into p_id;
  if p_id is not null then
    insert into product_variants (product_id, label, sku, price) values
      (p_id, 'A6, without lining', 'YSD-TAI-A6', 70000),
      (p_id, 'A6, with lining + pockets', 'YSD-TAI-A6L', 105000),
      (p_id, 'A5, without lining', 'YSD-TAI-A5', 105000),
      (p_id, 'A5, with lining + pockets', 'YSD-TAI-A5L', 150000);
  end if;

  -- AJALA TRAVELLERS FOLIO — price pending confirmation, listed but disabled --
  insert into products (slug, name, collection, category_id, tagline, description, inspired_by, binding_style, materials, images, featured, available, unavailable_reason)
  values (
    'ajala-travellers-folio', 'Ajala Travellers Folio', 'Mansa Vintage Leather', cat_leather,
    'Refillable. Portable. Purposeful.',
    'Our African interpretation of the traveller''s journal system — portable, adaptable, and designed to evolve with you. Refillable with 2 Devo mini inserts.',
    'Moshood Ajala — a Nigerian traveller who journeyed across the world by motorcycle.',
    'Refillable traveller''s system', 'Genuine leather',
    array['/images/products/ajala-folio.svg'], false, false, 'Price being finalised — check back soon.'
  ) on conflict (slug) do nothing returning id into p_id;
  if p_id is not null then
    insert into product_variants (product_id, label, sku, price) values
      (p_id, 'A6', 'YSD-AJALA-A6', 70000),
      (p_id, 'A5', 'YSD-AJALA-A5', 95000);
  end if;

  -- DEVO LEATHER POCKET JOURNAL -------------------------------------------
  insert into products (slug, name, collection, category_id, tagline, description, inspired_by, materials, images, featured, available)
  values (
    'devo-leather-pocket-journal', 'Devo Leather Pocket Journal', 'Mansa Vintage Leather', cat_pocket,
    'Small in Size. Deep in Purpose.',
    'A flexible set of 2 notebook inserts designed for everyday writing and refillable systems. Compact, refined, and built to move with you — also fits Ajala Folios.',
    'Stella Adadevoh — whose courage helped stop the Ebola outbreak in Nigeria.',
    'Printed cover or genuine goatskin leather',
    array['/images/products/devo-pocket.svg'], true, true
  ) on conflict (slug) do nothing returning id into p_id;
  if p_id is not null then
    insert into product_variants (product_id, label, sku, price) values
      (p_id, 'A6, printed', 'YSD-DEVO-A6P', 7500),
      (p_id, 'A5, printed', 'YSD-DEVO-A5P', 8500),
      (p_id, 'A6, goatskin leather', 'YSD-DEVO-A6G', 12000),
      (p_id, 'A5, goatskin leather', 'YSD-DEVO-A5G', 15000);
  end if;
end $$;
