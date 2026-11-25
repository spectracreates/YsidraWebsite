"use client";
import { useState } from "react";

// Shows testimonials in groups of four. Hidden entirely when there are none.
export default function Testimonials({ items }) {
  const groups = [];
  for (let i = 0; i < items.length; i += 4) groups.push(items.slice(i, i + 4));
  const [g, setG] = useState(0);
  if (!groups.length) return null;
  return (
    <section className="band" aria-labelledby="t-h">
      <div className="wrap">
        <div className="head" data-reveal><div><h2 id="t-h">What our clients say</h2></div></div>
        <div className="quotes">
          {groups[g].map((t, i) => (
            <figure className="quote" key={g + "-" + i}>
              <blockquote>{t.quote}</blockquote>
              <figcaption><b>{t.name}</b><span>{[t.role, t.company].filter(Boolean).join(", ")}</span></figcaption>
            </figure>
          ))}
        </div>
        {groups.length > 1 && (
          <div className="qnav">
            {groups.map((_, i) => (
              <button key={i} className="chip" aria-pressed={i === g} onClick={() => setG(i)}>{`Set ${i + 1}`}</button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
