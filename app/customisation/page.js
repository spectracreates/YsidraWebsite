import Link from "next/link";
import Pic from "@/components/Pic";
import { PageHero, CtaBand } from "@/components/Blocks";
import { finishes, workflow } from "@/lib/content";

export const metadata = {
  title: "Customisation",
  description: "Foil, deboss, full-colour print, leather, ankara, coptic binding, ribbons, branded inside pages, engraving and packaging. How YSIDRA makes every notebook yours.",
  alternates: { canonical: "/customisation" },
};

export default function Customisation() {
  return (
    <>
      <PageHero title="Make it really yours" crumbs={[[null, "Customisation"]]} image="ys-5594"
        lede="Covers, bindings, pages and packaging. Mix finishes to match your brand, or let our designers recommend a combination." />
      <section className="band">
        <div className="wrap grid g3 fins">
          {finishes.map((f) => (
            <article className="fin" key={f.title} data-reveal>
              {f.image ? <Pic name={f.image} alt={f.title} sizes="(max-width: 620px) 100vw, 33vw" /> : (
                <div className="ph mark alt" style={{ aspectRatio: "1", display: "grid", placeItems: "center", background: "var(--navy-deep)" }}><img src="/img/mark-light.svg" alt="" width="172" height="172" style={{ width: "34%" }} loading="lazy" /></div>
              )}
              <div className="bd"><h3>{f.title}</h3><p>{f.text}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="band white">
        <div className="wrap split">
          <div data-reveal>
            <h2>Inside pages that work hard</h2>
            <p className="lede">A diary or notebook is a year on someone's desk. We design the inside around your organisation:</p>
            <ul className="ticks">
              <li>Year planners, monthly and weekly views</li>
              <li>Your logo and colours on every spread</li>
              <li>Contacts, branches, products or values pages</li>
              <li>A message from leadership, or an event programme</li>
              <li>Names printed, foiled or debossed on each copy</li>
            </ul>
            <Link href="/quote" className="btn btn-o">Plan your pages</Link>
          </div>
          <figure className="bound" data-reveal><Pic name="ys-5597" alt="Open diary showing branded inside pages" /></figure>
        </div>
      </section>
      <section className="band navy">
        <div className="wrap">
          <div className="head"><div><h2>From brief to delivery</h2></div></div>
          <div className="steps">{workflow.map(([t, d]) => (<div className="step" key={t}><h3>{t}</h3><p>{d}</p></div>))}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
