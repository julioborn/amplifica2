import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import IntegranteForm from "../IntegranteForm";
import { crearIntegrante } from "../actions";

export default function NuevoIntegrantePage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Nuevo integrante" descripcion="Se va a sumar a Quiénes somos." />
      <div className="admin-card">
        <IntegranteForm action={crearIntegrante} />
      </div>
    </div>
  );
}
