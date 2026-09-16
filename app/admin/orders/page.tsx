import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("orders")
    .select("id, order_number, customer_name, customer_email, total_amount, payment_status, order_status, created_at")
    .order("created_at", { ascending: false });

  if (searchParams.status) {
    query = query.eq("order_status", searchParams.status);
  }
  if (searchParams.q) {
    query = query.or(
      `order_number.ilike.%${searchParams.q}%,customer_email.ilike.%${searchParams.q}%,customer_name.ilike.%${searchParams.q}%`
    );
  }

  const { data: orders } = await query;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-indigo">Orders</h1>

      <form className="mt-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search by order #, name or email"
          className="input max-w-xs"
        />
        <select name="status" defaultValue={searchParams.status || ""} className="input max-w-[180px]">
          <option value="">All statuses</option>
          {["pending", "paid", "processing", "in_production", "ready", "shipped", "delivered", "cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            )
          )}
        </select>
        <button className="rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white">
          Filter
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-card border border-parchment-200">
        {!orders || orders.length === 0 ? (
          <EmptyState title="No orders found" />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-parchment/60 text-left text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-parchment-200 hover:bg-parchment/30">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="font-semibold text-indigo hover:underline">
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-xs text-ink/50">{order.customer_email}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatNaira(order.total_amount)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.payment_status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.order_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
