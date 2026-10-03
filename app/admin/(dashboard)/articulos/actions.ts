"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

function datosDesdeForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    seccion: String(formData.get("seccion") ?? "").toUpperCase(),
    formato: String(formData.get("formato") ?? ""),
    titulo: String(formData.get("titulo") ?? ""),
    bajada: String(formData.get("bajada") ?? ""),
    autor: String(formData.get("autor") ?? ""),
    autor_iniciales: String(formData.get("autor_iniciales") ?? ""),
    autor_bio: String(formData.get("autor_bio") ?? ""),
    fecha: String(formData.get("fecha") ?? ""),
    imagen_url: String(formData.get("imagen_url") ?? "") || null,
    cuerpo: JSON.parse(String(formData.get("cuerpo") ?? "[]")),
    relacionados: JSON.parse(String(formData.get("relacionados") ?? "[]")),
  };
}

function revalidarTodo(seccion: string, slug: string) {
  revalidatePath("/admin/articulos");
  revalidatePath("/");
  revalidatePath(`/notas/${slug}`);
  if (seccion === "ENTREVISTAS") revalidatePath("/secciones/entrevistas");
  if (seccion === "EFEMÉRIDES") revalidatePath("/secciones/efemerides");
  if (seccion === "COBERTURAS") revalidatePath("/secciones/coberturas");
}

export async function crearArticulo(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const datos = datosDesdeForm(formData);
  const { error } = await supabase.from("articulos").insert(datos);
  if (error) throw new Error(error.message);
  revalidarTodo(datos.seccion, datos.slug);
}

export async function actualizarArticulo(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const datos = datosDesdeForm(formData);
  const { error } = await supabase
    .from("articulos")
    .update({ ...datos, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidarTodo(datos.seccion, datos.slug);
}

export async function eliminarArticulo(id: string, seccion: string, slug: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("articulos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidarTodo(seccion, slug);
}
