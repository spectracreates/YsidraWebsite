import Link from "next/link";
import Pic from "@/components/Pic";
import { PageHero, CtaBand, ClientMarquee } from "@/components/Blocks";
import { work } from "@/lib/content";

export const metadata = {
  title: "Our work",
  description: "Notebooks, diaries and gifts YSIDRA has made for NLNG, AXA Mansard, the Development Bank of Nigeria, the Nigerian Economic Summit, SUNU, Wema Bank, Interswitch and more.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <>
      <PageHero title="Our work" crumbs={[[null, "Our work"]]} lede="Books for brands that care how they are remembered. A few of our favourite projects." image="co-premium" />
      <section className="band deep tight"><ClientMarquee /></section>
      <section className="band">
        <div className="wrap grid g3">
          {work.map((w) => (
            <Link href={`/work/${w.slug}`} className="card" key={w.slug} data-reveal>
              <div className="ph wide"><Pic name={w.images[0]} alt={`${w.title} for ${w.client}`} sizes="(max-width: 620px) 100vw, 33vw" /></div>
              <div className="bd"><span className="meta">{w.client} / {w.category}</span><h3>{w.title}</h3><p>{w.text}</p><span className="tlink">View project</span></div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title="Your brand could be next." />
    </>
  );
}
