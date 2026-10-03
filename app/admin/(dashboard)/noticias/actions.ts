"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

function datosDesdeForm(formData: FormData) {
  return {
    tipo: String(formData.get("tipo") ?? "noticia"),
    seccion: String(formData.get("seccion") ?? ""),
    formato: String(formData.get("formato") ?? ""),
    titulo: String(formData.get("titulo") ?? ""),
    bajada: String(formData.get("bajada") ?? ""),
    autor: String(formData.get("autor") ?? ""),
    fecha: (formData.get("fecha") as string) || null,
    href: String(formData.get("href") ?? ""),
    externo: formData.get("externo") === "on",
    cta_label: String(formData.get("cta_label") ?? ""),
  };
}

function revalidarTodo() {
  revalidatePath("/admin/noticias");
  revalidatePath("/secciones/noticias");
  revalidatePath("/");
}

export async function crearPublicacion(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("publicaciones").insert(datosDesdeForm(formData));
  if (error) throw new Error(error.message);
  revalidarTodo();
  redirect("/admin/noticias");
}

export async function actualizarPublicacion(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("publicaciones").update(datosDesdeForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidarTodo();
  redirect("/admin/noticias");
}

export async function eliminarPublicacion(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("publicaciones").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidarTodo();
}
