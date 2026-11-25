"use client";
import { useEffect, useState } from "react";
import { img } from "@/lib/util";

export default function HeroMedia({ slides, video }) {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (video || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [video, paused, slides.length]);

  if (video) {
    return (
      <div className="hero-media">
        <video src={video} autoPlay muted loop playsInline poster={img(slides[0].src)} />
      </div>
    );
  }
  return (
    <>
      <div className="hero-media">
        {slides.map((s, i) => (
          <img key={s.src} src={img(s.src)} alt={i === cur ? s.alt : ""} className={i === cur ? "on" : ""}
            loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
        ))}
      </div>
      <div className="hero-meta">
        {slides.map((s, i) => (
          <button key={s.src} className={i === cur ? "on" : ""} aria-label={`Show photo ${i + 1}`}
            onClick={() => { setCur(i); setPaused(true); }} />
        ))}
      </div>
    </>
  );
}
