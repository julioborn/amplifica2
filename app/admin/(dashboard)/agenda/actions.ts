"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

function datosDesdeForm(formData: FormData) {
  return {
    fecha_badge: String(formData.get("fecha_badge") ?? ""),
    nombre: String(formData.get("nombre") ?? ""),
    propuesta: String(formData.get("propuesta") ?? ""),
    lugar: String(formData.get("lugar") ?? ""),
    direccion: String(formData.get("direccion") ?? ""),
    condicion: String(formData.get("condicion") ?? "GRATUITA"),
    detalle_acceso: String(formData.get("detalle_acceso") ?? ""),
    nota_acceso: String(formData.get("nota_acceso") ?? ""),
    orden: Number(formData.get("orden") ?? 0),
  };
}

export async function crearEvento(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("eventos_agenda").insert(datosDesdeForm(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/agenda");
  revalidatePath("/secciones/agenda");
  revalidatePath("/");
  redirect("/admin/agenda");
}

export async function actualizarEvento(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("eventos_agenda").update(datosDesdeForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/agenda");
  revalidatePath("/secciones/agenda");
  revalidatePath("/");
  redirect("/admin/agenda");
}

export async function eliminarEvento(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("eventos_agenda").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/agenda");
  revalidatePath("/secciones/agenda");
  revalidatePath("/");
}
