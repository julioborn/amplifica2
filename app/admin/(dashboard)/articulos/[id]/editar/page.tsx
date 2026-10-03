import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
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
    <div>
      <h1>Editar nota</h1>
      <ArticuloForm action={guardar} valores={articulo} />
    </div>
  );
}
