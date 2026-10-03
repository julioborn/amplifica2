import type { Metadata } from "next";
import { noticias } from "@/lib/data/publicaciones";
import MigaPan from "../../components/MigaPan";
import CabeceraSeccion from "../../components/CabeceraSeccion";
import ArticuloItemSeccion from "../../components/ArticuloItemSeccion";
import EstadoVacio from "../../components/EstadoVacio";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Noticias y convocatorias de la escena musical de Rosario, con columna internacional sobre el panorama global.",
};

export default function NoticiasPage() {
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
