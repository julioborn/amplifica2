import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import PodcastForm from "../../PodcastForm";
import { actualizarPodcast } from "../../actions";

export default async function EditarPodcastPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: podcast } = await supabase.from("podcasts").select("*").eq("id", id).maybeSingle();

  if (!podcast) notFound();

  async function guardar(formData: FormData) {
    "use server";
    await actualizarPodcast(id, formData);
  }

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Editar episodio" descripcion={podcast.titulo} />
      <div className="admin-card">
        <PodcastForm action={guardar} valores={podcast} />
      </div>
    </div>
  );
}
