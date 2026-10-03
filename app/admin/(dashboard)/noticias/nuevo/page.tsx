import PublicacionForm from "../PublicacionForm";
import { crearPublicacion } from "../actions";

export default function NuevaPublicacionPage() {
  return (
    <div>
      <h1>Nueva publicación</h1>
      <PublicacionForm action={crearPublicacion} />
    </div>
  );
}
