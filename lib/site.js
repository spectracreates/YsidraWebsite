// Small, client-safe settings (contact details and menu). Kept apart from content.js so the
// header and forms do not ship every product, article and archive photo to the browser.

export const site = {
  name: "YSIDRA",
  url: "https://www.ysidra.com",
  tagline: "Strategy. Design. Books.",
  description:
    "YSIDRA is a Lagos strategic brand and communication studio and premium notebook maker: brand strategy, visual identity, communication systems, bespoke notebooks, 2027 diaries, handcrafted journals, event souvenirs and corporate gifts. More than two million notebooks since 2017.",
  phone: "+234 818 365 0000",
  whatsapp: "2348183650000",
  email: "hello@ysidra.com",
  address: "9, Sanusi Street, Somolu, Lagos, Nigeria",
  instagram: "https://www.instagram.com/weareysidra",
  linkedin: "https://www.linkedin.com/company/ysidra-strategy-design-books",
  shop: "https://ysidra-shop.vercel.app",
  founded: 2017,
  // Set to "/video/hero.mp4" (put the file in public/video) to replace the photo slideshow.
  heroVideo: null,
  // Optional: a Web3Forms access key (web3forms.com) to also email quote requests to hello@ysidra.com.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
};

export const nav = [
  { href: "/collections", label: "Collections" },
  { href: "/solutions/corporate", label: "Corporate" },
  { href: "/solutions/events", label: "Events" },
  { href: "/customisation", label: "Customisation" },
  { href: "/work", label: "Our work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];
