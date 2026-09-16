import { revalidatePath } from "next/cache";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export default async function AdminProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, collection, images, available, featured, product_variants(price)")
    .order("created_at", { ascending: false });

  async function addProduct(formData: FormData) {
    "use server";
    const supabase = createClient();
    const name = formData.get("name") as string;
    const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-");
    const price = Number(formData.get("price"));
    const variantLabel = (formData.get("variantLabel") as string) || "Standard";
    const collection = formData.get("collection") as string;
    const imageUrl = (formData.get("imageUrl") as string) || "/images/products/toni-heritage.svg";

    const { data: product, error } = await supabase
      .from("products")
      .insert({
        name,
        slug,
        collection,
        images: [imageUrl],
        available: true,
        featured: false,
      })
      .select("id")
      .single();

    if (!error && product) {
      await supabase.from("product_variants").insert({
        product_id: product.id,
        label: variantLabel,
        sku: `YSD-${slug.toUpperCase().slice(0, 10)}`,
        price,
      });
    }
    revalidatePath("/admin/products");
  }

  async function toggleAvailability(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const available = formData.get("available") === "true";
    const supabase = createClient();
    await supabase.from("products").update({ available: !available }).eq("id", id);
    revalidatePath("/admin/products");
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-indigo">Products</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto rounded-card border border-parchment-200">
          <table className="w-full text-sm">
            <thead className="bg-parchment/60 text-left text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {(products || []).map((p: any) => {
                const from = p.product_variants?.length
                  ? Math.min(...p.product_variants.map((v: any) => v.price))
                  : 0;
                return (
                  <tr key={p.id} className="border-t border-parchment-200">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-parchment">
                        <Image src={p.images?.[0] || "/images/logo-mark.svg"} alt="" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-ink/50">{p.collection}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatNaira(from)}</td>
                    <td className="px-4 py-3">
                      <Badge tone={p.available ? "indigo" : "neutral"}>
                        {p.available ? "Available" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <form action={toggleAvailability}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="available" value={String(p.available)} />
                        <button className="text-xs font-semibold text-indigo hover:underline">
                          {p.available ? "Hide" : "Show"}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="h-fit rounded-card border border-parchment-200 p-5">
          <h2 className="font-display text-sm font-bold text-indigo">Add product</h2>
          <p className="mt-1 text-xs text-ink/50">
            Paste a Cloudinary URL once photography is ready — a placeholder is
            used automatically if left blank.
          </p>
          <form action={addProduct} className="mt-4 space-y-3">
            <input name="name" required placeholder="Product name" className="input" />
            <input name="slug" placeholder="URL slug (auto-generated if blank)" className="input" />
            <input name="collection" placeholder="Collection (e.g. Mansa Vintage Leather)" className="input" />
            <input name="variantLabel" placeholder="Variant label (e.g. A5)" className="input" />
            <input name="price" type="number" required placeholder="Price (NGN)" className="input" />
            <input name="imageUrl" placeholder="Cloudinary image URL (optional)" className="input" />
            <button className="w-full rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white">
              Add product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
