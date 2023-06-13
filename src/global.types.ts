import { Encargado, Estudiante, Facturacion } from "@prisma/client";

export type FileRow = {
  "Cédula / \nDIMEX": string;
  "Correo Electrónico": string;
  Pago: string;
  Estado: string;
  Estudiante: string;
  "Fecha \nMatrícula": string;
  "Fecha Retiro": string;
  "Fecha de Nacimiento": string;
  "Teléfono \nEstudiante": string;
  Edad: string;
  "Grado académico Universidad, trabajador independiente ": string;
  "Institución Académica": string;
  Adecuación: string;
  "Tipo Adecuación": string;
  Enfermedad: string;
  "Tipo de Enfermedad": string;
  Domicilio: string;
  Instrumento: string;
  Docente: string;
  "Fecha de Matrícula": string;
  "Padre/Encargado": string;
  "Teléfono Padre/Encargado": string;
  "Correo Padre/Encargado": string;
  "Ocupación del Padre o Encargado": string;
  "Lugar de trabajo del Padre o Encargado": string;
  "Madre/Encargada": string;
  "Teléfono de la Madre o Encargada": string;
  "Correo electrónico de la Madre o Encargada": string;
  "Ocupación de la Madre o Encargada": string;
  "Lugar de Trabajo de la Madre o Encargada": string;
  "Apellidos y Nombre de la persona a la que se le enviará el comprobante electrónico de pago de mensualidades.": string;
  "Número de Identificación ": string;
  "Correo electrónico Facturas": string;
};

export type EstudianteFullData = {
  estudiante: Omit<
    Estudiante,
    "id" | "created_at" | "updated_at" | "facturacion_id"
  >;
  facturacion: Omit<Facturacion, "id" | "created_at" | "updated_at">;
  encargados: Array<
    Omit<Encargado, "id" | "created_at" | "updated_at" | "estudiante_id">
  >;
};
