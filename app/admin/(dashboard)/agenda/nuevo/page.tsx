import EventoForm from "../EventoForm";
import { crearEvento } from "../actions";

export default function NuevoEventoPage() {
  return (
    <div>
      <h1>Nuevo evento</h1>
      <EventoForm action={crearEvento} />
    </div>
  );
}
