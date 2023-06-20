import { EstudianteFullData, FileRow } from "@/global.types";
import { Estudiante, Encargado, Facturacion } from "@prisma/client";
import {
  extractLastNames,
  convertDateStandard,
  extractFirstNames,
} from "./personaUtils";

/**
 * Parses CSV data of estudiantes and returns an array of EstudianteFullData objects
 *
 * @param {FileRow[]} csvData The CSV data to parse
 * @returns {EstudianteFullData[]} An array of EstudianteFullData objects parsed from the CSV data
 */
export function parseEstudiantesData(
  csvData: FileRow[]
): Array<EstudianteFullData> {
  const estudiantes: Array<EstudianteFullData> = [];
  for (let row of csvData) {
    const newEstudiante: Omit<
      Estudiante,
      "id" | "created_at" | "updated_at" | "facturacion_id"
    > = {
      adecuacion: row["Adecuación"]?.toLowerCase().trim().includes("no"),
      apellidos: extractLastNames(row["Estudiante"].trim()),
      cedula: row[`Cédula / \nDIMEX`].trim().split(".")[0],
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
      fecha_nacimiento: convertDateStandard(row["Fecha de Nacimiento"].trim()),
      fecha_retiro:
        row["Fecha Retiro"].trim() !== ""
          ? new Date(row["Fecha Retiro"].trim())
          : null,
      grado_academico:
        row["Grado académico Universidad, trabajador independiente "].trim(),
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

    const facturacion: Omit<Facturacion, "id" | "created_at" | "updated_at"> = {
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

  return estudiantes;
}
