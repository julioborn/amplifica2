import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* <aside className="alerta-desarrollo" aria-label="Aviso editorial">
        <div className="alerta-desarrollo__contenedor">
          <strong>Amplifica2</strong>
          <span>·</span>
          <span>
            Medio musical universitario de Rosario · Producción periodística independiente y
            agenda cultural en vivo.
          </span>
        </div>
      </aside> */}

      <Header />

      {children}

      <Footer />
    </>
  );
}
