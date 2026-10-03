import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import EventoForm from "../../EventoForm";
import { actualizarEvento } from "../../actions";

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: evento } = await supabase.from("eventos_agenda").select("*").eq("id", id).maybeSingle();

  if (!evento) notFound();

  async function guardar(formData: FormData) {
    "use server";
    await actualizarEvento(id, formData);
  }

  return (
    <div>
      <h1>Editar evento</h1>
      <EventoForm action={guardar} valores={evento} />
    </div>
  );
}
