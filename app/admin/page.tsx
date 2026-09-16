import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const { count: orderCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: pendingCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("order_status", "pending");

  const { data: paidOrders } = await supabase
    .from("orders")
    .select("total_amount")
    .eq("payment_status", "paid");

  const revenue = (paidOrders || []).reduce((sum, o) => sum + o.total_amount, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-indigo">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total orders" value={String(orderCount ?? 0)} />
        <StatCard label="Pending orders" value={String(pendingCount ?? 0)} />
        <StatCard label="Revenue (paid orders)" value={formatNaira(revenue)} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-parchment-200 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</p>
      <p className="mt-2 font-display text-2xl font-extrabold text-indigo">{value}</p>
    </div>
  );
}
