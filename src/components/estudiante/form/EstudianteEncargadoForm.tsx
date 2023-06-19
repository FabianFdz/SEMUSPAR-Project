"use client";

import { useForm } from "react-hook-form";
import { Encargado, PARENTEZCO } from "@prisma/client";

import EncargadoForm from "./EncargadoForm";
import { useEncargado } from "@/hooks/useEncargado";
import { Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { data, error, loading, updateEncargado, createEncargado } =
    useEncargado();
  const { register, handleSubmit, reset } = useForm<Encargado>({
    defaultValues: { ...encargado },
  });

  const onSubmit = async (dataForm: Encargado) => {
    if (encargado) {
      await updateEncargado({
        ...dataForm,
        parentezco,
        estudiante_id: id,
        id: encargado.id,
      });
    } else {
      await createEncargado({ ...dataForm, parentezco, estudiante_id: id });
    }
    if (!error) {
      router.refresh();
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

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
      {error && <Alert severity="error">{error}</Alert>}
      <button
        type="submit"
        className="py-2 px-3 bg-blue-600 text-white rounded-lg"
      >
        {loading ? (
          <div className="my-auto flex flex-row justify-center items-center space-x-2">
            <CircularProgress color="inherit" size="1rem" />{" "}
            <p>Actualizando...</p>
          </div>
        ) : (
          <>
            Guardar datos de{" "}
            <span className="capitalize">{parentezco.toLowerCase()}</span>
          </>
        )}
      </button>
      <p className="font-medium">
        <span className="text-red-600">*</span> Campos requeridos.
      </p>
    </form>
  );
}
