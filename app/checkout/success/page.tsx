"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Badge } from "@/components/ui/Badge";
import { formatNaira } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type OrderResult = {
  order_number: string;
  customer_name: string;
  total_amount: number;
  payment_status: string;
  order_status: string;
  items: { product_name_snapshot: string; quantity: number; unit_price: number }[];
};

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [state, setState] = useState<"loading" | "success" | "failed" | "error">(
    "loading"
  );
  const [order, setOrder] = useState<OrderResult | null>(null);

  useEffect(() => {
    if (!reference) {
      setState("error");
      return;
    }
    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setOrder(data.order);
          setState("success");
        } else {
          setState("failed");
        }
      })
      .catch(() => setState("error"));
  }, [reference]);

  return (
    <Section className="pt-10 md:pt-14">
      <Container className="max-w-2xl">
        {state === "loading" && <LoadingState label="Confirming your payment…" />}

        {state === "error" && (
          <ErrorState
            title="We couldn't verify this payment"
            description="If you completed payment, please contact us on WhatsApp with your reference and we'll confirm manually."
          />
        )}

        {state === "failed" && (
          <ErrorState
            title="Payment not completed"
            description="Your order wasn't charged. You can return to your cart and try again."
          />
        )}

        {state === "success" && order && (
          <div className="rounded-card border border-parchment-200 p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-indigo">
              Thank you, {order.customer_name.split(" ")[0]}!
            </h1>
            <p className="mt-1 text-ink/60">Order #{order.order_number}</p>

            <div className="mt-6 flex justify-center gap-3">
              <Badge tone="indigo">Payment: PAID</Badge>
              <Badge>Order: {order.order_status.toUpperCase()}</Badge>
            </div>

            <div className="mt-8 space-y-2 border-t border-parchment-200 pt-6 text-left">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-ink/70">
                    {item.product_name_snapshot} &times; {item.quantity}
                  </span>
                  <span className="font-semibold text-ink">
                    {formatNaira(item.unit_price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-parchment-200 pt-3 text-base font-bold text-indigo">
                <span>Total paid</span>
                <span>{formatNaira(order.total_amount)}</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-ink/60">
              We'll be in touch about production and delivery. Keep this order
              number for reference.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                href={`https://wa.me/${
                  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348183650000"
                }?text=${encodeURIComponent(
                  `Hi Ysidra, I'd like to ask about my order ${order.order_number}.`
                )}`}
                variant="outline"
              >
                Message us on WhatsApp
              </Button>
              <Button href="/books">Continue shopping</Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
