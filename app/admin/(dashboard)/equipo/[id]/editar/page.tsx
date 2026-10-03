import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import IntegranteForm from "../../IntegranteForm";
import { actualizarIntegrante } from "../../actions";

export default async function EditarIntegrantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: integrante } = await supabase.from("equipo").select("*").eq("id", id).maybeSingle();

  if (!integrante) notFound();

  async function guardar(formData: FormData) {
    "use server";
    await actualizarIntegrante(id, formData);
  }

  return (
    <div>
      <h1>Editar integrante</h1>
      <IntegranteForm action={guardar} valores={integrante} />
    </div>
  );
}
