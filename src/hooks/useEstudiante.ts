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
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.errorMessage);
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
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.errorMessage);
    }
  };

  const bulkUpdate = async (estudiantesFullData: Array<EstudianteFullData>) => {
    setLoading(true);

    try {
      await axios.patch("/api/estudiantes/bulkUpdate", estudiantesFullData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.errorMessage);
    }
  };

  return {
    loading,
    error,
    data,
    bulkUpdate,
    updateDatosPersonales,
    agregarDatosPersonales,
  };
}
