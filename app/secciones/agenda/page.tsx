import type { Metadata } from "next";
import { agenda } from "@/lib/data/agenda";
import MigaPan from "../../components/MigaPan";
import CabeceraSeccion from "../../components/CabeceraSeccion";
import TarjetaEvento from "../../components/TarjetaEvento";

export const metadata: Metadata = {
  title: "Agenda musical de Rosario",
  description:
    "Fechas en vivo en Rosario y la región: salas, accesos y precios. Priorizamos propuestas autogestivas, artistas emergentes y actividades gratuitas o a precios populares.",
};

export default function AgendaPage() {
  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Agenda" />

      <section className="seccion-portada-interna">
        <CabeceraSeccion
          titulo="Agenda Musical Rosario"
          descripcion="Relevamiento de fechas en vivo en Rosario y la región. Priorizamos propuestas autogestivas, artistas emergentes y actividades con acceso gratuito o a precios populares."
        />

        <div className="grilla-eventos">
          {agenda.map((evento) => (
            <TarjetaEvento evento={evento} key={evento.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
