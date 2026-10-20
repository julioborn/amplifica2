"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

function datosDesdeForm(formData: FormData) {
  return {
    numero_episodio: String(formData.get("numero_episodio") ?? ""),
    titulo: String(formData.get("titulo") ?? ""),
    descripcion: String(formData.get("descripcion") ?? ""),
    conductor: String(formData.get("conductor") ?? ""),
    duracion_min: Number(formData.get("duracion_min") ?? 0),
    enlace_youtube: String(formData.get("enlace_youtube") ?? ""),
    fecha: String(formData.get("fecha") ?? ""),
    imagen_url: String(formData.get("imagen_url") ?? "") || null,
    imagen_credito: String(formData.get("imagen_credito") ?? "").trim() || null,
  };
}

function revalidarTodo() {
  revalidatePath("/admin/podcasts");
  revalidatePath("/secciones/podcast");
  revalidatePath("/");
}

export async function crearPodcast(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("podcasts").insert(datosDesdeForm(formData));
  if (error) throw new Error(error.message);
  revalidarTodo();
}

export async function actualizarPodcast(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("podcasts").update(datosDesdeForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidarTodo();
}

export async function eliminarPodcast(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("podcasts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidarTodo();
}
