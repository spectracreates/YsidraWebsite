import { site } from "./site";

// Client-safe image and link helpers (no content.js import, so client bundles stay small).
// Responsive WebP versions live in public/img/w/<name>-<480|800|1280>.webp
export const img = (name, w = 800) => `/img/w/${name}-${w}.webp`;
export const srcSet = (name) => `/img/w/${name}-480.webp 480w, /img/w/${name}-800.webp 800w, /img/w/${name}-1280.webp 1280w`;
// Blogger CDN images: ask Blogger for a right-sized WebP instead of the original.
export const bimg = (u, w = 800) => (/\/img\/a\//.test(u) ? `${u}=w${w}-rw` : u.replace(/\/(s\d+|w\d+(-h\d+)?)(-rw)?\//, `/w${w}-rw/`));
export const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
