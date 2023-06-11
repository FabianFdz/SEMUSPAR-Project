"use client";

import { useForm } from "react-hook-form";
import { Facturacion } from "@prisma/client";

import { FacturacionForm } from "./FacturacionForm";
import { CircularProgress } from "@mui/material";
import { useFacturacion } from "@/hooks/useFacturacion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  estudiante: {
    id: number;
    facturacion: Facturacion | null;
  };
}

export default function EstudianteFacturacionForm({ estudiante }: Props) {
  const router = useRouter();
  const { loading, updateFacturacion, createFacturacion, data } =
    useFacturacion();
  const { register, setValue, getValues, reset, handleSubmit } =
    useForm<Facturacion>({
      defaultValues: { ...estudiante.facturacion },
    });

  const onSubmit = async (dataForm: Facturacion) => {
    if (estudiante.facturacion) {
      await updateFacturacion({
        ...dataForm,
        estudiante_id: estudiante.id,
        id: estudiante.facturacion.id,
      });
    } else {
      await createFacturacion({ ...dataForm, estudiante_id: estudiante.id });
    }
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
      id="facturacion-estudiante-form"
      className="text-gray-700 space-y-6"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <FacturacionForm
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
      <button
        type="submit"
        disabled={loading}
        className="py-2 px-3 bg-blue-600 disabled:bg-gray-400 text-white rounded w-[15rem] items-center"
      >
        {loading ? (
          <div className="my-auto flex flex-row justify-center items-center space-x-2">
            <CircularProgress color="inherit" size="1rem" />{" "}
            <p>Actualizando...</p>
          </div>
        ) : (
          "Guardar facturación"
        )}
      </button>
    </form>
  );
}
