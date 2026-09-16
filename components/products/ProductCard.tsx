import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  const fromPrice = Math.min(...product.variants.map((v) => v.price));
  return (
    <Link
      href={`/books/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-parchment-200 bg-white transition-shadow hover:shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {!product.available && (
          <div className="absolute left-3 top-3">
            <Badge tone="neutral">Coming soon</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-saffron">
          {product.collection}
        </span>
        <h3 className="font-display text-base font-bold text-indigo">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-ink/60">{product.tagline}</p>
        <div className="mt-3 flex items-center justify-between">
          <PriceDisplay amount={fromPrice} size="sm" />
          <span className="text-xs font-semibold text-indigo underline-offset-2 group-hover:underline">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
