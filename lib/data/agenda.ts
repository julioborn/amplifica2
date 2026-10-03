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

export const agenda: EventoAgenda[] = [
  {
    id: "luces-del-parque-brisa-mutante",
    fechaBadge: "Viernes 26 SEP · 21:00 hs",
    nombre: "Luces del Parque + Brisa Mutante",
    propuesta: "Presentación oficial de 'Distorsión Costera'",
    lugar: "Galpón 11 (Franja del Río)",
    direccion: "Estévez Boero 980",
    condicion: "GRATUITA",
    detalleAcceso: "Sin costo",
    notaAcceso: "Entrada libre hasta colmar capacidad",
  },
  {
    id: "noche-post-punk-postales-raras",
    fechaBadge: "Sábado 27 SEP · 22:30 hs",
    nombre: "Noche de Post-Punk: Postales Raras",
    propuesta: "Ciclo de bandas independientes",
    lugar: "Distrito Siete (D7)",
    direccion: "Av. Ovidio Lagos 790",
    condicion: "PAGA",
    detalleAcceso: "$3.500 ant. / $4.500 puerta",
    notaAcceso: "Boletería del espacio cultural",
  },
  {
    id: "primavera-acustica-en-el-rio",
    fechaBadge: "Domingo 28 SEP · 18:00 hs",
    nombre: "Primavera Acústica en el Río",
    propuesta: "Canción desenchufada y feria gráfica",
    lugar: "Escalinatas Parque de España",
    direccion: "Mitre y el río",
    condicion: "A LA GORRA",
    detalleAcceso: "Aporte voluntario",
    notaAcceso: "Contribución directa a los músicos",
  },
  {
    id: "fierro-viejo-sal-de-mar",
    fechaBadge: "Martes 30 SEP · 20:00 hs",
    nombre: "Ciclo Bandas de Garage: Fierro Viejo + Sal de Mar",
    propuesta: "Doble presentación de garage rock local",
    lugar: "La Vieja Usina",
    direccion: "Wheelwright 1402",
    condicion: "PAGA",
    detalleAcceso: "$2.800 ant. / $3.500 puerta",
    notaAcceso: "Venta online y en puerta",
  },
  {
    id: "jam-improvisacion-abierta",
    fechaBadge: "Jueves 2 OCT · 21:30 hs",
    nombre: "Jam de Improvisación Abierta",
    propuesta: "Convocatoria abierta a músicos invitados",
    lugar: "Centro Cultural Atlas",
    direccion: "San Juan 1200",
    condicion: "A LA GORRA",
    detalleAcceso: "Aporte voluntario",
    notaAcceso: "Instrumento propio o a compartir en la sala",
  },
];
