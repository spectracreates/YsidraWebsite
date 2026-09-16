"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { formatNaira } from "@/lib/utils";

export default function CartPage() {
  const { lines, subtotal } = useCart();

  return (
    <Section className="pt-10 md:pt-14">
      <Container>
        <h1 className="mb-8 font-display text-3xl font-extrabold text-indigo">
          Your cart
        </h1>

        {lines.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Browse the collection and add a piece you'll want to keep."
            action={
              <Button href="/books" className="mt-2">
                Continue shopping
              </Button>
            }
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              {lines.map((line) => (
                <CartLineItem key={line.variantId} line={line} />
              ))}
              <Link
                href="/books"
                className="mt-6 inline-block text-sm font-semibold text-indigo hover:underline"
              >
                ← Continue shopping
              </Link>
            </div>

            <div className="h-fit rounded-card border border-parchment-200 p-6">
              <h2 className="font-display text-lg font-bold text-indigo">
                Order summary
              </h2>
              <div className="mt-4 flex justify-between text-sm text-ink/70">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">{formatNaira(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink/40">
                Delivery fee calculated at checkout, if applicable.
              </p>
              <Button href="/checkout" className="mt-6 w-full">
                Proceed to checkout
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
