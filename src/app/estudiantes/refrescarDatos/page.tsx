"use client";

import { useEffect, useState } from "react";
import { useEstudiante } from "@/hooks/useEstudiante";
import { Alert, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  getSheetIdFromUrl,
  parseEstudiantesData,
} from "@/utils/estudianteUtils";
import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { EstudianteFullData } from "@/global.types";
import FechaMatriculaCol from "@/components/estudiante/table/columns/FechaMatriculaCol";
import { StatusChip } from "@/components/StatusChip";

export default function RefreshEstudentsDataPage() {
  const router = useRouter();
  const { bulkUpdate, loading: loadingEstudiante } = useEstudiante();
  const {
    data,
    error,
    getEstudiantesFromSheet,
    loading: loadingGoogleSheet,
  } = useGoogleSheet();
  const [url, setUrl] = useState<string | null>(null);
  const [dataLoadError, setDataLoadError] = useState<string | null>(null);
  const [dataSample, setDataSample] = useState<EstudianteFullData[] | null>(
    null
  );

  const importBtnOnClick = async (isSoftUpdate: boolean) => {
    if (data) {
      const informationEstudiantes = parseEstudiantesData(data);
      if (await bulkUpdate(informationEstudiantes, isSoftUpdate)) {
        router.push("/estudiantes");
      }
    }
  };

  const getSheetsData = async () => {
    if (url) {
      const sheetId = getSheetIdFromUrl(url);
      if (sheetId) {
        const sheetData = await getEstudiantesFromSheet(sheetId);
        console.log({ sheetData });
      }
    }
  };

  useEffect(() => {
    if (data) {
      const sample = parseEstudiantesData(data.slice(0, 10));
      setDataSample(sample);
    }
  }, [data]);

  return (
    <main className="flex flex-col w-full flex-1 px-20 space-y-4">
      <h1 className="text-xl font-bold">Importar Estudiantes</h1>
      {dataLoadError && <Alert severity="error">{dataLoadError}</Alert>}
      <div className="flex flex-row space-x-2 items-center justify-center p-6 w-6/12 mx-auto">
        <input
          className="py-2 px-3 rounded-md bg-gray-100 w-9/12 disabled:bg-gray-300 duration-300 ease-in-out"
          type="url"
          placeholder="URL de formulario"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="py-2 px-3 bg-blue-600 disabled:bg-gray-400 text-white rounded w-auto items-center"
          onClick={getSheetsData}
        >
          Obtener datos
        </button>
      </div>
      {(loadingEstudiante || loadingGoogleSheet) && (
        <div className="mx-auto flex flex-col items-center space-y-7">
          <CircularProgress size={50} className="mt-44" />
          <p className="animate-bounce">Actualizando lista de estudiantes...</p>
        </div>
      )}
      {!(loadingEstudiante || loadingGoogleSheet) && data && (
        <p>
          <strong>Estudiantes a importar en la base de datos:</strong>{" "}
          {data?.length}
        </p>
      )}
      {!(loadingEstudiante || loadingGoogleSheet) &&
        dataSample &&
        dataSample.length > 0 && (
          <>
            <div className="mt-4 flex flex-col">
              <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr className="py-3">
                          {Object.keys(dataSample[0].estudiante)
                            .slice(11, 18)
                            .map((header, idx) => (
                              <th
                                key={header}
                                className="group px-6 py-3 text-left text-reg font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {header.split("_").join(" ")}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataSample.map((data) => (
                          <tr key={data.estudiante.cedula}>
                            {Object.keys(dataSample[0].estudiante)
                              .slice(11, 18)
                              .map((key) => {
                                const value =
                                  data.estudiante[
                                    key as keyof typeof data.estudiante
                                  ];
                                return (
                                  <td
                                    key={key}
                                    className="px-6 py-4 whitespace-nowrap"
                                  >
                                    {value && typeof value === "object" ? (
                                      <FechaMatriculaCol
                                        key={key}
                                        fechaMatricula={value as Date}
                                      />
                                    ) : value && typeof value === "boolean" ? (
                                      <StatusChip active={value} />
                                    ) : (
                                      <p>{value}</p>
                                    )}
                                  </td>
                                );
                              })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                className="px-3 py-2 bg-blue-600 rounded-md text-white w-40 mr-2"
                onClick={() => importBtnOnClick(false)}
              >
                Nueva Matricula
              </button>
              <button
                className="px-3 py-2 bg-blue-900 rounded-md text-white w-56"
                onClick={() => importBtnOnClick(true)}
              >
                Actualizar Estudiantes
              </button>
            </div>
          </>
        )}
    </main>
  );
}
