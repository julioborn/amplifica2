import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import { eliminarEvento } from "./actions";

export default async function AdminAgendaPage() {
  const supabase = await createServerSupabaseClient();
  const { data: eventos } = await supabase.from("eventos_agenda").select("*").order("orden");

  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Agenda" descripcion="Los eventos en vivo que aparecen en la agenda musical." />

      <div>
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

      <Link href="/admin/agenda/nuevo" className="admin-button" style={{ marginTop: "1.5rem" }}>
        + Nuevo evento
      </Link>
    </div>
  );
}
