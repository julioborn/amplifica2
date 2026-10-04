import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import AdminHeader from "./AdminHeader";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const usuario = (user?.user_metadata?.usuario as string | undefined) ?? user?.email ?? "";

  return (
    <>
      <AdminHeader usuario={usuario} />
      <main className="contenedor-principal" id="contenido-principal">
        {children}
      </main>
    </>
  );
}
