type Publicacion = {
  tipo?: string;
  seccion?: string;
  formato?: string;
  titulo?: string;
  bajada?: string;
  autor?: string;
  fecha?: string | null;
  href?: string;
  externo?: boolean;
  cta_label?: string;
};

export default function PublicacionForm({
  action,
  valores,
}: {
  action: (formData: FormData) => void;
  valores?: Publicacion;
}) {
  return (
    <form action={action} className="admin-form">
      <label>
        Tipo
        <select name="tipo" defaultValue={valores?.tipo ?? "noticia"} required>
          <option value="noticia">Noticia breve</option>
          <option value="juego">Juego / trivia</option>
        </select>
      </label>
      <label>
        Sección (ej: NOTICIAS, JUEGOS)
        <input type="text" name="seccion" defaultValue={valores?.seccion} required />
      </label>
      <label>
        Formato (ej: CONVOCATORIA, TRIVIA PARTICIPATIVA)
        <input type="text" name="formato" defaultValue={valores?.formato} required />
      </label>
      <label>
        Título
        <input type="text" name="titulo" defaultValue={valores?.titulo} required />
      </label>
      <label>
        Bajada
        <textarea name="bajada" defaultValue={valores?.bajada} required />
      </label>
      <label>
        Autor
        <input type="text" name="autor" defaultValue={valores?.autor} required />
      </label>
      <label>
        Fecha (opcional)
        <input type="date" name="fecha" defaultValue={valores?.fecha ?? ""} />
      </label>
      <label>
        Enlace (href)
        <input type="text" name="href" defaultValue={valores?.href} required />
      </label>
      <label style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
        <input type="checkbox" name="externo" defaultChecked={valores?.externo} style={{ width: "auto" }} />
        Es un enlace externo (abre en pestaña nueva)
      </label>
      <label>
        Texto del botón (ej: &quot;Leer noticia →&quot;)
        <input type="text" name="cta_label" defaultValue={valores?.cta_label} required />
      </label>
      <button type="submit" className="admin-button">
        Guardar
      </button>
    </form>
  );
}
