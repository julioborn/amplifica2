import { supabase } from "./client";
import type { Integrante } from "@/lib/data/team";
import type { EventoAgenda } from "@/lib/data/agenda";
import type { Articulo } from "@/lib/data/articulos";
import type { Publicacion } from "@/lib/data/publicaciones";

export async function getEquipo(): Promise<Integrante[]> {
  const { data, error } = await supabase
    .from("equipo")
    .select("*")
    .order("orden", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((fila) => ({
    iniciales: fila.usuario.slice(0, 2).toUpperCase(),
    nombre: fila.nombre,
    rol: fila.rol,
    detalle: fila.detalle,
  }));
}

export async function getAgenda(): Promise<EventoAgenda[]> {
  const { data, error } = await supabase
    .from("eventos_agenda")
    .select("*")
    .order("orden", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((fila) => ({
    id: fila.id,
    fechaBadge: fila.fecha_badge,
    nombre: fila.nombre,
    propuesta: fila.propuesta,
    lugar: fila.lugar,
    direccion: fila.direccion,
    condicion: fila.condicion,
    detalleAcceso: fila.detalle_acceso,
    notaAcceso: fila.nota_acceso,
  }));
}

function mapArticulo(fila: Record<string, unknown>): Articulo {
  return {
    slug: fila.slug as string,
    seccion: fila.seccion as string,
    formato: fila.formato as string,
    titulo: fila.titulo as string,
    bajada: fila.bajada as string,
    autor: fila.autor as string,
    autorIniciales: fila.autor_iniciales as string,
    autorBio: fila.autor_bio as string,
    fechaISO: fila.fecha as string,
    fechaLegible: new Date(`${fila.fecha}T00:00:00`).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    cuerpo: (fila.cuerpo ?? []) as Articulo["cuerpo"],
    relacionados: (fila.relacionados ?? []) as Articulo["relacionados"],
    imagenUrl: (fila.imagen_url as string | null) ?? undefined,
  };
}

export async function getArticulos(): Promise<Articulo[]> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .order("fecha", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapArticulo);
}

export async function getArticuloPorSlug(slug: string): Promise<Articulo | null> {
  const { data, error } = await supabase.from("articulos").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapArticulo(data) : null;
}

export async function getPublicaciones(tipo: "noticia" | "juego"): Promise<Publicacion[]> {
  const { data, error } = await supabase
    .from("publicaciones")
    .select("*")
    .eq("tipo", tipo)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((fila) => ({
    id: fila.id,
    seccion: fila.seccion,
    formato: fila.formato,
    titulo: fila.titulo,
    bajada: fila.bajada,
    autor: fila.autor,
    fechaISO: fila.fecha ?? undefined,
    fechaLegible: fila.fecha
      ? new Date(`${fila.fecha}T00:00:00`).toLocaleDateString("es-AR")
      : undefined,
    href: fila.href,
    externo: fila.externo,
    ctaLabel: fila.cta_label,
  }));
}
