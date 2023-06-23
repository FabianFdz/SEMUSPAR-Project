import validator from "validator";
import { Estudiante } from "@prisma/client";
import { prismaClient } from "@/services/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    id,
    email,
    estado,
    cedula,
    docente,
    trabaja,
    telefono,
    direccion,
    adecuacion,
    instrumento,
    fecha_retiro,
    enfermedades,
    lugar_trabajo,
    nombreCompleto,
    grado_academico,
    tipo_adecuacion,
    fecha_nacimiento,
    estado_comentario,
    institucion_academica,
    consideraciones_medicas,
  } = req.body as Partial<Estudiante>;

  if (!cedula || !nombreCompleto || !fecha_nacimiento || !instrumento) {
    return res.status(400).json({
      errorMessage: "Datos incompletos.",
    });
  }

  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(cedula, { min: 9, max: 15 }),
      errorMessage: "Cédula completa requerida.",
    },
    {
      valid: validator.isLength(nombreCompleto, { min: 2 }),
      errorMessage: "Nombre completo requerido.",
    },
    {
      valid: validator.isDate(fecha_nacimiento),
      errorMessage: "Fecha de nacimiento requerida.",
    },
    {
      valid: validator.isLength(instrumento, { min: 2 }),
      errorMessage: "Instrumento requerido.",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return res.status(400).json({
      errorMessage: errors[0],
    });
  }

  const estudiante = await prismaClient.estudiante.create({
    data: {
      email,
      cedula,
      docente,
      trabaja,
      telefono,
      direccion,
      adecuacion,
      instrumento,
      estado: true,
      fecha_retiro,
      enfermedades,
      lugar_trabajo,
      nombreCompleto,
      grado_academico,
      tipo_adecuacion,
      fecha_nacimiento,
      estado_comentario,
      institucion_academica,
      consideraciones_medicas,
      fecha_matricula: new Date().toISOString(),
    },
  });

  res.json(estudiante);
}
