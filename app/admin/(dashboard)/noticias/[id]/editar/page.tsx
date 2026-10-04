import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import PublicacionForm from "../../PublicacionForm";
import { actualizarPublicacion } from "../../actions";

export default async function EditarPublicacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: publicacion } = await supabase.from("publicaciones").select("*").eq("id", id).maybeSingle();

  if (!publicacion) notFound();

  async function guardar(formData: FormData) {
    "use server";
    await actualizarPublicacion(id, formData);
  }

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Editar publicación" descripcion={publicacion.titulo} />
      <div className="admin-card">
        <PublicacionForm action={guardar} valores={publicacion} />
      </div>
    </div>
  );
}
