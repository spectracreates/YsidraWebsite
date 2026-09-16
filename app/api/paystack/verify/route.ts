import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyTransaction } from "@/lib/paystack";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ status: "error", error: "Missing reference." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();

    const { data: order } = await supabase
      .from("orders")
      .select("id, order_number, customer_name, total_amount, payment_status, order_status")
      .eq("paystack_reference", reference)
      .single();

    if (!order) {
      return NextResponse.json({ status: "error", error: "Order not found." }, { status: 404 });
    }

    // The frontend never decides "payment succeeded" — we always re-verify
    // directly with Paystack here, server-side, before trusting anything.
    const verification = await verifyTransaction(reference);

    if (verification.status !== "success") {
      return NextResponse.json({ status: "failed" });
    }

    // Idempotent update: only flip to paid if not already paid, and log the
    // event in `payments` with a unique (reference, status) constraint so a
    // repeated call (or a later webhook delivery of the same event) is a no-op.
    if (order.payment_status !== "paid") {
      await supabase
        .from("orders")
        .update({ payment_status: "paid", order_status: "paid" })
        .eq("id", order.id);
    }

    await supabase.from("payments").upsert(
      {
        order_id: order.id,
        paystack_reference: reference,
        amount: verification.amount,
        status: verification.status,
        raw_payload: verification,
      },
      { onConflict: "paystack_reference,status" }
    );

    const { data: items } = await supabase
      .from("order_items")
      .select("product_name_snapshot, quantity, unit_price")
      .eq("order_id", order.id);

    return NextResponse.json({
      status: "success",
      order: {
        order_number: order.order_number,
        customer_name: order.customer_name,
        total_amount: order.total_amount,
        payment_status: "paid",
        order_status: "paid",
        items: items || [],
      },
    });
  } catch (err) {
    console.error("Paystack verify failed:", err);
    return NextResponse.json({ status: "error", error: "Verification failed." }, { status: 500 });
  }
}
