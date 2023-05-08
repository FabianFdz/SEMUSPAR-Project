import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusChip } from "@/components/StatusChip";
import { prismaClient } from "@/services/prismaClient";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("es-mx");
const dateFormat = "DD/MMMM/YYYY";

// const columnHelper = createColumnHelper<Estudiante>();
// const columns = [
//   columnHelper.accessor((row) => row.estado, {
//     id: "estado",
//     cell: (info) => <StatusChip active={info.getValue()} />,
//     header: () => <span className="font-normal uppercase">Estado</span>,
//   }),
//   columnHelper.accessor((row) => row.fecha_matricula, {
//     id: "fecha_matricula",
//     cell: (info) => (
//       <div>
//         <p className="capitalize">
//           {dayjs(info.getValue()).format(dateFormat)}
//         </p>
//         <p className="text-gray-400">{dayjs(info.getValue()).fromNow()}</p>
//       </div>
//     ),
//     header: () => <span className="font-normal uppercase">Matrícula</span>,
//   }),
//   columnHelper.accessor((row) => row.fecha_retiro, {
//     id: "fecha_retiro",
//     cell: (info) => (
//       <div>
//         <p className="capitalize">
//           {dayjs(info.getValue()).format(dateFormat)}
//         </p>
//         <p className="text-gray-400">{dayjs(info.getValue()).fromNow()}</p>
//       </div>
//     ),
//     header: () => <span className="font-normal uppercase">Retiro</span>,
//   }),
//   columnHelper.accessor((row) => row.cedula, {
//     id: "cedula",
//     cell: (info) => (
//       <div>
//         <p>{info.getValue()}</p>
//       </div>
//     ),
//     header: () => <span className="font-normal uppercase">Cédula</span>,
//   }),
//   columnHelper.accessor((row) => row.nombre, {
//     id: "nombre",
//     cell: (info) => (
//       <div>
//         <p>{info.getValue()}</p>
//         <p className="text-gray-400">{info.row.original.CorreoElectronico}</p>
//       </div>
//     ),
//     header: () => <span className="font-normal uppercase">Nombre</span>,
//   }),
//   columnHelper.accessor((row) => row.apellidos, {
//     id: "apellidos",
//     cell: (info) => <p>{info.getValue()}</p>,
//     header: () => <span className="font-normal uppercase">Apellidos</span>,
//   }),
//   columnHelper.accessor((row) => row.fecha_nacimiento, {
//     id: "fecha_nacimiento",
//     cell: (info) => (
//       <div>
//         <p className="capitalize">
//           {dayjs(info.getValue()).format(dateFormat)}
//         </p>
//         <p className="text-gray-400">{dayjs(info.getValue()).fromNow()}</p>
//       </div>
//     ),
//     header: () => (
//       <span className="font-normal uppercase">Fecha de Nacimiento</span>
//     ),
//   }),
// ];

const fetchEstudiantes = async () => {
  const estudiantes = prismaClient.estudiante.findMany({
    select: {
      nombre: true,
      apellidos: true,
      estado: true,
      fecha_matricula: true,
      fecha_retiro: true,
      cedula: true,
      fecha_nacimiento: true,
    },
  });
  return estudiantes;
};

export default async function Estudiantes() {
  const data = await fetchEstudiantes();
  console.log(data);
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
      {/* <Table columns={columns} data={data} /> */}
    </main>
  );
}
