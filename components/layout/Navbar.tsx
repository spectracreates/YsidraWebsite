"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/about#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-parchment-200 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-horizontal.png"
            alt="Ysidra — Strategy, Design, Books"
            width={160}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-semibold tracking-wide text-ink/80 transition-colors hover:text-indigo",
                pathname === link.href && "text-indigo"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-indigo hover:bg-indigo-50"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/about#contact"
            className="rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Start a Project
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-indigo md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-parchment-200 bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-ink/80 hover:bg-parchment"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-ink/80 hover:bg-parchment"
            >
              Cart {itemCount > 0 && <span className="text-saffron">({itemCount})</span>}
            </Link>
            <Link
              href="/about#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-indigo px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Start a Project
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
