import { prismaClient } from "@/services/prismaClient";
import validator from "validator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pago, email, cedula, id, nombre_completo } = req.body;

  if (!email || !id || !nombre_completo || !cedula) {
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
      valid: validator.isLength(cedula, { min: 9, max: 15 }),
      errorMessage: "Cédula inválida.",
    },
    {
      valid: validator.isLength(nombre_completo, { min: 1, max: 20 }),
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

  const facturacion = await prismaClient.facturacion.update({
    data: {
      pago,
      email,
      cedula,
      nombre_completo,
    },
    where: {
      id,
    },
  });

  res.json(facturacion);
}
