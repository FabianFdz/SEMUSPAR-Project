import styles from "./form.module.scss";
import { Estudiante } from "@/global.types";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../fields";

interface DatosPersonalesProps {
  register: UseFormRegister<Estudiante>;
}

export default function DatosPersonales({ register }: DatosPersonalesProps) {
  return (
    <section id="datos-personales" className={`${styles.datosPersonalesForm}`}>
      <h3 className="text-md border-b w-full mb-3">Datos Personales</h3>
      <div className="flex space-x-4 justify-start">
        <Input label="Cédula" register={register} name={`Cedula`} />
        <Input label="Nombre" register={register} name={`Nombre`} />
        <Input label="Apellidos" register={register} name={`Apellidos`} />
      </div>
      <div className="flex space-x-4 justify-between">
        <Input
          label="Fecha de Nacimiento"
          register={register}
          type="date"
          name={`FechaNacimiento`}
        />
        <Input
          label="Teléfono"
          register={register}
          type="tel"
          name={`Telefono`}
        />
        <Input
          label="Correo Electrónico"
          register={register}
          type="email"
          name={`CorreoElectronico`}
        />
      </div>
      <div className="flex space-x-5 justify-start">
        <div className="space-y-1 w-1/3">
          <label htmlFor="consideraciones-medicas">
            Consideraciones Médicas
          </label>
          <textarea
            id="consideraciones-medicas"
            rows={5}
            {...register("ConsideracionesMedicas")}
            placeholder="Toma medicamentos, debe caminar cada 20 min, debe tomar pastilla cada 3 horas..."
          />
        </div>
        <div className="space-y-1 w-1/3">
          <label htmlFor="enfermedades">Enfermedades</label>
          <textarea
            id="enfermedades"
            rows={5}
            {...register("Enfermedaded")}
            placeholder="Asma, rinitis, dolor de cabeza constante..."
          />
        </div>
      </div>
    </section>
  );
}
