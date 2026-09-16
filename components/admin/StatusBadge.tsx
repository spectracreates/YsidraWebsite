import { Badge } from "@/components/ui/Badge";

const TONES: Record<string, "indigo" | "saffron" | "neutral"> = {
  paid: "indigo",
  pending: "neutral",
  processing: "saffron",
  in_production: "saffron",
  ready: "saffron",
  shipped: "indigo",
  delivered: "indigo",
  cancelled: "neutral",
  failed: "neutral",
  refunded: "neutral",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={TONES[status] || "neutral"}>{status.replace("_", " ")}</Badge>;
}
