import Link from "next/link";
import Pic from "@/components/Pic";
import { PageHero, CtaBand, ClientMarquee } from "@/components/Blocks";
import { about, stats, workflow, site } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "YSIDRA is a Lagos creative company for strategy, design and books, founded in 2017 by Yeye Durojaiye-Arogundade. More than two million notebooks made.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero title="Strategy. Design. Books." crumbs={[[null, "About"]]} lede={about.intro} image="hc-stack" />
      <section className="band">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div data-reveal>
            <h2>Our story</h2>
            {about.story.map((p, i) => (<p key={i} className={i === 0 ? "big" : ""} style={i ? { color: "var(--soft)", marginTop: 16 } : undefined}>{p}</p>))}
            <p style={{ marginTop: 24, fontFamily: "var(--display)", fontWeight: 700 }}>{about.founder.name}<br /><span style={{ fontWeight: 600, color: "var(--soft)" }}>{about.founder.role}</span></p>
          </div>
          <div className="stats" style={{ gridTemplateColumns: "1fr" }}>
            {stats.map((s) => (<div className="stat" key={s.label} data-reveal><b>{s.value}</b><span>{s.label}</span></div>))}
          </div>
        </div>
      </section>
      <section className="band navy">
        <div className="wrap">
          <div className="head"><div><h2>Three ways we help</h2></div></div>
          <div className="grid g3">
            {about.pillars.map(([t, line, d]) => (
              <div key={t} data-reveal style={{ borderTop: "3px solid var(--orange)", paddingTop: 22 }}>
                <h3 style={{ fontSize: 30, color: "#fff" }}>{t}</h3>
                <p style={{ fontFamily: "var(--display)", fontWeight: 700, color: "#fff", margin: "10px 0" }}>{line}</p>
                <p style={{ color: "#d4d6f2" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap split">
          <figure className="bound" data-reveal style={{ display: "grid", placeItems: "center", background: "var(--paper)", borderRadius: 8, aspectRatio: "4/5" }}>
            <img src="/img/mark.svg" alt="The YSIDRA mark: a book, a lotus and a butterfly" width="172" height="172" style={{ width: "56%" }} />
          </figure>
          <div data-reveal>
            <h2>The name and the mark</h2>
            <p className="big">{about.symbol}</p>
            <p style={{ color: "var(--soft)" }}>{about.name}</p>
            <div className="grid g2" style={{ marginTop: 28 }}>
              {about.colours.map(([n, hex, d]) => (
                <div key={n}><div style={{ height: 64, borderRadius: 6, background: hex }} /><h3 style={{ marginTop: 12 }}>{n}</h3><p style={{ color: "var(--soft)", fontSize: 15 }}>{d}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="band white">
        <div className="wrap">
          <div className="head"><div><h2>What we stand for</h2></div></div>
          <p className="values" data-reveal>{about.values.map((v) => (<span key={v}>{v}.</span>))}</p>
          <div className="grid g4" style={{ marginTop: 48 }}>
            {about.standard.map((s) => (<div key={s} data-reveal style={{ borderTop: "3px solid var(--navy)", paddingTop: 16 }}><h3>{s}</h3></div>))}
          </div>
          <p className="lede">The YSIDRA standard. Four lines every member of our team works by.</p>
        </div>
      </section>
      <section className="band deep tight"><ClientMarquee /></section>
      <section className="band">
        <div className="wrap split rev">
          <div data-reveal>
            <span className="pill">Our impact</span>
            <h2 style={{ marginTop: 16 }}>5% for children who need it most</h2>
            <p className="lede">{about.impact}</p>
            <div className="btn-row" style={{ marginTop: 26 }}><a href={site.shop} className="btn btn-o">Shop and give</a></div>
          </div>
          <figure className="bound" data-reveal><Pic name="ys-5531" alt="Notebook with the words You can totally do this" /></figure>
        </div>
      </section>
      <section className="band navy">
        <div className="wrap">
          <div className="head"><div><h2>How we work</h2></div></div>
          <div className="steps">{workflow.map(([t, d]) => (<div className="step" key={t}><h3>{t}</h3><p>{d}</p></div>))}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
