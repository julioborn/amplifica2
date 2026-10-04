"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cerrarSesion } from "../actions";

const adminLinks = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/equipo", label: "Equipo" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/articulos", label: "Notas" },
  { href: "/admin/noticias", label: "Noticias" },
  { href: "/admin/perfil", label: "Mi cuenta" },
];

export default function AdminHeader({ usuario }: { usuario: string }) {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sitio-header" role="banner">
      <div className="sitio-header__barra-superior">
        <Link href="/admin" className="marca" aria-label="Panel de Amplifica2">
          <div className="marca__texto">
            <span className="marca__nombre">
              AMPLIFICA<span>2</span>
            </span>
            <span className="marca__bajada">Panel de administración · {usuario}</span>
          </div>
        </Link>

        <div className="header-redes">
          <Link href="/" className="boton-red">
            <span>Ver sitio</span>
          </Link>
          <form action={cerrarSesion}>
            <button type="submit" className="boton-ingresar">
              Cerrar sesión
            </button>
          </form>
        </div>

        <button
          type="button"
          className="boton-menu-movil"
          aria-expanded={menuAbierto}
          aria-controls="menu-admin"
          aria-label="Abrir o cerrar menú del panel"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span>☰</span>
          <span>Menú</span>
        </button>
      </div>

      <nav
        className={`sitio-nav${menuAbierto ? " is-open" : ""}`}
        id="menu-admin"
        aria-label="Secciones del panel"
      >
        <div className="sitio-nav__contenedor">
          <ul className="sitio-nav__lista">
            {adminLinks.map((link) => (
              <li className="sitio-nav__item" key={link.href}>
                <Link
                  href={link.href}
                  className="sitio-nav__enlace"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
