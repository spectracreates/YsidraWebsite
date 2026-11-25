import Link from "@/components/L";
import Pic from "@/components/Pic";
import { PageHero, CtaBand } from "@/components/Blocks";
import { posts } from "@/lib/content";
import { fmtDate } from "@/lib/util";

export const metadata = {
  title: "Journal",
  description: "Guides from YSIDRA on corporate diaries, notebook finishes, event souvenirs and corporate gifting in Nigeria.",
  alternates: { canonical: "/journal" },
};

export default function Journal() {
  return (
    <>
      <PageHero title="Journal" crumbs={[[null, "Journal"]]} lede="Practical guides on notebooks, diaries, gifting and making brands memorable." />
      <section className="band">
        <div className="wrap grid g3">
          {posts.map((p) => (
            <Link href={`/journal/${p.slug}`} className="card" key={p.slug} data-reveal>
              <div className="ph wide"><Pic name={p.image} alt="" sizes="(max-width: 620px) 100vw, 33vw" /></div>
              <div className="bd"><span className="meta">{fmtDate(p.date)}</span><h3>{p.title}</h3><p>{p.excerpt}</p><span className="tlink">Read</span></div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
