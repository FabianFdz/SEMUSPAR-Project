"use client";

import { useForm } from "react-hook-form";
import { Estudiante, Facturacion } from "@prisma/client";

import Educacion from "./EducacionForm";
import DatosMatricula from "./DatosMatricula";
import DatosPersonales from "./DatosPersonales";
import { FacturacionForm } from "./FacturacionForm";

interface Props {
  estudiante: {
    id: number;
    facturacion: Facturacion | null;
  };
}

export default function EstudianteFacturacionForm({ estudiante }: Props) {
  const { register, handleSubmit } = useForm<Facturacion>({
    defaultValues: { ...estudiante.facturacion },
  });

  const onSubmit = (data: Facturacion) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="facturacion-estudiante-form"
      className="text-gray-700 space-y-6"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <FacturacionForm register={register} />
      <button
        type="submit"
        className="py-2 px-3 bg-blue-600 text-white rounded-lg"
      >
        Guardar datos de facturación
      </button>
    </form>
  );
}
