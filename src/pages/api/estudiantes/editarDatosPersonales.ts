import { prismaClient } from "@/services/prismaClient";
import { Estudiante } from "@prisma/client";
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
    nombre_completo,
    grado_academico,
    tipo_adecuacion,
    fecha_nacimiento,
    estado_comentario,
    institucion_academica,
    consideraciones_medicas,
  } = req.body as Partial<Estudiante>;

  const estudiante = await prismaClient.estudiante.update({
    where: {
      id,
    },
    data: {
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
      nombre_completo,
      grado_academico,
      tipo_adecuacion,
      fecha_nacimiento,
      estado_comentario,
      institucion_academica,
      consideraciones_medicas,
    },
  });

  res.json(estudiante);
}
