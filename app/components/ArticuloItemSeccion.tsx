import Link from "next/link";

interface ArticuloItemSeccionProps {
  seccion: string;
  formato: string;
  titulo: string;
  bajada: string;
  autor: string;
  fechaLegible?: string;
  href?: string;
  externo?: boolean;
  ctaLabel?: string;
}

export default function ArticuloItemSeccion({
  seccion,
  formato,
  titulo,
  bajada,
  autor,
  fechaLegible,
  href,
  externo,
  ctaLabel,
}: ArticuloItemSeccionProps) {
  const enlaceProps = externo
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <article className="articulo-item-seccion">
      <div
        className="placeholder-visual"
        role="img"
        aria-label={`Imagen de cobertura para: ${titulo}`}
        style={{ minHeight: "140px" }}
      >
        <span className="placeholder-visual__icono" aria-hidden="true">
          🎵
        </span>
        <span className="placeholder-visual__etiqueta">{seccion}</span>
      </div>

      <div>
        <div className="etiquetas-meta">
          <span className="tag-seccion">{seccion}</span>
          <span className="tag-formato">{formato}</span>
        </div>

        <h3 className="articulo-item-seccion__titulo">
          {!href ? (
            titulo
          ) : externo ? (
            <a href={href} {...enlaceProps}>
              {titulo}
            </a>
          ) : (
            <Link href={href}>{titulo}</Link>
          )}
        </h3>

        <p className="articulo-item-seccion__bajada">{bajada}</p>

        <div className="metadatos-articulo">
          <span>
            Por <strong>{autor}</strong>
          </span>
          {fechaLegible && (
            <>
              <span>·</span>
              <span>{fechaLegible}</span>
            </>
          )}
        </div>

        {href &&
          (externo ? (
            <a href={href} {...enlaceProps} className="enlace-lectura-completa">
              {ctaLabel}
            </a>
          ) : (
            <Link href={href} className="enlace-lectura-completa">
              {ctaLabel}
            </Link>
          ))}
      </div>
    </article>
  );
}
