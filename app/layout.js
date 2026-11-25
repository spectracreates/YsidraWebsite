import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ribbon from "@/components/Ribbon";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site, clients } from "@/lib/content";

const display = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-display", display: "swap" });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: "YSIDRA | Brand strategy, design and premium notebooks, Lagos", template: "%s | YSIDRA" },
  description: site.description,
  openGraph: { siteName: "YSIDRA", type: "website", locale: "en_NG", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.png" },
  alternates: { canonical: "/" },
};
export const viewport = { themeColor: "#2F3080" };

const ld = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "YSIDRA",
  alternateName: "Ysidra Premium Notebooks",
  url: site.url,
  logo: `${site.url}/img/logo.png`,
  image: `${site.url}/og.jpg`,
  description: site.description,
  foundingDate: String(site.founded),
  founder: { "@type": "Person", name: "Yeye Durojaiye-Arogundade" },
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: "9, Sanusi Street", addressLocality: "Somolu", addressRegion: "Lagos", addressCountry: "NG" },
  sameAs: [site.instagram, site.linkedin],
  knowsAbout: ["Corporate notebooks", "2027 diaries", "Handcrafted leather journals", "Ankara journals", "Event souvenir notebooks", "Corporate gifts", "Branding and design", "Business strategy"],
  slogan: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Ribbon />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
