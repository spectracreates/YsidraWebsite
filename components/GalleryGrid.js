"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { img, srcSet, waLink, bimg } from "@/lib/img";
import { site } from "@/lib/site";

// Mosaic size pattern from the current ysidra.com gallery: normal, normal, tall, wide, normal, big, normal, wide, normal.
const PATTERN = ["", "", "t", "w", "", "b", "", "w", ""];

export default function GalleryGrid({ items, filters = true, limit }) {
  const tags = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.tag)))], [items]);
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(-1);
  // Render photos in batches so the gallery page does not put hundreds of images in the page at once.
  const STEP = 24;
  const [shown, setShown] = useState(STEP);
  const lastBtn = useRef(null);
  const closeBtn = useRef(null);

  const list = useMemo(() => {
    const l = tag === "All" ? interleave(items) : items.filter((i) => i.tag === tag);
    return limit ? l.slice(0, limit) : l;
  }, [items, tag, limit]);
  useEffect(() => { setShown(STEP); }, [tag]);
  const visible = limit ? list : list.slice(0, shown);

  useEffect(() => {
    if (open < 0) return;
    closeBtn.current && closeBtn.current.focus();
    const k = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpen((o) => (o + 1) % list.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, list.length]);

  function close() { setOpen(-1); lastBtn.current && lastBtn.current.focus(); }

  const it = open >= 0 ? list[open] : null;
  return (
    <>
      {filters && (
        <div className="filters" role="group" aria-label="Filter photos">
          {tags.map((t) => (
            <button key={t} className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>
          ))}
        </div>
      )}
      <div className="mos">
        {visible.map((g, i) => (
          <button key={(g.src || g.url) + i} className={PATTERN[i % PATTERN.length]} aria-label={`Open photo: ${g.name || g.tag} by YSIDRA`}
            onClick={(e) => { lastBtn.current = e.currentTarget; setOpen(i); }}>
            {g.url ? <img src={bimg(g.url, 600)} alt={`${g.name || g.tag} by YSIDRA, made in Lagos`} loading="lazy" decoding="async" /> : <img src={img(g.src, 480)} srcSet={srcSet(g.src)} sizes="(max-width: 620px) 50vw, 33vw" alt={`${g.tag} notebook by YSIDRA, made in Lagos`} loading="lazy" decoding="async" />}
          </button>
        ))}
      </div>
      {visible.length < list.length && (
        <p style={{ textAlign: "center", marginTop: 24 }}>
          <button className="btn btn-line" onClick={() => setShown((n) => n + STEP)}>Show more photos ({list.length - visible.length} more)</button>
        </p>
      )}
      {it && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(e) => e.target === e.currentTarget && close()}>
          {it.url ? <img src={bimg(it.url, 1280)} alt={`${it.name || it.tag} by YSIDRA`} /> : <img src={img(it.src, 1280)} srcSet={srcSet(it.src)} sizes="94vw" alt={`${it.tag} notebook by YSIDRA`} />}
          {it.name && <p style={{ color: "#fff", marginTop: 10, fontFamily: "var(--display)", fontWeight: 700 }}>{it.name}</p>}
          <div className="bar">
            <button className="btn btn-ghost" onClick={() => setOpen((open - 1 + list.length) % list.length)}>Previous</button>
            <a className="btn btn-o" href={waLink(`Hello YSIDRA, I saw this in your gallery and would like something similar: ${it.url ? bimg(it.url, 1280) : site.url + img(it.src, 1280)}`)}>Enquire on WhatsApp</a>
            <button className="btn btn-ghost" onClick={() => setOpen((open + 1) % list.length)}>Next</button>
          </div>
          <button ref={closeBtn} className="btn btn-ghost x" onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}

function interleave(items) {
  const by = {};
  items.forEach((i) => (by[i.tag] = by[i.tag] || []).push(i));
  const lists = Object.values(by);
  const out = [];
  for (let r = 0; out.length < items.length; r++) lists.forEach((l) => l[r] && out.push(l[r]));
  return out;
}
