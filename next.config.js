/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/p/our-portfolio.html", destination: "/gallery", permanent: true },
      { source: "/p/about-us.html", destination: "/about", permanent: true },
      { source: "/books", destination: "/collections", permanent: true },
      { source: "/books/:slug", destination: "/collections", permanent: true },
      { source: "/cart", destination: "https://ysidra-shop.vercel.app", permanent: false },
      { source: "/checkout", destination: "https://ysidra-shop.vercel.app", permanent: false },
    ];
  },
};
