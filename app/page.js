import Link from "@/components/L";
import Pic from "@/components/Pic";
import HeroMedia from "@/components/HeroMedia";
import GalleryGrid from "@/components/GalleryGrid";
import Testimonials from "@/components/Testimonials";
import { ProductCard, CtaBand, ClientMarquee, CoverMarquee } from "@/components/Blocks";
import { bimg } from "@/lib/util";
import blur from "@/lib/blur.json";
import { site, stats, heroSlides, solutions, products, finishes, workflow, work, gallery, testimonials, about, services, brandWork, signature, founderNote, blogger } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="YSIDRA" style={{ backgroundImage: `url(${blur[heroSlides[0].src]})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <HeroMedia slides={heroSlides} video={site.heroVideo} />
        <div className="hero-in">
          <h1><span className="ln"><span>Brands that work.</span></span><span className="ln"><span>Books that last.</span></span></h1>
          <p className="sub">A strategic brand and communication studio, and the maker of over two million premium notebooks since 2017</p>
          <div className="btn-row">
            <Link href="/quote" className="btn btn-o">Start a project</Link>
            <Link href="/collections" className="btn btn-ghost">Explore collections</Link>
          </div>
        </div>
      </section>

      <nav className="rail" aria-label="What we make">
        <div className="wrap">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`}><b>{s.short}</b><small>{s.lead.split(".")[0]}.</small></Link>
          ))}
        </div>
      </nav>

      <section className="band white tight" aria-label="Clients"><ClientMarquee /></section>

      <section className="band navy" aria-labelledby="svc">
        <div className="wrap">
          <div className="head" data-reveal>
            <div><h2 id="svc">Brand that works for you</h2><p className="lede">We define how your organisation is positioned, build your communication systems, and make sure you show up clearly across the moments that matter, down to the notebook on your client's desk.</p></div>
            <Link href="/quote" className="btn btn-o">Start a project</Link>
          </div>
          <div className="svc">{services.map(([t, d]) => (<div key={t} data-reveal><h3>{t}</h3><p>{d}</p></div>))}</div>
        </div>
      </section>

      <section className="band" aria-label="YSIDRA in numbers">
        <div className="wrap stats">
          {stats.map((s) => (
            <div className="stat" key={s.label} data-reveal><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }} aria-labelledby="uc">
        <div className="wrap">
          <div className="head" data-reveal>
            <div>
              <h2 id="uc">Exceptional books for every occasion</h2>
              <p className="lede">From a thousand branded diaries to one leather journal for one person, every piece starts with a strategy and ends with something people hold on to.</p>
            </div>
          </div>
          <div className="stack">
            {solutions.map((s, i) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="scard">
                <div className="ph"><Pic name={s.image} alt={s.title} sizes="(max-width: 860px) 100vw, 60vw" /></div>
                <div className="tx">
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                  <span className="tlink">Explore {s.short.toLowerCase()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="band" aria-labelledby="std">
        <div className="wrap split">
          <div className="tx" data-reveal>
            <h2 id="std">Exceptional, as standard</h2>
            <p className="big">Strategy, design and books under one roof. We think about who will hold it before we choose a single colour.</p>
            <p>Every order starts with a conversation about your brand, your audience and the moment the book is for. Our designers build the cover and pages around it, and you approve a proof before anything is made.</p>
            <p>We work in leather, linen-look boards, ankara and full-colour print, with foil, deboss, ribbons, elastic closures and coptic bindings. Small runs for a boardroom, large runs for a summit, all finished properly.</p>
            <div className="btn-row" style={{ marginTop: 28 }}><Link href="/about" className="btn btn-n">Our story</Link><Link href="/customisation" className="btn btn-line">Customisation</Link></div>
          </div>
          <figure className="bound" data-reveal><Pic name="hc-stack" alt="Coptic-stitched leather journals in a stack" /></figure>
        </div>
      </section>

      <section className="band white" aria-labelledby="col">
        <div className="wrap">
          <div className="head" data-reveal>
            <div><h2 id="col">Premium notebooks, designed with purpose</h2><p className="lede">Our signature collections. Every one can carry your brand.</p></div>
            <Link href="/collections" className="btn btn-line">All collections</Link>
          </div>
          <div className="grid g4">
            {signature.map((c) => (
              <Link key={c.name} href={c.href} className="card" data-reveal>
                <div className="ph"><img src={bimg(c.image, 600)} alt={c.name} loading="lazy" decoding="async" /></div>
                <div className="bd"><h3>{c.name}</h3><p>{c.text}</p><span className="tlink">View collection</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="bwh">
        <div className="wrap">
          <div className="head" data-reveal><div><h2 id="bwh">Building brands through clarity</h2><p className="lede">Strategy, identity and communication systems for organisations that want to be understood.</p></div></div>
          <div className="bw">
            {brandWork.map((w) => (
              <Link key={w.name} href="/quote" className="card" data-reveal>
                <div className="ph"><img src={bimg(w.image, 900)} alt={w.name} loading="lazy" decoding="async" /></div>
                <div className="bd"><h3>{w.name}</h3><p>{w.text}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band tight" aria-label="Recent covers" style={{ paddingInline: 0 }}>
        <CoverMarquee items={["ys-5595", "ys-5645", "ys-5637", "ys-5662", "ys-5676", "ys-5688", "co-nlng-green", "ys-5600", "ys-5616", "ys-5531", "ys-5594", "ys-5625"]} />
        <div style={{ height: 18 }} />
        <CoverMarquee rev items={["ys-5651", "ys-5540", "ys-5523", "hc-orange", "ys-5724", "ys-5545", "hc-green-gift", "ys-5629", "ys-5554", "hc-blue-ankara", "ys-5585", "ys-5561"]} />
      </section>

      <section className="band" aria-labelledby="fin">
        <div className="wrap">
          <div className="head" data-reveal>
            <div><h2 id="fin">Make it really yours</h2><p className="lede">Mix and match finishes. Not sure what suits your brand? We recommend a combination with your quote.</p></div>
            <Link href="/customisation" className="btn btn-line">All finishes</Link>
          </div>
          <div className="grid g4 fins">
            {finishes.filter((f) => f.image).slice(0, 8).map((f) => (
              <article className="fin" key={f.title} data-reveal>
                <Pic name={f.image} alt={f.title} sizes="(max-width: 620px) 100vw, 25vw" />
                <div className="bd"><h3>{f.title}</h3><p>{f.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band navy" aria-labelledby="how">
        <div className="wrap">
          <div className="head" data-reveal><div><h2 id="how">How we work</h2><p className="lede">Six steps from first conversation to delivery. You always know where your order is.</p></div></div>
          <div className="steps">
            {workflow.map(([t, d]) => (<div className="step" key={t} data-reveal><h3>{t}</h3><p>{d}</p></div>))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="wk">
        <div className="wrap">
          <div className="head" data-reveal>
            <div><h2 id="wk">Recent projects</h2><p className="lede">A few of the brands we have made books for.</p></div>
            <Link href="/work" className="btn btn-line">All projects</Link>
          </div>
          <div className="grid g3">
            {work.slice(0, 3).map((w) => (
              <Link href={`/work/${w.slug}`} className="card" key={w.slug} data-reveal>
                <div className="ph wide"><Pic name={w.images[0]} alt={`${w.title} for ${w.client}`} sizes="(max-width: 620px) 100vw, 33vw" /></div>
                <div className="bd"><span className="meta">{w.client}</span><h3>{w.title}</h3><span className="tlink">Read the story</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      <section className="band white" aria-labelledby="gal">
        <div className="wrap">
          <div className="head" data-reveal>
            <div><h2 id="gal">See what is possible</h2><p className="lede">Tap any photo for a closer look.</p></div>
            <Link href="/gallery" className="btn btn-line">Full gallery</Link>
          </div>
          <GalleryGrid items={gallery} filters={false} limit={12} />
        </div>
      </section>

      <section className="band" aria-labelledby="fnd">
        <div className="wrap founder">
          <figure data-reveal><img src={bimg(blogger.founderPortrait, 700)} alt="Yeye Durojaiye-Arogundade, founder of YSIDRA" loading="lazy" /></figure>
          <div data-reveal>
            <span className="pill">Founder note</span>
            <h2 id="fnd" className="sr" style={{ position: "absolute", left: -9999 }}>{founderNote.title}</h2>
            <blockquote style={{ marginTop: 20 }}>{founderNote.text}</blockquote>
            <cite>{founderNote.sign}</cite>
            <div className="btn-row" style={{ marginTop: 30 }}><Link href="/about" className="btn btn-n">Our story</Link></div>
          </div>
        </div>
      </section>

      <section className="impact" aria-labelledby="imp">
        <div className="tx" data-reveal>
          <span className="pill" style={{ alignSelf: "start" }}>Our impact</span>
          <h2 id="imp">A notebook that does more.</h2>
          <p>{about.impact}</p>
          <div className="btn-row"><a href={site.shop} className="btn btn-o">Shop and give</a><Link href="/about" className="btn btn-ghost">Learn more</Link></div>
        </div>
        <img src={bimg(blogger.impactPhoto, 1000)} alt="Children learning in class" loading="lazy" />
      </section>

      <CtaBand />
    </>
  );
}
