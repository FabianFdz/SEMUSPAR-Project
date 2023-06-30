import { prismaClient } from "@/services/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body as { id: number };

  // TODO: Change for logic delete instead of hard delete.
  await prismaClient.encargado.deleteMany({
    where: {
      estudiante_id: id,
    },
  });
  await prismaClient.estudiante.delete({
    where: {
      id,
    },
  });

  res.json(true);
}
