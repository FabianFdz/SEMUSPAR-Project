"use client";

import { useForm } from "react-hook-form";
import { Estudiante } from "@prisma/client";

import Educacion from "./EducacionForm";
import DatosMatricula from "./DatosMatricula";
import DatosPersonales from "./DatosPersonales";
import { useEstudiante } from "@/hooks/useEstudiante";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  estudiante: Estudiante;
}

export default function EstudianteForm({ estudiante }: Props) {
  const router = useRouter();
  const { data, error, loading, updateDatosPersonales } = useEstudiante();
  const { register, handleSubmit, watch, reset } = useForm<Estudiante>({
    defaultValues: { ...estudiante },
  });

  const onSubmit = async (dataForm: Estudiante) => {
    const fechaRetiro =
      !dataForm.estado && estudiante.estado
        ? new Date()
        : dataForm.estado && !estudiante.estado
        ? null
        : dataForm.fecha_retiro;
    const dataCompleted: Estudiante = {
      ...dataForm,
      fecha_retiro: fechaRetiro,
      estado_comentario: !dataForm.estado ? dataForm.estado_comentario : null,
    };

    await updateDatosPersonales(dataCompleted);
    router.refresh();
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

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
      <DatosMatricula
        register={register}
        estado={watch("estado")}
        fechaMatricula={estudiante.fecha_matricula}
        fechaRetiro={estudiante.fecha_retiro}
      />
      <DatosPersonales register={register} />
      <Educacion
        register={register}
        adecuacion={watch("adecuacion")}
        trabaja={watch("trabaja")}
      />
      <button
        type="submit"
        className="py-2 px-3 bg-blue-600 text-white rounded w-[15rem] items-center"
      >
        {loading ? (
          <div className="my-auto flex flex-row justify-center items-center space-x-2">
            <CircularProgress color="inherit" size="1rem" />{" "}
            <p>Actualizando...</p>
          </div>
        ) : (
          "Guardar datos personales"
        )}
      </button>
    </form>
  );
}
