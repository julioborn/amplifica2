import Link from "next/link";
import CabeceraSeccion from "@/app/components/CabeceraSeccion";

const secciones = [
  { href: "/admin/equipo", titulo: "Equipo", texto: "Nombre, usuario, rol y bio de cada integrante de la redacción." },
  { href: "/admin/agenda", titulo: "Agenda", texto: "Eventos en vivo: fecha, lugar, dirección y condición de acceso." },
  { href: "/admin/articulos", titulo: "Notas", texto: "Entrevistas, efemérides y coberturas completas, con foto." },
  { href: "/admin/noticias", titulo: "Noticias y juegos", texto: "Teasers breves de noticias y trivias semanales." },
];

export default function AdminHomePage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion
        titulo="Panel de Amplifica2"
        descripcion="Elegí qué querés editar. Los cambios se ven en el sitio público al instante."
      />

      <div className="admin-resumen-grilla">
        {secciones.map((seccion) => (
          <Link href={seccion.href} className="admin-resumen-tarjeta" key={seccion.href}>
            <h2 className="admin-resumen-tarjeta__titulo">{seccion.titulo}</h2>
            <p className="admin-resumen-tarjeta__texto">{seccion.texto}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
