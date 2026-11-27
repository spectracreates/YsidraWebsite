"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import {
  TYPES, SIZES, MATERIALS, METHODS, POSITIONS, FONTS, PAGES, PAPERS, PAGE_COUNTS, ELASTICS, RIBBONS, RIBBON_COLOURS,
  EDGES, ENDSHEETS, PACKAGING, QUANTITIES, DEFAULT, PRESETS, FROM_PRODUCT, label,
} from "@/lib/builder";

// "Design your notebook": a live, rendered preview of the cover, inside pages and back, built from the
// choices on the right. Everything is drawn in SVG (no photos), so it stays fast on slow connections.
// The design can be shared as a link, downloaded as a design sheet, or sent to YSIDRA on WhatsApp.

const STAGE = 560;
const INSIDE_VIEWS = new Set(["pages", "paper", "count", "endsheets", "website", "branded"]);
const COVER_VIEWS = new Set(["material", "colour", "ankara", "method", "position", "scale", "font", "line1", "line2", "ink", "size", "elastic", "edges", "penLoop", "ribbons", "ribbonColour"]);

export default function NotebookBuilder() {
  const [c, setC] = useState(DEFAULT);
  const [view, setView] = useState("front");
  const [logo, setLogo] = useState(null); // { src, mask, ratio, w, name }
  const [art, setArt] = useState(null); // full-cover artwork for printed covers
  const [warn, setWarn] = useState("");
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frontRef = useRef(null);
  const insideRef = useRef(null);
  const backRef = useRef(null);
  const ready = useRef(false);

  // Start from a shared link (#d=...) or a product page (?from=product-id).
  useEffect(() => {
    let next = { ...DEFAULT };
    const from = new URLSearchParams(window.location.search).get("from");
    if (from && FROM_PRODUCT[from]) {
      const f = FROM_PRODUCT[from];
      next = { ...next, ...PRESETS[f.type || "notebook"], ...f };
    }
    const m = window.location.hash.match(/#d=([\w-]+)/);
    if (m) { try { next = { ...next, ...decode(m[1]) }; } catch (e) { /* ignore a broken link */ } }
    setC(next);
    ready.current = true;
  }, []);

  // Keep the share link in the address bar as the design changes (replaceState: no history spam).
  useEffect(() => {
    if (!ready.current) return;
    const t = setTimeout(() => history.replaceState(null, "", `${location.pathname}${location.search}#d=${encode(diff(c))}`), 250);
    return () => clearTimeout(t);
  }, [c]);

  const set = (k, v) => {
    setC((o) => {
      const n = { ...o, [k]: v };
      if (k === "material") {
        const m = MATERIALS.find((x) => x.id === v);
        if (m && v !== "ankara" && !m.colours.some(([, h]) => h === o.colour)) n.colour = m.colours[0][1];
        const meth = METHODS.find((x) => x.id === n.method);
        if (meth && meth.only && !meth.only.includes(v)) n.method = "gold";
      }
      return n;
    });
    if (INSIDE_VIEWS.has(k)) setView("inside");
    else if (COVER_VIEWS.has(k) && view !== "back") setView("front");
  };
  const pickType = (t) => { setC((o) => ({ ...o, ...PRESETS[t], type: t })); setView("front"); };

  const size = SIZES.find((s) => s.id === c.size) || SIZES[1];
  const mat = MATERIALS.find((m) => m.id === c.material) || MATERIALS[0];
  const summary = useMemo(() => specLines(c, size, mat, logo, art), [c, size, mat, logo, art]);
  const shareUrl = () => `${site.url}/design-your-notebook#d=${encode(diff(c))}`;

  async function onLogo(file) {
    if (!file) return;
    setWarn("");
    try {
      const out = await processLogo(file);
      setLogo(out);
      if (out.w < 300) setWarn(`This logo is small (${out.w}px wide). It will do for the preview, but send us a larger file, a PDF or an SVG for production.`);
      setView("front");
    } catch (e) {
      setWarn("We couldn't read that file. Try a PNG, JPG or SVG.");
    }
  }
  async function onArt(file) {
    if (!file) return;
    const src = await readAsDataURL(file);
    setArt({ src, name: file.name });
    set("material", "printed");
  }

  async function downloadSheet() {
    setBusy("Preparing your design sheet…");
    try {
      const [f, i, b] = await Promise.all([frontRef, insideRef, backRef].map((r) => svgImage(r.current)));
      const W = 2000, H = 1240;
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const g = cv.getContext("2d");
      g.fillStyle = "#faf6ee"; g.fillRect(0, 0, W, H);
      g.fillStyle = "#2f3080"; g.fillRect(0, 0, W, 120);
      g.fillStyle = "#eb7c05"; g.fillRect(W - 120, 0, 36, 190);
      const disp = getComputedStyle(document.documentElement).getPropertyValue("--font-display") || "Montserrat";
      const body = getComputedStyle(document.documentElement).getPropertyValue("--font-body") || "Open Sans";
      g.fillStyle = "#fff"; g.font = `800 44px ${disp}, Arial, sans-serif`;
      g.fillText("YSIDRA  ·  My notebook design", 60, 76);
      g.drawImage(f, 30, 140, 640, 640);
      g.drawImage(i, 660, 140, 640, 640);
      g.drawImage(b, 1290, 140, 640, 640);
      g.fillStyle = "#545a78"; g.font = `600 22px ${disp}, Arial, sans-serif`;
      [["Front", 330], ["Inside", 960], ["Back", 1590]].forEach(([t, x]) => { g.textAlign = "center"; g.fillText(t, x, 800); });
      g.textAlign = "left";
      g.fillStyle = "#1c2240"; g.font = `400 24px ${body}, Arial, sans-serif`;
      const cols = [summary.slice(0, Math.ceil(summary.length / 2)), summary.slice(Math.ceil(summary.length / 2))];
      cols.forEach((col, ci) => col.forEach(([k, v], ri) => {
        g.font = `700 22px ${disp}, Arial, sans-serif`; g.fillStyle = "#2f3080"; g.fillText(k, 60 + ci * 960, 870 + ri * 40);
        g.font = `400 22px ${body}, Arial, sans-serif`; g.fillStyle = "#1c2240"; g.fillText(trim(v, 60), 300 + ci * 960, 870 + ri * 40);
      }));
      g.fillStyle = "#545a78"; g.font = `400 20px ${body}, Arial, sans-serif`;
      g.fillText(`Preview only: colours and foil are shown digitally. We confirm with a proof before production.  ${site.url}  ·  ${site.phone}`, 60, H - 40);
      const a = document.createElement("a");
      a.download = "ysidra-notebook-design.png";
      a.href = cv.toDataURL("image/png");
      a.click();
      setBusy("Design sheet downloaded");
    } catch (e) {
      setBusy("Couldn't build the image on this browser. Use “Copy link” instead.");
    }
    setTimeout(() => setBusy(""), 3500);
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(shareUrl()); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch (e) { window.prompt("Copy this link", shareUrl()); }
  }

  function waMessage() {
    const lines = ["Hello YSIDRA, I designed a notebook on your website and would like a proof and a quote.", ""];
    summary.forEach(([k, v]) => lines.push(`${k}: ${v}`));
    if (c.name || c.company) lines.push("", `From: ${[c.name, c.company].filter(Boolean).join(", ")}`);
    if (c.notes) lines.push(`Notes: ${c.notes}`);
    lines.push("", `My design: ${shareUrl()}`);
    if (logo || art) lines.push("", "I'll attach my logo/artwork in this chat.");
    return lines.join("\n");
  }

  function onMove(e) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 16, y: -((e.clientY - r.top) / r.height - 0.5) * 10 });
  }

  const art3d = { transform: `rotateY(${tilt.x + (view === "back" ? 180 : 0)}deg) rotateX(${tilt.y}deg)` };

  return (
    <div className="nbs">
      <div className="nbs-left">
        <div className="nbs-stage" onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className={`nbs-book${view === "inside" ? " hide" : ""}`} style={art3d}>
            <div className="face"><Cover c={c} size={size} mat={mat} logo={logo} art={art} side="front" svgRef={frontRef} /></div>
            <div className="face back"><Cover c={c} size={size} mat={mat} logo={logo} art={art} side="back" svgRef={backRef} /></div>
          </div>
          <div className={`nbs-inside${view === "inside" ? " show" : ""}`} aria-hidden={view !== "inside"}>
            <Inside c={c} size={size} mat={mat} logo={logo} svgRef={insideRef} />
          </div>
          <div className="nbs-views" role="group" aria-label="Preview">
            {[["front", "Front"], ["inside", "Inside"], ["back", "Back"]].map(([id, t]) => (
              <button key={id} className="chip" aria-pressed={view === id} onClick={() => setView(id)}>{t}</button>
            ))}
          </div>
          <span className="nbs-size">{size.label} · {size.w} × {size.h} mm</span>
        </div>

        <div className="nbs-sum">
          <h2>Your notebook</h2>
          <dl>{summary.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
          <div className="btn-row">
            <a className="btn btn-o" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage())}`} target="_blank" rel="noopener">Send my design on WhatsApp</a>
            <button className="btn btn-line" onClick={downloadSheet} disabled={!!busy && busy.endsWith("…")}>Download design sheet</button>
            <button className="btn btn-line" onClick={copyLink}>{copied ? "Link copied" : "Copy link to share"}</button>
          </div>
          <p className="nbs-note" aria-live="polite">{busy || "No payment now. We reply with a proof and a quote for your quantity. Share the link with your team for sign-off first."}</p>
        </div>
      </div>

      <div className="nbs-right">
        <Step n={1} title="Start with">
          <div className="nbs-cards">
            {TYPES.map((t) => (
              <button key={t.id} className="nbs-card" aria-pressed={c.type === t.id} onClick={() => pickType(t.id)}>
                <b>{t.label}</b><span>{t.note}</span>
              </button>
            ))}
          </div>
        </Step>

        <Step n={2} title="Size">
          <div className="nbs-chips">
            {SIZES.map((s) => (
              <button key={s.id} className="chip nbs-sz" aria-pressed={c.size === s.id} onClick={() => set("size", s.id)}>
                <i style={{ width: s.w / 9, height: s.h / 9 }} aria-hidden="true" />{s.label}{s.note && <em> · {s.note}</em>}
              </button>
            ))}
          </div>
        </Step>

        <Step n={3} title="Cover">
          <div className="nbs-cards">
            {MATERIALS.map((m) => (
              <button key={m.id} className="nbs-card" aria-pressed={c.material === m.id} onClick={() => set("material", m.id)}>
                <b>{m.label}</b><span>{m.note}</span>
              </button>
            ))}
          </div>
          <Field label={c.material === "ankara" ? "Print" : "Colour"}>
            <div className="nbs-sw">
              {mat.colours.map(([n, h]) => (
                c.material === "ankara"
                  ? <button key={h} className={`sw ank-${h}`} aria-pressed={c.ankara === h} aria-label={n} title={n} onClick={() => set("ankara", h)} />
                  : <button key={h} className="sw" style={{ background: h }} aria-pressed={c.colour === h} aria-label={n} title={n} onClick={() => set("colour", h)} />
              ))}
              {mat.custom && (
                <label className="sw sw-pick" title="Your exact brand colour">
                  <input type="color" value={c.colour} onChange={(e) => set("colour", e.target.value)} aria-label="Pick your brand colour" />
                </label>
              )}
            </div>
            <span className="nbs-hint">{c.material === "ankara" ? label(mat.colours.map(([n, h]) => ({ id: h, label: n })), c.ankara) : (mat.colours.find(([, h]) => h === c.colour) || ["Your brand colour"])[0]}</span>
          </Field>
          {c.material === "printed" && (
            <Field label="Your own cover artwork (optional)">
              <Drop accept="image/*" onFile={onArt} text={art ? `Using ${art.name}` : "Upload a full-cover design (JPG or PNG)"} />
              {art && <button className="nbs-link" onClick={() => setArt(null)}>Remove artwork</button>}
            </Field>
          )}
        </Step>

        <Step n={4} title="Your brand on the cover">
          <Field label="Logo">
            <Drop accept="image/png,image/jpeg,image/svg+xml,image/webp" onFile={onLogo} text={logo ? `Using ${logo.name}` : "Upload your logo (PNG, JPG or SVG)"} />
            {logo && <button className="nbs-link" onClick={() => setLogo(null)}>Remove logo</button>}
            {warn && <p className="nbs-warn" role="status">{warn}</p>}
          </Field>
          <div className="nbs-two">
            <Field label="Main line"><input className="nbs-in" value={c.line1} maxLength={28} onChange={(e) => set("line1", e.target.value)} placeholder="Company or title" /></Field>
            <Field label="Second line"><input className="nbs-in" value={c.line2} maxLength={28} onChange={(e) => set("line2", e.target.value)} placeholder="Name, year or tagline" /></Field>
          </div>
          <Field label="Finish">
            <div className="nbs-chips">
              {METHODS.filter((m) => !m.only || m.only.includes(c.material)).map((m) => (
                <button key={m.id} className="chip" aria-pressed={c.method === m.id} onClick={() => set("method", m.id)}>{m.label}</button>
              ))}
            </div>
          </Field>
          {c.method === "print" && (
            <Field label="Text colour">
              <div className="nbs-sw">
                {[["White", "#ffffff"], ["Navy", "#2f3080"], ["Orange", "#eb7c05"], ["Black", "#151515"]].map(([n, h]) => (
                  <button key={h} className="sw" style={{ background: h }} aria-pressed={c.ink === h} aria-label={n} title={n} onClick={() => set("ink", h)} />
                ))}
                <label className="sw sw-pick"><input type="color" value={c.ink} onChange={(e) => set("ink", e.target.value)} aria-label="Pick a text colour" /></label>
              </div>
            </Field>
          )}
          <Field label="Lettering">
            <div className="nbs-chips">{FONTS.map((f) => (<button key={f.id} className="chip" style={{ fontFamily: f.css }} aria-pressed={c.font === f.id} onClick={() => set("font", f.id)}>{f.label}</button>))}</div>
          </Field>
          <Field label="Position">
            <div className="nbs-chips">{POSITIONS.map((p) => (<button key={p.id} className="chip" aria-pressed={c.position === p.id} onClick={() => set("position", p.id)}>{p.label}</button>))}</div>
          </Field>
          <Field label={`Size on the cover: ${c.scale}%`}>
            <input type="range" min="35" max="100" value={c.scale} onChange={(e) => set("scale", Number(e.target.value))} className="nbs-range" aria-label="Logo and text size" />
          </Field>
        </Step>

        <Step n={5} title="Inside">
          <Field label="Pages">
            <div className="nbs-chips">{PAGES.map((p) => (<button key={p.id} className="chip" aria-pressed={c.pages === p.id} onClick={() => set("pages", p.id)}>{p.label}</button>))}</div>
          </Field>
          <div className="nbs-two">
            <Field label="Paper">
              <div className="nbs-chips">{PAPERS.map((p) => (<button key={p} className="chip" aria-pressed={c.paper === p} onClick={() => set("paper", p)}>{p}</button>))}</div>
            </Field>
            <Field label="Number of pages">
              <div className="nbs-chips">{PAGE_COUNTS.map((n) => (<button key={n} className="chip" aria-pressed={c.count === n} onClick={() => set("count", n)}>{n}</button>))}</div>
            </Field>
          </div>
          <Field label="End sheets (inside the cover)">
            <div className="nbs-chips">{ENDSHEETS.map((e) => (<button key={e.id} className="chip" aria-pressed={c.endsheets === e.id} onClick={() => set("endsheets", e.id)}>{e.label}</button>))}</div>
          </Field>
          {c.endsheets === "qr" && (
            <Field label="Where should the QR code go?"><input className="nbs-in" value={c.website} onChange={(e) => set("website", e.target.value)} inputMode="url" spellCheck={false} placeholder="www.yourbrand.com" /></Field>
          )}
          <Toggle on={c.branded} onChange={(v) => set("branded", v)} text="Your logo printed on every page" />
        </Step>

        <Step n={6} title="Finishing touches">
          <Field label="Elastic closure">
            <div className="nbs-chips">{ELASTICS.map(([n, h]) => (<button key={n} className="chip" aria-pressed={c.elastic === h} onClick={() => set("elastic", h)}>{h && h !== "match" && <i className="dot" style={{ background: h }} aria-hidden="true" />}{n}</button>))}</div>
          </Field>
          <Field label="Ribbon marker">
            <div className="nbs-chips">{RIBBONS.map(([n, v]) => (<button key={n} className="chip" aria-pressed={c.ribbons === v} onClick={() => set("ribbons", v)}>{n}</button>))}</div>
            {c.ribbons > 0 && (
              <div className="nbs-sw" style={{ marginTop: 10 }}>
                {RIBBON_COLOURS.map(([n, h]) => (<button key={h} className="sw sm" style={{ background: h }} aria-pressed={c.ribbonColour === h} aria-label={`${n} ribbon`} title={n} onClick={() => set("ribbonColour", h)} />))}
              </div>
            )}
          </Field>
          <Field label="Page edges">
            <div className="nbs-chips">{EDGES.map(([n, v]) => (<button key={n} className="chip" aria-pressed={c.edges === v} onClick={() => set("edges", v)}>{n}</button>))}</div>
          </Field>
          <Toggle on={c.penLoop} onChange={(v) => set("penLoop", v)} text="Pen loop" />
          <Toggle on={c.pocket} onChange={(v) => set("pocket", v)} text="Pocket inside the back cover" />
          <Field label="Packaging">
            <div className="nbs-chips">{PACKAGING.map((p) => (<button key={p} className="chip" aria-pressed={c.packaging === p} onClick={() => set("packaging", p)}>{p}</button>))}</div>
          </Field>
        </Step>

        <Step n={7} title="Quantity and timing">
          <Field label="How many?">
            <div className="nbs-chips">{QUANTITIES.map((q) => (<button key={q} className="chip" aria-pressed={c.qty === q} onClick={() => set("qty", q)}>{q}</button>))}</div>
          </Field>
          <div className="nbs-two">
            <Field label="Needed by"><input className="nbs-in" type="date" value={c.when} onChange={(e) => set("when", e.target.value)} /></Field>
            <Field label="Your name"><input className="nbs-in" value={c.name} autoComplete="name" onChange={(e) => set("name", e.target.value)} /></Field>
          </div>
          <Field label="Company (optional)"><input className="nbs-in" value={c.company} autoComplete="organization" onChange={(e) => set("company", e.target.value)} /></Field>
          <Field label="Anything else? (optional)"><textarea className="nbs-in" rows={3} value={c.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Different names on each piece, a launch date, brand colours…" /></Field>
          <a className="btn btn-o nbs-send" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage())}`} target="_blank" rel="noopener">Send my design on WhatsApp</a>
        </Step>
      </div>

      <div className="nbs-bar">
        <span>{size.label} · {mat.label}</span>
        <a className="btn btn-o" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage())}`} target="_blank" rel="noopener">Send design</a>
      </div>
    </div>
  );
}

/* ---------- small UI pieces ---------- */
function Step({ n, title, children }) {
  return (
    <section className="nbs-step" aria-labelledby={`st${n}`}>
      <h2 id={`st${n}`}><span>{n}</span>{title}</h2>
      {children}
    </section>
  );
}
function Field({ label: l, children }) {
  return <div className="nbs-field"><div className="nbs-lab">{l}</div>{children}</div>;
}
function Toggle({ on, onChange, text }) {
  return (
    <button className="nbs-tog" role="switch" aria-checked={on} onClick={() => onChange(!on)}>
      <i aria-hidden="true" />{text}
    </button>
  );
}
function Drop({ accept, onFile, text }) {
  const [over, setOver] = useState(false);
  return (
    <label className={`nbs-drop${over ? " over" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFile(e.dataTransfer.files[0]); }}>
      <input type="file" accept={accept} onChange={(e) => onFile(e.target.files[0])} />
      <span>{text}</span><em>or drag it here</em>
    </label>
  );
}

/* ---------- drawing ---------- */
function geometry(size) {
  const H = 470 * (size.h / 297) + 40;
  const W = H * (size.w / size.h);
  return { W, H, bx: (STAGE - W) / 2 + 6, by: (STAGE - H) / 2 - 14 };
}

function Defs({ p, c }) {
  const mat = c.material;
  const noise = { leather: [0.9, 0.3], pu: [1.6, 0.14], linen: [1.1, 0.12], ankara: [1.4, 0.08], printed: [2, 0.04] }[mat] || [1.4, 0.1];
  return (
    <defs>
      <linearGradient id={`${p}gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7a5a17" /><stop offset=".25" stopColor="#e9cf7a" /><stop offset=".45" stopColor="#a8832a" /><stop offset=".62" stopColor="#f6e7a6" /><stop offset=".82" stopColor="#b08a2c" /><stop offset="1" stopColor="#6e5214" />
      </linearGradient>
      <linearGradient id={`${p}silver`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6d7076" /><stop offset=".3" stopColor="#eceef1" /><stop offset=".5" stopColor="#9a9da3" /><stop offset=".68" stopColor="#f7f8fa" /><stop offset=".85" stopColor="#8b8e94" /><stop offset="1" stopColor="#5b5e64" />
      </linearGradient>
      <linearGradient id={`${p}rose`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8a4d3e" /><stop offset=".3" stopColor="#f0c2ad" /><stop offset=".5" stopColor="#b87361" /><stop offset=".68" stopColor="#f9dccd" /><stop offset=".85" stopColor="#a86453" /><stop offset="1" stopColor="#7a4134" />
      </linearGradient>
      <linearGradient id={`${p}spine`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity=".5" /><stop offset=".045" stopColor="#000" stopOpacity=".14" /><stop offset=".08" stopColor="#fff" stopOpacity=".12" /><stop offset=".092" stopColor="#000" stopOpacity=".28" /><stop offset=".14" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${p}vig`} cx=".58" cy=".4" r=".85">
        <stop offset="0" stopColor="#fff" stopOpacity=".09" /><stop offset=".65" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".3" />
      </radialGradient>
      <linearGradient id={`${p}band`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity=".35" /><stop offset=".45" stopColor="#fff" stopOpacity=".18" /><stop offset="1" stopColor="#000" stopOpacity=".4" />
      </linearGradient>
      <filter id={`${p}nz`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency={noise[0]} numOctaves="3" seed="7" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <filter id={`${p}sh`} x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="10" dy="16" stdDeviation="14" floodColor="#1b1c4d" floodOpacity=".32" />
      </filter>
      <filter id={`${p}blur`}><feGaussianBlur stdDeviation="12" /></filter>
      <pattern id={`${p}linen`} width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M0 .5H4M0 2.5H4" stroke="#fff" strokeOpacity=".09" /><path d="M.5 0V4M2.5 0V4" stroke="#000" strokeOpacity=".09" />
      </pattern>
      <pattern id={`${p}pages`} width="4" height="2" patternUnits="userSpaceOnUse">
        <rect width="4" height="2" fill="#f3ecdc" /><path d="M0 1.5H4" stroke="#d9ceb6" strokeWidth=".6" />
      </pattern>
      <Ankara p={p} />
    </defs>
  );
}

function Ankara({ p }) {
  return (
    <>
      <pattern id={`${p}ank-sun`} width="48" height="48" patternUnits="userSpaceOnUse">
        <rect width="48" height="48" fill="#e59a2f" />
        <circle cx="24" cy="24" r="15" fill="#1f2a6b" /><circle cx="24" cy="24" r="10" fill="none" stroke="#e59a2f" strokeWidth="3" />
        <circle cx="24" cy="24" r="4" fill="#f4e3c1" />
        <path d="M0 0l6 6-6 6M48 0l-6 6 6 6M0 36l6 6-6 6M48 36l-6 6 6 6" fill="#0f6e64" />
      </pattern>
      <pattern id={`${p}ank-indigo`} width="56" height="28" patternUnits="userSpaceOnUse">
        <rect width="56" height="28" fill="#22306c" />
        <path d="M0 14c7-9 21-9 28 0s21 9 28 0" fill="none" stroke="#ece4d0" strokeWidth="3" />
        <path d="M0 24c7-9 21-9 28 0s21 9 28 0" fill="none" stroke="#e08a2a" strokeWidth="1.6" />
        <circle cx="14" cy="5" r="2" fill="#ece4d0" /><circle cx="42" cy="5" r="2" fill="#ece4d0" />
      </pattern>
      <pattern id={`${p}ank-kente`} width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="#e0b43a" />
        <rect x="10" width="9" height="60" fill="#1d6b3a" /><rect x="40" width="9" height="60" fill="#a3172b" />
        <rect y="24" width="60" height="12" fill="#151515" />
        <path d="M0 30h6l3-6 3 12 3-6h45" fill="none" stroke="#e0b43a" strokeWidth="2" />
      </pattern>
    </>
  );
}

function coverPath(x, y, W, H, r, spineRight) {
  return spineRight
    ? `M${x + W},${y} H${x + r} A${r},${r} 0 0 0 ${x},${y + r} V${y + H - r} A${r},${r} 0 0 0 ${x + r},${y + H} H${x + W} Z`
    : `M${x},${y} H${x + W - r} A${r},${r} 0 0 1 ${x + W},${y + r} V${y + H - r} A${r},${r} 0 0 1 ${x + W - r},${y + H} H${x} Z`;
}

function Cover({ c, size, mat, logo, art, side, svgRef }) {
  const p = side === "front" ? "f" : "b";
  const { W, H, bx, by } = geometry(size);
  const back = side === "back";
  const r = c.material === "leather" ? 12 : c.material === "ankara" ? 8 : 6;
  const base = c.material === "ankara" ? `url(#${p}ank-${c.ankara})` : c.colour;
  const solid = c.material === "ankara" ? { sun: "#1f2a6b", indigo: "#22306c", kente: "#1d6b3a" }[c.ankara] : c.colour;
  const elastic = c.elastic === "match" ? shade(solid, -28) : c.elastic;
  const edge = c.edges === "gold" ? `url(#${p}gold)` : c.edges === "silver" ? `url(#${p}silver)` : c.edges === "match" ? shade(solid, -10) : `url(#${p}pages)`;
  const thick = 2 + c.count / 80;
  const noise = { leather: 0.3, pu: 0.14, linen: 0.12, ankara: 0.08, printed: 0.04 }[c.material] || 0.1;
  const d = coverPath(bx, by, W, H, r, back);
  const ex = back ? bx + W * 0.09 : bx + W - W * 0.09 - 13; // elastic sits near the fore-edge
  return (
    <svg ref={svgRef} viewBox={`0 0 ${STAGE} ${STAGE}`} xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label={`${side === "front" ? "Front" : "Back"} of your ${size.label} ${mat.label.toLowerCase()} notebook`}>
      <Defs p={p} c={c} />
      <ellipse cx={STAGE / 2} cy={by + H + 16} rx={W * 0.55} ry="13" fill="#1b1c4d" opacity=".28" filter={`url(#${p}blur)`} />
      {/* ribbons hang from the bottom, under the cover */}
      {Array.from({ length: c.ribbons }).map((_, i) => {
        const x = back ? bx + W - W * 0.24 - i * 15 : bx + W * 0.22 + i * 15;
        const len = 46 + i * 8;
        return <path key={i} d={`M${x},${by + H - 8} h10 v${len} l-5,-8 l-5,8 Z`} fill={c.ribbonColour} stroke={shade(c.ribbonColour, -25)} strokeWidth=".6" />;
      })}
      {/* page block peeking out at the fore-edge and bottom */}
      <rect x={back ? bx - thick : bx + 2} y={by + 3} width={W} height={H - 1 + thick * 0.6} rx="4" fill={edge} />
      {c.penLoop && <rect x={back ? bx - 13 : bx + W - 2} y={by + H * 0.2} width="15" height="50" rx="6" fill={elastic || shade(solid, -30)} />}
      <g filter={`url(#${p}sh)`}>
        <path d={d} fill={base} />
        {c.material === "printed" && art && !back && (
          <g clipPath={`url(#${p}clip)`}>
            <clipPath id={`${p}clip`}><path d={d} /></clipPath>
            <image href={art.src} x={bx} y={by} width={W} height={H} preserveAspectRatio="xMidYMid slice" />
          </g>
        )}
      </g>
      <g clipPath={`url(#${p}clip2)`}>
        <clipPath id={`${p}clip2`}><path d={d} /></clipPath>
        {c.material === "linen" && <rect x={bx} y={by} width={W} height={H} fill={`url(#${p}linen)`} />}
        <rect x={bx} y={by} width={W} height={H} filter={`url(#${p}nz)`} opacity={noise} style={{ mixBlendMode: "multiply" }} />
        <rect x={bx} y={by} width={W} height={H} fill={`url(#${p}vig)`} />
        <rect x={bx} y={by} width={W} height={H} fill={`url(#${p}spine)`} transform={back ? `translate(${2 * bx + W},0) scale(-1,1)` : undefined} />
      </g>
      {c.material === "leather" && (
        <rect x={bx + (back ? 11 : 22)} y={by + 11} width={W - 33} height={H - 22} rx={r - 4} fill="none" stroke="#f1e2c6" strokeOpacity=".55" strokeWidth="1.6" strokeDasharray="7 6" />
      )}
      {!back && <Ink p={p} c={c} logo={logo} W={W} H={H} bx={bx} by={by} />}
      {c.elastic && (
        <g>
          <rect x={ex} y={by - 2} width="13" height={H + 4} fill={elastic} />
          <rect x={ex} y={by - 2} width="13" height={H + 4} fill={`url(#${p}band)`} />
        </g>
      )}
    </svg>
  );
}

// Logo and text, finished as foil, deboss, print or engraving.
function Ink({ p, c, logo, W, H, bx, by }) {
  const font = FONTS.find((f) => f.id === c.font) || FONTS[0];
  const k = c.scale / 70;
  const maxW = W * 0.56 * k;
  const logoH = logo ? Math.min(maxW / logo.ratio, H * 0.24 * k) : 0;
  const logoW = logo ? logoH * logo.ratio : 0;
  const f1 = Math.min(W * 0.085 * k, (maxW * 1.6) / Math.max(6, (c.line1 || "").length));
  const f2 = f1 * 0.55;
  const gap = f1 * 0.45;
  const parts = [];
  let h = 0;
  if (logo) { parts.push({ t: "logo", y: h }); h += logoH + (c.line1 || c.line2 ? gap : 0); }
  if (c.line1) { parts.push({ t: "l1", y: h + f1 * 0.82 }); h += f1 + (c.line2 ? gap * 0.6 : 0); }
  if (c.line2) { parts.push({ t: "l2", y: h + f2 * 0.82 }); h += f2; }
  if (!parts.length) return null;
  const cx = { centre: bx + W * 0.54, upper: bx + W * 0.54, bc: bx + W * 0.54, br: bx + W * 0.86 }[c.position];
  const top = { centre: by + H * 0.46 - h / 2, upper: by + H * 0.27 - h / 2, bc: by + H * 0.86 - h, br: by + H * 0.88 - h }[c.position];
  const anchor = c.position === "br" ? "end" : "middle";
  const lx = c.position === "br" ? cx - logoW : cx - logoW / 2;

  const paint = { gold: `url(#${p}gold)`, silver: `url(#${p}silver)`, rose: `url(#${p}rose)`, print: c.ink, engrave: "#2b170c", deboss: "#000" }[c.method];
  const op = c.method === "deboss" ? 0.3 : c.method === "engrave" ? 0.62 : 1;
  const txt = (part, dx = 0, dy = 0, fill = paint, opacity = op) => (
    <text key={part.t + dx} x={cx + dx} y={top + part.y + dy} textAnchor={anchor} fill={fill} opacity={opacity}
      style={{ fontFamily: font.css, fontWeight: part.t === "l1" ? font.weight : 600, fontSize: part.t === "l1" ? f1 : f2, letterSpacing: part.t === "l1" ? "0.04em" : "0.16em", textTransform: font.caps ? "uppercase" : "none" }}>
      {part.t === "l1" ? c.line1 : c.line2}
    </text>
  );
  const logoPart = parts.find((x) => x.t === "logo");
  const ly = logoPart ? top + logoPart.y : 0;
  const masked = (fill, dx = 0, dy = 0, opacity = op) => {
    const id = `${p}lm${String(dx).replace(".", "_")}`;
    return (
    <g key={id} transform={`translate(${dx},${dy})`} opacity={opacity}>
      <mask id={id} maskUnits="userSpaceOnUse" x={lx} y={ly} width={logoW} height={logoH}>
        <image href={logo.mask} x={lx} y={ly} width={logoW} height={logoH} preserveAspectRatio="xMidYMid meet" />
      </mask>
      <rect x={lx} y={ly} width={logoW} height={logoH} fill={fill} mask={`url(#${id})`} />
    </g>
    );
  };
  const textParts = parts.filter((x) => x.t !== "logo");
  return (
    <g>
      {logo && (c.method === "print"
        ? <image href={logo.src} x={lx} y={ly} width={logoW} height={logoH} preserveAspectRatio="xMidYMid meet" />
        : c.method === "deboss"
          ? <>{masked("#fff", 0.9, 0.9, 0.16)}{masked("#000", 0, 0, 0.32)}</>
          : <>{c.method !== "engrave" && masked("#000", 0.6, 0.8, 0.25)}{masked(paint)}</>)}
      {c.method === "deboss" && textParts.map((x) => txt(x, 0.9, 0.9, "#fff", 0.16))}
      {(c.method === "gold" || c.method === "silver" || c.method === "rose") && textParts.map((x) => txt(x, 0.6, 0.8, "#000", 0.25))}
      {textParts.map((x) => txt(x))}
    </g>
  );
}

function Inside({ c, size, mat, logo, svgRef }) {
  const p = "i";
  const ratio = size.h / size.w;
  const w = Math.min(248, 400 / ratio);
  const ph = w * ratio;
  const x0 = (STAGE - 2 * w) / 2, y0 = (STAGE - ph) / 2;
  const paper = c.paper.includes("cream") ? "#fbf4e4" : "#ffffff";
  const solid = c.material === "ankara" ? { sun: "#1f2a6b", indigo: "#22306c", kente: "#1d6b3a" }[c.ankara] : c.colour;
  const cover = c.material === "ankara" ? `url(#${p}ank-${c.ankara})` : c.colour;
  const ink = "#9fa6c4";
  const R = x0 + w; // right page left edge
  return (
    <svg ref={svgRef} viewBox={`0 0 ${STAGE} ${STAGE}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inside pages of your notebook">
      <Defs p={p} c={c} />
      <linearGradient id="igut" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset=".42" stopColor="#000" stopOpacity=".06" /><stop offset=".5" stopColor="#000" stopOpacity=".22" /><stop offset=".58" stopColor="#000" stopOpacity=".06" /><stop offset="1" stopColor="#000" stopOpacity="0" />
      </linearGradient>
      <ellipse cx={STAGE / 2} cy={y0 + ph + 18} rx={w * 1.05} ry="12" fill="#1b1c4d" opacity=".25" filter={`url(#${p}blur)`} />
      <rect x={x0 - 8} y={y0 - 7} width={2 * w + 16} height={ph + 14} rx="7" fill={cover} />
      <rect x={x0 - 8} y={y0 - 7} width={2 * w + 16} height={ph + 14} rx="7" fill="#000" opacity=".18" />
      {/* left page: end sheet */}
      <EndSheet c={c} x={x0} y={y0} w={w} h={ph} paper={paper} solid={solid} logo={logo} p={p} />
      {/* right page: ruling */}
      <rect x={R} y={y0} width={w} height={ph} fill={paper} />
      <Ruling kind={c.pages} x={R} y={y0} w={w} h={ph} ink={ink} solid={solid} />
      {c.branded && (logo
        ? <image href={logo.src} x={R + w / 2 - 14} y={y0 + ph - 22} width="28" height="14" preserveAspectRatio="xMidYMid meet" opacity=".75" />
        : <text x={R + w / 2} y={y0 + ph - 11} textAnchor="middle" fill={solid} opacity=".8" style={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: 700, fontSize: 7, letterSpacing: "0.14em" }}>{(c.line1 || "YOUR BRAND").toUpperCase()}</text>)}
      {c.ribbons > 0 && Array.from({ length: c.ribbons }).map((_, i) => (
        <path key={i} d={`M${R + w * 0.38 + i * 12},${y0} v${ph + 30 + i * 6} l-4,-7 l-4,7 V${y0} Z`} fill={c.ribbonColour} opacity=".95" />
      ))}
      <rect x={x0} y={y0} width={2 * w} height={ph} fill="url(#igut)" />
    </svg>
  );
}

function EndSheet({ c, x, y, w, h, paper, solid, logo, p }) {
  if (c.endsheets === "plain") {
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} fill={paper} />
        <text x={x + w / 2} y={y + h * 0.42} textAnchor="middle" fill="#8a90ad" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 11 }}>This notebook belongs to</text>
        {[0, 1, 2].map((i) => (<line key={i} x1={x + w * 0.2} x2={x + w * 0.8} y1={y + h * 0.5 + i * 18} y2={y + h * 0.5 + i * 18} stroke="#c9cbe0" />))}
      </g>
    );
  }
  const fill = c.material === "ankara" ? `url(#${p}ank-${c.ankara})` : solid;
  const light = lum(solid) > 0.6;
  const fg = light ? "#1c2240" : "#ffffff";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      {c.material === "ankara" && <rect x={x + w * 0.12} y={y + h * 0.08} width={w * 0.76} height={h * 0.84} fill="#1b1c4d" opacity=".82" rx="4" />}
      {logo
        ? <image href={logo.src} x={x + w / 2 - w * 0.22} y={y + h * 0.12} width={w * 0.44} height={h * 0.12} preserveAspectRatio="xMidYMid meet" />
        : <text x={x + w / 2} y={y + h * 0.2} textAnchor="middle" fill={fg} style={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: 800, fontSize: Math.min(20, w * 0.075), letterSpacing: "0.06em" }}>{c.line1 || "YOUR BRAND"}</text>}
      {c.endsheets === "qr" && (
        <g>
          <rect x={x + w / 2 - w * 0.2} y={y + h * 0.38} width={w * 0.4} height={w * 0.4} rx="4" fill="#fff" />
          <QR text={c.website} x={x + w / 2 - w * 0.17} y={y + h * 0.38 + w * 0.03} s={w * 0.34} />
          <text x={x + w / 2} y={y + h * 0.38 + w * 0.4 + 20} textAnchor="middle" fill={fg} style={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: "0.12em" }}>SCAN TO VISIT</text>
          <text x={x + w / 2} y={y + h * 0.38 + w * 0.4 + 34} textAnchor="middle" fill={fg} opacity=".85" style={{ fontFamily: "Montserrat, Arial, sans-serif", fontSize: 9 }}>{trim(c.website, 34)}</text>
        </g>
      )}
    </g>
  );
}

// A QR-style pattern for the preview (the real code is generated for production).
function QR({ text, x, y, s }) {
  const n = 25, m = s / n;
  let seed = 0;
  for (const ch of text || "ysidra") seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return ((seed >>> 0) % 1000) / 1000; };
  const cells = [];
  const finder = (i, j) => (i < 7 && j < 7) || (i < 7 && j >= n - 7) || (i >= n - 7 && j < 7);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (!finder(i, j) && rnd() > 0.52) cells.push([i, j]);
  const F = ([fi, fj]) => (
    <g key={`${fi}${fj}`}>
      <rect x={x + fj * m} y={y + fi * m} width={7 * m} height={7 * m} fill="#151515" />
      <rect x={x + (fj + 1) * m} y={y + (fi + 1) * m} width={5 * m} height={5 * m} fill="#fff" />
      <rect x={x + (fj + 2) * m} y={y + (fi + 2) * m} width={3 * m} height={3 * m} fill="#151515" />
    </g>
  );
  return (
    <g>
      {cells.map(([i, j]) => (<rect key={`${i}-${j}`} x={x + j * m} y={y + i * m} width={m + 0.2} height={m + 0.2} fill="#151515" />))}
      {[[0, 0], [0, n - 7], [n - 7, 0]].map(F)}
    </g>
  );
}

function Ruling({ kind, x, y, w, h, ink, solid }) {
  const pad = w * 0.09, top = y + h * 0.1, bottom = y + h - h * 0.08;
  const step = Math.max(9, h / 30);
  const t = (s, X, Y, o = {}) => <text x={X} y={Y} fill={o.fill || "#2f3459"} style={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: o.w || 700, fontSize: o.size || 8, letterSpacing: o.ls || "0.08em" }} textAnchor={o.a || "start"}>{s}</text>;
  if (kind === "lined") {
    const out = [];
    for (let yy = top; yy < bottom; yy += step) out.push(<line key={yy} x1={x + pad} x2={x + w - pad} y1={yy} y2={yy} stroke={ink} strokeWidth=".7" />);
    out.push(<line key="m" x1={x + pad + 16} x2={x + pad + 16} y1={top - step} y2={bottom} stroke="#e8a0a0" strokeWidth=".7" />);
    return <g>{out}</g>;
  }
  if (kind === "dotted" || kind === "squared") {
    const out = [];
    const g = step * 0.75;
    if (kind === "dotted") { for (let yy = top; yy < bottom; yy += g) for (let xx = x + pad; xx < x + w - pad; xx += g) out.push(<circle key={`${xx}-${yy}`} cx={xx} cy={yy} r=".9" fill={ink} />); }
    else {
      for (let yy = top; yy <= bottom; yy += g) out.push(<line key={`h${yy}`} x1={x + pad} x2={x + w - pad} y1={yy} y2={yy} stroke={ink} strokeWidth=".45" />);
      for (let xx = x + pad; xx <= x + w - pad; xx += g) out.push(<line key={`v${xx}`} x1={xx} x2={xx} y1={top} y2={bottom} stroke={ink} strokeWidth=".45" />);
    }
    return <g>{out}</g>;
  }
  if (kind === "diary") {
    const days = ["MON 4", "TUE 5", "WED 6", "THU 7", "FRI 8", "SAT 9", "SUN 10"];
    const rowH = (bottom - top - 10) / 7;
    return (
      <g>
        {t("JANUARY 2027", x + pad, y + h * 0.065, { fill: solid, size: 9, w: 800 })}
        {t("WEEK 1", x + w - pad, y + h * 0.065, { a: "end", size: 7, w: 600, fill: "#6b7193" })}
        {days.map((d, i) => (
          <g key={d}>
            <line x1={x + pad} x2={x + w - pad} y1={top + 4 + i * rowH} y2={top + 4 + i * rowH} stroke={solid} strokeWidth=".9" opacity=".7" />
            {t(d, x + pad, top + 15 + i * rowH, { size: 7.5 })}
            {[1, 2].map((k) => (<line key={k} x1={x + pad + 40} x2={x + w - pad} y1={top + 4 + i * rowH + (k * rowH) / 3} y2={top + 4 + i * rowH + (k * rowH) / 3} stroke={ink} strokeWidth=".5" />))}
          </g>
        ))}
      </g>
    );
  }
  if (kind === "planner") {
    const cols = 7, rows = 6, gw = (w - 2 * pad) / cols, gh = (bottom - top - 14) / rows;
    const names = ["M", "T", "W", "T", "F", "S", "S"];
    const out = [];
    names.forEach((n, i) => out.push(<g key={`n${i}`}>{t(n, x + pad + gw * i + gw / 2, top + 6, { a: "middle", size: 7 })}</g>));
    for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) {
      const day = r * 7 + k - 3; // 1 January 2027 is a Friday
      out.push(<rect key={`${r}-${k}`} x={x + pad + gw * k} y={top + 12 + gh * r} width={gw} height={gh} fill="none" stroke={ink} strokeWidth=".5" />);
      if (day >= 1 && day <= 31) out.push(<g key={`d${r}-${k}`}>{t(String(day), x + pad + gw * k + 3, top + 20 + gh * r, { size: 6, w: 600, fill: "#6b7193", ls: "0" })}</g>);
    }
    return <g>{t("JANUARY 2027", x + pad, y + h * 0.065, { fill: solid, size: 9, w: 800 })}{out}</g>;
  }
  return null;
}

/* ---------- helpers ---------- */
function specLines(c, size, mat, logo, art) {
  const colourName = c.material === "ankara"
    ? (mat.colours.find(([, h]) => h === c.ankara) || [""])[0]
    : (mat.colours.find(([, h]) => h === c.colour) || [`custom ${c.colour}`])[0];
  const extras = [
    c.elastic ? `${c.elastic === "match" ? "colour-matched" : (ELASTICS.find(([, h]) => h === c.elastic) || [""])[0].toLowerCase()} elastic` : "",
    c.ribbons ? `${c.ribbons === 2 ? "two ribbons" : "ribbon"} (${(RIBBON_COLOURS.find(([, h]) => h === c.ribbonColour) || ["custom"])[0].toLowerCase()})` : "",
    c.edges ? `${(EDGES.find(([, v]) => v === c.edges) || [""])[0].toLowerCase()} edges` : "",
    c.penLoop ? "pen loop" : "", c.pocket ? "back pocket" : "",
  ].filter(Boolean).join(", ");
  return [
    ["Type", label(TYPES, c.type)],
    ["Size", `${size.label} (${size.w} × ${size.h} mm)`],
    ["Cover", `${mat.label}, ${colourName}${art ? ", own artwork" : ""}`],
    ["Branding", `${label(METHODS, c.method)}${logo ? ", logo" : ""}${c.line1 ? `, “${c.line1}”` : ""}${c.line2 ? ` / “${c.line2}”` : ""}`],
    ["Inside", `${label(PAGES, c.pages)}, ${c.count} pages, ${c.paper}${c.branded ? ", logo on every page" : ""}`],
    ["End sheets", `${label(ENDSHEETS, c.endsheets)}${c.endsheets === "qr" ? ` (${c.website})` : ""}`],
    ["Finishing", extras || "None"],
    ["Packaging", c.packaging],
    ["Quantity", `${c.qty}${c.when ? `, needed by ${c.when}` : ""}`],
  ];
}

function diff(c) {
  const o = {};
  const skip = new Set(["name", "company", "notes"]);
  Object.keys(c).forEach((k) => { if (!skip.has(k) && c[k] !== DEFAULT[k]) o[k] = c[k]; });
  return o;
}
function encode(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function decode(s) {
  const o = JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))));
  const clean = {};
  Object.keys(DEFAULT).forEach((k) => { if (k in o && typeof o[k] === typeof DEFAULT[k]) clean[k] = o[k]; });
  return clean;
}
function trim(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
function hex(h) { const m = /^#?([\da-f]{6})$/i.exec(h || ""); return m ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : [40, 40, 60]; }
function shade(h, amt) { return "#" + hex(h).map((v) => Math.max(0, Math.min(255, v + amt)).toString(16).padStart(2, "0")).join(""); }
function lum(h) { const [r, g, b] = hex(h); return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; }

function readAsDataURL(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
}
function loadImg(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}

// Turns any logo into (1) the original for print and (2) a white-on-transparent mask for foil,
// deboss and engraving. Transparent PNGs use their shape; flat images separate the logo from the
// background colour taken from the corner pixel.
async function processLogo(file) {
  const src = await readAsDataURL(file);
  const im = await loadImg(src);
  const w0 = im.naturalWidth || 600, h0 = im.naturalHeight || 300;
  const k = Math.min(1, 700 / Math.max(w0, h0));
  const w = Math.max(1, Math.round(w0 * k)), h = Math.max(1, Math.round(h0 * k));
  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  const g = cv.getContext("2d");
  g.drawImage(im, 0, 0, w, h);
  const d = g.getImageData(0, 0, w, h);
  const px = d.data;
  let transparent = 0;
  for (let i = 3; i < px.length; i += 16) if (px[i] < 240) transparent++;
  const hasAlpha = transparent > px.length / 16 / 20;
  const bg = [px[0], px[1], px[2]];
  for (let i = 0; i < px.length; i += 4) {
    let a;
    if (hasAlpha) a = px[i + 3];
    else {
      const dist = Math.sqrt((px[i] - bg[0]) ** 2 + (px[i + 1] - bg[1]) ** 2 + (px[i + 2] - bg[2]) ** 2) / 441;
      a = Math.max(0, Math.min(255, (dist - 0.08) * 3.2 * 255));
    }
    px[i] = 255; px[i + 1] = 255; px[i + 2] = 255; px[i + 3] = a;
  }
  g.putImageData(d, 0, 0);
  return { src, mask: cv.toDataURL("image/png"), ratio: w0 / h0, w: w0, name: file.name };
}

async function svgImage(svg) {
  const xml = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  try { return await loadImg(url); } finally { setTimeout(() => URL.revokeObjectURL(url), 5000); }
}
