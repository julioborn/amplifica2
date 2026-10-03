import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { eliminarIntegrante } from "./actions";

export default async function AdminEquipoPage() {
  const supabase = await createServerSupabaseClient();
  const { data: equipo } = await supabase.from("equipo").select("*").order("orden");

  return (
    <div>
      <h1>Equipo</h1>

      <div className="admin-card">
        {(equipo ?? []).map((integrante) => (
          <div className="admin-lista-item" key={integrante.id}>
            <div>
              <p className="admin-lista-item__titulo">{integrante.nombre}</p>
              <p className="admin-lista-item__meta">
                @{integrante.usuario} · {integrante.rol}
              </p>
            </div>
            <div className="admin-lista-item__acciones">
              <Link href={`/admin/equipo/${integrante.id}/editar`} className="admin-button admin-button--secundario">
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await eliminarIntegrante(integrante.id);
                }}
              >
                <button type="submit" className="admin-button admin-button--peligro">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
        {(equipo ?? []).length === 0 && <p>No hay integrantes todavía.</p>}
      </div>

      <h1 style={{ marginTop: "2rem" }}>Agregar integrante</h1>
      <Link href="/admin/equipo/nuevo" className="admin-button">
        Nuevo integrante →
      </Link>
    </div>
  );
}
