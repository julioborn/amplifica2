# Amplifica2 — Medio musical de Rosario

Sitio web de **Amplifica2**, medio musical universitario e independiente de Rosario, Santa Fe,
Argentina. Construido con **Next.js (App Router) + TypeScript**, con contenido editorial como
datos estáticos tipados (sin base de datos para el contenido del sitio).

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Para una build de producción:

```bash
npm run build
npm run start
```

## Estructura del proyecto

```text
app/
├── layout.tsx                  <- Layout global: fuente, banner institucional, header y footer
├── globals.css                 <- Sistema de diseño completo (paleta, tipografía, componentes)
├── page.tsx                     <- Portada
├── quienes-somos/page.tsx       <- Identidad editorial y equipo
├── secciones/
│   ├── agenda/page.tsx          <- Agenda musical completa
│   ├── noticias/page.tsx        <- Noticias y convocatorias
│   ├── entrevistas/page.tsx     <- Listado de entrevistas
│   ├── coberturas/page.tsx      <- Listado de coberturas
│   └── efemerides/page.tsx      <- Listado de efemérides
├── notas/[slug]/page.tsx        <- Plantilla de nota completa (entrevistas/efemérides/coberturas)
└── components/                  <- Header, Footer, tarjetas y componentes compartidos

lib/
├── data/                        <- Contenido editorial como datos tipados (sin DB)
│   ├── team.ts                  <- Integrantes de la redacción
│   ├── agenda.ts                <- Eventos de la agenda musical
│   ├── articulos.ts             <- Notas completas (entrevistas, efemérides, coberturas)
│   ├── publicaciones.ts         <- Teasers breves (noticias, juegos/trivia)
│   └── nav.ts                   <- Enlaces del menú de navegación
└── supabase/                    <- Cliente de Supabase (ver más abajo)

legacy-static-site/              <- Sitio HTML/CSS original, preservado como referencia histórica
```

## Guía rápida de edición de contenido

- **Agregar o editar un evento de agenda:** sumá un objeto al array `agenda` en
  `lib/data/agenda.ts`.
- **Agregar una nota completa** (entrevista, efeméride o cobertura con cuerpo propio):
  sumá un objeto al array `articulos` en `lib/data/articulos.ts`. El `slug` define la URL
  (`/notas/<slug>`).
- **Agregar una noticia breve o un juego/trivia:** sumá un objeto en `lib/data/publicaciones.ts`.
- **Editar el equipo de redacción:** `lib/data/team.ts`.
- **Editar el menú de navegación:** `lib/data/nav.ts`.

No hace falta tocar ningún archivo HTML ni reiniciar una base de datos: Next.js regenera las
páginas automáticamente a partir de estos archivos.

## Supabase (opcional)

El proyecto tiene el SDK de Supabase instalado (`lib/supabase/client.ts` para el navegador,
`lib/supabase/server.ts` con permisos de administrador solo para uso en el servidor) y un
`.env.local` local con las credenciales del proyecto. `.env.local` está en `.gitignore` y nunca
se sube al repositorio.

## Sitio original

La primera versión del sitio (HTML/CSS estático) está preservada en `legacy-static-site/` tal
como se recibió, como referencia histórica del diseño original.
