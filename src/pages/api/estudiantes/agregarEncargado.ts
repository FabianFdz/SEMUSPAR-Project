import { prismaClient } from "@/services/prismaClient";
import validator from "validator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email,
    telefono,
    ocupacion,
    parentezco,
    lugar_trabajo,
    estudiante_id,
    nombre_completo,
  } = req.body;

  if (
    !email ||
    !telefono ||
    !parentezco ||
    !estudiante_id ||
    !nombre_completo
  ) {
    return res.status(400).json({
      errorMessage: "Datos incompletos.",
    });
  }

  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Correo electrónico inválido.",
    },
    {
      valid: validator.isLength(telefono, { min: 8 }),
      errorMessage: "Teléfono inválido.",
    },
    {
      valid: validator.isLength(nombre_completo, { min: 2 }),
      errorMessage: "Nombre completo requerido.",
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

  const encargado = await prismaClient.encargado.create({
    data: {
      email,
      telefono,
      ocupacion: ocupacion ?? "",
      parentezco,
      lugar_trabajo: lugar_trabajo ?? "",
      estudiante_id,
      nombre_completo,
    },
  });

  res.json(encargado);
}
