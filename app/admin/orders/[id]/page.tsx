import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/StatusBadge";

const ORDER_STATUSES = [
  "pending", "paid", "processing", "in_production", "ready", "shipped", "delivered", "cancelled",
];

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!order) notFound();

  const { data: items } = await supabase
    .from("order_items")
    .select("product_name_snapshot, variant_label_snapshot, unit_price, quantity, subtotal")
    .eq("order_id", order.id);

  async function updateStatus(formData: FormData) {
    "use server";
    const status = formData.get("status") as string;
    const supabase = createClient();
    await supabase.from("orders").update({ order_status: status }).eq("id", params.id);
    revalidatePath(`/admin/orders/${params.id}`);
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-indigo">
          {order.order_number}
        </h1>
        <div className="flex gap-2">
          <StatusBadge status={order.payment_status} />
          <StatusBadge status={order.order_status} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-card border border-parchment-200 p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/50">Customer</h2>
          <p className="mt-2 font-semibold">{order.customer_name}</p>
          <p className="text-sm text-ink/60">{order.customer_email}</p>
          <p className="text-sm text-ink/60">{order.customer_phone}</p>
        </div>
        <div className="rounded-card border border-parchment-200 p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/50">Delivery</h2>
          <p className="mt-2 text-sm">{order.delivery_address}</p>
          <p className="text-sm text-ink/60">
            {order.city}, {order.state}, {order.country}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-parchment-200 p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">Items</h2>
        {(items || []).map((item, i) => (
          <div key={i} className="flex justify-between py-2 text-sm">
            <span>
              {item.product_name_snapshot} ({item.variant_label_snapshot}) &times; {item.quantity}
            </span>
            <span className="font-semibold">{formatNaira(item.subtotal)}</span>
          </div>
        ))}
        <div className="mt-3 flex justify-between border-t border-parchment-200 pt-3 font-bold text-indigo">
          <span>Total</span>
          <span>{formatNaira(order.total_amount)}</span>
        </div>
      </div>

      <form action={updateStatus} className="mt-6 flex items-end gap-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Update order status</span>
          <select name="status" defaultValue={order.order_status} className="input">
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white">
          Save
        </button>
      </form>
    </div>
  );
}
