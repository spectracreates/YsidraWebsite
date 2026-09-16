/**
 * Seeds Supabase with the product catalogue defined in data/products.ts.
 * Alternative to running supabase/seed.sql directly in the SQL editor —
 * use whichever you prefer, they produce the same result.
 *
 * Usage:
 *   npm run seed
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to be set
 * (e.g. in .env.local — this script loads that file automatically).
 */
import { createClient } from "@supabase/supabase-js";
import { products } from "../data/products";
import * as fs from "fs";
import * as path from "path";

// Minimal .env.local loader so this works with a plain `tsx` run.
function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) process.env[match[1]] = match[2];
  }
}
loadEnvLocal();

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
        "Add them to .env.local first, or run supabase/seed.sql directly in the Supabase SQL editor instead."
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  for (const product of products) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", product.slug)
      .single();

    if (existing) {
      console.log(`Skipping "${product.name}" — already exists.`);
      continue;
    }

    const { data: inserted, error } = await supabase
      .from("products")
      .insert({
        slug: product.slug,
        name: product.name,
        collection: product.collection,
        tagline: product.tagline,
        description: product.description,
        inspired_by: product.inspired_by,
        binding_style: product.binding_style,
        materials: product.materials,
        images: product.images,
        featured: product.featured,
        available: product.available,
        unavailable_reason: product.unavailable_reason,
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error(`Failed to insert "${product.name}":`, error?.message);
      continue;
    }

    const variantRows = product.variants.map((v) => ({
      product_id: inserted.id,
      label: v.label,
      sku: v.sku,
      price: v.price,
    }));

    const { error: variantError } = await supabase
      .from("product_variants")
      .insert(variantRows);

    if (variantError) {
      console.error(`Failed to insert variants for "${product.name}":`, variantError.message);
    } else {
      console.log(`Seeded "${product.name}" with ${variantRows.length} variant(s).`);
    }
  }

  console.log("Done.");
}

main();
