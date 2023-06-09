import { Estudiante, Facturacion } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

interface UpdateProps {
  id?: Facturacion["id"];
  pago: Facturacion["pago"];
  email: Facturacion["email"];
  cedula: Facturacion["cedula"];
  estudiante_id?: Estudiante["id"];
  nombre_completo: Facturacion["nombre_completo"];
}

export function useFacturacion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Facturacion | null>(null);

  const updateFacturacion = async (facturacion: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.patch("/api/estudiantes/editarFacturacion", {
        ...facturacion,
      });
      setLoading(false);
      setError(null);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setData(null);
      setError(error.response.data.errorMessage);
    }
  };

  const createFacturacion = async (facturacion: UpdateProps) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/estudiantes/agregarFacturacion", {
        ...facturacion,
      });
      setError(null);
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setData(null);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, data, updateFacturacion, createFacturacion };
}
