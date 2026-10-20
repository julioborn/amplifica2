"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser-client";

type PodcastValores = {
  numero_episodio?: string;
  titulo?: string;
  descripcion?: string;
  conductor?: string;
  duracion_min?: number;
  enlace_youtube?: string;
  fecha?: string;
  imagen_url?: string | null;
  imagen_credito?: string | null;
};

export default function PodcastForm({
  action,
  valores,
}: {
  action: (formData: FormData) => Promise<void>;
  valores?: PodcastValores;
}) {
  const router = useRouter();
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string | null>(valores?.imagen_url ?? null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function manejarArchivo(evento: React.ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0] ?? null;
    setArchivoImagen(archivo);
    if (archivo) setPreviewImagen(URL.createObjectURL(archivo));
  }

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError(null);
    setGuardando(true);

    try {
      const formData = new FormData(evento.currentTarget);

      let imagenUrl = valores?.imagen_url ?? "";
      if (archivoImagen) {
        const supabase = createBrowserSupabaseClient();
        const nombreArchivo = `${Date.now()}-${archivoImagen.name.replace(/\s+/g, "-")}`;
        const { data: subida, error: errorSubida } = await supabase.storage
          .from("podcast-imagenes")
          .upload(nombreArchivo, archivoImagen, { upsert: true });
        if (errorSubida) throw new Error(errorSubida.message);
        const { data: urlPublica } = supabase.storage.from("podcast-imagenes").getPublicUrl(subida.path);
        imagenUrl = urlPublica.publicUrl;
      }

      formData.set("imagen_url", imagenUrl);

      await action(formData);
      router.push("/admin/podcasts");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ocurrió un error al guardar.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <p className="admin-mensaje-error">{error}</p>}

      <label>
        Número de episodio (ej: &quot;EPISODIO #05&quot;)
        <input type="text" name="numero_episodio" defaultValue={valores?.numero_episodio} required />
      </label>
      <label>
        Título
        <input type="text" name="titulo" defaultValue={valores?.titulo} required />
      </label>
      <label>
        Descripción
        <textarea name="descripcion" defaultValue={valores?.descripcion} required />
      </label>
      <label>
        Conduce
        <input type="text" name="conductor" defaultValue={valores?.conductor} required />
      </label>
      <label>
        Duración (en minutos)
        <input type="number" name="duracion_min" defaultValue={valores?.duracion_min ?? 30} required />
      </label>
      <label>
        Enlace de YouTube
        <input type="text" name="enlace_youtube" defaultValue={valores?.enlace_youtube} required />
      </label>
      <label>
        Fecha
        <input type="date" name="fecha" defaultValue={valores?.fecha} required />
      </label>

      <label>
        Foto de portada del episodio
        <input type="file" accept="image/*" onChange={manejarArchivo} />
      </label>
      {previewImagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewImagen} alt="Vista previa" className="admin-imagen-preview" />
      )}
      <label>
        Crédito de la foto (ej: &quot;Foto: Juan Pérez&quot;)
        <input type="text" name="imagen_credito" defaultValue={valores?.imagen_credito ?? ""} />
      </label>

      <button type="submit" className="admin-button" disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
