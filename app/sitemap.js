import { site, products, solutions, work, posts } from "@/lib/content";
export default function sitemap() {
  const u = (p, priority = 0.7) => ({ url: `${site.url}${p}`, lastModified: new Date(), priority });
  return [
    u("/", 1), u("/collections", 0.9), u("/customisation", 0.8), u("/gallery", 0.8), u("/work", 0.8), u("/about", 0.7), u("/journal", 0.6), u("/quote", 0.9), u("/design-your-notebook", 0.9),
    ...solutions.map((s) => u(`/solutions/${s.slug}`, 0.9)),
    ...products.map((p) => u(`/collections/${p.id}`, 0.7)),
    ...work.map((w) => u(`/work/${w.slug}`, 0.6)),
    ...posts.map((p) => u(`/journal/${p.slug}`, 0.6)),
  ];
}
