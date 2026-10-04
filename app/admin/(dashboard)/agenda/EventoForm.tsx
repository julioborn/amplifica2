type Evento = {
  fecha_badge?: string;
  nombre?: string;
  propuesta?: string;
  lugar?: string;
  direccion?: string;
  condicion?: string;
  detalle_acceso?: string;
  nota_acceso?: string;
  orden?: number;
};

export default function EventoForm({
  action,
  valores,
}: {
  action: (formData: FormData) => void;
  valores?: Evento;
}) {
  return (
    <form action={action} className="admin-form">
      <label>
        Fecha y horario (ej: &quot;Viernes 26 SEP · 21:00 hs&quot;)
        <input type="text" name="fecha_badge" defaultValue={valores?.fecha_badge} required />
      </label>
      <label>
        Nombre del evento
        <input type="text" name="nombre" defaultValue={valores?.nombre} required />
      </label>
      <label>
        Propuesta
        <input type="text" name="propuesta" defaultValue={valores?.propuesta} required />
      </label>
      <label>
        Lugar
        <input type="text" name="lugar" defaultValue={valores?.lugar} required />
      </label>
      <label>
        Dirección
        <input type="text" name="direccion" defaultValue={valores?.direccion} required />
      </label>
      <label>
        Condición de acceso
        <select name="condicion" defaultValue={valores?.condicion ?? "GRATUITA"} required>
          <option value="GRATUITA">Gratuita</option>
          <option value="PAGA">Paga</option>
          <option value="A LA GORRA">A la gorra</option>
        </select>
      </label>
      <label>
        Detalle de acceso (ej: &quot;Sin costo&quot; o precios)
        <input type="text" name="detalle_acceso" defaultValue={valores?.detalle_acceso} required />
      </label>
      <label>
        Nota de acceso (texto chico debajo)
        <input type="text" name="nota_acceso" defaultValue={valores?.nota_acceso} required />
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
