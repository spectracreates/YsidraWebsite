import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateOrderNumber, isValidEmail, isValidNigerianPhone } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items } = body as {
      customer: {
        full_name: string;
        email: string;
        phone: string;
        delivery_address: string;
        city: string;
        state: string;
        country: string;
      };
      items: { variantId: string; productId: string; quantity: number }[];
    };

    // ── Validate customer input ────────────────────────────────────────
    if (!customer?.full_name?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!isValidEmail(customer?.email || "")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!isValidNigerianPhone(customer?.phone || "")) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }
    if (!customer?.delivery_address?.trim() || !customer?.city?.trim()) {
      return NextResponse.json({ error: "Delivery address and city are required." }, { status: 400 });
    }
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }
    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 50) {
        return NextResponse.json({ error: "Invalid quantity supplied." }, { status: 400 });
      }
    }

    const supabase = createAdminClient();

    // ── CRITICAL: fetch authoritative prices from the database. The
    // client-side subtotal is never trusted — see master prompt §27/§28. ──
    const variantIds = items.map((i) => i.variantId);
    const { data: variants, error: variantError } = await supabase
      .from("product_variants")
      .select("id, label, price, sku, product_id, products(name, available)")
      .in("id", variantIds);

    if (variantError) {
      return NextResponse.json({ error: "Could not verify products." }, { status: 500 });
    }
    if (!variants || variants.length !== new Set(variantIds).size) {
      return NextResponse.json({ error: "One or more items are no longer available." }, { status: 400 });
    }

    let subtotal = 0;
    const orderItemsPayload: {
      product_id: string;
      variant_id: string;
      product_name_snapshot: string;
      variant_label_snapshot: string;
      unit_price: number;
      quantity: number;
      subtotal: number;
    }[] = [];

    for (const item of items) {
      const variant = variants.find((v: any) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json({ error: "One or more items are invalid." }, { status: 400 });
      }
      const product = Array.isArray((variant as any).products)
        ? (variant as any).products[0]
        : (variant as any).products;
      if (!product?.available) {
        return NextResponse.json(
          { error: `${product?.name || "An item"} in your cart is currently unavailable.` },
          { status: 400 }
        );
      }
      const lineSubtotal = variant.price * item.quantity;
      subtotal += lineSubtotal;
      orderItemsPayload.push({
        product_id: item.productId,
        variant_id: variant.id,
        product_name_snapshot: product?.name || "Product",
        variant_label_snapshot: variant.label,
        unit_price: variant.price,
        quantity: item.quantity,
        subtotal: lineSubtotal,
      });
    }

    // Delivery is not charged today per current business rules (may change
    // later — deliberately kept as an explicit line so turning it on later
    // is a one-line change, not a schema change).
    const deliveryFee = 0;
    const totalAmount = subtotal + deliveryFee;

    const orderNumber = generateOrderNumber();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customer.full_name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        delivery_address: customer.delivery_address,
        city: customer.city,
        state: customer.state,
        country: customer.country || "Nigeria",
        subtotal,
        delivery_fee: deliveryFee,
        total_amount: totalAmount,
        payment_status: "pending",
        order_status: "pending",
      })
      .select("id, order_number")
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Could not create your order. Please try again." }, { status: 500 });
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      orderItemsPayload.map((item) => ({ ...item, order_id: order.id }))
    );

    if (itemsError) {
      // Roll back the orphaned order so it doesn't sit in the DB with no items.
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json({ error: "Could not save your order items. Please try again." }, { status: 500 });
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      totalAmount,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
