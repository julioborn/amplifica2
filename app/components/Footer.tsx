import Link from "next/link";
import { IconoInstagram, IconoYoutube } from "./Iconos";

const INSTAGRAM_URL = "https://www.instagram.com/amplifica2.ros/?hl=es-la";
const YOUTUBE_URL = "https://www.youtube.com/@Amplifica2";

export default function Footer() {
  return (
    <footer className="sitio-footer" role="contentinfo">
      <div className="sitio-footer__contenedor">
        <div className="footer-columna">
          <h3 className="footer-columna__titulo">AMPLIFICA2</h3>
          <p className="footer-descripcion">
            Medio musical autogestionado por estudiantes universitarios de Periodismo en
            Rosario. Combinamos agenda, entrevistas, coberturas e historias para descubrir la
            escena cultural de la ciudad y la región.
          </p>
        </div>

        <div className="footer-columna">
          <h3 className="footer-columna__titulo">Estructura del sitio</h3>
          <ul className="footer-lista">
            <li>
              <Link href="/quienes-somos">Quiénes somos · El equipo de redacción</Link>
            </li>
            <li>
              <Link href="/secciones/agenda">Agenda musical de Rosario</Link>
            </li>
            <li>
              <Link href="/secciones/noticias">Noticias y convocatorias</Link>
            </li>
            <li>
              <Link href="/secciones/entrevistas">Entrevistas en profundidad</Link>
            </li>
            <li>
              <Link href="/secciones/coberturas">Coberturas de recitales</Link>
            </li>
            <li>
              <Link href="/secciones/efemerides">Efemérides musicales</Link>
            </li>
          </ul>
        </div>

        <div className="footer-columna">
          <h3 className="footer-columna__titulo">Canales oficiales</h3>
          <ul className="footer-redes-lista">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-red-enlace"
                aria-label="Instagram de Amplifica2 (abre en pestaña nueva)"
              >
                <IconoInstagram />
                <span>@amplifica2.ros en Instagram</span>
              </a>
            </li>
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-red-enlace"
                aria-label="YouTube de Amplifica2 (abre en pestaña nueva)"
              >
                <IconoYoutube />
                <span>@Amplifica2 en YouTube</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="sitio-footer__inferior">
        <p>© 2026 Amplifica2 · Producción periodística universitaria independiente · Rosario</p>
        <p>Hecho con Next.js</p>
      </div>
    </footer>
  );
}
