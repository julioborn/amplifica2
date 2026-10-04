"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/nav";
import { IconoInstagram, IconoYoutube } from "./Iconos";

const INSTAGRAM_URL = "https://www.instagram.com/amplifica2.ros/?hl=es-la";
const YOUTUBE_URL = "https://www.youtube.com/@Amplifica2";

export default function Header() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape" && menuAbierto) {
        setMenuAbierto(false);
      }
    }
    function alRedimensionar() {
      if (window.innerWidth > 680 && menuAbierto) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("keydown", alPresionarTecla);
    window.addEventListener("resize", alRedimensionar);
    return () => {
      document.removeEventListener("keydown", alPresionarTecla);
      window.removeEventListener("resize", alRedimensionar);
    };
  }, [menuAbierto]);

  return (
    <header className="sitio-header" role="banner">
      <div className="sitio-header__barra-superior">
        <Link href="/" className="marca" aria-label="Amplifica2 - Inicio">
          {/* <Image
            src="/logo.jpg"
            alt="Logo de Amplifica2 con fondo negro y micrófono integrado"
            className="marca__logo"
            width={58}
            height={58}
            priority
          /> */}
          <div className="marca__texto">
            <span className="marca__nombre">
              AMPLIFICA<span>2</span>
            </span>
            <span className="marca__bajada">Medio musical · Rosario, Argentina</span>
          </div>
        </Link>

        <div className="header-redes">
          <span className="header-redes__titulo">Seguinos:</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-red"
            aria-label="Instagram de Amplifica2 (abre en pestaña nueva)"
          >
            <IconoInstagram />
            <span>Instagram</span>
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-red"
            aria-label="YouTube de Amplifica2 (abre en pestaña nueva)"
          >
            <IconoYoutube />
            <span>YouTube</span>
          </a>
        </div>

        <button
          type="button"
          className="boton-menu-movil"
          aria-expanded={menuAbierto}
          aria-controls="menu-navegacion"
          aria-label="Abrir o cerrar menú de navegación"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span>☰</span>
          <span>Menú</span>
        </button>
      </div>

      <nav
        className={`sitio-nav${menuAbierto ? " is-open" : ""}`}
        id="menu-navegacion"
        aria-label="Secciones del medio"
      >
        <div className="sitio-nav__contenedor">
          <ul className="sitio-nav__lista">
            {navLinks.map((link) => (
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
