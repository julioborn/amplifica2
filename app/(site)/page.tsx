import Link from "next/link";
import { getArticulos, getAgenda, getPublicaciones, getUltimoPodcast } from "@/lib/supabase/queries";
import TarjetaEvento from "@/app/components/TarjetaEvento";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [articulos, agenda, noticias, juegos, podcast] = await Promise.all([
    getArticulos(),
    getAgenda(),
    getPublicaciones("noticia"),
    getPublicaciones("juego"),
    getUltimoPodcast(),
  ]);

  // La apertura prioriza una entrevista; si todavía no hay ninguna, usa la nota más reciente
  // que exista (de cualquier sección) para que la portada nunca quede vacía sin motivo.
  const apertura = articulos.find((a) => a.seccion === "ENTREVISTAS") ?? articulos[0];
  const efemerideDestacada = articulos.find((a) => a.seccion === "EFEMÉRIDES");
  const coberturaDestacada = articulos.find((a) => a.seccion === "COBERTURAS");
  const [juegoDestacado] = juegos;

  const hayOtrasPublicaciones = Boolean(efemerideDestacada || coberturaDestacada || juegoDestacado);
  const hayAlgoQueMostrar =
    apertura || noticias.length > 0 || agenda.length > 0 || podcast || hayOtrasPublicaciones;

  if (!hayAlgoQueMostrar) {
    return (
      <main className="contenedor-principal" id="contenido-principal">
        <div className="estado-vacio">
          <div className="estado-vacio__icono" aria-hidden="true">
            📰
          </div>
          <h2 className="estado-vacio__titulo">Todavía no hay contenido publicado</h2>
          <p className="estado-vacio__texto">
            Ingresá a /admin para cargar la primera nota, evento o episodio.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="contenedor-principal" id="contenido-principal">
      {/* 1. APERTURA EDITORIAL */}
      {apertura && (
      <section className="seccion-apertura" aria-labelledby="titulo-apertura">
        <div className="encabezado-bloque">
          <h2 className="encabezado-bloque__titulo">Apertura editorial</h2>
          <span className="encabezado-bloque__aclaracion">Entrevista destacada de la semana</span>
        </div>

        <article className="articulo-apertura">
          <div className="articulo-apertura__contenido">
            <div className="etiquetas-meta">
              <span className="tag-seccion">{apertura.seccion}</span>
              <span className="tag-formato">{apertura.formato}</span>
            </div>

            <h1 className="articulo-apertura__titulo" id="titulo-apertura">
              <Link href={`/notas/${apertura.slug}`}>{apertura.titulo}</Link>
            </h1>

            <p className="articulo-apertura__bajada">{apertura.bajada}</p>

            <div className="metadatos-articulo">
              <span>
                Por <strong>{apertura.autor}</strong>
              </span>
              <span>·</span>
              <span>
                Publicado: <time dateTime={apertura.fechaISO}>{apertura.fechaLegible}</time>
              </span>
            </div>

            <div>
              <Link href={`/notas/${apertura.slug}`} className="enlace-lectura-completa">
                Leer entrevista completa →
              </Link>
            </div>
          </div>

          <figure className="articulo-apertura__imagen">
            {apertura.imagenUrl ? (
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={apertura.imagenUrl}
                  alt={apertura.titulo}
                  style={{
                    width: "100%",
                    flexGrow: 1,
                    objectFit: "cover",
                    borderRadius: "var(--radio-borde)",
                  }}
                />
                <figcaption
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-gris-mutado)",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                  }}
                >
                  {apertura.imagenCredito || "Fotografía de cobertura editorial · Amplifica2"}
                </figcaption>
              </div>
            ) : (
              <div
                className="placeholder-visual"
                style={{
                  backgroundColor: "#18181B",
                  color: "#FFFFFF",
                  border: "2px solid var(--color-amarillo-acento)",
                }}
                role="img"
                aria-label={`Imagen pendiente para: ${apertura.titulo}`}
              >
                <span
                  className="placeholder-visual__icono"
                  style={{ color: "var(--color-amarillo-acento)" }}
                  aria-hidden="true"
                >
                  🎸
                </span>
                <span
                  className="placeholder-visual__etiqueta"
                  style={{ color: "#FFFFFF", fontSize: "1rem" }}
                >
                  {apertura.seccion}
                </span>
                <p className="placeholder-visual__detalle" style={{ color: "#A1A1AA" }}>
                  Todavía no se subió una foto para esta nota.
                </p>
                <figcaption className="placeholder-visual__credito" style={{ color: "#71717A" }}>
                  Fotografía de cobertura editorial · Amplifica2
                </figcaption>
              </div>
            )}
          </figure>
        </article>
      </section>
      )}

      {/* 2. NOTICIAS SECUNDARIAS */}
      {noticias.length > 0 && (
      <section className="seccion-secundarias" aria-labelledby="titulo-secundarias">
        <div className="encabezado-bloque">
          <h2 className="encabezado-bloque__titulo" id="titulo-secundarias">
            Actualidad musical
          </h2>
          <span className="encabezado-bloque__aclaracion">
            Escena local y panorama internacional
          </span>
        </div>

        <div className="grilla-secundarias">
          {noticias.map((noticia) => (
            <article className="tarjeta-secundaria" key={noticia.id}>
              <div className="etiquetas-meta">
                <span className="tag-seccion">{noticia.seccion}</span>
                <span className="tag-formato">{noticia.formato}</span>
              </div>

              <h3 className="tarjeta-secundaria__titulo">
                <Link href={noticia.href}>{noticia.titulo}</Link>
              </h3>

              <p className="tarjeta-secundaria__bajada">{noticia.bajada}</p>

              <div className="metadatos-articulo">
                <span>
                  Por <strong>{noticia.autor}</strong>
                </span>
                <span>·</span>
                <span>{noticia.fechaLegible}</span>
              </div>

              <Link href={noticia.href} className="enlace-lectura-completa" style={{ alignSelf: "flex-start" }}>
                {noticia.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>
      )}

      {(noticias.length > 0 || agenda.length > 0) && <hr className="separador-editorial" aria-hidden="true" />}

      {/* 3. AGENDA MUSICAL ROSARIO */}
      {agenda.length > 0 && (
      <section className="bloque-agenda" id="agenda-rosario" aria-labelledby="titulo-agenda">
        <div className="encabezado-bloque">
          <h2 className="encabezado-bloque__titulo" id="titulo-agenda">
            Agenda Musical Rosario
          </h2>
          <span className="encabezado-bloque__aclaracion">
            <Link href="/secciones/agenda">Ver agenda completa de Rosario →</Link>
          </span>
        </div>

        <p className="agenda-bajada">
          Relevamiento de fechas en vivo en Rosario y la región. Priorizamos propuestas
          autogestivas, artistas emergentes y actividades con acceso gratuito o a precios
          populares.
        </p>

        <div className="grilla-eventos">
          {agenda.slice(0, 3).map((evento) => (
            <TarjetaEvento evento={evento} key={evento.id} />
          ))}
        </div>
      </section>
      )}

      {(agenda.length > 0 || podcast) && <hr className="separador-editorial" aria-hidden="true" />}

      {/* 4. PRODUCCIÓN AUDIOVISUAL */}
      {podcast && (
        <section className="seccion-multimedia" id="multimedia" aria-labelledby="titulo-multimedia">
          <div className="encabezado-bloque">
            <h2 className="encabezado-bloque__titulo" id="titulo-multimedia">
              Producción Audiovisual
            </h2>
            <span className="encabezado-bloque__aclaracion">
              <Link href="/secciones/podcast">Ver todos los episodios →</Link>
            </span>
          </div>

          <div className="modulo-multimedia">
            <div className="modulo-multimedia__info">
              <div className="etiquetas-meta">
                <span className="tag-seccion">PODCAST</span>
                <span className="tag-formato">{podcast.numeroEpisodio}</span>
              </div>

              <h3>{podcast.titulo}</h3>
              <p>{podcast.descripcion}</p>

              <div className="metadatos-articulo">
                <span>
                  Conduce: <strong>{podcast.conductor}</strong>
                </span>
                <span>·</span>
                <span>
                  Duración: <strong>{podcast.duracionMin} min</strong>
                </span>
              </div>

              <a
                href={podcast.enlaceYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace-lectura-completa"
                style={{ alignSelf: "flex-start", marginTop: "0.75rem" }}
              >
                Ver en YouTube @Amplifica2 →
              </a>
            </div>

            {podcast.imagenUrl ? (
              <figure style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={podcast.imagenUrl}
                  alt={podcast.titulo}
                  style={{ width: "100%", borderRadius: "var(--radio-borde)" }}
                />
                <figcaption
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-gris-mutado)",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                  }}
                >
                  {podcast.imagenCredito || "Fotografía de cobertura editorial · Amplifica2"}
                </figcaption>
              </figure>
            ) : (
              <div
                className="multimedia-contenedor-flexible"
                role="region"
                aria-label="Reproductor del podcast de Amplifica2"
              >
                <span className="multimedia-contenedor-flexible__icono" aria-hidden="true">
                  🎙️
                </span>
                <span className="multimedia-contenedor-flexible__titulo">
                  AMPLIFICA2 PODCAST · PROGRAMA EN VIVO
                </span>
                <p className="multimedia-contenedor-flexible__nota">
                  Disponible en nuestro canal oficial de YouTube y plataformas de audio.
                </p>
                <a
                  href="https://www.youtube.com/@Amplifica2"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--color-amarillo-acento)",
                    fontWeight: 700,
                    marginTop: "0.5rem",
                    textDecoration: "underline",
                  }}
                >
                  Visitar canal de YouTube →
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {(podcast || hayOtrasPublicaciones) && <hr className="separador-editorial" aria-hidden="true" />}

      {/* 5. OTRAS PUBLICACIONES */}
      {hayOtrasPublicaciones && (
      <section className="seccion-ultimas" aria-labelledby="titulo-ultimas">
        <div className="encabezado-bloque">
          <h2 className="encabezado-bloque__titulo" id="titulo-ultimas">
            Otras publicaciones
          </h2>
          <span className="encabezado-bloque__aclaracion">
            Efemérides, coberturas y juegos semanales
          </span>
        </div>

        <div className="grilla-ultimas">
          {efemerideDestacada && (
          <article className="tarjeta-publicacion">
            <div className="etiquetas-meta">
              <span className="tag-seccion">{efemerideDestacada.seccion}</span>
              <span className="tag-formato">{efemerideDestacada.formato}</span>
            </div>
            <h3 className="tarjeta-publicacion__titulo">
              <Link href={`/notas/${efemerideDestacada.slug}`}>{efemerideDestacada.titulo}</Link>
            </h3>
            <p className="tarjeta-publicacion__bajada">{efemerideDestacada.bajada}</p>
            <div className="metadatos-articulo">
              <span>
                Por <strong>{efemerideDestacada.autor}</strong>
              </span>
            </div>
            <Link
              href={`/notas/${efemerideDestacada.slug}`}
              className="enlace-lectura-completa"
              style={{ alignSelf: "flex-start" }}
            >
              Ver efeméride →
            </Link>
          </article>
          )}

          {coberturaDestacada && (
          <article className="tarjeta-publicacion">
            <div className="etiquetas-meta">
              <span className="tag-seccion">{coberturaDestacada.seccion}</span>
              <span className="tag-formato">{coberturaDestacada.formato}</span>
            </div>
            <h3 className="tarjeta-publicacion__titulo">
              <Link href={`/notas/${coberturaDestacada.slug}`}>{coberturaDestacada.titulo}</Link>
            </h3>
            <p className="tarjeta-publicacion__bajada">{coberturaDestacada.bajada}</p>
            <div className="metadatos-articulo">
              <span>
                Por <strong>{coberturaDestacada.autor}</strong>
              </span>
            </div>
            <Link
              href={`/notas/${coberturaDestacada.slug}`}
              className="enlace-lectura-completa"
              style={{ alignSelf: "flex-start" }}
            >
              Leer crónica →
            </Link>
          </article>
          )}

          {juegoDestacado && (
            <article className="tarjeta-publicacion">
              <div className="etiquetas-meta">
                <span className="tag-seccion">{juegoDestacado.seccion}</span>
                <span className="tag-formato">{juegoDestacado.formato}</span>
              </div>
              <h3 className="tarjeta-publicacion__titulo">
                <a href={juegoDestacado.href} target="_blank" rel="noopener noreferrer">
                  {juegoDestacado.titulo}
                </a>
              </h3>
              <p className="tarjeta-publicacion__bajada">{juegoDestacado.bajada}</p>
              <div className="metadatos-articulo">
                <span>
                  Por <strong>{juegoDestacado.autor}</strong>
                </span>
              </div>
              <a
                href={juegoDestacado.href}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace-lectura-completa"
                style={{ alignSelf: "flex-start" }}
              >
                {juegoDestacado.ctaLabel}
              </a>
            </article>
          )}
        </div>
      </section>
      )}
    </main>
  );
}
