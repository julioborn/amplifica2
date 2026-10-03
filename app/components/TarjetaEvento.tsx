import type { EventoAgenda } from "@/lib/data/agenda";

export default function TarjetaEvento({ evento }: { evento: EventoAgenda }) {
  return (
    <article className="tarjeta-evento">
      <div>
        <span className="tarjeta-evento__fecha-badge">{evento.fechaBadge}</span>
        <h3 className="tarjeta-evento__nombre">{evento.nombre}</h3>

        <ul className="tarjeta-evento__datos">
          <li>
            <strong>Propuesta:</strong> {evento.propuesta}
          </li>
          <li>
            <strong>Lugar:</strong> {evento.lugar}
          </li>
          <li>
            <strong>Dirección:</strong> {evento.direccion}
          </li>
        </ul>
      </div>

      <div className="tarjeta-evento__acceso">
        <span className="badge-condicion">{evento.condicion}</span>
        <span>{evento.detalleAcceso}</span>
      </div>
      <p className="evento-enlace-pendiente">{evento.notaAcceso}</p>
    </article>
  );
}
