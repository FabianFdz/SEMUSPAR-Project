import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { Input } from "../fields";
import styles from "./form.module.scss";
import { Estudiante } from "@prisma/client";
import { UseFormRegister } from "react-hook-form";

dayjs.locale("es-mx");

const dateFormat = "DD/MMMM/YYYY";

interface DatosMatriculaProps {
  register: UseFormRegister<Estudiante>;
  estudiante?: Estudiante;
  estado: boolean;
}

export default function DatosMatricula({
  estado,
  register,
  estudiante,
}: DatosMatriculaProps) {
  return (
    <section id="educacion" className={`${styles.educacionForm}`}>
      <h3 className="text-md border-b w-full mb-3">Datos de Matrícula</h3>
      <div className="flex space-x-4 justify-start">
        {estudiante && (
          <Input name="docente" register={register} label="Docente" />
        )}
        <Input name="instrumento" register={register} label="Instrumento" />
      </div>
      {estudiante && (
        <div className="flex space-x-4 justify-start">
          <div className="space-y-1 w-32 text-center">
            <label htmlFor="estado">Estado</label>
            <label className="flex items-center justify-center py-1">
              <input
                type="checkbox"
                className="hidden"
                id="estado"
                title="estado"
                placeholder="estado"
                {...register("estado")}
              />
              <div
                className={`relative w-16 h-8 rounded-full cursor-pointer duration-300 ease-in-out ${
                  estado ? "bg-blue-600" : "bg-gray-200"
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
            name="estado_comentario"
          />
          <div className="space-y-1 w-[10rem]">
            <label>Fecha de Matrícula</label>
            <p>{dayjs(estudiante.fecha_matricula).format(dateFormat)}</p>
          </div>
          {estudiante.fecha_retiro && (
            <div className="space-y-1 w-[10rem]">
              <label>Fecha de Retiro</label>
              <p>{dayjs(estudiante.fecha_retiro).format(dateFormat)}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
