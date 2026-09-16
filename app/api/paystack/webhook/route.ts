import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyWebhookSignature } from "@/lib/paystack";

/**
 * Paystack webhook endpoint. Configure this URL in the Paystack dashboard:
 *   Settings → API Keys & Webhooks → Webhook URL
 *   https://<your-domain>/api/paystack/webhook
 *
 * This exists as a SECOND, independent confirmation path in addition to
 * /api/paystack/verify (which runs when the customer's browser returns from
 * checkout). Webhooks matter because a customer can close their browser
 * before the callback fires, but Paystack will still deliver the event here.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const supabase = createAdminClient();

  try {
    if (event.event === "charge.success") {
      const { reference, amount, status } = event.data;

      // Idempotency guard: the unique (paystack_reference, status) constraint
      // on `payments` means a duplicate delivery of the same event simply
      // fails this insert silently rather than double-processing the order.
      const { error: insertError } = await supabase.from("payments").insert({
        paystack_reference: reference,
        amount,
        status,
        raw_payload: event.data,
      });

      const alreadyProcessed = !!insertError; // unique constraint violation = seen before

      if (!alreadyProcessed) {
        const { data: order } = await supabase
          .from("orders")
          .select("id, payment_status")
          .eq("paystack_reference", reference)
          .single();

        if (order && order.payment_status !== "paid") {
          await supabase
            .from("orders")
            .update({ payment_status: "paid", order_status: "paid" })
            .eq("id", order.id);
        }
      }
    }

    // Acknowledge receipt regardless of event type so Paystack doesn't retry
    // events we intentionally don't act on.
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    // Still return 200 to prevent aggressive retries once we've logged the
    // failure — the /verify path on the success page acts as a backstop.
    return NextResponse.json({ received: true });
  }
}
