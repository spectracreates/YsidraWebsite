export type ProductVariant = {
  id: string;
  label: string; // e.g. "A5", "A6 with lining + pockets"
  price: number; // kobo-free naira integer, e.g. 105000
  sku: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string; // e.g. "Mansa Vintage Leather"
  tagline: string;
  description: string;
  inspired_by?: string;
  binding_style?: string;
  materials?: string;
  category: "bespoke-leather" | "pocket-journal" | "corporate";
  variants: ProductVariant[];
  images: string[]; // placeholder or Cloudinary URLs
  featured: boolean;
  available: boolean; // false = shown, purchase disabled (e.g. price pending)
  unavailable_reason?: string;
};

export type CartLine = {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  image: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "in_production"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type CheckoutDetails = {
  full_name: string;
  email: string;
  phone: string;
  delivery_address: string;
  city: string;
  state: string;
  country: string;
};
