import type { Metadata } from "next";
import { getEquipo } from "@/lib/supabase/queries";
import MigaPan from "@/app/components/MigaPan";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conocé al equipo de Amplifica2, nuestra línea editorial y el compromiso periodístico con la música de Rosario y la región.",
};

export const dynamic = "force-dynamic";

export default async function QuienesSomosPage() {
  const equipo = await getEquipo();

  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual="Quiénes somos" />

      <article className="quienes-somos-articulo">
        <div className="bloque-declaracion">
          <header>
            <span className="tag-seccion">Institucional</span>
            <h1 className="nota-encabezado__titulo" style={{ marginTop: "0.5rem" }}>
              Quiénes somos
            </h1>
            <p className="nota-encabezado__bajada">
              Somos un medio musical universitario producido en Rosario que combina agenda,
              entrevistas, coberturas e historias para descubrir y vivir la música de cerca.
            </p>
          </header>

          <h2>Nuestra propuesta periodística</h2>
          <p>
            En Rosario hay una enorme cantidad de recitales, bandas y ciclos sonando todo el
            tiempo, pero la información suele estar dispersa en historias que desaparecen o
            canales aislados. Muchos artistas emergentes y salas autogestivas tienen poca
            visibilidad.
          </p>
          <p>
            <strong>Amplifica2</strong> nace para tender ese puente: reunir lo que pasa en la
            ciudad, facilitar el acceso a recitales —con especial atención en propuestas
            gratuitas, a la gorra o accesibles— y dar contexto a lo que escuchamos.
          </p>
          <p>
            Abordamos la música con mirada plural, abierta a diferentes géneros y corrientes, con
            datos verificados y un criterio editorial claro:{" "}
            <strong>diferenciamos la información precisa de nuestras opiniones y debates</strong>.
          </p>

          <h2>Nuestro tono y formatos</h2>
          <p>
            Hablamos en español de Argentina, con un tono cercano, dinámico y coloquial, donde
            hay lugar para el humor, la charla descontracturada y el debate apasionado, pero con
            rigor a la hora de informar fechas, precios, lugares y trayectorias.
          </p>
          <p>
            Trabajamos la producción periodística en distintos formatos: notas escritas,
            podcast, videos y piezas verticales en redes, conectando nuestra web con nuestros
            canales en YouTube e Instagram.
          </p>

          <h2>La redacción</h2>
          <p>
            El equipo de Amplifica2 está integrado por cinco estudiantes universitarios de
            Periodismo, cada uno con una mirada y un rol específico dentro de la cobertura:
          </p>

          <div className="grilla-equipo">
            {equipo.map((integrante) => (
              <div className="tarjeta-integrante" key={integrante.iniciales}>
                <div className="tarjeta-integrante__avatar" aria-hidden="true">
                  {integrante.iniciales}
                </div>
                <h3 className="tarjeta-integrante__nombre">{integrante.nombre}</h3>
                <span className="tarjeta-integrante__rol">{integrante.rol}</span>
                <p className="tarjeta-integrante__detalle">{integrante.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
