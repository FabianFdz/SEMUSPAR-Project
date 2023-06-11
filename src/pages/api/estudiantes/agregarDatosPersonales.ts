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
    nombre,
    docente,
    trabaja,
    telefono,
    apellidos,
    direccion,
    adecuacion,
    instrumento,
    fecha_retiro,
    enfermedades,
    lugar_trabajo,
    grado_academico,
    tipo_adecuacion,
    fecha_nacimiento,
    estado_comentario,
    institucion_academica,
    consideraciones_medicas,
  } = req.body as Partial<Estudiante>;

  if (!cedula || !nombre || !apellidos || !fecha_nacimiento || !instrumento) {
    return res.status(400).json({
      errorMessage: "Datos incompletos.",
    });
  }

  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(cedula, { min: 1 }),
      errorMessage: "Cédula requerida.",
    },
    {
      valid: validator.isLength(nombre, { min: 1 }),
      errorMessage: "Nombre requerido.",
    },
    {
      valid: validator.isLength(apellidos, { min: 1 }),
      errorMessage: "Apellidos requeridos.",
    },
    {
      valid: validator.isLength(fecha_nacimiento, { min: 1 }),
      errorMessage: "Fecha de nacimiento requerida.",
    },
    {
      valid: validator.isLength(instrumento, { min: 1 }),
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
      nombre,
      docente,
      trabaja,
      telefono,
      apellidos,
      direccion,
      adecuacion,
      instrumento,
      estado: true,
      fecha_retiro,
      enfermedades,
      lugar_trabajo,
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
