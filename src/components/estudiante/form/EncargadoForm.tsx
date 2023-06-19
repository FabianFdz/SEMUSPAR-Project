import { Encargado, PARENTEZCO } from "@prisma/client";
import styles from "./form.module.scss";
import { UseFormRegister } from "react-hook-form";
import { InputEncargado } from "../fields/InputEncargado";

interface EncargadoProps {
  register: UseFormRegister<Encargado>;
  parentezco: PARENTEZCO;
}

export default function EncargadoForm({
  register,
  parentezco,
}: EncargadoProps) {
  return (
    <section
      id={`encargado-${parentezco}`}
      className={`${styles.encargadoForm}`}
    >
      <h3 className="text-md border-b w-full mb-3 capitalize">
        Encargado (
        <span className="capitalize font-semibold">
          {parentezco.toLowerCase()}
        </span>
        )
      </h3>
      <div className="flex space-x-4 justify-start">
        <InputEncargado
          label="Nombre Completo"
          register={register}
          name="nombre_completo"
          required
        />
        <InputEncargado
          label="Teléfono"
          register={register}
          type="tel"
          name="telefono"
          required
        />
        <InputEncargado
          label="Correo Electrónico"
          register={register}
          type="email"
          name="email"
          required
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <InputEncargado
          label="Ocupación"
          register={register}
          name="ocupacion"
        />
        <InputEncargado
          label="Lugar de Trabajo"
          register={register}
          name="lugar_trabajo"
        />
      </div>
    </section>
  );
}
