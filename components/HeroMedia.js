"use client";
import { useEffect, useState } from "react";
import { img, srcSet } from "@/lib/util";

// First photo loads immediately; each next photo is fetched only just before it is shown.
// On slow connections (Save-Data or 2G/3G) the slideshow stays on the first photo.
export default function HeroMedia({ slides, video }) {
  const [cur, setCur] = useState(0);
  const [seen, setSeen] = useState(1);
  const [paused, setPaused] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const c = navigator.connection;
    if (c && (c.saveData || /2g|3g/.test(c.effectiveType || ""))) setLite(true);
  }, []);
  useEffect(() => {
    if (video || paused || lite) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pre = setTimeout(() => setSeen((s) => Math.max(s, ((cur + 1) % slides.length) + 1)), 3500);
    const t = setTimeout(() => setCur((c) => (c + 1) % slides.length), 6000);
    return () => { clearTimeout(pre); clearTimeout(t); };
  }, [cur, video, paused, lite, slides.length]);

  if (video && !lite) {
    return (
      <div className="hero-media">
        <video src={video} autoPlay muted loop playsInline preload="none" poster={img(slides[0].src)} />
      </div>
    );
  }
  return (
    <>
      <div className="hero-media">
        {slides.map((s, i) =>
          i < seen ? (
            <img key={s.src} src={img(s.src)} srcSet={srcSet(s.src)} sizes="100vw" alt={i === cur ? s.alt : ""}
              className={i === cur ? "on" : ""} decoding="async" fetchPriority={i === 0 ? "high" : "low"} />
          ) : null
        )}
      </div>
      {!lite && (
        <div className="hero-meta">
          {slides.map((s, i) => (
            <button key={s.src} className={i === cur ? "on" : ""} aria-label={`Show photo ${i + 1}`}
              onClick={() => { setSeen((v) => Math.max(v, i + 1)); setCur(i); setPaused(true); }} />
          ))}
        </div>
      )}
    </>
  );
}
