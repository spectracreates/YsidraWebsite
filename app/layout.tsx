import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ysidra.com"),
  title: {
    default: "Ysidra — Strategy. Design. Remarkable Books.",
    template: "%s | Ysidra",
  },
  description:
    "Ysidra is a Nigerian strategy, design and book company. Handcrafted premium notebooks, corporate books and creative work made in Lagos.",
  openGraph: {
    title: "Ysidra — Strategy. Design. Remarkable Books.",
    description:
      "Ysidra is a Nigerian strategy, design and book company. Handcrafted premium notebooks, corporate books and creative work made in Lagos.",
    siteName: "Ysidra",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
