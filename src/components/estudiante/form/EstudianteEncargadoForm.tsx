"use client";

import { useForm } from "react-hook-form";
import { Encargado, PARENTEZCO } from "@prisma/client";

import EncargadoForm from "./EncargadoForm";

interface Props {
  id: number;
  encargado?: Encargado;
  parentezco: PARENTEZCO;
}

export default function EstudianteEncargadoForm({
  id,
  encargado,
  parentezco,
}: Props) {
  const { register, handleSubmit } = useForm<Encargado>({
    defaultValues: { ...encargado },
  });

  const onSubmit = (data: Encargado) => {
    console.log(id, data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={`facturacion-estudiante-form-${encargado?.parentezco}`}
      className="text-gray-700 space-y-6"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <EncargadoForm register={register} parentezco={parentezco} />
      <button
        type="submit"
        className="py-2 px-3 bg-blue-600 text-white rounded-lg"
      >
        Guardar datos de{" "}
        <span className="capitalize">{parentezco.toLowerCase()}</span>
      </button>
    </form>
  );
}
