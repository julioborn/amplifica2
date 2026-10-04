import CabeceraSeccion from "@/app/components/CabeceraSeccion";
import ChangePasswordForm from "./ChangePasswordForm";

export default function PerfilPage() {
  return (
    <div className="seccion-portada-interna">
      <CabeceraSeccion titulo="Mi cuenta" descripcion="Cambiá tu contraseña cuando quieras." />
      <div className="admin-card">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
