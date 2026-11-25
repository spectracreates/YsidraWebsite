import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/Pic";
import GalleryGrid from "@/components/GalleryGrid";
import { PageHero, ProductCard, CtaBand, ClientMarquee } from "@/components/Blocks";
import { solutions, products } from "@/lib/content";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export function generateMetadata({ params }) {
  const s = solutions.find((x) => x.slug === params.slug);
  if (!s) return {};
  return { title: s.title, description: `${s.lead} YSIDRA, Lagos.`, alternates: { canonical: `/solutions/${s.slug}` } };
}

export default function Solution({ params }) {
  const s = solutions.find((x) => x.slug === params.slug);
  if (!s) notFound();
  const items = s.products.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: s.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <PageHero title={s.title} lede={s.lead} crumbs={[[null, s.short]]} image={s.image}>
        <div className="btn-row" style={{ marginTop: 28 }}><Link href="/quote" className="btn btn-o">Get a quote</Link><Link href="/work" className="btn btn-ghost">See our work</Link></div>
      </PageHero>
      <section className="band">
        <div className="wrap grid g3">
          {s.points.map(([t, d]) => (
            <div key={t} data-reveal style={{ borderTop: "3px solid var(--orange)", paddingTop: 20 }}><h3>{t}</h3><p style={{ color: "var(--soft)", marginTop: 10 }}>{d}</p></div>
          ))}
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head" data-reveal><div><h2>Pieces for {s.short.toLowerCase()}</h2></div><Link href="/collections" className="btn btn-line">All collections</Link></div>
          <div className="grid g4">{items.map((p) => (<ProductCard key={p.id} p={p} />))}</div>
        </div>
      </section>
      <section className="band white tight"><ClientMarquee /></section>
      <section className="band">
        <div className="wrap">
          <div className="head" data-reveal><div><h2>From the studio</h2></div></div>
          <GalleryGrid items={s.gallery.map((src) => ({ src, tag: s.short }))} filters={false} />
        </div>
      </section>
      <section className="band white">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div><h2>Questions we hear</h2><p className="lede">Something else? Ask us on WhatsApp and a real person replies.</p></div>
          <div className="faq">{s.faqs.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
