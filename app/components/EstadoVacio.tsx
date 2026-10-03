export default function EstadoVacio({
  titulo,
  texto,
}: {
  titulo: string;
  texto: string;
}) {
  return (
    <div className="estado-vacio">
      <div className="estado-vacio__icono" aria-hidden="true">
        📰
      </div>
      <h2 className="estado-vacio__titulo">{titulo}</h2>
      <p className="estado-vacio__texto">{texto}</p>
    </div>
  );
}
