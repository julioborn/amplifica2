type Integrante = {
  nombre?: string;
  usuario?: string;
  rol?: string;
  detalle?: string;
  orden?: number;
};

export default function IntegranteForm({
  action,
  valores,
}: {
  action: (formData: FormData) => void;
  valores?: Integrante;
}) {
  return (
    <form action={action} className="admin-form admin-card">
      <label>
        Nombre completo
        <input type="text" name="nombre" defaultValue={valores?.nombre} required />
      </label>
      <label>
        Usuario (para loguearse, sin espacios)
        <input type="text" name="usuario" defaultValue={valores?.usuario} required />
      </label>
      <label>
        Rol
        <input type="text" name="rol" defaultValue={valores?.rol} required />
      </label>
      <label>
        Bio / detalle
        <textarea name="detalle" defaultValue={valores?.detalle} required />
      </label>
      <label>
        Orden (0 = primero)
        <input type="number" name="orden" defaultValue={valores?.orden ?? 0} required />
      </label>
      <button type="submit" className="admin-button">
        Guardar
      </button>
    </form>
  );
}
