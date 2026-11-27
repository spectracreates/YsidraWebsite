import { site } from "./site";

// Client-safe image and link helpers (no content.js import, so client bundles stay small).
// Responsive WebP versions live in public/img/w/<name>-<480|800|1280>.webp
export const img = (name, w = 800) => `/img/w/${name}-${w}.webp`;
export const srcSet = (name) => `/img/w/${name}-480.webp 480w, /img/w/${name}-800.webp 800w, /img/w/${name}-1280.webp 1280w`;
// Blogger-hosted photos go through Vercel's image optimiser: resized to the slot, converted to
// WebP/AVIF, cached at the edge and served from our own domain (no extra connection to Blogger).
const WIDTHS = [128, 256, 384, 640, 828, 1080, 1200];
const fit = (w) => WIDTHS.find((x) => x >= w) || 1200;
const orig = (u) => (/\/img\/a\//.test(u) ? `${u.replace(/=[^/]*$/, "")}=s1600` : u.replace(/\/(s\d+|w\d+(-h\d+)?)(-rw)?\//, "/s1600/"));
export const bimg = (u, w = 800) => `/_next/image?url=${encodeURIComponent(orig(u))}&w=${fit(w)}&q=72`;
export const bsrcSet = (u, from = 384) => WIDTHS.filter((w) => w >= from).map((w) => `${bimg(u, w)} ${w}w`).join(", ");
export const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
