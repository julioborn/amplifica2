import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import { eliminarPodcast } from "./actions";

export default async function AdminPodcastsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: podcasts } = await supabase.from("podcasts").select("*").order("fecha", { ascending: false });

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion
        titulo="Podcast"
        descripcion="El episodio más nuevo es el que se muestra en la portada."
      />

      <div>
        {(podcasts ?? []).map((podcast) => (
          <div className="admin-lista-item" key={podcast.id}>
            <div>
              <p className="admin-lista-item__titulo">{podcast.titulo}</p>
              <p className="admin-lista-item__meta">
                {podcast.numero_episodio} · {podcast.duracion_min} min
              </p>
            </div>
            <div className="admin-lista-item__acciones">
              <Link href={`/admin/podcasts/${podcast.id}/editar`} className="admin-button admin-button--secundario">
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await eliminarPodcast(podcast.id);
                }}
              >
                <button type="submit" className="admin-button admin-button--peligro">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
        {(podcasts ?? []).length === 0 && <p>No hay episodios todavía.</p>}
      </div>

      <Link href="/admin/podcasts/nuevo" className="admin-button" style={{ marginTop: "1.5rem" }}>
        + Nuevo episodio
      </Link>
    </div>
  );
}
