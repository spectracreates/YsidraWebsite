"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { img, waLink } from "@/lib/util";
import { site } from "@/lib/content";

// Mosaic size pattern from the current ysidra.com gallery: normal, normal, tall, wide, normal, big, normal, wide, normal.
const PATTERN = ["", "", "t", "w", "", "b", "", "w", ""];

export default function GalleryGrid({ items, filters = true, limit }) {
  const tags = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.tag)))], [items]);
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(-1);
  const lastBtn = useRef(null);
  const closeBtn = useRef(null);

  const list = useMemo(() => {
    const l = tag === "All" ? interleave(items) : items.filter((i) => i.tag === tag);
    return limit ? l.slice(0, limit) : l;
  }, [items, tag, limit]);

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
        {list.map((g, i) => (
          <button key={g.src + i} className={PATTERN[i % PATTERN.length]} aria-label={`Open photo: ${g.tag} work by YSIDRA`}
            onClick={(e) => { lastBtn.current = e.currentTarget; setOpen(i); }}>
            <img src={img(g.src)} alt={`${g.tag} notebook by YSIDRA, made in Lagos`} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      {it && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(e) => e.target === e.currentTarget && close()}>
          <img src={img(it.src)} alt={`${it.tag} notebook by YSIDRA`} />
          <div className="bar">
            <button className="btn btn-ghost" onClick={() => setOpen((open - 1 + list.length) % list.length)}>Previous</button>
            <a className="btn btn-o" href={waLink(`Hello YSIDRA, I saw this in your gallery and would like something similar: ${site.url}/img/${it.src}.jpg`)}>Enquire on WhatsApp</a>
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
