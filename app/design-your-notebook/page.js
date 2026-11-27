import NotebookBuilder from "@/components/NotebookBuilder";

export const metadata = {
  title: "Design your notebook",
  description: "Design your own branded notebook, 2027 diary or handcrafted journal: choose the size, cover, foil, inside pages and finishing, see it live, then send it to YSIDRA for a proof and quote.",
  alternates: { canonical: "/design-your-notebook" },
};

export default function DesignYourNotebook() {
  return (
    <section className="band nbs-band" aria-labelledby="nbs-h">
      <div className="wrap">
        <div className="nbs-head">
          <h1 id="nbs-h">Design your notebook</h1>
          <p className="lede">Pick the size, cover, foil and pages. Your notebook updates as you go. Send it to us and we reply with a proof and a quote.</p>
        </div>
        <NotebookBuilder />
      </div>
    </section>
  );
}
