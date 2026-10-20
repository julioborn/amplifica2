export interface Podcast {
  id: string;
  numeroEpisodio: string;
  titulo: string;
  descripcion: string;
  conductor: string;
  duracionMin: number;
  enlaceYoutube: string;
  fechaISO: string;
  imagenUrl?: string;
  imagenCredito?: string;
}
