import { EstudianteFullData } from "@/global.types";
import { Estudiante } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

interface UpdateProps {
  id: Estudiante["id"];
  email: Estudiante["email"];
  estado: Estudiante["estado"];
  cedula: Estudiante["cedula"];
  nombre: Estudiante["nombre"];
  docente: Estudiante["docente"];
  trabaja: Estudiante["trabaja"];
  telefono: Estudiante["telefono"];
  apellidos: Estudiante["apellidos"];
  direccion: Estudiante["direccion"];
  adecuacion: Estudiante["adecuacion"];
  instrumento: Estudiante["instrumento"];
  enfermedades: Estudiante["enfermedades"];
  lugar_trabajo: Estudiante["lugar_trabajo"];
  grado_academico: Estudiante["grado_academico"];
  tipo_adecuacion: Estudiante["tipo_adecuacion"];
  fecha_nacimiento: Estudiante["fecha_nacimiento"];
  estado_comentario: Estudiante["estado_comentario"];
  institucion_academica: Estudiante["institucion_academica"];
  consideraciones_medicas: Estudiante["consideraciones_medicas"];
}

export function useEstudiante() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Estudiante | null>(null);

  const updateDatosPersonales = async (estudiante: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.patch(
        "/api/estudiantes/editarDatosPersonales",
        { ...estudiante }
      );
      setLoading(false);
      setError(null);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setData(null);
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
      setLoading(false);
      setError(null);
      setData(response.data);
      return true;
    } catch (error: any) {
      setLoading(false);
      setData(null);
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
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
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
