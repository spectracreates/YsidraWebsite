import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/products/ProductGallery";
import { AddToCartForm } from "@/components/products/AddToCartForm";
import { getProductBySlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <Section className="pt-10 md:pt-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />

          <div>
            <Badge tone="indigo">{product.collection}</Badge>
            <h1 className="mt-3 font-display text-3xl font-extrabold text-indigo sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-saffron">{product.tagline}</p>

            <p className="mt-6 leading-relaxed text-ink/70">{product.description}</p>

            {product.inspired_by && (
              <p className="mt-4 text-sm italic text-ink/60">
                Inspired by {product.inspired_by}
              </p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-parchment-200 py-5 text-sm">
              {product.binding_style && (
                <div>
                  <dt className="text-ink/50">Binding</dt>
                  <dd className="font-semibold text-ink">{product.binding_style}</dd>
                </div>
              )}
              {product.materials && (
                <div>
                  <dt className="text-ink/50">Materials</dt>
                  <dd className="font-semibold text-ink">{product.materials}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <AddToCartForm product={product} />
            </div>

            <p className="mt-6 text-xs text-ink/40">
              Handcrafted in Lagos. Each piece is unique — no two are ever
              exactly the same.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
