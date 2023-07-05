import { Encargado, Estudiante, Facturacion } from "@prisma/client";

export interface CustomFilter<T> {
  filterKey: keyof T;
  displayName: string;
  type: "boolean" | "string" | "date";
}

export const estudiantesFilters: Array<CustomFilter<Estudiante>> = [
  {
    displayName: "Adecuación",
    filterKey: "adecuacion",
    type: "boolean",
  },
  {
    displayName: "Cédula",
    filterKey: "cedula",
    type: "string",
  },
  {
    displayName: "Consideraciones Médicas",
    filterKey: "consideraciones_medicas",
    type: "string",
  },
  {
    displayName: "Dirección",
    filterKey: "direccion",
    type: "string",
  },
  {
    displayName: "Docente",
    filterKey: "docente",
    type: "string",
  },
  {
    displayName: "Correo Electrónico",
    filterKey: "email",
    type: "string",
  },
  {
    displayName: "Enfermedades",
    filterKey: "enfermedades",
    type: "string",
  },
  {
    displayName: "Estado",
    filterKey: "estado",
    type: "boolean",
  },
  {
    displayName: "F. Matrícula",
    filterKey: "fecha_matricula",
    type: "date",
  },

  {
    displayName: "F. Nacimiento",
    filterKey: "fecha_nacimiento",
    type: "date",
  },
  {
    displayName: "F. Retiro",
    filterKey: "fecha_retiro",
    type: "date",
  },
  {
    displayName: "Grado Académico",
    filterKey: "grado_academico",
    type: "string",
  },
  {
    displayName: "Institución Académica",
    filterKey: "institucion_academica",
    type: "string",
  },
  {
    displayName: "Instrumento",
    filterKey: "instrumento",
    type: "string",
  },
  {
    displayName: "Nombre Completo",
    filterKey: "nombre_completo",
    type: "string",
  },
  {
    displayName: "Tipo de Adecuación",
    filterKey: "tipo_adecuacion",
    type: "string",
  },
];

export const encargadosFilters: Array<CustomFilter<Encargado>> = [
  {
    displayName: "Lugar de Trabajo",
    filterKey: "lugar_trabajo",
    type: "string",
  },
  {
    displayName: "Ocupación",
    filterKey: "ocupacion",
    type: "string",
  },
  {
    displayName: "Parentezco",
    filterKey: "parentezco",
    type: "string",
  },
];

export const facturacionFilters: Array<CustomFilter<Facturacion>> = [
  {
    displayName: "Pago",
    filterKey: "pago",
    type: "string",
  },
];
