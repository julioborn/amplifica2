import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articulos } from "@/lib/data/articulos";
import MigaPan from "../../components/MigaPan";

export function generateStaticParams() {
  return articulos.map((articulo) => ({ slug: articulo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articulo = articulos.find((a) => a.slug === slug);
  if (!articulo) return {};
  return { title: articulo.titulo, description: articulo.bajada };
}

export default async function NotaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = articulos.find((a) => a.slug === slug);
  if (!articulo) notFound();

  return (
    <main className="contenedor-principal" id="contenido-principal">
      <MigaPan actual={articulo.titulo} />

      <article className="articulo-completo">
        <header className="nota-encabezado">
          <div className="etiquetas-meta">
            <span className="tag-seccion">{articulo.seccion}</span>
            <span className="tag-formato">{articulo.formato}</span>
          </div>
          <h1 className="nota-encabezado__titulo">{articulo.titulo}</h1>
          <p className="nota-encabezado__bajada">{articulo.bajada}</p>

          <div className="nota-meta">
            <span>
              Por <strong>{articulo.autor}</strong>
            </span>
            <span>·</span>
            <time dateTime={articulo.fechaISO}>{articulo.fechaLegible}</time>
          </div>
        </header>

        <div className="columna-lectura">
          <div className="cuerpo-nota">
            {articulo.cuerpo.map((bloque, indice) => {
              if (bloque.tipo === "subtitulo") {
                return <h2 key={indice}>{bloque.texto}</h2>;
              }
              if (bloque.tipo === "cita") {
                return <blockquote key={indice}>{bloque.texto}</blockquote>;
              }
              return <p key={indice}>{bloque.texto}</p>;
            })}
          </div>

          <div className="ficha-autor">
            <div className="ficha-autor__avatar" aria-hidden="true">
              {articulo.autorIniciales}
            </div>
            <div>
              <p className="ficha-autor__nombre">{articulo.autor}</p>
              <p className="ficha-autor__bio">{articulo.autorBio}</p>
            </div>
          </div>

          {articulo.relacionados.length > 0 && (
            <section className="seccion-relacionados">
              <h2 className="seccion-relacionados__titulo">Contenido relacionado</h2>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {articulo.relacionados.map((relacionado) => (
                  <li key={relacionado.href}>
                    <Link href={relacionado.href} style={{ fontWeight: 600 }}>
                      {relacionado.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
