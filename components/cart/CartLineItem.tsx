"use client";

import Image from "next/image";
import Link from "next/link";
import { CartLine } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeLine } = useCart();
  return (
    <div className="flex gap-4 border-b border-parchment-200 py-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-parchment">
        <Image src={line.image} alt={line.name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/books/${line.slug}`}
            className="font-display text-sm font-bold text-indigo hover:underline"
          >
            {line.name}
          </Link>
          <p className="text-xs text-ink/60">{line.variantLabel}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full border border-parchment-200">
            <button
              onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-indigo"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold">
              {line.quantity}
            </span>
            <button
              onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-indigo"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-semibold text-ink">
            {formatNaira(line.unitPrice * line.quantity)}
          </span>
        </div>
      </div>
      <button
        onClick={() => removeLine(line.variantId)}
        className="self-start text-ink/40 hover:text-red-600"
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
