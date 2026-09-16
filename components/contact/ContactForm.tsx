"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { isValidEmail } from "@/lib/utils";

const SERVICES = [
  "Strategy",
  "Branding & Design",
  "Corporate / Bespoke Books",
  "Book Design & Production",
  "Corporate Gifting",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle"
  );
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !isValidEmail(form.email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
      setServices([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-display font-bold text-green-800">Message sent — thank you.</p>
        <p className="mt-1 text-sm text-green-700">
          We'll get back to you shortly. For anything urgent, reach us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Please check your name and email, then try again.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="input"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          type="email"
          className="input"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <input
        type="tel"
        className="input"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
      />

      <div>
        <p className="mb-2 text-sm font-semibold text-ink">What do you need?</p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <button
              type="button"
              key={service}
              onClick={() => toggleService(service)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                services.includes(service)
                  ? "border-indigo bg-indigo text-white"
                  : "border-parchment-200 text-ink/70 hover:border-indigo"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="input"
        rows={4}
        placeholder="Tell us about your project"
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
      />

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
