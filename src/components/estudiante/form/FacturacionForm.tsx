import styles from "./form.module.scss";
import { Estudiante } from "@/global.types";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../fields";

interface FacturacionProps {
  register: UseFormRegister<Estudiante>;
}

export default function Facturacion({ register }: FacturacionProps) {
  return (
    <section id="facturacion" className={`${styles.facturacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Facturación</h3>
      <div className="flex space-x-4 justify-start">
        <Input
          label="Cédula"
          register={register}
          name={`DatosFacturacion.Cedula`}
        />
        <Input
          label="Nombre"
          register={register}
          name={`DatosFacturacion.Nombre`}
        />
        <Input
          label="Apellidos"
          register={register}
          name={`DatosFacturacion.Apellidos`}
        />
        <Input
          label="Correo Electrónico"
          register={register}
          type="email"
          name={`DatosFacturacion.CorreoElectronico`}
        />
      </div>
    </section>
  );
}
