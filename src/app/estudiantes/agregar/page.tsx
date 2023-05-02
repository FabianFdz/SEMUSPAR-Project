"use client";

import { useForm } from "react-hook-form";
import { Estudiante } from "@/global.types";
import Encargado from "@/components/estudiante/form/Encargado";
import DatosPersonales from "@/components/estudiante/form/DatosPersonales";
import Educacion from "@/components/estudiante/form/Educacion";
import Facturacion from "@/components/estudiante/form/FacturacionForm";

export default function AgregarEstudiante() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Estudiante>();
  const onSubmit = (data: Estudiante) => console.log(data);

  return (
    <main className="flex flex-col w-2/3 mx-auto px-20">
      <div className="flex flex-row mb-3 space-x-3">
        <h2 className="text-xl font-bold">Agregar Estudiante</h2>
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
