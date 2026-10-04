"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser-client";

type Bloque = { tipo: "parrafo" | "subtitulo" | "cita"; texto: string };
type Relacionado = { titulo: string; href: string };

type Valores = {
  slug?: string;
  seccion?: string;
  formato?: string;
  titulo?: string;
  bajada?: string;
  autor?: string;
  autor_iniciales?: string;
  autor_bio?: string;
  fecha?: string;
  imagen_url?: string | null;
  cuerpo?: Bloque[];
  relacionados?: Relacionado[];
};

export default function ArticuloForm({
  action,
  valores,
}: {
  action: (formData: FormData) => Promise<void>;
  valores?: Valores;
}) {
  const router = useRouter();
  const [bloques, setBloques] = useState<Bloque[]>(valores?.cuerpo?.length ? valores.cuerpo : [{ tipo: "parrafo", texto: "" }]);
  const [relacionados, setRelacionados] = useState<Relacionado[]>(valores?.relacionados ?? []);
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string | null>(valores?.imagen_url ?? null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function actualizarBloque(indice: number, campo: keyof Bloque, valor: string) {
    setBloques((prev) => prev.map((b, i) => (i === indice ? { ...b, [campo]: valor } : b)));
  }

  function agregarBloque() {
    setBloques((prev) => [...prev, { tipo: "parrafo", texto: "" }]);
  }

  function quitarBloque(indice: number) {
    setBloques((prev) => prev.filter((_, i) => i !== indice));
  }

  function moverBloque(indice: number, direccion: -1 | 1) {
    setBloques((prev) => {
      const nuevo = [...prev];
      const destino = indice + direccion;
      if (destino < 0 || destino >= nuevo.length) return prev;
      [nuevo[indice], nuevo[destino]] = [nuevo[destino], nuevo[indice]];
      return nuevo;
    });
  }

  function actualizarRelacionado(indice: number, campo: keyof Relacionado, valor: string) {
    setRelacionados((prev) => prev.map((r, i) => (i === indice ? { ...r, [campo]: valor } : r)));
  }

  function agregarRelacionado() {
    setRelacionados((prev) => [...prev, { titulo: "", href: "" }]);
  }

  function quitarRelacionado(indice: number) {
    setRelacionados((prev) => prev.filter((_, i) => i !== indice));
  }

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
          .from("articulo-imagenes")
          .upload(nombreArchivo, archivoImagen, { upsert: true });
        if (errorSubida) throw new Error(errorSubida.message);
        const { data: urlPublica } = supabase.storage
          .from("articulo-imagenes")
          .getPublicUrl(subida.path);
        imagenUrl = urlPublica.publicUrl;
      }

      formData.set("imagen_url", imagenUrl);
      formData.set("cuerpo", JSON.stringify(bloques.filter((b) => b.texto.trim() !== "")));
      formData.set(
        "relacionados",
        JSON.stringify(relacionados.filter((r) => r.titulo.trim() !== "" && r.href.trim() !== ""))
      );

      await action(formData);
      router.push("/admin/articulos");
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
        Slug (parte de la URL, sin espacios ni tildes)
        <input type="text" name="slug" defaultValue={valores?.slug} required />
      </label>
      <label>
        Sección (ENTREVISTAS, EFEMÉRIDES o COBERTURAS)
        <input type="text" name="seccion" defaultValue={valores?.seccion} required />
      </label>
      <label>
        Formato (ej: NOTA ESCRITA + PODCAST)
        <input type="text" name="formato" defaultValue={valores?.formato} required />
      </label>
      <label>
        Título
        <input type="text" name="titulo" defaultValue={valores?.titulo} required />
      </label>
      <label>
        Bajada
        <textarea name="bajada" defaultValue={valores?.bajada} required />
      </label>
      <label>
        Autor/a
        <input type="text" name="autor" defaultValue={valores?.autor} required />
      </label>
      <label>
        Iniciales del autor (para el avatar, ej: JG)
        <input type="text" name="autor_iniciales" defaultValue={valores?.autor_iniciales} required />
      </label>
      <label>
        Bio corta del autor
        <textarea name="autor_bio" defaultValue={valores?.autor_bio} required />
      </label>
      <label>
        Fecha
        <input type="date" name="fecha" defaultValue={valores?.fecha} required />
      </label>

      <label>
        Foto de la nota
        <input type="file" accept="image/*" onChange={manejarArchivo} />
      </label>
      {previewImagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewImagen} alt="Vista previa" className="admin-imagen-preview" />
      )}

      <div>
        <strong>Cuerpo de la nota</strong>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
          {bloques.map((bloque, indice) => (
            <div className="admin-bloque-editor" key={indice}>
              <div className="admin-bloque-editor__cabecera">
                <select
                  value={bloque.tipo}
                  onChange={(e) => actualizarBloque(indice, "tipo", e.target.value)}
                >
                  <option value="parrafo">Párrafo</option>
                  <option value="subtitulo">Subtítulo</option>
                  <option value="cita">Cita</option>
                </select>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  <button type="button" className="admin-button admin-button--secundario" onClick={() => moverBloque(indice, -1)}>
                    ↑
                  </button>
                  <button type="button" className="admin-button admin-button--secundario" onClick={() => moverBloque(indice, 1)}>
                    ↓
                  </button>
                  <button type="button" className="admin-button admin-button--peligro" onClick={() => quitarBloque(indice)}>
                    Quitar
                  </button>
                </div>
              </div>
              <textarea
                value={bloque.texto}
                onChange={(e) => actualizarBloque(indice, "texto", e.target.value)}
                placeholder="Texto del bloque..."
              />
            </div>
          ))}
        </div>
        <button type="button" className="admin-button admin-button--secundario" onClick={agregarBloque} style={{ marginTop: "0.75rem" }}>
          + Agregar bloque
        </button>
      </div>

      <div>
        <strong>Contenido relacionado (opcional)</strong>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
          {relacionados.map((relacionado, indice) => (
            <div className="admin-bloque-editor" key={indice}>
              <input
                type="text"
                placeholder="Título del enlace"
                value={relacionado.titulo}
                onChange={(e) => actualizarRelacionado(indice, "titulo", e.target.value)}
              />
              <input
                type="text"
                placeholder="/secciones/agenda"
                value={relacionado.href}
                onChange={(e) => actualizarRelacionado(indice, "href", e.target.value)}
              />
              <button type="button" className="admin-button admin-button--peligro" onClick={() => quitarRelacionado(indice)}>
                Quitar
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="admin-button admin-button--secundario" onClick={agregarRelacionado} style={{ marginTop: "0.75rem" }}>
          + Agregar relacionado
        </button>
      </div>

      <button type="submit" className="admin-button" disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar nota"}
      </button>
    </form>
  );
}
