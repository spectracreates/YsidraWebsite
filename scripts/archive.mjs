// Runs before every Vercel build. Reads YSIDRA's Blogger photo pages (the same photo store the
// old ysidra.com gallery used) and writes lib/archive.json, so every photo uploaded there as
// ysidra-<name>.jpg appears on this site. If Blogger can't be reached, the last file is kept.
import fs from "fs";

const BLOG_ID = "7896250747263205832";
const FEED = `https://www.blogger.com/feeds/${BLOG_ID}/pages/default?alt=json&max-results=150`;
const OUT = new URL("../lib/archive.json", import.meta.url);

// Photo groups (file ysidra-stanbic-7.jpg -> group "stanbic").
// Only organisations listed here are named as clients. YSIDRA's own ranges get their range name.
// Everything else (private orders, finish styles, unknown codes) shows as unnamed studio work,
// so private customers are never named on the site.
const CLIENTS = {
  stanbic: "Stanbic IBTC", pwc: "PwC", siemens: "Siemens", coronation: "Coronation", cussons: "PZ Cussons",
  equiano: "Equiano", "investment-one": "Investment One", nes24: "Nigerian Economic Summit", nes: "Nigerian Economic Summit",
  nlng: "NLNG", cscs: "CSCS", tht: "Total Health Trust", telserve: "Telserve", westfield: "Westfield", zallam: "Zallam",
  skyline: "Skyline", nascon: "Nascon", gpfi: "GPFI", dbn: "Development Bank of Nigeria", axa: "AXA Mansard",
  sunu: "SUNU", vitafoam: "Vitafoam", northwest: "Northwest", sthenic: "Sthenic", aluko: "Aluko & Oyebode",
  nmdc: "NMDC", iogc: "IOGC", "iogc-grey": "IOGC",
};
const RANGES = { mansa: "The Mansa range", zaba: "The Zaba range", tai: "The Tai range", toni: "The Toni range", ajala: "The Ajala range", devo: "The Devo range" };
const SKIP = /^(about|logo|fav|banner|og)/;

export function parse(json) {
  const seen = new Set();
  const items = [];
  for (const e of json?.feed?.entry || []) {
    const html = e?.content?.$t || "";
    const re = /https:\/\/blogger\.googleusercontent\.com\/img\/[^"'\s>]+\/(ysidra-([a-z0-9-]+))\.(?:jpe?g|png|webp)/gi;
    let m;
    while ((m = re.exec(html))) {
      const key = m[2].toLowerCase();
      if (seen.has(key) || SKIP.test(key)) continue;
      // keep the largest version (/s1600/) when both thumbnail and full links exist
      const url = m[0].replace(/\/(s\d+|w\d+(-h\d+)?)\//, "/s1600/");
      seen.add(key);
      const raw = key.replace(/-\d+$/, "");
      let type = "studio", group = "studio", name = "";
      if (CLIENTS[raw]) { type = "client"; name = CLIENTS[raw]; group = name.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
      else if (RANGES[raw]) { type = "range"; name = RANGES[raw]; group = raw; }
      items.push({ key, type, group, name, url });
    }
  }
  return items;
}

async function main() {
  try {
    const r = await fetch(FEED, { headers: { "User-Agent": "ysidra-site-build" } });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const items = parse(await r.json());
    if (!items.length) throw new Error("no ysidra- photos found");
    fs.writeFileSync(OUT, JSON.stringify(items));
    console.log(`archive: ${items.length} photos in ${new Set(items.map((i) => i.group)).size} groups`);
  } catch (err) {
    console.warn("archive: kept existing lib/archive.json (" + err.message + ")");
  }
}
if (process.argv[1] && process.argv[1].endsWith("archive.mjs")) main();
