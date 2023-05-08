"use client";

import { useForm } from "react-hook-form";
import { Estudiante } from "@/global.types";
import Encargado from "@/components/estudiante/form/Encargado";
import DatosPersonales from "@/components/estudiante/form/DatosPersonales";
import Educacion from "@/components/estudiante/form/Educacion";
import Facturacion from "@/components/estudiante/form/FacturacionForm";
import { estudiantes } from "@/mock/estudiantes";
import DatosMatricula from "@/components/estudiante/form/DatosMatricula";

const estudiante = estudiantes[0];

export default function EditarEstudiante() {
  const { register, handleSubmit, watch } = useForm<Estudiante>({
    defaultValues: { ...estudiante },
  });

  const onSubmit = (data: Estudiante) => {
    const dataCompleted: Estudiante = {
      ...data,
      FechaRetiro:
        !data.Estado && estudiante.Estado
          ? new Date().toLocaleDateString()
          : data.Estado && !estudiante.Estado
          ? undefined
          : data.FechaRetiro,
    };
    console.log(!true && false);
    console.log(dataCompleted.FechaRetiro);
  };

  return (
    <main className="flex flex-col w-2/3 mx-auto px-20">
      <div className="flex flex-row mb-3 space-x-3">
        <h2 className="text-xl font-bold">Editar Estudiante</h2>
        <button
          className="px-3 py-2 bg-blue-600 rounded-md text-white"
          form="agregarEstudianteForm"
          type="submit"
        >
          Guardar
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="agregarEstudianteForm"
        className="text-gray-700"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <DatosMatricula register={register} estado={watch("Estado")} />
        <DatosPersonales register={register} />
        <Educacion
          register={register}
          adecuacion={watch("Adecuacion")}
          trabaja={watch("Trabaja")}
        />
        <Encargado register={register} basePath="Madre" />
        <Encargado register={register} basePath="Padre" />
        <Facturacion register={register} />
      </form>
    </main>
  );
}
