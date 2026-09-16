"use client";

import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { formatNaira } from "@/lib/utils";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <Section className="pt-10 md:pt-14">
        <Container>
          <EmptyState
            title="Your cart is empty"
            description="Add something from the collection before checking out."
            action={
              <Button href="/books" className="mt-2">
                Browse books
              </Button>
            }
          />
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-10 md:pt-14">
      <Container>
        <h1 className="mb-8 font-display text-3xl font-extrabold text-indigo">
          Checkout
        </h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-4 font-display text-lg font-bold text-indigo">
              Delivery details
            </h2>
            <CheckoutForm />
          </div>

          <div className="h-fit space-y-4 rounded-card border border-parchment-200 p-6">
            <h2 className="font-display text-lg font-bold text-indigo">
              Order summary
            </h2>
            {lines.map((line) => (
              <div key={line.variantId} className="flex justify-between text-sm">
                <span className="text-ink/70">
                  {line.name} ({line.variantLabel}) &times; {line.quantity}
                </span>
                <span className="font-semibold text-ink">
                  {formatNaira(line.unitPrice * line.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-parchment-200 pt-4">
              <div className="flex justify-between text-base font-bold text-indigo">
                <span>Total</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink/40">
                Final total is verified server-side before payment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
