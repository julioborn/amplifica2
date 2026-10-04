import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import { eliminarPublicacion } from "./actions";

export default async function AdminNoticiasPage() {
  const supabase = await createServerSupabaseClient();
  const { data: publicaciones } = await supabase
    .from("publicaciones")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Noticias y juegos" descripcion="Teasers breves de noticias y trivias semanales." />

      <div>
        {(publicaciones ?? []).map((pub) => (
          <div className="admin-lista-item" key={pub.id}>
            <div>
              <p className="admin-lista-item__titulo">{pub.titulo}</p>
              <p className="admin-lista-item__meta">
                {pub.tipo === "juego" ? "Juego" : "Noticia"} · {pub.seccion}
              </p>
            </div>
            <div className="admin-lista-item__acciones">
              <Link href={`/admin/noticias/${pub.id}/editar`} className="admin-button admin-button--secundario">
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await eliminarPublicacion(pub.id);
                }}
              >
                <button type="submit" className="admin-button admin-button--peligro">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
        {(publicaciones ?? []).length === 0 && <p>No hay publicaciones todavía.</p>}
      </div>

      <Link href="/admin/noticias/nuevo" className="admin-button" style={{ marginTop: "1.5rem" }}>
        + Nueva publicación
      </Link>
    </div>
  );
}
