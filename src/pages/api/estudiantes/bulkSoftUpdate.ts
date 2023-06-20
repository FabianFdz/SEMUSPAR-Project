import { prismaClient } from "@/services/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { EstudianteFullData } from "@/global.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const arrFullData = req.body as Array<EstudianteFullData>;
  const isSoft = req.query as { isSoft: boolean };

  try {
    for (const data of arrFullData) {
      const estudiante = await prismaClient.estudiante.findFirst({
        where: {
          cedula: data.estudiante.cedula,
        },
      });

      if (!estudiante) {
        await prismaClient.estudiante.create({
          data: {
            ...data.estudiante,
            facturacion: {
              create: {
                ...data.facturacion,
              },
            },
            encargados: {
              createMany: {
                data: [...data.encargados],
              },
            },
          },
        });
      } else {
        await prismaClient.estudiante.update({
          data: {
            ...data.estudiante,
            fecha_retiro: null,
            estado_comentario: "",
            estado: true,
          },
          where: {
            id: estudiante.id,
          },
        });
      }
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ errorMessage: "Error actualizando estudiantes", err });
    return;
  }

  res.json(true);
}
