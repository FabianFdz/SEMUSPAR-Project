import axios from "axios";
import { useState } from "react";
import { Estudiante } from "@prisma/client";
import { EstudianteFullData } from "@/global.types";

interface UpdateProps {
  id: Estudiante["id"];
  email: Estudiante["email"];
  estado: Estudiante["estado"];
  cedula: Estudiante["cedula"];
  docente: Estudiante["docente"];
  trabaja: Estudiante["trabaja"];
  telefono: Estudiante["telefono"];
  direccion: Estudiante["direccion"];
  adecuacion: Estudiante["adecuacion"];
  instrumento: Estudiante["instrumento"];
  enfermedades: Estudiante["enfermedades"];
  lugar_trabajo: Estudiante["lugar_trabajo"];
  nombreCompleto: Estudiante["nombreCompleto"];
  grado_academico: Estudiante["grado_academico"];
  tipo_adecuacion: Estudiante["tipo_adecuacion"];
  fecha_nacimiento: Estudiante["fecha_nacimiento"];
  estado_comentario: Estudiante["estado_comentario"];
  institucion_academica: Estudiante["institucion_academica"];
  consideraciones_medicas: Estudiante["consideraciones_medicas"];
}

export function useEstudiante() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Estudiante | null>(null);

  const updateDatosPersonales = async (estudiante: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.patch(
        "/api/estudiantes/editarDatosPersonales",
        { ...estudiante }
      );
      setError(null);
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setData(null);
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  const agregarDatosPersonales = async (estudiante: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.patch(
        "/api/estudiantes/agregarDatosPersonales",
        { ...estudiante }
      );
      setError(null);
      setLoading(false);
      setData(response.data);
      return true;
    } catch (error: any) {
      setData(null);
      setLoading(false);
      setError(error.response.data.errorMessage);
      return false;
    }
  };

  const bulkUpdate = async (
    estudiantesFullData: Array<EstudianteFullData>,
    isSoftUpdate: boolean
  ) => {
    setLoading(true);

    try {
      await axios.patch(
        `/api/estudiantes/bulkUpdate?isSoft=${isSoftUpdate}`,
        estudiantesFullData
      );
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
      return false;
    }
  };

  const deleteEstudiante = async (id: number) => {
    setLoading(true);

    try {
      await axios.patch("/api/estudiantes/deleteEstudiante", { id });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return {
    data,
    error,
    loading,
    bulkUpdate,
    deleteEstudiante,
    updateDatosPersonales,
    agregarDatosPersonales,
  };
}
