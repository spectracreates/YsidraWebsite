import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { initializeTransaction } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const { orderId, email } = await req.json();
    if (!orderId || !email) {
      return NextResponse.json({ error: "Missing order details." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: order, error } = await supabase
      .from("orders")
      .select("id, order_number, total_amount, payment_status")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    if (order.payment_status === "paid") {
      return NextResponse.json({ error: "This order has already been paid." }, { status: 409 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const reference = `${order.order_number}-${Date.now()}`;

    const transaction = await initializeTransaction({
      email,
      amountNaira: order.total_amount,
      reference,
      callbackUrl: `${siteUrl}/checkout/success`,
      metadata: { order_id: order.id, order_number: order.order_number },
    });

    await supabase.from("orders").update({ paystack_reference: reference }).eq("id", order.id);

    return NextResponse.json({ authorizationUrl: transaction.authorization_url });
  } catch (err) {
    console.error("Paystack initialize failed:", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 500 });
  }
}
