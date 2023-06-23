import { Encargado, Estudiante, Facturacion } from "@prisma/client";

export type FileRow = {
  "Marca temporal": string;
  "Dirección de correo electrónico": string;
  "1.1 Cédula de la persona estudiante (Nacionales) o Número DIMEX (Extranjeros)": string;
  "1.2 Apellidos y Nombre de la persona estudiante": string;
  "1.3 Teléfono de la persona estudiante": string;
  "1.4 Correo electrónico": string;
  "1.5 Fecha de Nacimiento": string;
  "1.6 Edad": string;
  "1.7 Grado Académico en el 2023": string;
  "1.8 Institución académica de la persona estudiante": string;
  "1.9 ¿Posee Adecuación Curricular?": string;
  "1.10 Indique el tipo de Adecuación Curricular": string;
  "1.11 ¿Posee alguna enfermedad, factor de riesgo o toma algún medicamento?": string;
  "1.12 Especifique la opción seleccionada de la pregunta anterior": string;
  "1.13 Dirección exacta del domicilio actual": string;
  "2.1 Instrumento o Curso": string;
  "2.2 Para estudiantes mayores de 18 años: Marque la opción del plan que desea matricular:": string;
  "3.1 Fecha de Matrícula": string;
  "4.1 Nombre completo del Padre o Encargado": string;
  "4.2 Teléfono del Padre o Encargado": string;
  "4.3 Correo electrónico del Padre o Encargado": string;
  "4.4 Ocupación del Padre o Encargado": string;
  "4.5 Lugar de trabajo del Padre o Encargado": string;
  "4.6 Nombre completo de la Madre o Encargada": string;
  "4.7 Teléfono de la Madre o Encargada": string;
  "4.8 Correo electrónico de la Madre o Encargada": string;
  "4.9 Ocupación de la Madre o Encargada": string;
  "4.10 Lugar de trabajo de la Madre o Encargada": string;
  "5.1 Apellidos y Nombre de la persona a la que se le enviará el comprobante electrónico de pago de mensualidades.": string;
  "5.2 Número de Identificación": string;
  "5.3 Correo electrónico": string;
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
