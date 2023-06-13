import Link from "next/link";
import { prismaClient } from "@/services/prismaClient";
import EstudiantesList from "@/components/estudiante/table/EstudiantesList";

const fetchEstudiantes = async () => {
  const estudiantes = await prismaClient.estudiante.findMany({
    select: {
      id: true,
      nombre: true,
      apellidos: true,
      estado: true,
      fecha_matricula: true,
      fecha_retiro: true,
      cedula: true,
      email: true,
      fecha_nacimiento: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return estudiantes;
};

export default async function Estudiantes() {
  const estudiantes = await fetchEstudiantes();

  return (
    <main className="flex flex-col w-full flex-1 px-20 text-center">
      <div className="flex flex-row mb-3 justify-between">
        <h1 className="text-xl font-bold text-left">Estudiantes</h1>
        <div className="flex flex-row space-x-2">
          <Link
            href="/estudiantes/importar"
            className="px-3 py-2 bg-slate-500 rounded-md text-white"
          >
            Importar
          </Link>
          <Link
            href="/estudiantes/agregar"
            className="px-3 py-2 bg-blue-600 rounded-md text-white"
          >
            Agregar
          </Link>
        </div>
      </div>
      <EstudiantesList estudiantes={estudiantes} />
    </main>
  );
}
