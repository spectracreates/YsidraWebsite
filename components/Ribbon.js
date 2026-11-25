"use client";
import { useEffect, useRef } from "react";

// The orange ribbon bookmark down the right edge: grows as you read the page.
// Also switches on scroll reveals for anything marked data-reveal.
export default function Ribbon() {
  const ref = useRef(null);
  useEffect(() => {
    // Anything already on screen (or above it) stays put; only content further down animates in.
    const vh = window.innerHeight;
    document.querySelectorAll("[data-reveal]").forEach((el) => { if (el.getBoundingClientRect().top < vh) el.classList.add("in"); });
    document.documentElement.classList.add("js");
    let raf = 0;
    const set = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      if (ref.current) ref.current.style.setProperty("--p", p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(set); };
    set();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const watch = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return <div className="ribbon" aria-hidden="true"><i ref={ref} /></div>;
}
