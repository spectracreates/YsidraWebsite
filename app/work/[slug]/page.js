import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/Pic";
import { PageHero, CtaBand } from "@/components/Blocks";
import { work } from "@/lib/content";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}
export function generateMetadata({ params }) {
  const w = work.find((x) => x.slug === params.slug);
  if (!w) return {};
  return { title: `${w.client}: ${w.title}`, description: w.text, alternates: { canonical: `/work/${w.slug}` } };
}

export default function Project({ params }) {
  const i = work.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const w = work[i];
  const nxt = work[(i + 1) % work.length];
  return (
    <>
      <PageHero title={w.title} crumbs={[["/work", "Our work"], [null, w.client]]} lede={w.text} image={w.images[0]}>
        <p className="pill" style={{ marginTop: 22 }}>{w.client} / {w.category}</p>
      </PageHero>
      <section className="band">
        <div className="wrap grid" style={{ gridTemplateColumns: w.images.length > 1 ? "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" : "1fr" }}>
          {w.images.map((s, k) => (
            <figure key={s} style={{ margin: 0 }} data-reveal>
              <Pic name={s} alt={`${w.title} for ${w.client}, photo ${k + 1}`} sizes="(max-width: 760px) 100vw, 50vw" style={{ borderRadius: 8, width: "100%" }} />
            </figure>
          ))}
        </div>
      </section>
      <section className="band white tight">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div><p style={{ color: "var(--soft)" }}>Next project</p><h3 style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}>{nxt.client}: {nxt.title}</h3></div>
          <Link href={`/work/${nxt.slug}`} className="btn btn-n">View next project</Link>
        </div>
      </section>
      <CtaBand title="Want something like this?" />
    </>
  );
}
