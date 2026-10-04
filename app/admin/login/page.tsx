import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Ingresar",
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__marca">
          <span className="admin-login__marca-nombre">
            AMPLIFICA<span>2</span>
          </span>
        </div>
        <h1 className="admin-login__titulo">Panel de administración</h1>
        <p className="admin-login__subtitulo">Ingresá con tu usuario y contraseña del equipo.</p>
        <LoginForm />
      </div>
    </main>
  );
}
