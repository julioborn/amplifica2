import type { Metadata } from "next";
import { articulos } from "@/lib/data/articulos";
import MigaPan from "../../components/MigaPan";
import CabeceraSeccion from "../../components/CabeceraSeccion";
import ArticuloItemSeccion from "../../components/ArticuloItemSeccion";
import EstadoVacio from "../../components/EstadoVacio";

export const metadata: Metadata = {
  title: "Coberturas",
  description: "Crónicas de recitales y festivales en vivo de Rosario y la región.",
};

const coberturas = articulos.filter((a) => a.seccion === "COBERTURAS");

export default function CoberturasPage() {
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
