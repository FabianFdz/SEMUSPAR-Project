import { StatusChip } from "@/components/StatusChip";
import { createColumnHelper } from "@tanstack/react-table";
import FechaMatriculaCol from "./FechaMatriculaCol";
import FechaRetiroCol from "./FechaRetiroCol";
import { EstudiantesInfoTable } from "../EstudiantesList";
import NombreCol from "./NombreCol";
import FechaNacimientoCol from "./FechaNacimientoCol";
import Header from "./Header";
import Link from "next/link";

const columnHelper = createColumnHelper<EstudiantesInfoTable>();
export const estudiantesColumnsDef = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => (
      <Link
        className="text-blue-600"
        href={`/estudiantes/${info.row.original.id}`}
      >
        #{info.getValue()}
      </Link>
    ),
    header: () => <Header text="ID" />,
  }),
  columnHelper.accessor((row) => row.estado, {
    id: "estado",
    cell: (info) => <StatusChip active={info.getValue()} />,
    header: () => <Header text="Estado" />,
  }),
  columnHelper.accessor((row) => row.fecha_matricula, {
    id: "fecha_matricula",
    cell: (info) => <FechaMatriculaCol fechaMatricula={info.getValue()} />,
    header: () => <Header text="Matrícula" />,
  }),
  columnHelper.accessor((row) => row.fecha_retiro, {
    id: "fecha_retiro",
    cell: (info) => <FechaRetiroCol fechaRetiro={info.getValue()} />,
    header: () => <Header text="Retiro" />,
  }),
  columnHelper.accessor((row) => row.cedula, {
    id: "cedula",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Cédula" />,
  }),
  columnHelper.accessor((row) => row.nombre, {
    id: "nombre",
    cell: (info) => (
      <NombreCol email={info.row.original.email} nombre={info.getValue()} />
    ),
    header: () => <Header text="Nombre" />,
  }),
  columnHelper.accessor((row) => row.apellidos, {
    id: "apellidos",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <Header text="Apellidos" />,
  }),
  columnHelper.accessor((row) => row.fecha_nacimiento, {
    id: "fecha_nacimiento",
    cell: (info) => <FechaNacimientoCol fechaNacimiento={info.getValue()} />,
    header: () => <Header text="Fecha de Nacimiento" />,
  }),
];
