export interface Integrante {
  iniciales: string;
  nombre: string;
  rol: string;
  detalle: string;
}

export const equipo: Integrante[] = [
  {
    iniciales: "JG",
    nombre: "Juan Manuel Grisolia",
    rol: "Conductor",
    detalle:
      "Conduce los envíos y asume el rol del oyente curioso que pregunta sin vueltas, aportando frescura al no posicionarse desde el saber enciclopédico.",
  },
  {
    iniciales: "CM",
    nombre: "Carmina Monjes",
    rol: "Panelista · Agenda y nicho",
    detalle:
      "Especializada en el rastreo de fechas locales, ciclos emergentes, espacios autogestionados y escenas musicales de nicho en Rosario.",
  },
  {
    iniciales: "LS",
    nombre: "Luisina Salgado",
    rol: "Panelista · Escena internacional",
    detalle:
      "A cargo de las columnas de música internacional, tendencias globales y los lanzamientos más destacados del circuito exterior.",
  },
  {
    iniciales: "MM",
    nombre: "Morena Manduca",
    rol: "Panelista · Juegos semanales",
    detalle:
      "Dinamiza la propuesta con juegos semanales, trivias y consignas participativas para conectar a la audiencia con las historias de las canciones.",
  },
  {
    iniciales: "GB",
    nombre: "Gregorio Born",
    rol: "Panelista · Efemérides",
    detalle:
      "Especialista en efemérides, aniversarios discográficos, momentos históricos y rescates de archivo del rock y la música popular.",
  },
];
