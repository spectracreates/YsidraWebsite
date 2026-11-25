import Link from "next/link";
import Pic from "./Pic";
import { site, clients } from "@/lib/content";
import { img } from "@/lib/util";

export function PageHero({ title, lede, crumbs, image, children }) {
  return (
    <section className={`phero${image ? " img" : ""}`}>
      {image && <img src={img(image)} alt="" />}
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map(([href, label]) => (<span key={label}>/ {href ? <Link href={href}>{label}</Link> : label}</span>))}
          </nav>
        )}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

export function ProductCard({ p, sizes = "(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw" }) {
  return (
    <Link href={`/collections/${p.id}`} className="card" data-reveal>
      {p.image ? (
        <div className="ph"><Pic name={p.image} alt={`${p.name} by YSIDRA`} sizes={sizes} /></div>
      ) : (
        <div className="ph mark"><img src="/img/mark-light.svg" alt="" width="172" height="172" loading="lazy" /></div>
      )}
      <div className="bd">
        <h3>{p.name}</h3>
        <p>{p.summary}</p>
        <span className="tlink">View details</span>
      </div>
    </Link>
  );
}

export function CtaBand({ title = "Let's make something worth keeping.", text = "Tell us what you need and when. We reply with ideas, samples and a quote, usually within a working day." }) {
  return (
    <section className="band tight cta">
      <div className="wrap">
        <div><h2>{title}</h2><p>{text}</p></div>
        <div className="btn-row">
          <Link href="/quote" className="btn btn-white">Get a quote</Link>
          <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-ghost">WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}

export function ClientMarquee() {
  const row = clients.map((c) => (<span className="client" key={c}>{c}</span>));
  return (
    <div className="marquee" style={{ "--dur": "60s" }} aria-label={`Clients include ${clients.join(", ")}`}>
      <div className="track" aria-hidden="true">{row}{row}</div>
    </div>
  );
}

export function CoverMarquee({ items, rev }) {
  const row = items.map((s, i) => (<img key={s + i} src={img(s)} alt="" loading="lazy" decoding="async" />));
  return (
    <div className={`marquee covers${rev ? " rev" : ""}`} style={{ "--dur": "80s" }} aria-hidden="true">
      <div className="track">{row}{row}</div>
    </div>
  );
}
