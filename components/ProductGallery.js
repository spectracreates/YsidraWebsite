"use client";
import { useState } from "react";
import { img } from "@/lib/util";

export default function ProductGallery({ images, name }) {
  const [cur, setCur] = useState(0);
  return (
    <div className="pgal">
      <div className="main"><img src={img(images[cur])} alt={`${name} by YSIDRA, photo ${cur + 1}`} /></div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((s, i) => (
            <button key={s} aria-current={i === cur} aria-label={`Show photo ${i + 1}`} onClick={() => setCur(i)}>
              <img src={img(s)} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
