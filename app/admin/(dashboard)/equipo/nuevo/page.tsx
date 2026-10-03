import IntegranteForm from "../IntegranteForm";
import { crearIntegrante } from "../actions";

export default function NuevoIntegrantePage() {
  return (
    <div>
      <h1>Nuevo integrante</h1>
      <IntegranteForm action={crearIntegrante} />
    </div>
  );
}
