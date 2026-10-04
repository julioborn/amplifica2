import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import PublicacionForm from "../PublicacionForm";
import { crearPublicacion } from "../actions";

export default function NuevaPublicacionPage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Nueva publicación" descripcion="Noticia breve o juego/trivia." />
      <div className="admin-card">
        <PublicacionForm action={crearPublicacion} />
      </div>
    </div>
  );
}
