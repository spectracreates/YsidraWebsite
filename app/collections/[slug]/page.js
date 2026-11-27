import Link from "@/components/L";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import { ProductCard, CtaBand } from "@/components/Blocks";
import { products, site } from "@/lib/content";
import { productBySlug, categoryLabel, waLink, img } from "@/lib/util";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }) {
  const p = productBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} by YSIDRA. ${p.summary} Customised with your brand, made in Lagos.`,
    alternates: { canonical: `/collections/${p.id}` },
    openGraph: p.image ? { images: [{ url: img(p.image) }] } : undefined,
  };
}

export default function Product({ params }) {
  const p = productBySlug(params.slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.summary,
    brand: { "@type": "Brand", name: "YSIDRA" }, category: categoryLabel(p.category),
    image: p.images.map((s) => `${site.url}${img(s)}`),
  };
  return (
    <>
      <section className="band" style={{ paddingTop: "clamp(36px, 5vw, 64px)" }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/ <Link href="/collections">Collections</Link></span><span>/ <Link href={`/collections#${p.category}`}>{categoryLabel(p.category)}</Link></span>
          </nav>
          <div className="split" style={{ alignItems: "start" }}>
            {p.images.length ? (
              <ProductGallery images={p.images} name={p.name} />
            ) : (
              <div className="pgal"><div className="main ph mark" style={{ display: "grid", placeItems: "center", background: "var(--navy)" }}><img src="/img/mark-light.svg" alt="" width="172" height="172" style={{ width: "34%", height: "auto" }} /></div></div>
            )}
            <div className="tx">
              <span className="pill">{categoryLabel(p.category)}</span>
              <h1 style={{ fontSize: "clamp(34px, 4.6vw, 60px)", marginTop: 14 }}>{p.name}</h1>
              <p className="lede">{p.summary}</p>
              <ul className="ticks">{p.details.map((d) => (<li key={d}>{d}</li>))}</ul>
              <p style={{ color: "var(--soft)" }}>Every piece can carry your logo, names, colours and custom inside pages. Pricing depends on quantity and finish, so we quote each order.</p>
              <div className="btn-row" style={{ marginTop: 26 }}>
                <Link href={`/quote?product=${p.id}`} className="btn btn-o">Get a quote</Link>
                {p.category !== "merchandise" && <Link href={`/design-your-notebook?from=${p.id}`} className="btn btn-line">Design yours</Link>}
                <a href={waLink(`Hello YSIDRA, I'm interested in the ${p.name}. ${site.url}/collections/${p.id}`)} className="btn btn-line">Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="band white">
          <div className="wrap">
            <div className="head"><div><h2>More {categoryLabel(p.category).toLowerCase()}</h2></div></div>
            <div className="grid g4">{related.map((r) => (<ProductCard key={r.id} p={r} />))}</div>
          </div>
        </section>
      )}
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
