import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import { HeroComposition } from "@/components/home/HeroComposition";
import { PullQuote } from "@/components/ui/PullQuote";
import { LotusWatermark } from "@/components/ui/LotusWatermark";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Remarkable books, made to make an impression. Bespoke notebooks, corporate books, premium editions and books for authors — designed and produced by Ysidra in Nigeria.",
};

export default function BooksPage() {
  return (
    <>
      <Section className="relative overflow-hidden pb-10 pt-14 md:pt-20">
        <LotusWatermark className="-left-24 top-10 h-72 w-72" />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
                The books collection
              </p>
              <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-indigo sm:text-5xl">
                Remarkable books.
                <br />
                Made to <span className="text-saffron">make an impression.</span>
              </h1>
              <p className="mt-4 max-w-md text-ink/70">
                Designed and produced by Ysidra in Nigeria — handcrafted leather
                journals, corporate diaries and premium editions.
              </p>
            </div>
            <HeroComposition />
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container>
          <h2 className="mb-2 font-display text-xl font-bold text-indigo">
            Mansa Vintage Leather Collection
          </h2>
          <p className="mb-8 max-w-lg text-sm text-ink/60">
            Handcrafted &middot; Enduring &middot; Made to be kept. Time-tested
            binding techniques — coptic, longstitch, half-bound and refillable
            systems — combined with African materials and contemporary
            sensibility. No two pieces are ever the same.
          </p>
          <ProductGrid products={products} />
        </Container>
      </Section>

      <PullQuote>If it won&apos;t be kept, it shouldn&apos;t be made.</PullQuote>

      <Section>
        <Container>
          <div className="rounded-card bg-indigo-50 p-8 text-center md:p-12">
            <h2 className="font-display text-2xl font-extrabold text-indigo">
              Written a book?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink/70">
              We design and produce premium-quality books for authors — from
              layout through to print, binding and finishing.
            </p>
            <a
              href="/about#contact"
              className="mt-6 inline-flex rounded-full bg-indigo px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Talk to us →
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
