import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import { eliminarArticulo } from "./actions";

export default async function AdminArticulosPage() {
  const supabase = await createServerSupabaseClient();
  const { data: articulos } = await supabase
    .from("articulos")
    .select("*")
    .order("fecha", { ascending: false });

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Notas" descripcion="Entrevistas, efemérides y coberturas completas." />

      <div>
        {(articulos ?? []).map((articulo) => (
          <div className="admin-lista-item" key={articulo.id}>
            <div>
              <p className="admin-lista-item__titulo">{articulo.titulo}</p>
              <p className="admin-lista-item__meta">
                {articulo.seccion} · /notas/{articulo.slug}
              </p>
            </div>
            <div className="admin-lista-item__acciones">
              <Link href={`/admin/articulos/${articulo.id}/editar`} className="admin-button admin-button--secundario">
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await eliminarArticulo(articulo.id, articulo.seccion, articulo.slug);
                }}
              >
                <button type="submit" className="admin-button admin-button--peligro">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
        {(articulos ?? []).length === 0 && <p>No hay notas todavía.</p>}
      </div>

      <Link href="/admin/articulos/nuevo" className="admin-button" style={{ marginTop: "1.5rem" }}>
        + Nueva nota
      </Link>
    </div>
  );
}
