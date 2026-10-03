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
