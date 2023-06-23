import styles from "./form.module.scss";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Facturacion } from "@prisma/client";
import { InputFacturacion } from "../fields/InputFacturacion";
import { InputRadioGroupPago } from "../fields";

interface FacturacionProps {
  register: UseFormRegister<Facturacion>;
  setValue: UseFormSetValue<Facturacion>;
  getValues: UseFormGetValues<Facturacion>;
}

export function FacturacionForm({
  register,
  setValue,
  getValues,
}: FacturacionProps) {
  return (
    <section id="facturacion" className={`${styles.facturacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Facturación</h3>
      <div className="flex space-x-4 justify-start">
        <InputFacturacion
          label="Cédula"
          register={register}
          name="cedula"
          required
        />
        <InputFacturacion
          label="Nombre Completo"
          register={register}
          name="nombre_completo"
          required
        />
        <InputFacturacion
          label="Correo Electrónico"
          register={register}
          type="email"
          name="email"
          required
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <div className="space-y-1">
          <label id="demo-row-radio-buttons-group-label">Pago</label>
          <InputRadioGroupPago setValue={setValue} getValues={getValues} />
        </div>
      </div>
    </section>
  );
}
