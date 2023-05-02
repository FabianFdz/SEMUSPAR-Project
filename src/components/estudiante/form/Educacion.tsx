import { useState } from "react";
import { Estudiante } from "@/global.types";
import { UseFormRegister } from "react-hook-form";
import styles from "./form.module.scss";
import { Input } from "../fields";

interface EducacionProps {
  register: UseFormRegister<Estudiante>;
  adecuacion: boolean;
  trabaja: boolean;
}

export default function Educacion({
  register,
  adecuacion,
  trabaja,
}: EducacionProps) {
  return (
    <section id="educacion" className={`${styles.educacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Educación</h3>
      <div className="flex space-x-4 justify-start">
        <div className="space-y-1 flex flex-col">
          <label htmlFor="grado-academico">Grado Académico</label>
          <div className="inline-block relative w-full">
            <select
              {...register("GradoAcademico")}
              placeholder="Selecciona un grado académico"
            >
              <option disabled>Selecciona un grado académico</option>
              <option>N/A</option>
              <option>Preescolar</option>
              <option>Primaria</option>
              <option>Secundaria</option>
              <option>Bachillerato</option>
              <option>Licenciatura</option>
              <option>Maestría</option>
              <option>Doctorado</option>
            </select>
            <div className={`${styles.selectIcon}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <Input
          label="Institución Académica"
          register={register}
          placeholder="Técnológico de Costa Rica..."
          name="InstitucionAcademica"
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
              {...register("Trabaja")}
            />
            <div
              className={`relative w-16 h-8 rounded-full duration-300 ease-in-out ${
                trabaja ? "bg-blue-500" : "bg-gray-200"
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
        <Input
          label="Lugar de Trabajo"
          register={register}
          disabled={!trabaja}
          name="LugarDeTrabajo"
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
              {...register("Adecuacion")}
            />
            <div
              className={`relative w-16 h-8 rounded-full duration-300 ease-in-out ${
                adecuacion ? "bg-blue-500" : "bg-gray-200"
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
        <Input
          label="Tipo de Adecuación"
          register={register}
          disabled={!adecuacion}
          placeholder="Déficit de atención, ..."
          name="TipoAdecuacion"
        />
      </div>
    </section>
  );
}
