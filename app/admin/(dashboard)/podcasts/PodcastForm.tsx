type PodcastValores = {
  numero_episodio?: string;
  titulo?: string;
  descripcion?: string;
  conductor?: string;
  duracion_min?: number;
  enlace_youtube?: string;
  fecha?: string;
};

export default function PodcastForm({
  action,
  valores,
}: {
  action: (formData: FormData) => void;
  valores?: PodcastValores;
}) {
  return (
    <form action={action} className="admin-form">
      <label>
        Número de episodio (ej: &quot;EPISODIO #05&quot;)
        <input type="text" name="numero_episodio" defaultValue={valores?.numero_episodio} required />
      </label>
      <label>
        Título
        <input type="text" name="titulo" defaultValue={valores?.titulo} required />
      </label>
      <label>
        Descripción
        <textarea name="descripcion" defaultValue={valores?.descripcion} required />
      </label>
      <label>
        Conduce
        <input type="text" name="conductor" defaultValue={valores?.conductor} required />
      </label>
      <label>
        Duración (en minutos)
        <input type="number" name="duracion_min" defaultValue={valores?.duracion_min ?? 30} required />
      </label>
      <label>
        Enlace de YouTube
        <input type="text" name="enlace_youtube" defaultValue={valores?.enlace_youtube} required />
      </label>
      <label>
        Fecha
        <input type="date" name="fecha" defaultValue={valores?.fecha} required />
      </label>
      <button type="submit" className="admin-button">
        Guardar
      </button>
    </form>
  );
}
