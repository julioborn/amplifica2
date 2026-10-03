import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
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
    <div>
      <h1>Editar publicación</h1>
      <PublicacionForm action={guardar} valores={publicacion} />
    </div>
  );
}
