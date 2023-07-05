import Link from "next/link";
import { prismaClient } from "@/services/prismaClient";
import EstudiantesList, {
  EstudiantesInfoTable,
} from "@/components/estudiante/table/EstudiantesList";

const fetchEstudiantes = async () => {
  const estudiantes = await prismaClient.estudiante.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return estudiantes;
};

interface Props {
  searchParams: Partial<EstudiantesInfoTable>;
}

export default async function Estudiantes({ searchParams }: Props) {
  const estudiantes = await fetchEstudiantes();

  return (
    <main className="flex flex-col w-full flex-1 px-20 text-center">
      <div className="flex flex-row mb-3 justify-between">
        <h1 className="text-xl font-bold text-left">Estudiantes</h1>
        <div className="flex flex-row space-x-2">
          <Link
            href="/estudiantes/refrescarDatos"
            className="px-3 py-2 bg-blue-900 rounded-md text-white"
          >
            Actualizar con formulario
          </Link>
          <Link
            href="/estudiantes/agregar"
            className="px-3 py-2 bg-blue-600 rounded-md text-white"
          >
            Agregar
          </Link>
        </div>
      </div>
      <EstudiantesList searchParams={searchParams} estudiantes={estudiantes} />
    </main>
  );
}

export const revalidate = 1;
