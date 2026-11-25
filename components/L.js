import NextLink from "next/link";
// Links do not preload pages in the background (that competes with photos on slow networks).
// Next.js still preloads a page when a visitor hovers or touches its link.
export default function L({ prefetch = false, ...props }) {
  return <NextLink prefetch={prefetch} {...props} />;
}
