import { useState } from "react";
import { Estudiante } from "@/global.types";
import { UseFormRegister } from "react-hook-form";
import styles from "./form.module.scss";
import { Input } from "../fields";

interface EducacionProps {
  register: UseFormRegister<Estudiante>;
  estado: boolean;
}

export default function DatosMatricula({ register, estado }: EducacionProps) {
  return (
    <section id="educacion" className={`${styles.educacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Datos de Matrícula</h3>
      <div className="flex space-x-4 justify-start">
        <div className="space-y-1 w-32 text-center">
          <label htmlFor="adecuacion">Estado</label>
          <label className="flex items-center justify-center py-1">
            <input
              type="checkbox"
              className="hidden"
              id="estado"
              title="estado"
              placeholder="estado"
              {...register("Estado")}
            />
            <div
              className={`relative w-16 h-8 rounded-full duration-300 ease-in-out ${
                estado ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <div
                className={`${styles.switchDot} ${
                  estado ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>
        <Input
          label="Comentario sobre retiro"
          register={register}
          disabled={estado}
          name="EstadoComentario"
        />
        <Input
          disabled
          register={register}
          name="FechaMatricula"
          label="Fecha de Matrícula"
        />
        <Input
          disabled
          name="FechaRetiro"
          register={register}
          label="Fecha de Retiro"
        />
      </div>
    </section>
  );
}
