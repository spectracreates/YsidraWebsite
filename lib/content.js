// YSIDRA website content. Every word and photo on the site comes from this file.
// Edit here, push, and Vercel redeploys. No prices anywhere (site rule).

export const site = {
  name: "YSIDRA",
  url: "https://www.ysidra.com",
  tagline: "Strategy. Design. Books.",
  description:
    "YSIDRA is a Lagos strategic brand and communication studio and premium notebook maker: brand strategy, visual identity, communication systems, bespoke notebooks, 2027 diaries, handcrafted journals, event souvenirs and corporate gifts. More than two million notebooks since 2017.",
  phone: "+234 818 365 0000",
  whatsapp: "2348183650000",
  email: "hello@ysidra.com",
  address: "9, Sanusi Street, Somolu, Lagos, Nigeria",
  instagram: "https://www.instagram.com/weareysidra",
  linkedin: "https://www.linkedin.com/company/ysidra-strategy-design-books",
  shop: "https://ysidra-shop.vercel.app",
  founded: 2017,
  // Set to "/video/hero.mp4" (put the file in public/video) to replace the photo slideshow.
  heroVideo: null,
  // Optional: a Web3Forms access key (web3forms.com) to also email quote requests to hello@ysidra.com.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
};

export const stats = [
  { value: "2M+", label: "Over two million notebooks produced since 2017, for brands, events and families" },
  { value: "2017", label: "making books in Lagos" },
  { value: "5%", label: "of every notebook sale goes to the Agatha Obiageli Aghedo Memorial Foundation" },
];

// Clients YSIDRA has made for. Names approved for the site (Nov 2026).
export const clients = [
  "NLNG",
  "AXA Mansard",
  "Development Bank of Nigeria",
  "Nigerian Economic Summit Group",
  "SUNU Assurances",
  "Wema Bank",
  "Interswitch",
  "Vitafoam",
  "Investment One",
  "Nascon",
  "GPFI",
  "Northwest",
  "Equiano",
  "Sthenic",
];

// Testimonials show in groups of four. Add real quotes only:
// { quote: "...", name: "Full name", role: "Role", company: "Company" }
export const testimonials = [];

export const nav = [
  { href: "/collections", label: "Collections" },
  { href: "/solutions/corporate", label: "Corporate" },
  { href: "/solutions/events", label: "Events" },
  { href: "/customisation", label: "Customisation" },
  { href: "/work", label: "Our work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];

export const heroSlides = [
  { src: "hc-stack", alt: "Stack of coptic-stitched leather journals" },
  { src: "ys-5523", alt: "Fabric-lined leather journal open on dark marble" },
  { src: "co-premium", alt: "Premium notebooks with gold edges and coloured ribbons" },
  { src: "ys-5651", alt: "Hand-bound journal with a printed ankara cover" },
  { src: "ev-chairs", alt: "Souvenir notebooks placed on every chair at a celebration" },
];

export const categories = [
  { id: "handcrafted", label: "Handcrafted journals", blurb: "Leather, ankara and hand stitching. Each one bound by hand in Lagos." },
  { id: "diaries", label: "2027 diaries", blurb: "Dated diaries in your brand, from classic to leatherette luxury." },
  { id: "notebooks", label: "Branded notebooks", blurb: "Everyday notebooks your team and clients will actually use." },
  { id: "events", label: "Event and keepsake books", blurb: "Souvenirs for summits, weddings, launches and anniversaries." },
  { id: "merchandise", label: "Branded gifts", blurb: "Bottles, flasks, totes, umbrellas, pens and more, finished with your brand." },
];

const P = (id, category, name, image, images, summary, details, extra = {}) => ({ id, category, name, image, images, summary, details, ...extra });

export const products = [
  P("hand-stitched-leather-journal", "handcrafted", "Hand-stitched Leather Journal", "ys-5561",
    ["ys-5561", "ys-5562", "ys-5559", "hc-blue-ankara", "hc-black-red", "p510"],
    "Genuine leather, exposed spine stitching, elastic closure.",
    ["Genuine leather cover", "Hand-sewn exposed spine in the thread colour you choose", "Elastic and bead closure", "Name or logo deboss available"]),
  P("ankara-journal", "handcrafted", "Ankara Journal", "ys-5651",
    ["ys-5651", "ys-5650", "ys-5629", "ys-5630", "hc-ankara-open", "hc-fabric-lined"],
    "Printed fabric cover, hand-bound, braided tie.",
    ["Ankara or adire print cover", "Hand-bound cream pages", "Braided cord tie with wooden bead"]),
  P("fabric-lined-leather-journal", "handcrafted", "Fabric-lined Leather Journal", "ys-5523",
    ["ys-5523", "ys-5518", "ys-5585", "ys-5521", "hc-fabric-lined", "hc-wallet-open"],
    "Leather outside, rich woven fabric inside.",
    ["Leather cover lined with woven fabric", "Refillable inner notebook", "Contrast stitching"]),
  P("textured-leather-notebook", "handcrafted", "Textured Leather Notebook", "ys-5724",
    ["ys-5724", "ys-5694", "ys-5653", "ys-5693", "p522", "hc-stack"],
    "Croc, ostrich and smooth leather finishes.",
    ["Embossed croc, ostrich or smooth leather", "Coptic-stitched spine", "Elastic band closure"]),
  P("colour-pop-leather-notebook", "handcrafted", "Colour-pop Leather Notebook", "ys-5540",
    ["ys-5540", "ys-5554", "ys-5545", "ys-5582", "hc-orange", "hc-tan"],
    "Bright leather, coptic binding, cord closure.",
    ["Orange, tan, red or a colour you pick", "Coptic-stitched, lies flat", "Wrapped cord and bead closure"]),
  P("journal-gift-set", "handcrafted", "Journal Gift Set", "hc-pouch",
    ["hc-pouch", "pn36", "hc-green-gift", "p553"],
    "Leather journal in a matching fabric pouch, ready to give.",
    ["Hand-stitched leather journal", "Ankara drawstring gift pouch", "Gift note on request"]),
  P("classic-2027-diary", "diaries", "Classic 2027 Diary", "ys-5601",
    ["ys-5601", "ys-5606", "ys-5603", "co-nlng-blue"],
    "A5, 280 pages, cream paper.",
    ["A5, 280 pages, 70gsm cream paper", "300gsm art card cover, matte", "Perfect bound", "Your logo, calendar and contact pages inside"]),
  P("executive-2027-diary", "diaries", "Executive 2027 Diary", "ys-5595",
    ["ys-5595", "ys-5645", "ys-5637", "ys-5609", "co-axa-stack", "co-axa-pen"],
    "A5, 320 pages, hard cover with ribbon.",
    ["A5, 320 pages, 80gsm cream paper", "Hard cover, matte", "Case bound with ribbon marker"]),
  P("luxury-2027-diary", "diaries", "Luxury 2027 Diary", "ys-5616",
    ["ys-5616", "ys-5682", "ys-5574", "ys-5655", "co-nlng-folio", "p510"],
    "Leatherette hard cover, foil and emboss.",
    ["A5 or B5, 360 to 400 pages, 80gsm cream paper", "Leatherette hard cover", "Foil, emboss and elastic closure"]),
  P("essential-notebook", "notebooks", "Essential Notebook", "ys-5538",
    ["ys-5538", "ys-5529", "ys-5531", "ys-5537", "co-nlng-green", "p290"],
    "A5, 80 pages, gloss laminated cover.",
    ["A5, 80 pages, 60gsm bond", "230gsm art card cover, gloss laminated", "Stitched or perfect bound"]),
  P("signature-notebook", "notebooks", "Signature Notebook", "ys-5536",
    ["ys-5536", "ys-5532", "ys-5625", "ys-5534", "co-axa-open", "co-axa-pen"],
    "A5, 120 pages, matte cover, wire-O.",
    ["A5, 120 pages, 70gsm bond", "300gsm art card cover, matte laminated", "Wire-O or perfect bound"]),
  P("hardcover-notebook", "notebooks", "Hardcover Notebook", "ys-5593",
    ["ys-5593", "ys-5594", "ys-5598", "ys-5597", "co-premium", "co-axa-stack"],
    "A5 or B5, 160 pages, case bound with ribbon.",
    ["A5 or B5, 160 pages, 80gsm woodfree", "Hard cover board, case bound", "Foil or emboss finish, ribbon marker"]),
  P("event-souvenir-notebook", "events", "Event Souvenir Notebook", "ys-5676",
    ["ys-5676", "ys-5662", "ys-5600", "ys-5688", "ev-chairs", "ev-map"],
    "Guest notebooks for weddings, launches and conferences, one on every seat.",
    ["Cover designed around your event: names, date, monogram", "Lined or dotted pages, your colours throughout", "Delivered boxed and counted for the venue"]),
  P("anniversary-milestone-book", "events", "Anniversary and Milestone Book", "ev-anniversary",
    ["ev-anniversary", "ys-5676"],
    "Hardcover notebooks for summits, AGMs and company anniversaries.",
    ["Full-colour wraparound cover with your event artwork", "Elastic closure and ribbon marker", "For delegates, speakers and staff"]),
  P("wedding-keepsake-book", "events", "Wedding Keepsake Book", "ev-map",
    ["ev-map", "ev-chairs"],
    "Souvenirs your guests keep, designed to your theme.",
    ["Designed around the couple's theme and monogram", "Samples before production", "Delivered to the venue in Lagos"]),
  // Branded gifts, from the 2026 Q3 price list (branded items). No photos yet: they show a designed card.
  P("branded-umbrellas", "merchandise", "Branded Umbrellas", null, [],
    "Golf, standard and compact folding umbrellas, screen printed with your brand.",
    ["Large 30 inch golf umbrella, automatic and windproof", "23 inch umbrella with wooden handle", "19 inch compact folding umbrella with sleeve", "Black, blue, purple and red"]),
  P("branded-water-bottles", "merchandise", "Water Bottles", null, [],
    "BPA-free plastic and metal bottles, UV printed.",
    ["Sports bottle with flip-top lid", "Leak-proof screw cap bottle", "0.75 and 1 litre sizes", "Plastic or metal, many colours"]),
  P("branded-flasks", "merchandise", "Insulated Flasks", null, [],
    "Double-walled stainless flasks, UV printed or laser engraved.",
    ["1 litre classic vacuum flask, matte black", "0.75 litre travel flask with cup lid", "0.45 litre slim flask, rose gold"]),
  P("branded-tote-bags", "merchandise", "Tote Bags", null, [],
    "Canvas totes for events, exhibitions and gifting.",
    ["Heavy-duty canvas tote with gusset, 45 x 40 x 15 cm", "Everyday cotton tote, 38 x 42 cm", "Mini gift bag, 20 x 22 cm", "Embroidery or screen print"]),
  P("desk-and-tech-gifts", "merchandise", "Desk and Tech Gifts", null, [],
    "Mugs, pens, power banks and keyrings finished with your logo.",
    ["11oz ceramic mug, sublimation print", "Pen sets, debossed or laser engraved", "10,000mAh slim power bank, laser engraved", "Polished metal keyring, engraved"]),
  P("branded-apparel", "merchandise", "T-shirts and Socks", null, [],
    "Event and team apparel in economy, quality and premium grades.",
    ["T-shirts in white, black and all colours", "Economy, good quality and premium options", "Custom knit socks with your pattern"]),
];

export const solutions = [
  {
    slug: "corporate",
    title: "Corporate notebooks and diaries",
    short: "Corporate",
    lead: "Branded diaries and notebooks your team actually carries, and your clients keep on their desks all year.",
    image: "ys-5595",
    gallery: ["ys-5595", "ys-5645", "ys-5616", "ys-5594", "co-nlng-green", "ys-5688"],
    points: [
      ["Your brand, inside and out", "Foil, deboss or full-colour covers, plus your own calendar, contacts and planning pages inside."],
      ["For every level", "Essential notebooks for staff, executive and leatherette diaries for leadership and key clients."],
      ["Packed for distribution", "Counted, boxed and labelled by department or branch, ready to hand out."],
    ],
    products: ["executive-2027-diary", "luxury-2027-diary", "classic-2027-diary", "hardcover-notebook"],
    faqs: [
      ["When should we order 2027 diaries?", "As early as you can. Diaries need artwork approval, printing and binding, so ordering early gives you time for a proof and avoids the year-end rush."],
      ["Can each diary carry a staff name?", "Yes. Names can be debossed or foiled on the cover, one by one."],
      ["Do you design the inside pages?", "Yes. Our design team builds the calendar, planner and branded pages around your brand guide."],
    ],
  },
  {
    slug: "events",
    title: "Events, summits and weddings",
    short: "Events",
    lead: "One on every seat. Souvenir notebooks guests take home, so your event lives on long after the last session.",
    image: "ev-chairs",
    gallery: ["ev-chairs", "ys-5676", "ev-map", "ys-5662", "ys-5600", "ev-anniversary"],
    points: [
      ["Designed around the day", "Names, dates, monograms and themes built into the cover and pages."],
      ["Delegate ready", "Summit and conference notebooks with your programme, sponsors and note pages."],
      ["Delivered to the venue", "Boxed, counted and delivered in Lagos, ready for setup."],
    ],
    products: ["event-souvenir-notebook", "anniversary-milestone-book", "wedding-keepsake-book"],
    faqs: [
      ["Can you match our event theme?", "Yes. Send the theme, colours or invitation and we design the souvenir to match."],
      ["Do we see a sample first?", "Yes. You approve a design proof before production starts."],
    ],
  },
  {
    slug: "gifting",
    title: "Corporate gifts and handcrafted journals",
    short: "Gifting",
    lead: "Hand-stitched leather, ankara covers and matching pouches. Gifts for clients, partners and the people who carried your year.",
    image: "hc-pouch",
    gallery: ["hc-pouch", "hc-green-gift", "ys-5561", "ys-5651", "hc-stack", "ys-5540"],
    points: [
      ["Made by hand", "Each journal is cut, stitched and bound by hand, so no two are exactly alike."],
      ["African craft, global finish", "Leather and ankara with coptic bindings and bead closures."],
      ["Gift-ready", "Matching fabric pouches and gift notes, ready to hand over."],
    ],
    products: ["journal-gift-set", "hand-stitched-leather-journal", "ankara-journal", "fabric-lined-leather-journal", "branded-flasks", "desk-and-tech-gifts"],
    faqs: [
      ["Can we personalise each gift?", "Yes. Names, initials or a short message can be added to each piece."],
      ["Can you add other branded items?", "Yes. We also brand flasks, bottles, totes, umbrellas, pens and power banks to complete a gift set."],
    ],
  },
  {
    slug: "keepsakes",
    title: "Keepsakes, tributes and milestones",
    short: "Keepsakes",
    lead: "Anniversary books, tribute journals and private keepsakes, designed with care and handled in confidence.",
    image: "ys-5629",
    gallery: ["ys-5629", "ev-map", "ys-5585", "hc-fabric-lined", "ys-5565", "p526"],
    points: [
      ["Your story, bound", "We help shape the words and images, then design a book worth keeping."],
      ["Handled in confidence", "Private family and client projects stay private."],
      ["Built to last", "Hard covers, quality paper and bindings that open flat for years."],
    ],
    products: ["wedding-keepsake-book", "anniversary-milestone-book", "fabric-lined-leather-journal"],
    faqs: [
      ["Can you help us write or gather content?", "Yes. Our strategy and design team can guide the story, structure and layout."],
    ],
  },
];

export const finishes = [
  { title: "Leather and hand stitching", text: "Genuine leather, exposed spine stitching, elastic or strap closures.", image: "ys-5561" },
  { title: "Ankara and fabric covers", text: "Printed fabric covers and linings, hand-bound with braided ties.", image: "hc-fabric-lined" },
  { title: "Foil and deboss", text: "Your logo pressed or foiled into the cover for a quiet, premium finish.", image: "ys-5594" },
  { title: "Full-colour print", text: "Bold printed covers, edge to edge, in your exact brand colours.", image: "ys-5531" },
  { title: "Coptic binding and cord", text: "Open-spine bindings that lie flat, finished with cord and bead closures.", image: "ys-5540" },
  { title: "Branded inside pages", text: "Your logo, calendar, contacts and planning pages printed inside.", image: "ys-5597" },
  { title: "Ribbons and markers", text: "Single or double ribbon markers matched to your palette.", image: "ys-5601" },
  { title: "Gold edges and elastic", text: "Gilded page edges, elastic closures and colour-matched bands.", image: "co-premium" },
  { title: "Pouches and packaging", text: "Matching fabric pouches and gift wrapping, ready to hand over.", image: "hc-pouch" },
  { title: "Engraving and UV print", text: "Laser engraving and UV printing for flasks, pens, bottles and tech gifts.", image: null },
];

export const workflow = [
  ["Understand", "We learn your brand, your audience and the moment the book is for."],
  ["Think", "We recommend the right product, finish and quantity for your goal and budget."],
  ["Create", "Our designers build the cover and pages. You approve a proof."],
  ["Make", "Production in our Lagos workshop and with trusted print partners, checked piece by piece."],
  ["Deliver", "Counted, packed and delivered to your office or venue."],
  ["Learn", "We follow up, so the next order is even better."],
];

export const work = [
  { slug: "development-bank-of-nigeria", client: "Development Bank of Nigeria", title: "Diaries and notebooks with a full-cover emblem",
    images: ["ys-5595", "ys-5688"], category: "Corporate",
    text: "Deep green hardcover diaries carrying the bank's emblem across the whole cover, alongside a blue notebook with the DBN mark and branded inside pages." },
  { slug: "nigerian-economic-summit", client: "Nigerian Economic Summit Group", title: "Delegate notebooks for the 32nd Nigerian Economic Summit",
    images: ["ys-5676"], category: "Events",
    text: "Black hardcover notebooks with the 32nd summit mark in green and blue, and a woven pattern down the spine, made for delegates." },
  { slug: "sunu", client: "SUNU Assurances", title: "Be Captivated by the SUNU Experience",
    images: ["ys-5645", "ys-5609"], category: "Corporate",
    text: "Black hardcover notebooks with the SUNU emblem and a ring of service icons printed in deep red and white." },
  { slug: "nlng", client: "NLNG", title: "Linen-look notebooks and folios",
    images: ["co-nlng-green", "co-nlng-blue", "co-nlng-folio"], category: "Corporate",
    text: "Green and blue linen-texture notebooks with a tonal pattern, plus a leather folio, all carrying the NLNG mark." },
  { slug: "axa-mansard", client: "AXA Mansard", title: "Notebook and pen sets in brand blue and red",
    images: ["co-axa-stack", "co-axa-open", "co-axa-pen"], category: "Gifting",
    text: "Bold blue notebooks with red page edges and matching inside pages, paired with metal pens for client gifting." },
  { slug: "wema-bank", client: "Wema Bank", title: "Full-colour celebration notebooks",
    images: ["ys-5600"], category: "Corporate",
    text: "Notebooks with full-bleed artwork celebrating the bank's milestone, printed edge to edge." },
  { slug: "interswitch", client: "Interswitch", title: "Building the rails of Africa's digital future",
    images: ["ys-5637"], category: "Corporate",
    text: "Wraparound printed notebooks in Interswitch blue with illustrated technology artwork." },
  { slug: "northwest", client: "Northwest", title: "Photographic cover notebooks",
    images: ["ys-5662"], category: "Corporate",
    text: "Notebooks with a full photographic cover of a Northwest station and the brand mark." },
  { slug: "lagos-wedding", client: "A Lagos wedding", title: "A keepsake on every chair",
    images: ["ev-chairs", "ev-map"], category: "Events",
    text: "Gold souvenir books with the couple's monogram, placed on every guest's chair before the ceremony." },
];

const G = (tag, list) => list.map((src) => ({ src, tag }));
export const gallery = [
  ...G("Handcrafted", ["ys-5523", "ys-5651", "ys-5561", "ys-5540", "hc-stack", "ys-5724", "ys-5545", "hc-orange", "ys-5585", "ys-5650", "ys-5554", "hc-blue-ankara", "ys-5518", "ys-5629", "hc-green-gift", "ys-5582", "ys-5694", "hc-tan", "ys-5630", "p526", "hc-black-red", "ys-5565", "ys-5559", "ys-5653", "hc-wallet-open", "p510", "ys-5693", "hc-pouch", "pn36", "p553", "ys-5521", "ys-5562", "hc-ankara-open", "hc-fabric-lined", "p290"]),
  ...G("Corporate", ["ys-5595", "ys-5645", "ys-5616", "co-premium", "ys-5594", "ys-5609", "ys-5688", "co-nlng-green", "ys-5637", "ys-5682", "co-axa-stack", "ys-5593", "ys-5601", "co-nlng-blue", "ys-5655", "ys-5597", "co-nlng-folio", "ys-5603", "ys-5598", "co-axa-open", "ys-5574", "ys-5606", "co-axa-pen", "ys-5662"]),
  ...G("Events", ["ev-chairs", "ys-5676", "ev-map", "ys-5600", "ev-anniversary"]),
  ...G("Printed", ["ys-5531", "ys-5537", "ys-5538", "ys-5529", "ys-5625", "ys-5532", "ys-5536", "ys-5534", "p522"]),
];

export const about = {
  founder: { name: "Yeye Durojaiye-Arogundade", role: "Founder and CEO" },
  intro:
    "YSIDRA is a Nigerian creative company working across strategy, design and books. We help organisations solve problems, communicate better, build stronger brands and create work people value.",
  story: [
    "YSIDRA began in Lagos in 2017 as a design studio with one obsession: making notebooks that people keep. Since then we have produced more than two million of them, for banks, energy companies, summits, families and founders.",
    "Our founder, Yeye Durojaiye-Arogundade, built YSIDRA around a simple belief: a remarkable keepsake elevates the experience of any brand or occasion. A notebook on a desk is a brand people touch every day.",
    "Today the studio brings strategy, design and production under one roof. We think about who will hold it before we choose a single colour, and we finish every piece properly.",
  ],
  name:
    "The name comes from the ancient Greek Isidoros, gift of Isis, later linked to St Isidore of Seville, proposed patron saint of the internet. Our founder first met the name while reading Toni Morrison's Home.",
  symbol:
    "Our mark joins a book for knowledge and ideas, a lotus for rising again, and a butterfly for transformation.",
  colours: [
    ["Indigo", "#2F3080", "Depth, knowledge and craft, with a rich West African dyeing history."],
    ["Saffron", "#EB7C05", "Value, distinction and vitality."],
  ],
  values: ["Knowledge", "Resilience", "Craft", "Transformation", "Value"],
  standard: ["Know what you own.", "Check your work.", "Escalate early.", "Finished means properly finished."],
  pillars: [
    ["Strategy", "Opportunity into impact.", "Business and communication strategy that finds what is limiting growth and fixes it."],
    ["Design", "Design people notice.", "Branding, identity and print design built on a clear idea."],
    ["Books", "Books made to be kept.", "Premium notebooks, diaries and journals for corporate gifts, events and everyday use."],
  ],
  impact:
    "Five percent of every YSIDRA notebook sale supports access to education for children with special educational needs, and vulnerable out-of-school children, through the Agatha Obiageli Aghedo Memorial Foundation (AOAMF).",
};

export const posts = [
  {
    slug: "choosing-corporate-diaries-2027",
    title: "How to choose corporate diaries for 2027",
    date: "2026-11-20",
    image: "ys-5616",
    excerpt: "Classic, executive or luxury? A simple way to match the diary to the person who will carry it.",
    body: [
      ["p", "A corporate diary is one of the few brand items people use every working day. Choose well and your logo sits on a desk for twelve months. Choose badly and it sits in a drawer."],
      ["h", "Start with who will carry it"],
      ["p", "Most organisations order more than one tier. Staff and event guests get a classic diary with a strong printed cover. Managers get an executive hardcover with a ribbon. Leadership and key clients get a leatherette or leather diary with foil, emboss and an elastic closure."],
      ["h", "Decide what goes inside"],
      ["p", "The inside is where a diary earns its keep. Think about a year planner, monthly views, contact pages, public holidays and a few pages about your organisation: values, products or a message from leadership."],
      ["h", "Pick one signature finish"],
      ["p", "One confident finish beats five small ones. A foiled logo on a deep colour, a full-colour wraparound cover, or a personalised name on each diary will be remembered."],
      ["h", "Plan the timeline backwards"],
      ["p", "Work back from the day you want to hand diaries out. Leave room for artwork approval and a proof before production. Year-end is the busiest season for every printer, so ordering early protects your date."],
    ],
  },
  {
    slug: "foil-deboss-or-print",
    title: "Foil, deboss or full-colour print: which finish suits your brand?",
    date: "2026-11-12",
    image: "ys-5594",
    excerpt: "Three ways to put your logo on a cover, and when each one works best.",
    body: [
      ["p", "The finish decides how a notebook feels in the hand. Here is how we help clients choose."],
      ["h", "Deboss"],
      ["p", "Your logo is pressed into the cover with no ink. It is quiet, premium and works beautifully on leather and leatherette. Best for leadership gifts and brands that want understatement."],
      ["h", "Foil"],
      ["p", "Metallic or coloured foil is pressed into the cover. Gold, silver and brand-colour foils catch the light. Best for diaries, awards and anniversary books."],
      ["h", "Full-colour print"],
      ["p", "The whole cover becomes artwork, edge to edge. Best for summits, campaigns and launches where the message matters as much as the logo."],
      ["h", "Mixing finishes"],
      ["p", "Many of our favourite covers combine one finish with a texture: a debossed logo on croc leather, or foil on a linen-look board. Ask us for samples."],
    ],
  },
  {
    slug: "event-souvenir-notebooks",
    title: "Event souvenir notebooks guests actually keep",
    date: "2026-11-05",
    image: "ev-chairs",
    excerpt: "What makes a summit or wedding notebook leave the venue with the guest instead of the cleaner.",
    body: [
      ["p", "Most event giveaways are forgotten by the car park. A well-made notebook goes home, gets used, and carries your event into the months after."],
      ["h", "Design it for the guest, not the sponsor"],
      ["p", "Lead with the event's story or the couple's monogram. Sponsor logos can live on the back cover or inside pages."],
      ["h", "Make it useful on the day"],
      ["p", "Add the programme, speaker pages or a seating map inside. Guests open it during the event, which is exactly when you want them to."],
      ["h", "Set it on every seat"],
      ["p", "A notebook placed on each chair before guests arrive makes a strong first impression and photographs well."],
    ],
  },
];

export const quoteSteps = {
  items: ["Corporate notebooks", "2027 diaries", "Event or summit notebooks", "Wedding souvenirs", "Handcrafted journals", "Corporate gift sets", "Branded gifts and merchandise", "Keepsake or tribute book", "Strategy or design project", "Not sure yet"],
  quantities: ["Fewer than 50", "50 to 200", "200 to 500", "500 to 2,000", "More than 2,000"],
  finishes: ["Foil or deboss logo", "Full-colour print", "Leather", "Ankara or fabric", "Branded inside pages", "Names on each piece", "Gift pouch or packaging", "Please recommend"],
};

// Real assets from the live Blogger site (www.ysidra.com), served from Blogger's image CDN.
export const blogger = {
  logos: [
  "https://blogger.googleusercontent.com/img/a/AVvXsEg2uvthXwCYnMitBuxMECDKenoVo0TYcB9D-2J1Nq_QLvPwb3Cd6gy4xzy15GsNCY5YA-qkPnEtm1KPCmgQHEgW-dM3yCb5UhnmBDc8qqLsUvPB_kmTQWzRRlvuN6RK5Usmk7vdxOeMKANmFhp23mvc_WZxLpIr4nVyotNeijsvuafP7emFUUYaq50TEVBm",
  "https://blogger.googleusercontent.com/img/a/AVvXsEj_9-WZ_rjKmArV4yo3w7TF56IhJ6FyXreks8c6FusdepLUBsBSN1TEp8wDrbG9DoW2SVdI7YU-pTVmIQIlhTLmpUSNxMb01OxYnlfYd23aEwh5i_J3N49HEeReh3guheY5nfsPtAUqbVuYiCbDNgx4NwdCb4y1l8YrZ8qHmDo6V0iABbGJittPSoD79L-1",
  "https://blogger.googleusercontent.com/img/a/AVvXsEgZsTgwxutlnKaN6KCZQmi6N5vFMrH_JNcAwJpk_iF3VyxGtGtfSjc9S0hgynSxQkhTTiajCoU6vXr1_MjS9kB_ForhrtAZxgosvkzl-HDMJ6omkka6EpIDL9u8LD7i_sKNLzjH8S4Ryvkws0WCSskOHY7Mrg6qOD5OZyxNoHGWAMT4n9YaxH6ecIDzmy6k",
  "https://blogger.googleusercontent.com/img/a/AVvXsEiMN9jzgvy7VZlsK-92N0WBg-2Va1l_A6YoZ_zz5zQAr9PjquK3Pj1OsPPvtpRYOAvDvEB5XH_O5esPeHUhrcIUSk4LmIduVsSk6EdtdRJoVerCgjcPQqWQTskSyOEdWea9eRiI44Rb4esuBkGpus8wMH28MGol-nAsTOsCIG5wGz8TQHpxEDvMlu1mIfwl",
  "https://blogger.googleusercontent.com/img/a/AVvXsEjVftyN2fNS8Wgfrm4ZlTMnr0EWssQewaix4G1x0NmXso2U6eDOupRngNvYHAtIMiC9Wxu_U54AXnM2XW7m75eG3vNEM4kLri1tiJzfTCTjOo5JGZM5IuefA6QLwH3EkDmJZYvcM7NQ_fyxCyK9uNAALiWF7H6-LsHYjBqFip1iQo2fQ0nzC0VWKif4xIAo",
  "https://blogger.googleusercontent.com/img/a/AVvXsEjSDP5tl5Zp3-0I68TWkUDg3BlNLGjNXqSZZWVlrjX_2ebf2iQpRbOELRfznLztGb4tj0WpvJOgEYMAdrjnp8Yu-pRZu--xq1uWYbQ89b_TwN5noiMw6ngUseXUKlnSTXfCOaYGRtnhNyLMUyfnmUq7G5q00Y15MDzR_PmwouTllXcfWQyf3ssvRgPnZkR8",
  "https://blogger.googleusercontent.com/img/a/AVvXsEjsmPEFx_WTzaEdlhwvsyJrWHeJUv1Ti8DaUJqBNdxWmcn-Yk2rMrGg2JY9Dh7H5qy0hOF3qMdruKBTQumbZToZ8kjS0ZDROAecn8gTi-njwJ_vis4DY_Ts3oIpd3ixENd2QsxeUyEnCaX-J-35vpS8rxDeHYErrrHmmec62aoLBF-wH0bk17_YpHRiDVZM",
  "https://blogger.googleusercontent.com/img/a/AVvXsEhcPRqzfCSRSq_P86wh8Xvlmglo0aU4kJyNt6dSYlZzHa4JU87xFu1Y7rSSFXaEKFHQUseotzFxggwzrut3EIs4UEWvuQxaKvjB9eQROmkAJ_i7LtLVpNYUS-IrPTMFBj2XML-ngPvANdzYrWjpONB9asiWdTHDyIDLEVg-BLszWnnwBmND6-RLBnXlXESx",
  "https://blogger.googleusercontent.com/img/a/AVvXsEg0_hVTm11CKGMyw54p98OEx4iwYf-hkBxM1tMghtrwozf1UwMocTstzcjLFaSfcMoFfTC0id36rZ5JMw-ZA4xhjKtw8ORhDXWa8odD_6w6x4yTApFdDNfHUy0Go3qKq6pO9qy88q-6ZBoCri4KVm9n3dK4fxIBiGtXdXeaTIvoCi0rwIkBtxvzUqvamHrF"
],
  founderPortrait: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0Nv0c8FB320koBYr7Ob-3jTT9KZ4JnYaiPqmFx1QBGDvbQjkzw0k8WIxg_HiYJ8DyvHyCxusbX_gGPVZLrKdYWaogOEFinzsm1VT_xKwFoefebLffSaNu-sVrAauPFbfA3coeoV3o6MoGMsXzVU6Qh068UI2-3qQCrAnkgJ-UeawUYMUv71NEb3mVrg6c/s1600/Clipaste_2026-06-03_04.51.26.png",
  impactPhoto: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7_2KJPown8dDoPTttbB1sbeXD9I7fySL6Vyzj5TTQHWjICHejd1QJ4a1MNq8XcKg3PEPul4PRDO9ckZv6wcLyIfb7yXemxCzWSBkaO7VXlrBm3zWh0PAYgK6UW5bu950dKuLXoyKIfUd9-xMwmgk-A4Is_OLuIpUFZG_Pkv5wnT4uyxezMeyKGfb8w4v6/s1600/2.jpg",
  banner: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigYFi6JAG46jKYRejFSbpUVcTo7W2ixmq7AhVDeAUBI_1EVVb1e2X4b5AqtSODkkGjci_4jGFterZJaWx8h4eYJb1NNFdkSUDNSXn1nQsMNnC9tyUfn5mK1ZNjVAJtx-_enii6koJ7f-wWJzNDnUjPY2LjWUcLfr8tgsNMRF6HPyOQlLTjeCs4Q99bfSuC/s1600/YSIDRA%20WEBSITE%20BANNER.jpg",
};

// Services, from the live site.
export const services = [
  ["Brand strategy and audits", "We look at where you stand, find the gaps, and build a clear position in your market."],
  ["Visual identity design", "From logo to full guidelines: the visual language that tells your story before a word is read."],
  ["Communication systems", "Messaging frameworks and channel strategies that keep your brand consistent where it counts."],
  ["Premium collections", "Signature notebooks, journals and bespoke collections for organisations, events and everyday use, designed to leave a lasting impression."],
];

// Brand work, from the live site.
export const brandWork = [
  { name: "Sthenic Group", text: "Corporate brand and communication system.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBs8RucpuJTZcGAA0uA12a9yBxXE8-14VyhCW7D4cMy5tGXAIV2JAKPC51_EHqDTYxWNbFObrdGO2Z2_DBAabcIKIRzrPkFLIRLZj-ER_fjjhLOpoTZ6UMPhRK6QAMy1drs-0UpSOeAHICLCdLHwAmoVhx2sat-yj109_kCi_AHX5QejTKoUhYBswyvn0a/s1600/STHENIC%20MOCKUP.png" },
  { name: "DX Entertainment", text: "Brand identity in development. A modern entertainment brand built for visibility, recognition and growth.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9V6vx-1MNRxWZGnzvWfrcWFkmAbgqldYNJmEw6gjQPsbzBnhkOds0y3VeLIPZttZIO-LPtJS5wdaEUxcDkEbFB7ns5tCBdPOnJ7UjqsLVZpaIu6oOXhOEtMuvoHUrS9A6k4amFMb-WlpTDssbdB7wea4XQerEy8i5EwIVo-WCMpJGbIsySqqxoUvAXNvV/s1600/Clipaste_2026-06-05_02.50.22.png" },
  { name: "Selected projects", text: "More brand systems, communication frameworks and premium collections, being documented for publication.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0N3Qm7PmsYNkaUBe1A6SvQ51sWHuRYGzymtUBBmWWncG3XV8k6Cs1nFjomgiRIfRzDsCfxRUzKD-IWJMM_oU7CHHh-Hmcsk_NWpk_IsVU7wBom8nyfrjN-O4YebP40Vm2VW1NCbP-EZF5z8mbZWIAALV-BQQ6cGdkoB3Jnw7GZJAHt8uEgpu0LXLNqsdd/s1600/YS%20(2).png" },
];

// Signature collections, from the live site.
export const signature = [
  { name: "Bespoke and Corporate Gifting", text: "Custom notebooks for brand launches, corporate gifting and events. We handle everything from material to packaging.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2LImYR64orCyQYiXc_MIxWmrfGgEx9OAzuN5JsazcCZosnm-jYDyFJk1WytpbmE5r1OmUlVWxEUml-M4HE9EI69g970Lvds5txfiGzvZZwkOAy1rnFLOUZ1X1IkKn_lONbczmP43gC9IbjxeV5uYAQAau2a9UH0hrjRH0xpvObeqLl89qmAINadoYn8LM/s1600/1.jpg", href: "/solutions/gifting" },
  { name: "The Sankara Range", text: "Handcrafted and personalised notebooks, inspired by the belief that ideas are worth protecting. A limited edition with a story behind every piece.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghUav-6bfqfX7RbKzkxuqkSzNFXBoxR9TxomhrxY0RJyE3VPq45Rs0N_kCp17LwGhM8jYGpQ04tD_OWODUzvasODgbCwQRrCyIUeyWMnnk7eea0ZceEudUFcyy_b3OAuXZ3v1z5i3f7U4x6CLkptTdc-eNpHXIqe3mlGlSISYhh7EcRPeALygaMbDyBQPG/s1600/1.jpg", href: "/collections#handcrafted" },
  { name: "The Mausi Journal", text: "For your ideas, plans, and the things you keep meaning to start. Designed to feel good to pick up and better to fill.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnIj_omgcDkUrS9yd8rs9xQ7iLh9N8zuUkHmNtcHBLR3b3Y2dbLiN-ehiaIIO8MBgcdHtBvLlKYvI0Ijv4jgNOjzUjyTUrbzhqpVz20gw6TYmcu2_u4KYha-Ghkx2je5ahkZ6vI14fC9yIPNWEwHssiFq4E_viHhbHmCcvsexmPgPEArWO4qIkGK1O0v9W/s1600/SHE%20DID%20BOX.jpg", href: "/collections#notebooks" },
  { name: "Vintage Leather", text: "Real leather cover, hand-stitched, refillable. Gets better with age. For notes you will want to read back.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdaqgaO-4LtA3S3fUhTvSDwuYrHC4__sQEHvSBJmYOfzcvThQdD4pNqn_5n5k1xHFVR_sZea6ti2paWUBBOUW9cLPHgGg9EvfwTnESbPWS0V3BVKZJeEnX1jy1I7NeNIRAGmOELWeqwTV3aG4JHfF4JA_ViIMzN-8viJ9i3BeoIDcBfQtaEYTWmI9ix8SQ/s1600/4.jpg", href: "/collections/hand-stitched-leather-journal" },
];

export const founderNote = {
  title: "A perspective on clarity",
  text: "Ysidra was founded on the belief that strong brands are built through clarity, consistency, and strategic thinking. Good design should solve problems, not simply decorate them.",
  sign: "Yeye Durojaiye-Arogundade, Founder",
};

// Photos from the Blogger photo store, refreshed on every Vercel build (scripts/archive.mjs).
import archiveData from "./archive.json";
export const archive = archiveData;
const TAG = { client: "Client work", range: "YSIDRA ranges", studio: "Studio" };
export const archiveGallery = archiveData.map((a) => ({ url: a.url, name: a.name || "", tag: TAG[a.type] || "Studio" }));
export const clientArchive = archiveData.filter((a) => a.type === "client");
