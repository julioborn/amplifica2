import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ArticuloForm from "../../ArticuloForm";
import { actualizarArticulo } from "../../actions";

export default async function EditarNotaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: articulo } = await supabase.from("articulos").select("*").eq("id", id).maybeSingle();

  if (!articulo) notFound();

  async function guardar(formData: FormData) {
    "use server";
    await actualizarArticulo(id, formData);
  }

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Editar nota" descripcion={articulo.titulo} />
      <div className="admin-card">
        <ArticuloForm action={guardar} valores={articulo} />
      </div>
    </div>
  );
}
