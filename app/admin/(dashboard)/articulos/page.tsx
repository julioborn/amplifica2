import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { eliminarArticulo } from "./actions";

export default async function AdminArticulosPage() {
  const supabase = await createServerSupabaseClient();
  const { data: articulos } = await supabase
    .from("articulos")
    .select("*")
    .order("fecha", { ascending: false });

  return (
    <div>
      <h1>Notas</h1>

      <div className="admin-card">
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

      <h1 style={{ marginTop: "2rem" }}>Agregar nota</h1>
      <Link href="/admin/articulos/nuevo" className="admin-button">
        Nueva nota →
      </Link>
    </div>
  );
}
