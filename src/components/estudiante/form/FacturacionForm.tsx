import styles from "./form.module.scss";
import { UseFormRegister } from "react-hook-form";
import { Estudiante, Facturacion } from "@prisma/client";
import { InputFacturacion } from "../fields/InputFacturacion";

interface FacturacionProps {
  register: UseFormRegister<Facturacion>;
}

export function FacturacionForm({ register }: FacturacionProps) {
  return (
    <section id="facturacion" className={`${styles.facturacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Facturación</h3>
      <div className="flex space-x-4 justify-start">
        <InputFacturacion label="Cédula" register={register} name="cedula" />
        <InputFacturacion
          label="Nombre"
          register={register}
          name="nombre_completo"
        />
        <InputFacturacion
          label="Correo Electrónico"
          register={register}
          type="email"
          name="email"
        />
      </div>
    </section>
  );
}
