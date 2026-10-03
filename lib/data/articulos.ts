export interface BloqueTexto {
  tipo: "parrafo" | "subtitulo" | "cita";
  texto: string;
}

export interface Relacionado {
  titulo: string;
  href: string;
}

export interface Articulo {
  slug: string;
  seccion: string;
  formato: string;
  titulo: string;
  bajada: string;
  autor: string;
  autorIniciales: string;
  autorBio: string;
  fechaISO: string;
  fechaLegible: string;
  cuerpo: BloqueTexto[];
  relacionados: Relacionado[];
  imagenUrl?: string;
}
