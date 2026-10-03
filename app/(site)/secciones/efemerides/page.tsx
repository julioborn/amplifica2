import type { Metadata } from "next";
import { getArticulos } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ArticuloItemSeccion from "@/app/components/ArticuloItemSeccion";
import EstadoVacio from "@/app/components/EstadoVacio";

export const metadata: Metadata = {
  title: "Efemérides",
  description: "Calendario histórico y efemérides del rock nacional e internacional.",
};

export const dynamic = "force-dynamic";

export default async function EfemeridesPage() {
  const efemerides = (await getArticulos()).filter((a) => a.seccion === "EFEMÉRIDES");

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
              imagenUrl={articulo.imagenUrl}
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
