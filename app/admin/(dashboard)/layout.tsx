import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { cerrarSesion } from "../actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const usuario = (user?.user_metadata?.usuario as string | undefined) ?? user?.email;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <span className="admin-sidebar__titulo">Amplifica2 · {usuario}</span>
        <a href="/admin">Panel</a>
        <a href="/admin/equipo">Equipo</a>
        <a href="/admin/agenda">Agenda</a>
        <a href="/admin/articulos">Notas</a>
        <a href="/admin/noticias">Noticias y juegos</a>
        <a href="/admin/perfil">Mi contraseña</a>
        <form action={cerrarSesion}>
          <button type="submit" className="admin-button admin-button--secundario" style={{ width: "100%", marginTop: "1rem" }}>
            Cerrar sesión
          </button>
        </form>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
