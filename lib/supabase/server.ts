import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Cliente con permisos de administrador (bypassea RLS). Solo para uso en
 * Server Components, Server Actions o Route Handlers — nunca importar
 * este archivo desde un componente con "use client".
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
