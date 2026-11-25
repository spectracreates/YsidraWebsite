import sizes from "./sizes.json";
import { products, site, categories } from "./content";

export const img = (name) => `/img/${name}.jpg`;
export const dims = (name) => {
  const s = sizes[name] || [1200, 1200];
  return { width: s[0], height: s[1] };
};
export const productBySlug = (slug) => products.find((p) => p.id === slug);
export const categoryLabel = (id) => (categories.find((c) => c.id === id) || {}).label || id;
export const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const fmtDate = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
