import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import EventoForm from "../EventoForm";
import { crearEvento } from "../actions";

export default function NuevoEventoPage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Nuevo evento" descripcion="Se va a sumar a la agenda musical." />
      <div className="admin-card">
        <EventoForm action={crearEvento} />
      </div>
    </div>
  );
}
