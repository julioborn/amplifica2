export interface Publicacion {
  id: string;
  seccion: string;
  formato: string;
  titulo: string;
  bajada: string;
  autor: string;
  fechaISO?: string;
  fechaLegible?: string;
  href: string;
  externo?: boolean;
  ctaLabel: string;
}

export const noticias: Publicacion[] = [
  {
    id: "galpon-11-convocatoria-sub25",
    seccion: "NOTICIAS",
    formato: "CONVOCATORIA",
    titulo:
      "El Galpón 11 abre convocatoria para bandas sub-25 con fechas gratuitas frente al río",
    bajada:
      "La Secretaría de Cultura seleccionará 16 proyectos emergentes de la ciudad para tocar con equipamiento profesional. Requisitos, plazos y cómo inscribirse.",
    autor: "Carmina Monjes",
    fechaISO: "2026-09-22",
    fechaLegible: "22/09/2026",
    href: "/secciones/noticias",
    ctaLabel: "Leer noticia →",
  },
  {
    id: "columna-internacional-giras",
    seccion: "NOTICIAS",
    formato: "COLUMNA INTERNACIONAL",
    titulo:
      "Regresos inesperados y festivales europeos: las tres giras que marcan el pulso del circuito global",
    bajada:
      "El auge de los contratos independientes en Reino Unido y los artistas internacionales que ya planean fechas en el cono sur para la próxima temporada.",
    autor: "Luisina Salgado",
    fechaISO: "2026-09-22",
    fechaLegible: "22/09/2026",
    href: "/secciones/noticias",
    ctaLabel: "Leer columna →",
  },
];

export const juegos: Publicacion[] = [
  {
    id: "trivia-rock-rosarino",
    seccion: "JUEGOS",
    formato: "TRIVIA PARTICIPATIVA",
    titulo:
      "Trivia semanal: ¿cuánto sabés de las letras del rock nacido en Rosario?",
    bajada:
      "Jugá con nosotros en las historias de Instagram y poné a prueba tu oído musical con las consignas de la semana.",
    autor: "Morena Manduca",
    href: "https://www.instagram.com/amplifica2.ros/?hl=es-la",
    externo: true,
    ctaLabel: "Participar en Instagram →",
  },
];
