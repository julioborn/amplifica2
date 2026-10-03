"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

function datosDesdeForm(formData: FormData) {
  return {
    nombre: String(formData.get("nombre") ?? ""),
    usuario: String(formData.get("usuario") ?? "").toLowerCase().trim(),
    rol: String(formData.get("rol") ?? ""),
    detalle: String(formData.get("detalle") ?? ""),
    orden: Number(formData.get("orden") ?? 0),
  };
}

export async function crearIntegrante(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("equipo").insert(datosDesdeForm(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/equipo");
  revalidatePath("/quienes-somos");
  redirect("/admin/equipo");
}

export async function actualizarIntegrante(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("equipo").update(datosDesdeForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/equipo");
  revalidatePath("/quienes-somos");
  redirect("/admin/equipo");
}

export async function eliminarIntegrante(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("equipo").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/equipo");
  revalidatePath("/quienes-somos");
}
