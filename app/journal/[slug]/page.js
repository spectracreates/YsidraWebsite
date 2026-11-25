import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand } from "@/components/Blocks";
import { posts, site } from "@/lib/content";
import { fmtDate, img } from "@/lib/util";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, alternates: { canonical: `/journal/${p.slug}` }, openGraph: { type: "article", images: [{ url: img(p.image) }] } };
}

export default function Post({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, image: `${site.url}${img(p.image)}`, author: { "@type": "Organization", name: "YSIDRA" }, publisher: { "@type": "Organization", name: "YSIDRA", logo: { "@type": "ImageObject", url: `${site.url}/img/logo.png` } } };
  return (
    <>
      <PageHero title={p.title} crumbs={[["/journal", "Journal"], [null, fmtDate(p.date)]]} lede={p.excerpt} image={p.image} />
      <article className="band white">
        <div className="prose">
          {p.body.map(([t, text], i) => (t === "h" ? <h2 key={i}>{text}</h2> : <p key={i}>{text}</p>))}
          <p style={{ marginTop: 32 }}><Link href="/quote" className="btn btn-o">Get a quote</Link></p>
        </div>
      </article>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
