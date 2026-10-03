import type { Metadata } from "next";
import { getPublicaciones } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ArticuloItemSeccion from "@/app/components/ArticuloItemSeccion";
import EstadoVacio from "@/app/components/EstadoVacio";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Noticias y convocatorias de la escena musical de Rosario, con columna internacional sobre el panorama global.",
};

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  const noticias = await getPublicaciones("noticia");

  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Noticias" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Noticias"
          descripcion="Convocatorias, anuncios y panorama internacional de la escena musical, verificados por la redacción de Amplifica2."
        />

        <div className="lista-articulos-seccion">
          {noticias.map((noticia) => (
            <ArticuloItemSeccion
              key={noticia.id}
              seccion={noticia.seccion}
              formato={noticia.formato}
              titulo={noticia.titulo}
              bajada={noticia.bajada}
              autor={noticia.autor}
              fechaLegible={noticia.fechaLegible}
            />
          ))}
        </div>

        <EstadoVacio
          titulo="Más noticias, próximamente"
          texto="La redacción está confirmando nuevas convocatorias y anuncios de la escena rosarina. Volvé pronto para ver las próximas publicaciones."
        />
      </section>
    </main>
  );
}
