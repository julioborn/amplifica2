"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser-client";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault();
    setError(null);
    setMensaje(null);
    setGuardando(true);

    const supabase = createBrowserSupabaseClient();
    const { error: errorUpdate } = await supabase.auth.updateUser({ password });

    setGuardando(false);

    if (errorUpdate) {
      setError(errorUpdate.message);
      return;
    }

    setMensaje("Contraseña actualizada.");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <p className="admin-mensaje-error">{error}</p>}
      {mensaje && <p>{mensaje}</p>}
      <label>
        Nueva contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </label>
      <button type="submit" className="admin-button" disabled={guardando}>
        {guardando ? "Guardando..." : "Cambiar contraseña"}
      </button>
    </form>
  );
}
