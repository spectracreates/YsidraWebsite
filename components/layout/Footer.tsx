import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Mail, Phone, Instagram } from "lucide-react";

export function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348183650000";
  return (
    <footer className="bg-indigo-950 text-white/80">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-horizontal.png"
            alt="Ysidra"
            width={150}
            height={38}
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Exceptional notebooks for exceptional brands, organisations, events and
            people. Handcrafted in Lagos.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-saffron">Home</Link></li>
            <li><Link href="/books" className="hover:text-saffron">Books</Link></li>
            <li><Link href="/about" className="hover:text-saffron">About</Link></li>
            <li><Link href="/about#impact" className="hover:text-saffron">Impact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
            Talk to us
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-saffron" />
              <a href={`https://wa.me/${whatsapp}`} className="hover:text-saffron">
                +234 818 365 0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-saffron" />
              <a href="mailto:hello@ysidra.com" className="hover:text-saffron">
                hello@ysidra.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-saffron" />
              <a
                href="https://instagram.com/ysidraprintsandbooks"
                className="hover:text-saffron"
              >
                @ysidraprintsandbooks
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Ysidra Creative Solutions. No 9, Sanusi Street,
        Shomolu, Lagos.
      </div>
    </footer>
  );
}
