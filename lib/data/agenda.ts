export type CondicionAcceso = "GRATUITA" | "PAGA" | "A LA GORRA";

export interface EventoAgenda {
  id: string;
  fechaBadge: string;
  nombre: string;
  propuesta: string;
  lugar: string;
  direccion: string;
  condicion: CondicionAcceso;
  detalleAcceso: string;
  notaAcceso: string;
}
