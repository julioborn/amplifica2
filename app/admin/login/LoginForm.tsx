"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser-client";
import { usuarioAEmail } from "@/lib/supabase/auth";

export default function LoginForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault();
    setError(null);
    setCargando(true);

    const supabase = createBrowserSupabaseClient();
    const { error: errorLogin } = await supabase.auth.signInWithPassword({
      email: usuarioAEmail(usuario),
      password,
    });

    setCargando(false);

    if (errorLogin) {
      setError("Usuario o contraseña incorrectos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-mensaje-error">{error}</p>}

      <label>
        Usuario
        <input
          type="text"
          autoComplete="username"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </label>

      <label>
        Contraseña
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="admin-button" disabled={cargando}>
        {cargando ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
