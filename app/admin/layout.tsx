import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The login page itself renders inside this layout too, so only redirect
  // once we know there's no user AND we're not already on /admin/login.
  // (Deeper protection lives in middleware.ts — this is a second, cheap check.)
  if (!user) {
    // middleware already redirects unauthenticated requests away from /admin/*
    // other than /admin/login, so reaching here with no user means we're on
    // the login page itself — render children (the login form) as-is.
  }

  return (
    <div className="flex min-h-[80vh]">
      {user && (
        <aside className="hidden w-56 shrink-0 border-r border-parchment-200 bg-parchment/40 p-6 md:block">
          <p className="mb-6 font-display text-sm font-bold uppercase tracking-wide text-indigo">
            Ysidra Admin
          </p>
          <nav className="space-y-1 text-sm">
            <Link href="/admin" className="block rounded-lg px-3 py-2 font-medium text-ink/70 hover:bg-white">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="block rounded-lg px-3 py-2 font-medium text-ink/70 hover:bg-white">
              Orders
            </Link>
            <Link href="/admin/products" className="block rounded-lg px-3 py-2 font-medium text-ink/70 hover:bg-white">
              Products
            </Link>
          </nav>
          <div className="mt-8">
            <SignOutButton />
          </div>
        </aside>
      )}
      <div className="flex-1 p-6 md:p-10">{children}</div>
    </div>
  );
}
