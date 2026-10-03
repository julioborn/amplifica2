import ArticuloForm from "../ArticuloForm";
import { crearArticulo } from "../actions";

export default function NuevaNotaPage() {
  return (
    <div>
      <h1>Nueva nota</h1>
      <ArticuloForm action={crearArticulo} />
    </div>
  );
}
