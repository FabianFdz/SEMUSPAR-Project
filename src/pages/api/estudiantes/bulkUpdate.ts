import { prismaClient } from "@/services/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { EstudianteFullData } from "@/global.types";
import { isInThisPeriod } from "@/utils/estudianteUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const arrFullData = req.body as Array<EstudianteFullData>;
  let { isSoft } = req.query;
  let isSoftUpdate = isSoft === "true";

  if (!isSoftUpdate) {
    await prismaClient.estudiante.updateMany({
      data: {
        fecha_retiro: new Date(),
        estado_comentario: "Retiro",
        estado: false,
      },
    });
  }

  try {
    for (const data of arrFullData) {
      const estudiante = await prismaClient.estudiante.findFirst({
        where: {
          cedula: data.estudiante.cedula,
        },
      });

      if (!estudiante) {
        const facturacionEstudiante = await prismaClient.facturacion.create({
          data: {
            ...data.facturacion,
          },
        });
        await prismaClient.estudiante.create({
          data: {
            ...data.estudiante,
            facturacion_id: facturacionEstudiante.id,
            encargados: {
              createMany: {
                data: [...data.encargados],
              },
            },
          },
        });
      } else {
        if (
          !isInThisPeriod(
            estudiante.fecha_matricula,
            new Date(data.estudiante.fecha_matricula)
          )
        ) {
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
