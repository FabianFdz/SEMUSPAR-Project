"use client";

import { useForm } from "react-hook-form";
import { Estudiante } from "@prisma/client";

import Educacion from "./EducacionForm";
import DatosMatricula from "./DatosMatricula";
import DatosPersonales from "./DatosPersonales";

interface Props {
  estudiante: Estudiante;
}

export default function EstudianteForm({ estudiante }: Props) {
  const { register, handleSubmit, watch } = useForm<Props["estudiante"]>({
    defaultValues: { ...estudiante },
  });

  const onSubmit = (data: Props["estudiante"]) => {
    const dataCompleted: Estudiante = {
      ...data,
      fecha_retiro:
        !data.estado && estudiante.estado
          ? new Date()
          : data.estado && !estudiante.estado
          ? null
          : data.fecha_retiro,
    };

    console.log(dataCompleted);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="agregarEstudianteForm"
      className="text-gray-700 space-y-6"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <DatosMatricula register={register} estado={watch("estado")} />
      <DatosPersonales register={register} />
      <Educacion
        register={register}
        adecuacion={watch("adecuacion")}
        trabaja={watch("trabaja")}
      />
      <button
        type="submit"
        className="py-2 px-3 bg-blue-600 text-white rounded-lg"
      >
        Guardar datos personales
      </button>
    </form>
  );
}
