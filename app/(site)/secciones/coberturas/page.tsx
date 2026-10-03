import type { Metadata } from "next";
import { getArticulos } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ArticuloItemSeccion from "@/app/components/ArticuloItemSeccion";
import EstadoVacio from "@/app/components/EstadoVacio";

export const metadata: Metadata = {
  title: "Coberturas",
  description: "Crónicas de recitales y festivales en vivo de Rosario y la región.",
};

export const dynamic = "force-dynamic";

export default async function CoberturasPage() {
  const coberturas = (await getArticulos()).filter((a) => a.seccion === "COBERTURAS");

  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Coberturas" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Coberturas"
          descripcion="Crónicas en vivo de recitales, festivales y ciclos autogestivos de Rosario y la región."
        />

        <div className="lista-articulos-seccion">
          {coberturas.map((articulo) => (
            <ArticuloItemSeccion
              key={articulo.slug}
              seccion={articulo.seccion}
              formato={articulo.formato}
              titulo={articulo.titulo}
              bajada={articulo.bajada}
              autor={articulo.autor}
              fechaLegible={articulo.fechaLegible}
              href={`/notas/${articulo.slug}`}
              ctaLabel="Leer crónica →"
              imagenUrl={articulo.imagenUrl}
            />
          ))}
        </div>

        <EstadoVacio
          titulo="Más coberturas, próximamente"
          texto="El equipo está preparando nuevas crónicas de los próximos recitales y festivales de la ciudad."
        />
      </section>
    </main>
  );
}
