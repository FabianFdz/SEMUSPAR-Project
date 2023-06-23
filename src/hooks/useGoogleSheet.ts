import axios from "axios";
import { useState } from "react";
import { FileRow } from "@/global.types";

export function useGoogleSheet() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FileRow[] | null>(null);

  const getEstudiantesFromSheet = async (sheetId: string) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/estudiantes/getDataFromSheet", {
        sheetId,
      });
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

  return {
    data,
    error,
    loading,
    getEstudiantesFromSheet,
  };
}
