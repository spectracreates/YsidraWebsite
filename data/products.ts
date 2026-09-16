import { Product } from "@/types";

/**
 * SOURCE OF TRUTH NOTE
 * ─────────────────────────────────────────────────────────────
 * This file is a local fallback/seed only. In production, products are
 * served from Supabase (see supabase/schema.sql + supabase/seed.sql).
 * All names, descriptions, inspirations and prices below are taken
 * directly from the approved "Mansa Vintage Leather Journals" catalogue
 * PDF — nothing here is invented.
 *
 * Images are PLACEHOLDERS (see /public/images/products/*.svg — plain
 * cards with the product name printed on them). Replace by uploading
 * the real photography to Cloudinary and pasting the resulting URL(s)
 * into the `images` array here, or directly into the `products.images`
 * column in Supabase once connected — no code changes required either way.
 */

export const products: Product[] = [
  {
    id: "toni-heritage",
    slug: "toni-heritage-leather-journal",
    name: "Toni Heritage Leather Journal",
    collection: "Mansa Vintage Leather",
    tagline: "Where Tradition Meets Bold, Modern Design",
    description:
      "A blend of genuine leather and African gele fabric, each piece unique. A contemporary African interpretation of the half-bound binding style, used in fine bookmaking since the 18th century.",
    inspired_by: "Toni Akhibi — who exudes strength, joy, and bold self-expression.",
    binding_style: "Half-bound",
    materials: "Genuine leather and African gele fabric",
    category: "bespoke-leather",
    variants: [{ id: "toni-a5", label: "A5", price: 105000, sku: "YSD-TONI-A5" }],
    images: ["/images/products/toni-heritage.svg"],
    featured: true,
    available: true,
  },
  {
    id: "zaba-coptic",
    slug: "zaba-coptic-leather-journal",
    name: "Zaba Coptic Leather Journal",
    collection: "Mansa Vintage Leather",
    tagline: "Ancient Technique, Contemporary Form",
    description:
      "One of the earliest bookbinding techniques, dating back to early Christian Egypt (2nd–4th century AD). Reinterpreted with modern African materials and craft.",
    inspired_by: "Hajiya Gambo Sawaba — courage and social change.",
    binding_style: "Coptic-bound",
    materials: "Genuine leather",
    category: "bespoke-leather",
    variants: [
      { id: "zaba-a6", label: "A6", price: 70000, sku: "YSD-ZABA-A6" },
      { id: "zaba-a5", label: "A5", price: 130000, sku: "YSD-ZABA-A5" },
    ],
    images: ["/images/products/zaba-coptic.svg"],
    featured: true,
    available: true,
  },
  {
    id: "tai-longstitch",
    slug: "tai-longstitch-leather-journal",
    name: "Tai Longstitch Leather Journal",
    collection: "Mansa Vintage Leather",
    tagline: "Vintage Binding · Genuine Leather · Boldly African",
    description:
      "A historic European binding method from the medieval period, known for strength and flexibility. Reimagined with bold materials and African character.",
    inspired_by: "Tai Solarin — fearless thinking and independence.",
    binding_style: "Longstitch",
    materials: "Genuine leather",
    category: "bespoke-leather",
    variants: [
      { id: "tai-a6-plain", label: "A6, without lining", price: 70000, sku: "YSD-TAI-A6" },
      { id: "tai-a6-lined", label: "A6, with lining + pockets", price: 105000, sku: "YSD-TAI-A6L" },
      { id: "tai-a5-plain", label: "A5, without lining", price: 105000, sku: "YSD-TAI-A5" },
      { id: "tai-a5-lined", label: "A5, with lining + pockets", price: 150000, sku: "YSD-TAI-A5L" },
    ],
    images: ["/images/products/tai-longstitch.svg"],
    featured: true,
    available: true,
  },
  {
    id: "ajala-travellers-folio",
    slug: "ajala-travellers-folio",
    name: "Ajala Travellers Folio",
    collection: "Mansa Vintage Leather",
    tagline: "Refillable. Portable. Purposeful.",
    description:
      "Our African interpretation of the traveller's journal system — portable, adaptable, and designed to evolve with you. Refillable with 2 Devo mini inserts.",
    inspired_by:
      "Moshood Ajala — a Nigerian traveller who journeyed across the world by motorcycle.",
    binding_style: "Refillable traveller's system",
    materials: "Genuine leather",
    category: "bespoke-leather",
    variants: [
      { id: "ajala-a6", label: "A6", price: 70000, sku: "YSD-AJALA-A6" },
      { id: "ajala-a5", label: "A5", price: 95000, sku: "YSD-AJALA-A5" },
    ],
    images: ["/images/products/ajala-folio.svg"],
    featured: false,
    // Catalogue shows these prices struck through / under revision — do NOT sell
    // at this price until confirmed. Listed for visibility, purchase disabled.
    available: false,
    unavailable_reason: "Price being finalised — check back soon.",
  },
  {
    id: "devo-pocket-journal",
    slug: "devo-leather-pocket-journal",
    name: "Devo Leather Pocket Journal",
    collection: "Mansa Vintage Leather",
    tagline: "Small in Size. Deep in Purpose.",
    description:
      "A flexible set of 2 notebook inserts designed for everyday writing and refillable systems. Compact, refined, and built to move with you — also fits Ajala Folios.",
    inspired_by:
      "Stella Adadevoh — whose courage helped stop the Ebola outbreak in Nigeria.",
    materials: "Printed cover or genuine goatskin leather",
    category: "pocket-journal",
    variants: [
      { id: "devo-a6-printed", label: "A6, printed", price: 7500, sku: "YSD-DEVO-A6P" },
      { id: "devo-a5-printed", label: "A5, printed", price: 8500, sku: "YSD-DEVO-A5P" },
      { id: "devo-a6-goatskin", label: "A6, goatskin leather", price: 12000, sku: "YSD-DEVO-A6G" },
      { id: "devo-a5-goatskin", label: "A5, goatskin leather", price: 15000, sku: "YSD-DEVO-A5G" },
    ],
    images: ["/images/products/devo-pocket.svg"],
    featured: true,
    available: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
