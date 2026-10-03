import type { Metadata } from "next";
import { getArticulos } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ArticuloItemSeccion from "@/app/components/ArticuloItemSeccion";
import EstadoVacio from "@/app/components/EstadoVacio";

export const metadata: Metadata = {
  title: "Entrevistas",
  description:
    "Charlas mano a mano y podcasts con artistas, bandas y referentes de la escena musical de Rosario.",
};

export const dynamic = "force-dynamic";

export default async function EntrevistasPage() {
  const articulos = (await getArticulos()).filter((a) => a.seccion === "ENTREVISTAS");

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
              imagenUrl={articulo.imagenUrl}
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
