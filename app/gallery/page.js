import GalleryGrid from "@/components/GalleryGrid";
import { PageHero, CtaBand } from "@/components/Blocks";
import { gallery } from "@/lib/content";

export const metadata = {
  title: "Gallery",
  description: "Photos of YSIDRA notebooks, diaries, handcrafted leather and ankara journals, event souvenirs and corporate gifts, made in Lagos, Nigeria.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <>
      <PageHero title="Gallery" crumbs={[[null, "Gallery"]]} lede={`${gallery.length} pieces from the studio. Filter by type and tap any photo to look closer or enquire.`} />
      <section className="band white"><div className="wrap"><GalleryGrid items={gallery} /></div></section>
      <CtaBand title="Seen something you like?" text="Send us the photo on WhatsApp and we will make it yours." />
    </>
  );
}
