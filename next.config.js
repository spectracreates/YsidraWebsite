/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "blogger.googleusercontent.com" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    // Photos and logos never change name, so browsers can keep them for a year.
    return [
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/og.jpg", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/p/our-portfolio.html", destination: "/gallery", permanent: true },
      { source: "/p/about-us.html", destination: "/about", permanent: true },
      { source: "/p/impact.html", destination: "/about", permanent: true },
      { source: "/p/contact.html", destination: "/quote", permanent: true },
      { source: "/books", destination: "/collections", permanent: true },
      { source: "/books/:slug", destination: "/collections", permanent: true },
      { source: "/cart", destination: "https://ysidra-shop.vercel.app", permanent: false },
      { source: "/checkout", destination: "https://ysidra-shop.vercel.app", permanent: false },
    ];
  },
};
