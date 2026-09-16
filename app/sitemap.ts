import { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ysidra.com";
  const staticRoutes = ["", "/books", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/books/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...productRoutes];
}
