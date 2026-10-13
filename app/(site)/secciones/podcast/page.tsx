import type { Metadata } from "next";
import { getPodcasts } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import EstadoVacio from "@/app/components/EstadoVacio";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Todos los episodios del podcast de Amplifica2: charlas, debate y música de Rosario.",
};

export const dynamic = "force-dynamic";

export default async function PodcastPage() {
  const podcasts = await getPodcasts();

  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Podcast" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Podcast"
          descripcion="Todos los episodios del programa: debate, recomendaciones y la escena musical de Rosario."
        />

        <div className="lista-articulos-seccion">
          {podcasts.map((podcast) => (
            <article className="articulo-item-seccion" key={podcast.id}>
              <div
                className="placeholder-visual"
                role="img"
                aria-label={`Episodio: ${podcast.titulo}`}
                style={{ minHeight: "140px" }}
              >
                <span className="placeholder-visual__icono" aria-hidden="true">
                  🎙️
                </span>
                <span className="placeholder-visual__etiqueta">{podcast.numeroEpisodio}</span>
              </div>

              <div>
                <div className="etiquetas-meta">
                  <span className="tag-seccion">PODCAST</span>
                  <span className="tag-formato">{podcast.numeroEpisodio}</span>
                </div>

                <h3 className="articulo-item-seccion__titulo">{podcast.titulo}</h3>
                <p className="articulo-item-seccion__bajada">{podcast.descripcion}</p>

                <div className="metadatos-articulo">
                  <span>
                    Conduce: <strong>{podcast.conductor}</strong>
                  </span>
                  <span>·</span>
                  <span>{podcast.duracionMin} min</span>
                </div>

                <a
                  href={podcast.enlaceYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-lectura-completa"
                >
                  Ver en YouTube →
                </a>
              </div>
            </article>
          ))}
        </div>

        {podcasts.length === 0 && (
          <EstadoVacio
            titulo="Todavía no hay episodios cargados"
            texto="El equipo está preparando el próximo programa. Volvé pronto."
          />
        )}
      </section>
    </main>
  );
}
