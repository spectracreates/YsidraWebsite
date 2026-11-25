"use client";
import { useState } from "react";
import { img, srcSet } from "@/lib/util";

export default function ProductGallery({ images, name }) {
  const [cur, setCur] = useState(0);
  return (
    <div className="pgal">
      <div className="main"><img src={img(images[cur])} srcSet={srcSet(images[cur])} sizes="(max-width: 860px) 100vw, 50vw" alt={`${name} by YSIDRA, photo ${cur + 1}`} fetchPriority="high" /></div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((s, i) => (
            <button key={s} aria-current={i === cur} aria-label={`Show photo ${i + 1}`} onClick={() => setCur(i)}>
              <img src={img(s, 480)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
