import { Input } from "../fields";
import styles from "./form.module.scss";
import { Encargado, Estudiante } from "@/global.types";
import { Path, UseFormRegister } from "react-hook-form";

interface EncargadoProps {
  register: UseFormRegister<Estudiante>;
  basePath: Path<"Madre" | "Padre">;
}

export default function Encargado({ register, basePath }: EncargadoProps) {
  return (
    <section id={`encargado-${basePath}`} className={`${styles.encargadoForm}`}>
      <h3 className="text-md border-b w-full mb-3">
        Encargado ({basePath.toString()})
      </h3>
      <div className="flex space-x-4 justify-start">
        <Input label="Cédula" register={register} name={`${basePath}.Cedula`} />
        <Input label="Nombre" register={register} name={`${basePath}.Nombre`} />
        <Input
          label="Apellidos"
          register={register}
          name={`${basePath}.Apellidos`}
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <Input
          label="Teléfono"
          register={register}
          type="tel"
          name={`${basePath}.Telefono`}
        />
        <Input
          label="Correo Electrónico"
          register={register}
          type="email"
          name={`${basePath}.CorreoElectronico`}
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <Input
          label="Ocupación"
          register={register}
          name={`${basePath}.Ocupacion`}
        />
        <Input
          label="Lugar de Trabajo"
          register={register}
          name={`${basePath}.LugarDeTrabajo`}
        />
      </div>
    </section>
  );
}
