"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { isValidEmail, isValidNigerianPhone } from "@/lib/utils";

const NIGERIAN_STATES = [
  "Lagos", "Abuja (FCT)", "Ogun", "Oyo", "Rivers", "Kano", "Kaduna", "Enugu",
  "Delta", "Edo", "Anambra", "Imo", "Abia", "Cross River", "Akwa Ibom", "Other",
];

export function CheckoutForm() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    delivery_address: "",
    city: "",
    state: "Lagos",
    country: "Nigeria",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    if (!form.full_name.trim()) return "Please enter your full name.";
    if (!isValidEmail(form.email)) return "Please enter a valid email address.";
    if (!isValidNigerianPhone(form.phone)) return "Please enter a valid phone number.";
    if (!form.delivery_address.trim()) return "Please enter a delivery address.";
    if (!form.city.trim()) return "Please enter a city.";
    if (lines.length === 0) return "Your cart is empty.";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      // Server recomputes prices from the database — never trusts the
      // client-side subtotal. See app/api/orders/route.ts.
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: lines.map((l) => ({
            variantId: l.variantId,
            productId: l.productId,
            quantity: l.quantity,
          })),
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not create order.");

      const payRes = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.orderId,
          email: form.email,
        }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.error || "Could not start payment.");

      clear();
      window.location.href = payData.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            className="input"
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Phone number" required>
        <input
          type="tel"
          className="input"
          placeholder="080xxxxxxxx"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </Field>

      <Field label="Delivery address" required>
        <textarea
          className="input"
          rows={3}
          value={form.delivery_address}
          onChange={(e) => update("delivery_address", e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" required>
          <input
            className="input"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </Field>
        <Field label="State" required>
          <select
            className="input"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
          >
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Preparing payment…" : "Pay now"}
      </Button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-saffron">*</span>}
      </span>
      {children}
    </label>
  );
}
