# Amplifica2 — Medio musical de Rosario

Sitio web de **Amplifica2**, medio musical universitario e independiente de Rosario, Santa Fe,
Argentina. Construido con **Next.js (App Router) + TypeScript**, con **Supabase** como base de
datos y autenticación, y un panel de administración propio para que el equipo suba contenido
sin tocar código.

## Cómo correr el proyecto

1. Copiá `.env.local.example` a `.env.local` y completá las credenciales del proyecto de
   Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`). `.env.local` nunca se sube al repositorio.
2. Instalá dependencias y corré el servidor:

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
├── layout.tsx                   <- Layout raíz (fuente, html/body)
├── globals.css                  <- Sistema de diseño completo (paleta, tipografía, componentes)
├── components/                  <- Header, Footer, tarjetas y componentes compartidos
├── (site)/                       <- Sitio público (con header/footer)
│   ├── layout.tsx                <- Banner institucional + Header + Footer
│   ├── page.tsx                  <- Portada
│   ├── quienes-somos/page.tsx    <- Identidad editorial y equipo
│   ├── secciones/                <- Agenda, noticias, entrevistas, coberturas, efemérides
│   └── notas/[slug]/page.tsx     <- Plantilla de nota completa
└── admin/                        <- Panel de administración (sin header/footer públicos)
    ├── login/                    <- Login con usuario + contraseña
    └── (dashboard)/              <- Protegido por sesión: equipo, agenda, notas, noticias, perfil

lib/
├── data/                         <- Solo tipos TypeScript del contenido (ya no hay arrays acá)
└── supabase/
    ├── client.ts                 <- Cliente anónimo (lecturas públicas desde Server Components)
    ├── server-client.ts          <- Cliente con sesión del usuario (cookies) para el panel
    ├── browser-client.ts         <- Cliente para componentes 'use client' (login, subida de fotos)
    ├── server.ts                 <- Cliente con service_role (solo scripts puntuales)
    ├── auth.ts                   <- Mapeo usuario -> email interno
    └── queries.ts                <- Lecturas públicas (equipo, agenda, artículos, publicaciones)

middleware.ts                     <- Protege /admin/* redirigiendo a /admin/login sin sesión
scripts/seed.mjs                  <- Script puntual ya ejecutado (carga de contenido inicial)
legacy-static-site/                <- Sitio HTML/CSS original, preservado como referencia histórica
```

## Panel de administración

En `/admin` el equipo puede loguearse (usuario + contraseña, sin email real) y editar todo el
contenido del sitio: equipo de redacción, agenda de eventos, notas completas (con foto) y
noticias/juegos breves. Los cambios se ven en el sitio público al instante, sin rebuild.

- Las 5 cuentas de admin ya están creadas en Supabase Auth (usuario = nombre de pila, ver el
  equipo en `/quienes-somos`). Cada admin puede cambiar su contraseña desde `/admin/perfil`.
- Si hace falta crear un admin nuevo: Supabase Dashboard → Authentication → Users → Add user,
  con email `<usuario>@amplifica2.local`.
- Las fotos de las notas se guardan en el bucket público `articulo-imagenes` de Supabase
  Storage.

## Base de datos (Supabase)

4 tablas en `public`, con RLS: lectura pública, escritura solo para usuarios autenticados
(los 5 admins del equipo, no hay auto-registro):

- `equipo`, `eventos_agenda`, `articulos` (con `cuerpo` y `relacionados` en JSONB),
  `publicaciones` (noticias breves y juegos).

`lib/supabase/queries.ts` tiene las lecturas que usa el sitio público. `scripts/seed.mjs` es el
script puntual que cargó el contenido inicial (ya ejecutado una vez, no hace falta volver a
correrlo).

## Desplegar en Vercel

Al importar el repo en Vercel, configurá en el dashboard del proyecto las mismas env vars de
`.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`) — no se suben solas porque `.env.local` está gitignoreado.

## Sitio original

La primera versión del sitio (HTML/CSS estático) está preservada en `legacy-static-site/` tal
como se recibió, como referencia histórica del diseño original.
