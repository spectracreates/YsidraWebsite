"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const makeSteps = (quoteSteps) => [
  { key: "items", title: "What would you like made?", hint: "Choose all that apply.", multi: true, options: quoteSteps.items },
  { key: "qty", title: "How many, and by when?", hint: "A rough number is fine.", multi: false, options: quoteSteps.quantities, date: true },
  { key: "finish", title: "How should it look?", hint: "Pick the finishes you like, or let us recommend.", multi: true, options: quoteSteps.finishes },
  { key: "details", title: "Where should we reply?", hint: "We reply on WhatsApp or email during working hours." },
];
const EMPTY = { items: [], qty: "", when: "", finish: [], name: "", company: "", phone: "", email: "", notes: "", product: "" };

export default function QuoteForm({ quoteSteps, products = [] }) {
  const STEPS = makeSteps(quoteSteps);
  const [st, setSt] = useState(0);
  const [q, setQ] = useState(EMPTY);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState("");
  const [copied, setCopied] = useState(false);

  // Prefill from ?product=slug links on product pages.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    const p = slug && products.find((x) => x.id === slug);
    if (p) setQ((o) => ({ ...o, product: p.name, notes: o.notes || `Interested in: ${p.name}` }));
  }, []);

  const set = (k, v) => setQ((o) => ({ ...o, [k]: v }));
  const toggle = (k, v) => setQ((o) => ({ ...o, [k]: o[k].includes(v) ? o[k].filter((x) => x !== v) : [...o[k], v] }));

  const message = () => [
    "Hello YSIDRA, I would like a quote.",
    "",
    q.product && `Product: ${q.product}`,
    `Items: ${q.items.join(", ") || "Not sure yet"}`,
    `Quantity: ${q.qty || "Not sure"}`,
    `Needed by: ${q.when || "Flexible"}`,
    `Finishes: ${q.finish.join(", ") || "Please recommend"}`,
    q.notes && `Notes: ${q.notes}`,
    "",
    `Name: ${q.name}`,
    q.company && `Company: ${q.company}`,
    `Phone: ${q.phone}`,
    q.email && `Email: ${q.email}`,
  ].filter((l) => l !== false && l !== null && l !== undefined).join("\n");

  function next(e) {
    e.preventDefault();
    setErr("");
    const s = STEPS[st];
    if (s.key === "items" && !q.items.length) return setErr("Choose at least one item.");
    if (s.key === "details") {
      if (!q.name.trim()) return setErr("Add your name.");
      if (q.phone.replace(/\D/g, "").length < 7) return setErr("Add a phone or WhatsApp number we can reach.");
      if (q.email && !/^\S+@\S+\.\S+$/.test(q.email)) return setErr("Check the email address.");
    }
    setSt(st + 1);
  }

  async function emailCopy() {
    if (!site.web3formsKey) return;
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: site.web3formsKey, subject: `Website quote request from ${q.name}`, from_name: "ysidra.com", message: message(), email: q.email || undefined }),
      });
      setSent(r.ok ? "Your request has also been emailed to our team." : "");
    } catch { /* WhatsApp is the main route; email is a bonus */ }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(message()); setCopied(true); } catch { setCopied(false); }
  }

  const s = STEPS[st];
  return (
    <div>
      <div className="progress" aria-hidden="true">{STEPS.map((_, i) => (<i key={i} className={i <= st ? "on" : ""} />))}</div>
      {st < STEPS.length ? (
        <form className="form" onSubmit={next} noValidate>
          <h3>{s.title}</h3>
          <p className="hint">Step {st + 1} of {STEPS.length}. {s.hint}</p>
          {s.options && (
            <div className="opts" role="group" aria-label={s.title}>
              {s.options.map((o) => (
                <label className="opt" key={o}>
                  <input type={s.multi ? "checkbox" : "radio"} name={s.key} checked={s.multi ? q[s.key].includes(o) : q[s.key] === o}
                    onChange={() => (s.multi ? toggle(s.key, o) : set(s.key, o))} />
                  {o}
                </label>
              ))}
            </div>
          )}
          {s.date && (
            <label className="fld"><span>Date needed (optional)</span>
              <input type="date" value={q.when} onChange={(e) => set("when", e.target.value)} /></label>
          )}
          {s.key === "details" && (
            <>
              <label className="fld"><span>Your name</span><input autoComplete="name" value={q.name} onChange={(e) => set("name", e.target.value)} /></label>
              <label className="fld"><span>Company or organisation (optional)</span><input autoComplete="organization" value={q.company} onChange={(e) => set("company", e.target.value)} /></label>
              <label className="fld"><span>Phone or WhatsApp</span><input type="tel" autoComplete="tel" inputMode="tel" value={q.phone} onChange={(e) => set("phone", e.target.value)} /></label>
              <label className="fld"><span>Email (optional)</span><input type="email" autoComplete="email" value={q.email} onChange={(e) => set("email", e.target.value)} /></label>
              <label className="fld"><span>Anything else (optional)</span><textarea rows={3} value={q.notes} onChange={(e) => set("notes", e.target.value)} /></label>
            </>
          )}
          <p className="err" role="alert">{err}</p>
          <div className="fnav">
            {st > 0 ? <button type="button" className="btn btn-line" onClick={() => { setErr(""); setSt(st - 1); }}>Back</button> : <span />}
            <button type="submit" className="btn btn-o">{st === STEPS.length - 1 ? "Review" : "Next"}</button>
          </div>
        </form>
      ) : (
        <div className="form">
          <h3>Ready to send</h3>
          <p className="hint">Sending opens WhatsApp with your request written out. You can also copy it into an email to {site.email}.</p>
          <div className="summary">{message()}</div>
          {sent && <p className="hint" style={{ marginTop: 12 }}>{sent}</p>}
          <div className="fnav">
            <button type="button" className="btn btn-line" onClick={() => setSt(STEPS.length - 1)}>Edit</button>
            <div className="btn-row">
              <button type="button" className="btn btn-line" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
              <a className="btn btn-o" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message())}`} onClick={emailCopy}>Send on WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
