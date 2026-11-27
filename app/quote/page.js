import QuoteForm from "@/components/QuoteForm";
import { site, quoteSteps, products } from "@/lib/content";

export const metadata = {
  title: "Get a quote",
  description: "Request a quote for custom notebooks, 2027 diaries, event souvenirs, handcrafted journals and branded gifts from YSIDRA in Lagos.",
  alternates: { canonical: "/quote" },
};

export default function Quote() {
  return (
    <section className="band navy" style={{ minHeight: "80vh" }}>
      <div className="wrap qwrap">
        <div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#fff" }}>Get a quote</h1>
          <p className="lede">Four quick steps. Your answers go straight to our team, and we reply with ideas, samples and a quote.</p>
          <div className="contact-list">
            <div><b>WhatsApp or call</b><a href={`https://wa.me/${site.whatsapp}`}>{site.phone}</a></div>
            <div><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><b>Studio</b><span>{site.address}</span></div>
            <div><b>Follow</b><a href={site.instagram}>Instagram</a> <span>and</span> <a href={site.linkedin}>LinkedIn</a></div>
          </div>
        </div>
        <QuoteForm quoteSteps={quoteSteps} products={products.map((p) => ({ id: p.id, name: p.name }))} />
      </div>
    </section>
  );
}
