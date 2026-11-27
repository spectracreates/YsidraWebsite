"use client";
import { useEffect, useRef, useState } from "react";
import { bimg, bsrcSet, waLink } from "@/lib/img";

// One card per client from the Blogger photo store; tapping opens that client's photos.
export default function ClientCollections({ items }) {
  const groups = [];
  const by = {};
  items.forEach((i) => { if (!by[i.group]) { by[i.group] = { name: i.name, photos: [] }; groups.push(i.group); } by[i.group].photos.push(i); });
  const [open, setOpen] = useState(null);
  const [k, setK] = useState(0);
  const closeRef = useRef(null);
  const last = useRef(null);
  const g = open ? by[open] : null;

  useEffect(() => {
    if (!g) return;
    closeRef.current && closeRef.current.focus();
    const n = g.photos.length;
    const key = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setK((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setK((x) => (x - 1 + n) % n);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [g]);
  function close() { setOpen(null); last.current && last.current.focus(); }
  if (!groups.length) return null;

  return (
    <>
      <div className="grid g4">
        {groups.map((id) => {
          const c = by[id];
          return (
            <button key={id} className="card ccard" onClick={(e) => { last.current = e.currentTarget; setK(0); setOpen(id); }} aria-label={`View ${c.photos.length} photos for ${c.name}`}>
              <div className="ph wide"><img src={bimg(c.photos[0].url, 640)} srcSet={bsrcSet(c.photos[0].url)} sizes="(max-width: 620px) 100vw, 33vw" alt="" loading="lazy" decoding="async" /></div>
              <div className="bd"><h3>{c.name}</h3><p>{c.photos.length} {c.photos.length === 1 ? "photo" : "photos"}</p></div>
            </button>
          );
        })}
      </div>
      {g && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={`${g.name} photos`} onClick={(e) => e.target === e.currentTarget && close()}>
          <img src={bimg(g.photos[k].url, 1200)} srcSet={bsrcSet(g.photos[k].url, 640)} sizes="94vw" alt={`${g.name} notebooks by YSIDRA, photo ${k + 1}`} />
          <div className="bar">
            <span style={{ color: "#fff", fontFamily: "var(--display)", fontWeight: 700, alignSelf: "center" }}>{g.name} / {k + 1} of {g.photos.length}</span>
          </div>
          <div className="bar">
            <button className="btn btn-ghost" onClick={() => setK((k - 1 + g.photos.length) % g.photos.length)}>Previous</button>
            <a className="btn btn-o" href={waLink(`Hello YSIDRA, I saw your work for ${g.name} and would like something similar.`)}>Enquire on WhatsApp</a>
            <button className="btn btn-ghost" onClick={() => setK((k + 1) % g.photos.length)}>Next</button>
          </div>
          <button ref={closeRef} className="btn btn-ghost x" onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}
