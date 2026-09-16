import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/data/products";
import { Compass, PenTool, BookOpen } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { PullQuote } from "@/components/ui/PullQuote";
import { LotusWatermark } from "@/components/ui/LotusWatermark";
import { DiagonalCorner } from "@/components/ui/DiagonalCorner";

const CLIENTS = [
  "Aluko & Oyebode", "AXA Mansard", "Development Bank of Nigeria", "APRA",
  "Northwest Petroleum", "PZ Cussons", "PwC", "Cowry", "NLNG", "SUNU Assurances",
  "IOGC", "GPFI", "Olam", "Stanbic IBTC", "Siemens", "Coronation", "Showmax",
  "Total Health Trust", "Union Systems", "Sthenic",
];

// Row/col spans applied cyclically so the grid reads as an art-directed
// catalogue spread rather than a uniform product grid.
const SPANS = [
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1 md:col-span-1",
];

const WORK = [
  { title: "Financial Services Group", category: "Corporate Notebook Programme" },
  { title: "Energy & Gas Corporation", category: "Custom Illustrated Notebook" },
  { title: "Insurance Institution", category: "Bespoke Corporate Notebook" },
  { title: "Legal Practice", category: "Premium Leather Diary" },
  { title: "Technology Conglomerate", category: "Conference Notebook" },
  { title: "Real Estate Developer", category: "Leather-Bound Journal" },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />

      {/* TRUSTED BY */}
      <Section tone="parchment" className="py-10 md:py-14">
        <Container>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-ink/50">
            Trusted by leading organisations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="font-display text-sm font-bold text-ink/40 grayscale"
              >
                {name}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHAT WE DO */}
      <Section className="relative overflow-hidden">
        <LotusWatermark className="-right-20 top-0 h-96 w-96" />
        <Container className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
            What we do
          </p>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-extrabold leading-tight text-indigo sm:text-3xl">
            Different capabilities. One Ysidra.
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-0">
            <WhatWeDo
              index="01"
              icon={<Compass className="h-6 w-6" />}
              title="Strategy"
              headline="Strategy. Growth. Execution."
              body="We help organisations find and unlock opportunities for growth."
              first
            />
            <WhatWeDo
              index="02"
              icon={<PenTool className="h-6 w-6" />}
              title="Design"
              headline="Ideas brought to life."
              body="Branding, design and communications."
            />
            <WhatWeDo
              index="03"
              icon={<BookOpen className="h-6 w-6" />}
              title="Books"
              headline="Remarkable books, made to make an impression."
              body="Bespoke notebooks, corporate books and premium book production."
            />
          </div>
        </Container>
      </Section>

      {/* SELECTED WORK — asymmetric editorial grid */}
      <Section tone="parchment" id="selected-work">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-2xl font-extrabold text-indigo sm:text-3xl">
              Selected work
            </h2>
            <span className="hidden text-xs font-semibold uppercase tracking-widest text-ink/40 sm:block">
              A portfolio catalogue, not a blog
            </span>
          </div>
          <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-4 md:gap-5">
            {WORK.map((item, i) => (
              <WorkTile key={item.title} item={item} span={SPANS[i % SPANS.length]} />
            ))}
          </div>
          <p className="mt-6 text-xs text-ink/40">
            Client names shown here are placeholders pending final sign-off on
            logo/name usage — replace with approved names once confirmed.
          </p>
        </Container>
      </Section>

      <PullQuote>
        Strategy designed to be used, not left in a presentation.
      </PullQuote>

      {/* BOOKS FEATURE */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-tight text-indigo sm:text-3xl">
                Remarkable books.
                <br />
                Made to make an impression.
              </h2>
              <p className="mt-4 max-w-md text-ink/70">
                Bespoke notebooks, corporate books, premium editions and books for
                authors.
              </p>
              <Button href="/books" className="mt-6">
                Explore books →
              </Button>
            </div>
            <ProductGrid products={featured.slice(0, 4)} />
          </div>
        </Container>
      </Section>

      {/* IMPACT TEASER */}
      <Section tone="indigo">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src="/images/products/devo-pocket.svg"
                alt="A Ysidra notebook that does more"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                A notebook that does more.
              </h2>
              <p className="mt-4 max-w-md text-white/80">
                5% of every notebook sale supports access to education for
                children with special educational needs.
              </p>
              <Button href="/about#impact" variant="outline" className="mt-6 border-white text-white hover:bg-white hover:text-indigo">
                Our impact →
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="relative overflow-hidden bg-indigo-950">
        <DiagonalCorner className="h-20 w-20 opacity-90" />
        <LotusWatermark tone="dark" className="-bottom-24 -right-24 h-80 w-80" />
        <Container className="relative text-center">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            What are you working on?
          </h2>
          <p className="mt-3 text-lg text-white/70">
            Let&apos;s make something worth remembering.
          </p>
          <Button
            href="/about#contact"
            className="mt-7 bg-saffron hover:bg-saffron-600"
          >
            Start a project →
          </Button>
        </Container>
      </Section>
    </>
  );
}

function WhatWeDo({
  icon,
  title,
  headline,
  body,
  index,
  first,
}: {
  icon: React.ReactNode;
  title: string;
  headline: string;
  body: string;
  index: string;
  first?: boolean;
}) {
  return (
    <div
      className={`relative px-0 md:px-8 ${
        !first ? "md:border-l md:border-indigo/10" : ""
      }`}
    >
      <span className="pointer-events-none absolute -top-6 right-0 select-none font-display text-6xl font-extrabold text-indigo/5 md:text-7xl">
        {index}
      </span>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-indigo/20 text-indigo">
        {icon}
      </div>
      <p className="relative mt-4 text-xs font-semibold uppercase tracking-widest text-saffron">
        {title}
      </p>
      <h3 className="relative mt-2 font-display text-lg font-bold text-indigo">
        {headline}
      </h3>
      <p className="relative mt-2 text-sm text-ink/60">{body}</p>
    </div>
  );
}

function WorkTile({
  item,
  span,
}: {
  item: { title: string; category: string };
  span: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-card bg-white ${span}`}>
      <Image
        src="/images/products/toni-heritage.svg"
        alt={`${item.title} — ${item.category}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-display text-sm font-bold">{item.title}</p>
        <p className="text-xs text-white/80">{item.category}</p>
      </div>
    </div>
  );
}
