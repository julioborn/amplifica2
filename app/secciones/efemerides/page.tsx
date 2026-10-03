import type { Metadata } from "next";
import { articulos } from "@/lib/data/articulos";
import MigaPan from "../../components/MigaPan";
import CabeceraSeccion from "../../components/CabeceraSeccion";
import ArticuloItemSeccion from "../../components/ArticuloItemSeccion";
import EstadoVacio from "../../components/EstadoVacio";

export const metadata: Metadata = {
  title: "Efemérides",
  description: "Calendario histórico y efemérides del rock nacional e internacional.",
};

const efemerides = articulos.filter((a) => a.seccion === "EFEMÉRIDES");

export default function EfemeridesPage() {
  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Efemérides" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Efemérides"
          descripcion="Aniversarios discográficos, hitos históricos y rescates de archivo del rock y la música popular."
        />

        <div className="lista-articulos-seccion">
          {efemerides.map((articulo) => (
            <ArticuloItemSeccion
              key={articulo.slug}
              seccion={articulo.seccion}
              formato={articulo.formato}
              titulo={articulo.titulo}
              bajada={articulo.bajada}
              autor={articulo.autor}
              fechaLegible={articulo.fechaLegible}
              href={`/notas/${articulo.slug}`}
              ctaLabel="Ver efeméride →"
            />
          ))}
        </div>

        <EstadoVacio
          titulo="Más efemérides, próximamente"
          texto="Gregorio está preparando nuevos aniversarios y rescates de archivo para las próximas semanas."
        />
      </section>
    </main>
  );
}
