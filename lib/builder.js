// Options for the "Design your notebook" studio (/design-your-notebook).
// Client-safe: no imports from content.js. No prices anywhere (site rule): every design ends in a quote.

export const TYPES = [
  { id: "notebook", label: "Branded notebook", note: "Everyday notebooks for teams and clients" },
  { id: "diary", label: "2027 diary", note: "Dated week-to-view diaries in your brand" },
  { id: "journal", label: "Handcrafted journal", note: "Leather or ankara, bound by hand in Lagos" },
  { id: "event", label: "Event souvenir", note: "One on every seat, designed around your event" },
];

// Sizes in millimetres (width, height).
export const SIZES = [
  { id: "a6", label: "A6 pocket", w: 105, h: 148 },
  { id: "a5", label: "A5", w: 148, h: 210, note: "Most popular" },
  { id: "b5", label: "B5", w: 176, h: 250 },
  { id: "a4", label: "A4", w: 210, h: 297 },
  { id: "sq", label: "Square", w: 200, h: 200 },
];

export const MATERIALS = [
  { id: "pu", label: "Leatherette (PU)", note: "Soft-touch, durable, our corporate favourite",
    colours: [["Royal navy", "#2a2d73"], ["Midnight", "#1c1f3a"], ["Black", "#1b1b1d"], ["Wine", "#5a1a26"], ["Tan", "#a5683a"], ["Forest", "#1e4734"], ["Slate", "#5b6068"], ["Burnt orange", "#b85c12"]] },
  { id: "leather", label: "Genuine leather", note: "Hand-stitched, gets better with age",
    colours: [["Tan", "#9a5b2e"], ["Chestnut", "#6b3a1f"], ["Oxblood", "#4a1418"], ["Black", "#222021"], ["Olive", "#5a5a33"]] },
  { id: "printed", label: "Printed hardcover", note: "Edge-to-edge colour or your own artwork",
    colours: [["YSIDRA navy", "#2f3080"], ["Orange", "#eb7c05"], ["White", "#f4f1ea"], ["Emerald", "#0f7a55"], ["Sky", "#3c8dd6"], ["Charcoal", "#2b2d33"]], custom: true },
  { id: "ankara", label: "Ankara fabric", note: "Printed fabric, hand-bound",
    colours: [["Sunburst", "sun"], ["Indigo waves", "indigo"], ["Kente gold", "kente"]] },
  { id: "linen", label: "Linen cloth", note: "Woven texture, quietly premium",
    colours: [["Natural", "#d6cbb1"], ["Navy", "#2b3256"], ["Sage", "#8a9a7b"], ["Terracotta", "#b2603e"]] },
];

export const METHODS = [
  { id: "gold", label: "Gold foil" },
  { id: "silver", label: "Silver foil" },
  { id: "rose", label: "Rose-gold foil" },
  { id: "deboss", label: "Blind deboss" },
  { id: "print", label: "Full-colour print" },
  { id: "engrave", label: "Laser engrave", only: ["leather", "pu"] },
];

export const POSITIONS = [
  { id: "centre", label: "Centre" },
  { id: "upper", label: "Upper third" },
  { id: "br", label: "Bottom right" },
  { id: "bc", label: "Bottom centre" },
];

export const FONTS = [
  { id: "modern", label: "Modern", css: "Montserrat, Arial, sans-serif", weight: 800 },
  { id: "classic", label: "Classic", css: "Georgia, 'Times New Roman', serif", weight: 700 },
  { id: "light", label: "Light caps", css: "Montserrat, Arial, sans-serif", weight: 500, caps: true },
];

export const PAGES = [
  { id: "lined", label: "Lined" },
  { id: "dotted", label: "Dot grid" },
  { id: "squared", label: "Squared" },
  { id: "plain", label: "Plain" },
  { id: "diary", label: "2027 week-to-view" },
  { id: "planner", label: "Monthly planner" },
];
export const PAPERS = ["80gsm cream", "100gsm white", "120gsm premium"];
export const PAGE_COUNTS = [96, 160, 192, 240];

export const ELASTICS = [["None", ""], ["Match cover", "match"], ["Black", "#151515"], ["Orange", "#eb7c05"], ["Navy", "#2f3080"], ["Cream", "#efe6d2"]];
export const RIBBONS = [["None", 0], ["Single", 1], ["Double", 2]];
export const RIBBON_COLOURS = [["Orange", "#eb7c05"], ["Navy", "#2f3080"], ["Gold", "#c9a23a"], ["Black", "#151515"], ["Red", "#a3172b"], ["Cream", "#efe6d2"]];
export const EDGES = [["Plain", ""], ["Gold", "gold"], ["Silver", "silver"], ["Cover colour", "match"]];
export const ENDSHEETS = [
  { id: "plain", label: "Plain" },
  { id: "colour", label: "Brand colour" },
  { id: "qr", label: "Branded, with QR code" },
];
export const PACKAGING = ["None", "Gift box", "Fabric pouch", "Branded sleeve"];
export const QUANTITIES = ["1 to 49", "50", "100", "250", "500", "1,000+"];

export const DEFAULT = {
  type: "notebook", size: "a5", material: "pu", colour: "#2a2d73", ankara: "sun",
  method: "gold", position: "centre", scale: 70, font: "modern", line1: "YOUR BRAND", line2: "2027", ink: "#ffffff",
  pages: "lined", paper: "80gsm cream", count: 192, branded: true,
  elastic: "match", ribbons: 1, ribbonColour: "#eb7c05", edges: "", penLoop: false, pocket: true,
  endsheets: "qr", website: "www.yourbrand.com", packaging: "Gift box",
  qty: "100", when: "", name: "", company: "", notes: "",
};

export const PRESETS = {
  notebook: { material: "pu", colour: "#2a2d73", method: "gold", pages: "lined", elastic: "match", ribbons: 1, edges: "", endsheets: "qr", line2: "", packaging: "None" },
  diary: { material: "pu", colour: "#5a1a26", method: "gold", pages: "diary", elastic: "", ribbons: 2, ribbonColour: "#c9a23a", edges: "gold", endsheets: "qr", line2: "2027", packaging: "Gift box" },
  journal: { material: "leather", colour: "#9a5b2e", method: "deboss", pages: "plain", elastic: "", ribbons: 1, ribbonColour: "#efe6d2", edges: "", endsheets: "colour", line2: "", font: "classic", packaging: "Fabric pouch" },
  event: { material: "printed", colour: "#2f3080", method: "print", ink: "#ffffff", pages: "lined", elastic: "", ribbons: 0, edges: "", endsheets: "qr", line2: "SUMMIT 2027", packaging: "None" },
};

// Product page -> starting design (/design-your-notebook?from=<product id>).
export const FROM_PRODUCT = {
  "hand-stitched-leather-journal": { type: "journal" },
  "fabric-lined-leather-journal": { type: "journal" },
  "textured-leather-notebook": { type: "journal", material: "pu", colour: "#a5683a" },
  "colour-pop-leather-notebook": { type: "journal", material: "pu", colour: "#b85c12", method: "deboss" },
  "ankara-journal": { type: "journal", material: "ankara", ankara: "sun", method: "print" },
  "journal-gift-set": { type: "journal", packaging: "Fabric pouch" },
  "classic-2027-diary": { type: "diary", colour: "#2a2d73" },
  "executive-2027-diary": { type: "diary" },
  "luxury-2027-diary": { type: "diary", material: "leather", colour: "#222021" },
  "essential-notebook": { type: "notebook", material: "printed", method: "print" },
  "signature-notebook": { type: "notebook" },
  "hardcover-notebook": { type: "notebook", material: "printed", colour: "#2f3080", method: "print" },
  "event-souvenir-notebook": { type: "event" },
  "anniversary-milestone-book": { type: "event", line2: "50 YEARS" },
  "wedding-keepsake-book": { type: "event", material: "linen", colour: "#d6cbb1", method: "gold", line1: "ADA & TOBI", line2: "12.06.2027", font: "classic" },
};

export const label = (list, id) => (list.find((x) => x.id === id) || {}).label || id;
