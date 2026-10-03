import type { Metadata } from "next";
import { articulos } from "@/lib/data/articulos";
import MigaPan from "../../components/MigaPan";
import CabeceraSeccion from "../../components/CabeceraSeccion";
import ArticuloItemSeccion from "../../components/ArticuloItemSeccion";
import EstadoVacio from "../../components/EstadoVacio";

export const metadata: Metadata = {
  title: "Entrevistas",
  description:
    "Charlas mano a mano y podcasts con artistas, bandas y referentes de la escena musical de Rosario.",
};

export default function EntrevistasPage() {
  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Entrevistas" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Entrevistas"
          descripcion="Charlas en profundidad con bandas, solistas y protagonistas de la escena musical de Rosario."
        />

        <div className="lista-articulos-seccion">
          {articulos.map((articulo) => (
            <ArticuloItemSeccion
              key={articulo.slug}
              seccion={articulo.seccion}
              formato={articulo.formato}
              titulo={articulo.titulo}
              bajada={articulo.bajada}
              autor={articulo.autor}
              fechaLegible={articulo.fechaLegible}
              href={`/notas/${articulo.slug}`}
              ctaLabel="Leer entrevista completa →"
            />
          ))}
        </div>

        <EstadoVacio
          titulo="Más entrevistas, próximamente"
          texto="Estamos coordinando nuevas charlas con artistas de la escena local e internacional. Volvé pronto para ver las próximas publicaciones."
        />
      </section>
    </main>
  );
}
