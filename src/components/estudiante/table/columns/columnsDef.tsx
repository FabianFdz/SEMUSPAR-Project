import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { StatusChip } from "@/components/StatusChip";
import { createColumnHelper } from "@tanstack/react-table";
import { calculateAge } from "@/utils/personaUtils";
import FechaMatriculaCol from "./FechaMatriculaCol";
import FechaRetiroCol from "./FechaRetiroCol";
import { EstudiantesInfoTable } from "../EstudiantesList";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("es-mx");

const dateFormat = "DD/MMMM/YYYY";

const columnHelper = createColumnHelper<EstudiantesInfoTable>();
export const estudiantesColumnsDef = [
  columnHelper.accessor((row) => row.estado, {
    id: "estado",
    cell: (info) => <StatusChip active={info.getValue()} />,
    header: () => <span className="font-normal uppercase">Estado</span>,
  }),
  columnHelper.accessor((row) => row.fecha_matricula, {
    id: "fecha_matricula",
    cell: (info) => <FechaMatriculaCol fechaMatricula={info.getValue()} />,
    header: () => <span className="font-normal uppercase">Matrícula</span>,
  }),
  columnHelper.accessor((row) => row.fecha_retiro, {
    id: "fecha_retiro",
    cell: (info) => {
      const fechaRetiro = info.getValue();
      return <FechaRetiroCol fechaRetiro={info.getValue()} />;
    },
    header: () => <span className="font-normal uppercase">Retiro</span>,
  }),
  columnHelper.accessor((row) => row.cedula, {
    id: "cedula",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span className="font-normal uppercase">Cédula</span>,
  }),
  columnHelper.accessor((row) => row.nombre, {
    id: "nombre",
    cell: (info) => (
      <div>
        <p>{info.getValue()}</p>
        <p className="text-gray-400">{info.row.original.email}</p>
      </div>
    ),
    header: () => <span className="font-normal uppercase">Nombre</span>,
  }),
  columnHelper.accessor((row) => row.apellidos, {
    id: "apellidos",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span className="font-normal uppercase">Apellidos</span>,
  }),
  columnHelper.accessor((row) => row.fecha_nacimiento, {
    id: "fecha_nacimiento",
    cell: (info) => (
      <div>
        <p className="capitalize">
          {dayjs(info.getValue()).format(dateFormat)}
        </p>
        <p className="text-gray-400">{calculateAge(info.getValue())} años</p>
      </div>
    ),
    header: () => (
      <span className="font-normal uppercase">Fecha de Nacimiento</span>
    ),
  }),
];
