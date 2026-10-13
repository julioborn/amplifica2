import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import PodcastForm from "../PodcastForm";
import { crearPodcast } from "../actions";

export default function NuevoPodcastPage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Nuevo episodio" descripcion="Se va a mostrar en Producción Audiovisual." />
      <div className="admin-card">
        <PodcastForm action={crearPodcast} />
      </div>
    </div>
  );
}
