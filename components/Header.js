"use client";
import { useEffect, useState } from "react";
import Link from "@/components/L";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const cur = (href) => (path === href || (href !== "/" && path.startsWith(href)) ? "page" : undefined);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>
            Call or WhatsApp <a href={`https://wa.me/${site.whatsapp}`}>{site.phone}</a>
          </span>
          <nav aria-label="Quick links">
            <Link href="/solutions/gifting">Corporate gifts</Link>
            <Link href="/solutions/keepsakes">Keepsakes</Link>
            <a href={site.shop}>Shop online</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </nav>
        </div>
      </div>
      <header className={`hdr${scrolled ? " scrolled" : ""}`}>
        <div className="wrap">
          <Link href="/" className="logo" aria-label="YSIDRA home">
            <img src="/img/logo.png" alt="YSIDRA, Strategy, Design, Books" width="514" height="172" />
          </Link>
          <nav className="menu" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={cur(n.href)}>{n.label}</Link>
            ))}
          </nav>
          <Link href="/quote" className="btn btn-o">Get a quote</Link>
          <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(true)}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 8h20M4 14h20M4 20h14" /></svg>
          </button>
        </div>
      </header>
      <div id="mnav" className={`mnav${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="top">
          <img src="/img/logo-light.png" alt="YSIDRA" width="514" height="172" loading="lazy" />
          <button className="burger" aria-label="Close menu" onClick={() => setOpen(false)}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l16 16M22 6L6 22" /></svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <Link href="/">Home</Link>
          {nav.map((n) => (<Link key={n.href} href={n.href}>{n.label}</Link>))}
          <a href={site.shop}>Shop online</a>
        </nav>
        <Link href="/quote" className="btn btn-o">Get a quote</Link>
      </div>
    </>
  );
}
