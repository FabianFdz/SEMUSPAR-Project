import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { Estudiante } from "@prisma/client";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("es-mx");

const dateFormat = "DD/MMMM/YYYY";

interface Props {
  fechaNacimiento: Estudiante["fecha_nacimiento"];
}

export default function FechaNacimientoCol({ fechaNacimiento }: Props) {
  return (
    <>
      <p className="capitalize">{dayjs(fechaNacimiento).format(dateFormat)}</p>
      <p className="text-gray-400">{dayjs(fechaNacimiento).fromNow(true)}</p>
    </>
  );
}
