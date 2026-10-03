import type { Metadata } from "next";
import { getAgenda } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import TarjetaEvento from "@/app/components/TarjetaEvento";
import EstadoVacio from "@/app/components/EstadoVacio";

export const metadata: Metadata = {
  title: "Agenda musical de Rosario",
  description:
    "Fechas en vivo en Rosario y la región: salas, accesos y precios. Priorizamos propuestas autogestivas, artistas emergentes y actividades gratuitas o a precios populares.",
};

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const agenda = await getAgenda();

  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Agenda" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Agenda Musical Rosario"
          descripcion="Relevamiento de fechas en vivo en Rosario y la región. Priorizamos propuestas autogestivas, artistas emergentes y actividades con acceso gratuito o a precios populares."
        />

        {agenda.length > 0 ? (
          <div className="grilla-eventos">
            {agenda.map((evento) => (
              <TarjetaEvento evento={evento} key={evento.id} />
            ))}
          </div>
        ) : (
          <EstadoVacio
            titulo="Todavía no hay fechas cargadas"
            texto="El equipo está confirmando las próximas fechas. Volvé pronto."
          />
        )}
      </section>
    </main>
  );
}
