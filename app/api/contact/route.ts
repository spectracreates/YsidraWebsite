import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidEmail } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, services, message } = await req.json();

    if (!name?.trim() || !isValidEmail(email || "")) {
      return NextResponse.json({ error: "Please provide a valid name and email." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      services: services || [],
      message: message || null,
    });

    if (error) {
      console.error("Contact form insert failed:", error);
      return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
