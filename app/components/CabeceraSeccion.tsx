export default function CabeceraSeccion({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion: string;
}) {
  return (
    <header className="cabecera-seccion">
      <h1 className="cabecera-seccion__titulo">{titulo}</h1>
      <p className="cabecera-seccion__descripcion">{descripcion}</p>
    </header>
  );
}
