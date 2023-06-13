"use client";

import { ChangeEvent, useState } from "react";
import { parse } from "papaparse";
import { Encargado, Estudiante, Facturacion } from "@prisma/client";
import { extractFirstNames, extractLastNames } from "@/utils/personaUtils";
import { EstudianteFullData, FileRow } from "@/global.types";
import { useEstudiante } from "@/hooks/useEstudiante";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ImportPage() {
  const router = useRouter();
  const { bulkUpdate, loading } = useEstudiante();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [csvData, setCSVData] = useState<Array<FileRow> | null>(null);
  const [dataSample, setDataSample] = useState<string[][] | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      setSelectedFile(file);
      if (file) {
        const text = await file.text();
        const parsedData = parse(text, { header: true, skipEmptyLines: true })
          .data as Array<FileRow>;
        const parsedDataToShow = parse(text, {
          header: false,
          skipEmptyLines: true,
        }).data as string[][];

        setCSVData(parsedData);
        setDataSample(parsedDataToShow);
      }
    }
  };

  const importBtnOnClick = async () => {
    if (csvData) {
      const estudiantes: Array<EstudianteFullData> = [];
      for (let row of csvData) {
        const newEstudiante: Omit<
          Estudiante,
          "id" | "created_at" | "updated_at" | "facturacion_id"
        > = {
          adecuacion: row["Adecuación"]?.toLowerCase().trim().includes("no"),
          apellidos: extractLastNames(row["Estudiante"].trim()),
          cedula: row[`Cédula / \nDIMEX`].trim(),
          consideraciones_medicas: row["Enfermedad"].trim(),
          direccion: row["Domicilio"].trim(),
          docente: row["Docente"].trim(),
          email: row["Correo Electrónico"].trim(),
          enfermedades: row["Tipo de Enfermedad"].trim(),
          estado: row["Estado"].toLowerCase().trim() === "activo",
          estado_comentario:
            row["Estado"].trim().toLowerCase() === "activo"
              ? ""
              : row["Estado"].trim(),
          fecha_matricula: new Date(row[`Fecha \nMatrícula`].trim()),
          fecha_nacimiento: row["Fecha de Nacimiento"].trim(),
          fecha_retiro:
            row["Fecha Retiro"].trim() !== ""
              ? new Date(row["Fecha Retiro"].trim())
              : null,
          grado_academico:
            row[
              "Grado académico Universidad, trabajador independiente "
            ].trim(),
          institucion_academica: row["Institución Académica"].trim(),
          instrumento: row["Instrumento"].trim(),
          nombre: extractFirstNames(row["Estudiante"].trim()),
          telefono: row[`Teléfono \nEstudiante`].trim(),
          tipo_adecuacion: row["Tipo Adecuación"].trim(),
          lugar_trabajo: "",
          trabaja: false,
        };

        const encargadoPadre: Omit<
          Encargado,
          "id" | "created_at" | "updated_at" | "estudiante_id"
        > = {
          email: row["Correo Padre/Encargado"].trim(),
          lugar_trabajo: row["Lugar de trabajo del Padre o Encargado"].trim(),
          nombre_completo: row["Padre/Encargado"].trim(),
          ocupacion: row["Ocupación del Padre o Encargado"].trim(),
          parentezco: "PADRE",
          telefono: row["Teléfono Padre/Encargado"].trim(),
        };

        const encargadoMadre: Omit<
          Encargado,
          "id" | "created_at" | "updated_at" | "estudiante_id"
        > = {
          email: row["Correo electrónico de la Madre o Encargada"].trim(),
          lugar_trabajo: row["Lugar de Trabajo de la Madre o Encargada"].trim(),
          nombre_completo: row["Madre/Encargada"].trim(),
          ocupacion: row["Ocupación de la Madre o Encargada"].trim(),
          parentezco: "MADRE",
          telefono: row["Teléfono de la Madre o Encargada"].trim(),
        };

        const facturacion: Omit<
          Facturacion,
          "id" | "created_at" | "updated_at"
        > = {
          cedula: row["Número de Identificación "].trim(),
          email: row["Correo electrónico Facturas"].trim(),
          nombre_completo:
            row[
              "Apellidos y Nombre de la persona a la que se le enviará el comprobante electrónico de pago de mensualidades."
            ],
          pago: row["Pago"] || "Regular",
        };

        estudiantes.push({
          estudiante: { ...newEstudiante },
          facturacion: { ...facturacion },
          encargados: [encargadoMadre, encargadoPadre],
        });
      }
      await bulkUpdate(estudiantes);
      router.push("/estudiantes");
    }
  };

  return (
    <main className="flex flex-col w-full flex-1 px-20 space-y-4">
      <h1 className="text-xl font-bold">Importar Estudiantes</h1>
      {!loading && (
        <div className="flex flex-col items-center justify-center">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-slate-200 text-blue-600 rounded-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
          Estudiantes a importar en la base de datos: {dataSample.length - 1}
        </p>
      )}
      {!loading && dataSample && dataSample.length > 0 && (
        <>
          <table className="mt-4 border border-gray-500 rounded">
            <thead>
              <tr>
                {dataSample[0].slice(0, 10).map((header, index) => (
                  <th
                    key={index}
                    className="p-2 border rounded border-gray-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSample.slice(1, 12).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.slice(0, 10).map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-2 border border-gray-500">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="px-3 py-2 bg-blue-600 rounded-md text-white w-1/12"
            onClick={importBtnOnClick}
          >
            Importar
          </button>
        </>
      )}
    </main>
  );
}
