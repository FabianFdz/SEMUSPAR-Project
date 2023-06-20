"use client";

import { ChangeEvent, useState } from "react";
import { parse } from "papaparse";
import { EstudianteFullData, FileRow } from "@/global.types";
import { useEstudiante } from "@/hooks/useEstudiante";
import { Alert, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { parseEstudiantesData } from "@/utils/estudianteUtils";
import FechaNacimientoCol from "@/components/estudiante/table/columns/FechaNacimientoCol";

export default function ImportPage() {
  const router = useRouter();
  const { bulkUpdate, loading } = useEstudiante();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [csvData, setCSVData] = useState<Array<EstudianteFullData> | null>(
    null
  );
  const [fileLoadError, setFileLoadError] = useState<string | null>(null);
  const [dataSample, setDataSample] = useState<Array<{
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    fecha_matricula: Date;
    cedula: string;
    email: string | null;
  }> | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      setFileLoadError(null);
      if (file && file.type === "text/csv") {
        setSelectedFile(file);
        try {
          const text = await file.text();
          const parsedData = parseEstudiantesData(
            parse(text, { header: true, skipEmptyLines: true })
              .data as Array<FileRow>
          );

          setCSVData(parsedData);
          setDataSample(
            parsedData.map(
              ({
                estudiante: {
                  nombre,
                  apellidos,
                  fecha_nacimiento,
                  fecha_matricula,
                  cedula,
                  email,
                },
              }) => ({
                nombre,
                apellidos,
                fecha_nacimiento,
                fecha_matricula,
                cedula,
                email,
              })
            )
          );
        } catch (err: any) {
          setFileLoadError(err.message);
        }
      } else {
        setFileLoadError("Seleccione un archivo de tipo CSV.");
      }
    }
  };

  const importBtnOnClick = async (isSoftUpdate: boolean) => {
    if (csvData) {
      await bulkUpdate(csvData, isSoftUpdate);
      router.push("/estudiantes");
    }
  };

  return (
    <main className="flex flex-col w-full flex-1 px-20 space-y-4">
      <h1 className="text-xl font-bold">Importar Estudiantes</h1>
      {fileLoadError && <Alert severity="error">{fileLoadError}</Alert>}
      {!loading && (
        <div className="flex flex-col items-center justify-center">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-slate-200 text-blue-600 rounded-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>

            <span className="mt-2 text-base leading-normal">
              {selectedFile ? selectedFile.name : "Seleccione un archivo"}
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      )}
      {loading && (
        <div className="mx-auto flex flex-col items-center space-y-7">
          <CircularProgress size={50} className="mt-44" />
          <p className="animate-bounce">Actualizando lista de estudiantes...</p>
        </div>
      )}
      {!loading && dataSample && (
        <p>
          <strong>Estudiantes a importar en la base de datos:</strong>{" "}
          {dataSample.length - 1}
        </p>
      )}
      {!loading && dataSample && dataSample.length > 0 && (
        <>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr className="py-3">
                        {Object.keys(dataSample[0]).map((header, idx) => (
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
                      {dataSample.map((estudiante, idx) => (
                        <tr key={estudiante.cedula}>
                          {Object.keys(dataSample[0]).map((key) => {
                            const value =
                              estudiante[key as keyof typeof estudiante];
                            return (
                              <td
                                key={key}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {value && typeof value === "object" ? (
                                  <FechaNacimientoCol
                                    key={key}
                                    fechaNacimiento={(
                                      value as Date
                                    ).toISOString()}
                                  />
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
