import { InputEstudiante } from "../fields";
import styles from "./form.module.scss";
import { Estudiante } from "@prisma/client";
import { UseFormRegister } from "react-hook-form";

interface DatosPersonalesProps {
  register: UseFormRegister<Estudiante>;
}

export default function DatosPersonales({ register }: DatosPersonalesProps) {
  return (
    <section id="datos-personales" className={`${styles.datosPersonalesForm}`}>
      <h3 className="text-md border-b w-full mb-3">Datos Personales</h3>
      <div className="flex space-x-4 justify-start">
        <InputEstudiante
          label="Cédula"
          register={register}
          name="cedula"
          required
        />
        <InputEstudiante
          label="Nombre Completo"
          register={register}
          name="nombre_completo"
          required
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <InputEstudiante
          label="Fecha de Nacimiento"
          register={register}
          type="date"
          name="fecha_nacimiento"
          required
        />
        <InputEstudiante
          label="Teléfono"
          register={register}
          type="tel"
          name="telefono"
        />
        <InputEstudiante
          label="Correo Electrónico"
          register={register}
          type="email"
          name="email"
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
            {...register("consideraciones_medicas")}
            placeholder="Toma medicamentos, debe caminar cada 20 min, debe tomar pastilla cada 3 horas..."
          />
        </div>
        <div className="space-y-1 w-1/3">
          <label htmlFor="enfermedades">Enfermedades</label>
          <textarea
            id="enfermedades"
            rows={5}
            {...register("enfermedades")}
            placeholder="Asma, rinitis, dolor de cabeza constante..."
          />
        </div>
        <div className="space-y-1 w-1/3">
          <label htmlFor="direccion">Dirección</label>
          <textarea
            id="direccion"
            rows={5}
            {...register("direccion")}
            placeholder="Paraiso, Cartago..."
          />
        </div>
      </div>
    </section>
  );
}
