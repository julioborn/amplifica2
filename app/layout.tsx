import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Amplifica2 · Medio musical de Rosario",
    template: "%s · Amplifica2",
  },
  description:
    "Amplifica2 es un medio musical con base en Rosario que combina agenda, entrevistas, coberturas e historias para descubrir artistas y propuestas locales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido principal
        </a>

        <aside className="alerta-desarrollo" aria-label="Aviso editorial">
          <div className="alerta-desarrollo__contenedor">
            <strong>Amplifica2</strong>
            <span>·</span>
            <span>
              Medio musical universitario de Rosario · Producción periodística independiente y
              agenda cultural en vivo.
            </span>
          </div>
        </aside>

        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
