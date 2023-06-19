import { UseFormRegister } from "react-hook-form";
import styles from "./form.module.scss";
import { InputEstudiante } from "../fields";
import { Estudiante } from "@prisma/client";

interface EducacionProps {
  register: UseFormRegister<Estudiante>;
  adecuacion: boolean | null;
  trabaja: boolean | null;
}

export default function EducacionForm({
  register,
  adecuacion,
  trabaja,
}: EducacionProps) {
  return (
    <section id="educacion" className={`${styles.educacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Educación</h3>
      <div className="flex space-x-4 justify-start">
        <InputEstudiante
          label="Grado Académico"
          register={register}
          placeholder="Bachillerato, escuela, colegio..."
          name="grado_academico"
        />
        <InputEstudiante
          label="Institución Académica"
          register={register}
          placeholder="Técnológico de Costa Rica..."
          name="institucion_academica"
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <div className="space-y-1 w-24 text-center">
          <label htmlFor="adecuacion">Trabaja</label>
          <label className="flex items-center justify-center py-1">
            <input
              type="checkbox"
              className="hidden"
              id="trabaja"
              title="trabaja"
              placeholder="trabaja"
              {...register("trabaja")}
            />
            <div
              className={`relative w-16 h-8 rounded-full cursor-pointer duration-300 ease-in-out ${
                trabaja ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`${styles.switchDot} ${
                  trabaja ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>
        <InputEstudiante
          label="Lugar de Trabajo"
          register={register}
          disabled={!trabaja}
          name="lugar_trabajo"
        />
      </div>
      <div className="flex space-x-4 justify-start">
        <div className="space-y-1 w-24 text-center">
          <label htmlFor="adecuacion">Adecuación</label>
          <label className="flex items-center justify-center py-1">
            <input
              type="checkbox"
              className="hidden"
              id="adecuacion"
              title="adecuacion"
              placeholder="adecuacion"
              {...register("adecuacion")}
            />
            <div
              className={`relative w-16 h-8 rounded-full cursor-pointer duration-300 ease-in-out ${
                adecuacion ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`${styles.switchDot} ${
                  adecuacion ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>
        <InputEstudiante
          label="Tipo de Adecuación"
          register={register}
          disabled={!adecuacion}
          placeholder="Déficit de atención, ..."
          name="tipo_adecuacion"
        />
      </div>
    </section>
  );
}
