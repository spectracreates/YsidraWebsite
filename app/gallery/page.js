import GalleryGrid from "@/components/GalleryGrid";
import { PageHero, CtaBand } from "@/components/Blocks";
import { gallery, archiveGallery, clientArchive } from "@/lib/content";
import ClientCollections from "@/components/ClientCollections";

export const metadata = {
  title: "Gallery",
  description: "Photos of YSIDRA notebooks, diaries, handcrafted leather and ankara journals, event souvenirs and corporate gifts, made in Lagos, Nigeria.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <>
      <PageHero title="Gallery" crumbs={[[null, "Gallery"]]} lede={`${gallery.length + archiveGallery.length} pieces from the studio. Filter by type and tap any photo to look closer or enquire.`} />
      <section className="band white"><div className="wrap"><GalleryGrid items={[...gallery, ...archiveGallery]} /></div></section>
      {clientArchive.length > 0 && (
        <section className="band"><div className="wrap">
          <div className="head"><div><h2>Client collections</h2><p className="lede">Notebooks and diaries we have made for organisations across Nigeria. Tap a client to see the full set.</p></div></div>
          <ClientCollections items={clientArchive} />
        </div></section>
      )}
      <CtaBand title="Seen something you like?" text="Send us the photo on WhatsApp and we will make it yours." />
    </>
  );
}
