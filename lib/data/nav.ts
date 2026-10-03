export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/secciones/agenda", label: "Agenda" },
  { href: "/secciones/noticias", label: "Noticias" },
  { href: "/secciones/entrevistas", label: "Entrevistas" },
  { href: "/secciones/coberturas", label: "Coberturas" },
  { href: "/secciones/efemerides", label: "Efemérides" },
  { href: "/quienes-somos", label: "Quiénes somos" },
];
