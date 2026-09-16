// SERVER-ONLY admin client using the service role key. This bypasses Row
// Level Security, so it must NEVER be imported into a Client Component
// and must NEVER have its key exposed with a NEXT_PUBLIC_ prefix.
// Used only inside API routes for: webhook order updates, and admin writes
// after the caller's session has already been verified as an admin.
import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
