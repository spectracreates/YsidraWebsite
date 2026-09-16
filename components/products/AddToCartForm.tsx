"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Minus, Plus } from "lucide-react";

export function AddToCartForm({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addLine } = useCart();
  const router = useRouter();

  const variant = product.variants.find((v) => v.id === variantId)!;

  function handleAdd(goToCheckout = false) {
    addLine({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity,
      image: product.images[0],
    });
    if (goToCheckout) {
      router.push("/checkout");
      return;
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!product.available) {
    return (
      <div className="rounded-card border border-parchment-200 bg-parchment/60 p-5">
        <p className="text-sm font-semibold text-ink/70">
          {product.unavailable_reason || "Currently unavailable."}
        </p>
        <p className="mt-1 text-sm text-ink/60">
          Interested in this piece? Reach out and we'll let you know the moment it's
          ready to order.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PriceDisplay amount={variant.price} size="lg" />

      {product.variants.length > 1 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">Size / Type</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  v.id === variantId
                    ? "border-indigo bg-indigo text-white"
                    : "border-parchment-200 text-ink/70 hover:border-indigo"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">Quantity</label>
        <div className="flex w-fit items-center rounded-full border border-parchment-200">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-indigo"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-indigo"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={() => handleAdd(false)} className="flex-1">
          {added ? "Added ✓" : "Add to cart"}
        </Button>
        <Button onClick={() => handleAdd(true)} className="flex-1">
          Buy now
        </Button>
      </div>
    </div>
  );
}
