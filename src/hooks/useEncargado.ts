import { Encargado } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

interface UpdateProps {
  id: Encargado["id"];
  email: Encargado["email"];
  telefono: Encargado["telefono"];
  ocupacion: Encargado["ocupacion"];
  parentezco: Encargado["parentezco"];
  lugar_trabajo: Encargado["lugar_trabajo"];
  estudiante_id: Encargado["estudiante_id"];
  nombre_completo: Encargado["nombre_completo"];
}

export function useEncargado() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Encargado | null>(null);

  const updateEncargado = async (encargado: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.patch("/api/estudiantes/editarEncargado", {
        ...encargado,
      });
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.errorMessage);
    }
  };

  const createEncargado = async (encargado: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/estudiantes/agregarEncargado", {
        ...encargado,
      });
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.errorMessage);
    }
  };

  return { loading, error, data, updateEncargado, createEncargado };
}
