import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { eliminarEvento } from "./actions";

export default async function AdminAgendaPage() {
  const supabase = await createServerSupabaseClient();
  const { data: eventos } = await supabase.from("eventos_agenda").select("*").order("orden");

  return (
    <div>
      <h1>Agenda</h1>

      <div className="admin-card">
        {(eventos ?? []).map((evento) => (
          <div className="admin-lista-item" key={evento.id}>
            <div>
              <p className="admin-lista-item__titulo">{evento.nombre}</p>
              <p className="admin-lista-item__meta">
                {evento.fecha_badge} · {evento.lugar}
              </p>
            </div>
            <div className="admin-lista-item__acciones">
              <Link href={`/admin/agenda/${evento.id}/editar`} className="admin-button admin-button--secundario">
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await eliminarEvento(evento.id);
                }}
              >
                <button type="submit" className="admin-button admin-button--peligro">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
        {(eventos ?? []).length === 0 && <p>No hay eventos todavía.</p>}
      </div>

      <h1 style={{ marginTop: "2rem" }}>Agregar evento</h1>
      <Link href="/admin/agenda/nuevo" className="admin-button">
        Nuevo evento →
      </Link>
    </div>
  );
}
