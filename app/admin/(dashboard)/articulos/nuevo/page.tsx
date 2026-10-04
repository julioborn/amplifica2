import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ArticuloForm from "../ArticuloForm";
import { crearArticulo } from "../actions";

export default function NuevaNotaPage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Nueva nota" descripcion="Entrevista, efeméride o cobertura completa." />
      <div className="admin-card">
        <ArticuloForm action={crearArticulo} />
      </div>
    </div>
  );
}
