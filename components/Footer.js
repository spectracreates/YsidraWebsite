import Link from "next/link";
import { site, solutions } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <p className="big">Made to be <span>kept.</span></p>
        <div className="cols">
          <div>
            <img className="logo" src="/img/logo-light.png" alt="YSIDRA" width="514" height="172" loading="lazy" />
            <p>Strategy, design and premium books from Lagos. More than two million notebooks since {site.founded}.</p>
            <p style={{ marginTop: 14 }}>{site.address}</p>
          </div>
          <div>
            <h4>Make</h4>
            <Link href="/collections">All collections</Link>
            {solutions.map((s) => (<Link key={s.slug} href={`/solutions/${s.slug}`}>{s.short}</Link>))}
            <Link href="/customisation">Customisation</Link>
          </div>
          <div>
            <h4>Studio</h4>
            <Link href="/work">Our work</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About YSIDRA</Link>
            <Link href="/journal">Journal</Link>
            <a href={site.shop}>Shop online</a>
          </div>
          <div>
            <h4>Talk to us</h4>
            <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp {site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.instagram}>Instagram</a>
            <a href={site.linkedin}>LinkedIn</a>
            <Link href="/quote">Get a quote</Link>
          </div>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} YSIDRA. Strategy, Design, Books.</span>
        <span>5% of every notebook sale supports the Agatha Obiageli Aghedo Memorial Foundation.</span>
      </div>
    </footer>
  );
}
