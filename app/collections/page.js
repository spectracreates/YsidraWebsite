import { PageHero, ProductCard, CtaBand } from "@/components/Blocks";
import { categories, products } from "@/lib/content";

export const metadata = {
  title: "Collections",
  description: "YSIDRA collections: handcrafted leather and ankara journals, 2027 diaries, branded notebooks, event and keepsake books, and branded gifts. Made in Lagos.",
  alternates: { canonical: "/collections" },
};

export default function Collections() {
  return (
    <>
      <PageHero title="Collections" crumbs={[[null, "Collections"]]}
        lede="Every piece can carry your brand, your colours and your story. Choose a starting point, then make it yours." image="co-premium" />
      <nav className="band tight white" aria-label="Collection sections" style={{ paddingBlock: 18 }}>
        <div className="wrap filters" style={{ margin: 0 }}>
          {categories.map((c) => (<a key={c.id} className="chip" href={`#${c.id}`} style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>{c.label}</a>))}
        </div>
      </nav>
      {categories.map((c, i) => (
        <section key={c.id} id={c.id} className={`band${i % 2 ? " white" : ""}`} aria-labelledby={`h-${c.id}`}>
          <div className="wrap">
            <div className="head" data-reveal><div><h2 id={`h-${c.id}`}>{c.label}</h2><p className="lede">{c.blurb}</p></div></div>
            <div className="grid g4">
              {products.filter((p) => p.category === c.id).map((p) => (<ProductCard key={p.id} p={p} />))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand title="Looking for something else?" text="We design bespoke books and gifts from scratch. Tell us the idea and we will make it real." />
    </>
  );
}
