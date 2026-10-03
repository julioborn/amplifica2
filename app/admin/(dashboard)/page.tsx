export default function AdminHomePage() {
  return (
    <div>
      <h1>Panel de Amplifica2</h1>
      <p style={{ marginBottom: "1.5rem", color: "var(--color-gris-mutado)" }}>
        Elegí qué querés editar desde el menú de la izquierda.
      </p>
      <div className="admin-card">
        <strong>Equipo</strong> — nombre, usuario, rol y bio de cada integrante.
      </div>
      <div className="admin-card">
        <strong>Agenda</strong> — eventos en vivo: fecha, lugar, dirección y acceso.
      </div>
      <div className="admin-card">
        <strong>Notas</strong> — entrevistas, efemérides y coberturas completas, con foto.
      </div>
      <div className="admin-card">
        <strong>Noticias y juegos</strong> — teasers breves y trivias.
      </div>
    </div>
  );
}
