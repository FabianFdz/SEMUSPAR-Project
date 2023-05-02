"use client";

import { estudiantes } from "@/mock/estudiantes";
import DataTable, { TableColumn } from "react-data-table-component";

const columns: Array<TableColumn<any>> = [
  {
    name: "Estado",
    selector: (row) => (row.Estado ? "Activo" : "Retirado"),
  },
  {
    name: "Nombre Completo",
    selector: (row) => `${row.Apellidos}, ${row.Nombre}`,
  },
  {
    name: "Fecha Matricula",
    selector: (row) => row.FechaMatricula,
  },
  {
    name: "Fecha Retiro",
    selector: (row) => row.FechaRetiro,
  },
  {
    name: "Instrumento",
    selector: (row) => row.Instrumento,
  },
];

export default function Estudiantes() {
  return (
    <main className="flex flex-col w-full flex-1 px-20 text-center">
      <div className="flex flex-row mb-3">
        <h2 className="text-xl font-bold text-left">Estudiantes</h2>
      </div>
      <DataTable dense pagination columns={columns} data={estudiantes} />
    </main>
  );
}
