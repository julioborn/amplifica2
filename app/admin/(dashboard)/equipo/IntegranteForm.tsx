"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser-client";

type Integrante = {
  nombre?: string;
  usuario?: string;
  rol?: string;
  detalle?: string;
  orden?: number;
  foto_url?: string | null;
};

export default function IntegranteForm({
  action,
  valores,
}: {
  action: (formData: FormData) => Promise<void>;
  valores?: Integrante;
}) {
  const router = useRouter();
  const [archivoFoto, setArchivoFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string | null>(valores?.foto_url ?? null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function manejarArchivo(evento: React.ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0] ?? null;
    setArchivoFoto(archivo);
    if (archivo) setPreviewFoto(URL.createObjectURL(archivo));
  }

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError(null);
    setGuardando(true);

    try {
      const formData = new FormData(evento.currentTarget);

      let fotoUrl = valores?.foto_url ?? "";
      if (archivoFoto) {
        const supabase = createBrowserSupabaseClient();
        const nombreArchivo = `${Date.now()}-${archivoFoto.name.replace(/\s+/g, "-")}`;
        const { data: subida, error: errorSubida } = await supabase.storage
          .from("equipo-fotos")
          .upload(nombreArchivo, archivoFoto, { upsert: true });
        if (errorSubida) throw new Error(errorSubida.message);
        const { data: urlPublica } = supabase.storage.from("equipo-fotos").getPublicUrl(subida.path);
        fotoUrl = urlPublica.publicUrl;
      }

      formData.set("foto_url", fotoUrl);

      await action(formData);
      router.push("/admin/equipo");
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
        Nombre completo
        <input type="text" name="nombre" defaultValue={valores?.nombre} required />
      </label>
      <label>
        Usuario (para loguearse, sin espacios)
        <input type="text" name="usuario" defaultValue={valores?.usuario} required />
      </label>
      <label>
        Rol
        <input type="text" name="rol" defaultValue={valores?.rol} required />
      </label>
      <label>
        Bio / detalle
        <textarea name="detalle" defaultValue={valores?.detalle} required />
      </label>
      <label>
        Foto (para el círculo en Quiénes somos y en sus notas)
        <input type="file" accept="image/*" onChange={manejarArchivo} />
      </label>
      {previewFoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewFoto}
          alt="Vista previa"
          className="admin-imagen-preview"
          style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover" }}
        />
      )}
      <label>
        Orden (0 = primero)
        <input type="number" name="orden" defaultValue={valores?.orden ?? 0} required />
      </label>
      <button type="submit" className="admin-button" disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
