import Link from "next/link";
export default function NotFound() {
  return (
    <section className="band navy" style={{ minHeight: "70vh", display: "grid", alignItems: "center" }}>
      <div className="wrap">
        <h1 style={{ fontSize: "clamp(44px, 8vw, 110px)", color: "#fff" }}>This page is not in the book.</h1>
        <p className="lede">The link may be old. Try the collections, or tell us what you were looking for.</p>
        <div className="btn-row" style={{ marginTop: 28 }}><Link href="/collections" className="btn btn-o">Collections</Link><Link href="/" className="btn btn-ghost">Home</Link></div>
      </div>
    </section>
  );
}
