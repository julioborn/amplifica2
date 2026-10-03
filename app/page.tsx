import Link from "next/link";
import { articulos } from "@/lib/data/articulos";
import { agenda } from "@/lib/data/agenda";
import { noticias, juegos } from "@/lib/data/publicaciones";
import TarjetaEvento from "./components/TarjetaEvento";

const apertura = articulos.find((a) => a.seccion === "ENTREVISTAS")!;
const efemerideDestacada = articulos.find((a) => a.seccion === "EFEMÉRIDES")!;
const coberturaDestacada = articulos.find((a) => a.seccion === "COBERTURAS")!;
const [juegoDestacado] = juegos;

export default function Home() {
  return (
    <main className="contenedor-principal" id="contenido-principal">
      {/* 1. APERTURA EDITORIAL */}
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
            <div
              className="placeholder-visual"
              style={{
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                border: "2px solid var(--color-amarillo-acento)",
              }}
              role="img"
              aria-label="Cobertura en sala de ensayo"
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
                LUCES DEL PARQUE
              </span>
              <p className="placeholder-visual__detalle" style={{ color: "#A1A1AA" }}>
                Ensayo previo a la presentación en el Galpón 11. Registro de producción propia en
                Rosario.
              </p>
              <figcaption className="placeholder-visual__credito" style={{ color: "#71717A" }}>
                Fotografía de cobertura editorial · Amplifica2
              </figcaption>
            </div>
          </figure>
        </article>
      </section>

      {/* 2. NOTICIAS SECUNDARIAS */}
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

      <hr className="separador-editorial" aria-hidden="true" />

      {/* 3. AGENDA MUSICAL ROSARIO */}
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

      <hr className="separador-editorial" aria-hidden="true" />

      {/* 4. PRODUCCIÓN AUDIOVISUAL */}
      <section className="seccion-multimedia" id="multimedia" aria-labelledby="titulo-multimedia">
        <div className="encabezado-bloque">
          <h2 className="encabezado-bloque__titulo" id="titulo-multimedia">
            Producción Audiovisual
          </h2>
          <span className="encabezado-bloque__aclaracion">
            Podcast, charlas en video y formatos verticales
          </span>
        </div>

        <div className="modulo-multimedia">
          <div className="modulo-multimedia__info">
            <div className="etiquetas-meta">
              <span className="tag-seccion">PODCAST</span>
              <span className="tag-formato">EPISODIO #04</span>
            </div>

            <h3>¿Existe todavía el &lsquo;sonido Rosario&rsquo;?</h3>
            <p>
              Nos preguntamos si después de Fito, la trova y el rock de los 90 hay un hilo sonoro
              común en las bandas que ensayan hoy en la ciudad. Debate encendido, recomendaciones
              de Carmina y efemérides de Gregorio.
            </p>

            <div className="metadatos-articulo">
              <span>
                Conduce: <strong>Juan Manuel Grisolia</strong>
              </span>
              <span>·</span>
              <span>
                Duración: <strong>34 min</strong>
              </span>
            </div>

            <a
              href="https://www.youtube.com/@Amplifica2"
              target="_blank"
              rel="noopener noreferrer"
              className="enlace-lectura-completa"
              style={{ alignSelf: "flex-start", marginTop: "0.75rem" }}
            >
              Ver en YouTube @Amplifica2 →
            </a>
          </div>

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
        </div>
      </section>

      <hr className="separador-editorial" aria-hidden="true" />

      {/* 5. OTRAS PUBLICACIONES */}
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
        </div>
      </section>
    </main>
  );
}
