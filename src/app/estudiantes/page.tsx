"use client";

import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import Link from "next/link";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Estudiante } from "@/global.types";
import { estudiantes } from "@/mock/estudiantes";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusChip } from "@/components/StatusChip";
import Table from "@/components/Table";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("es-mx");
const dateFormat = "DD/MMMM/YYYY";

const columnHelper = createColumnHelper<Estudiante>();
const columns = [
  columnHelper.accessor((row) => row.Estado, {
    id: "Estado",
    cell: (info) => <StatusChip active={info.getValue()} />,
    header: () => <span className="font-normal uppercase">Estado</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.FechaMatricula, {
    id: "FechaMatricula",
    cell: (info) => (
      <div>
        <p className="capitalize">
          {dayjs(info.getValue()).format(dateFormat)}
        </p>
        <p className="text-gray-400">{dayjs(info.getValue()).fromNow()}</p>
      </div>
    ),
    header: () => <span className="font-normal uppercase">Matrícula</span>,
  }),
  columnHelper.accessor((row) => row.FechaRetiro, {
    id: "FechaRetiro",
    cell: (info) => (
      <div>
        <p className="capitalize">
          {dayjs(info.getValue()).format(dateFormat)}
        </p>
        <p className="text-gray-400">{dayjs(info.getValue()).fromNow()}</p>
      </div>
    ),
    header: () => <span className="font-normal uppercase">Retiro</span>,
  }),
  columnHelper.accessor((row) => row.Cedula, {
    id: "Cedula",
    cell: (info) => (
      <div>
        <p>{info.getValue()}</p>
      </div>
    ),
    header: () => <span className="font-normal uppercase">Cédula</span>,
  }),
  columnHelper.accessor((row) => row.Nombre, {
    id: "Nombre",
    cell: (info) => (
      <div>
        <p>{info.getValue()}</p>
        <p className="text-gray-400">{info.row.original.CorreoElectronico}</p>
      </div>
    ),
    header: () => <span className="font-normal uppercase">Nombre</span>,
  }),
  columnHelper.accessor((row) => row.Apellidos, {
    id: "Apellidos",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span className="font-normal uppercase">Apellidos</span>,
  }),
  columnHelper.accessor((row) => row.FechaNacimiento, {
    id: "FechaNacimiento",
    cell: (info) => (
      <div>
        <p className="capitalize">
          {dayjs(info.getValue()).format(dateFormat)}
        </p>
        <p className="text-gray-400">{dayjs(info.getValue()).fromNow()}</p>
      </div>
    ),
    header: () => (
      <span className="font-normal uppercase">Fecha de Nacimiento</span>
    ),
  }),
];

const data = estudiantes;

export default function Estudiantes() {
  return (
    <main className="flex flex-col w-full flex-1 px-20 text-center">
      <div className="flex flex-row mb-3 justify-between">
        <h2 className="text-xl font-bold text-left">Estudiantes</h2>
        <Link
          href="/estudiantes/agregar"
          className="px-3 py-2 bg-blue-600 rounded-md text-white"
        >
          Agregar
        </Link>
      </div>
      <Table columns={columns} data={data} />
    </main>
  );
}
