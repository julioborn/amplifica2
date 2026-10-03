"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

export async function cerrarSesion() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
