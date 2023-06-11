import EstudianteEncargadoForm from "@/components/estudiante/form/EstudianteEncargadoForm";
import { prismaClient } from "@/services/prismaClient";
import { PARENTEZCO } from "@prisma/client";
import Link from "next/link";

const fetchEstudiante = async (id: number) => {
  const estudiante = await prismaClient.estudiante.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      encargados: true,
    },
  });

  if (!estudiante) {
    throw new Error();
  }

  return estudiante;
};

interface Props {
  params: { slug: string };
}

export default async function EncargadosPage({ params: { slug } }: Props) {
  const estudiante = await fetchEstudiante(parseInt(slug));

  return (
    <>
      <nav className="flex flex-row items-center justify-start space-x-6 border-b mb-8">
        <Link href={`/estudiantes/${slug}`}>Inicio</Link>
        <Link
          className="font-bold text-blue-900 border-b-2 border-blue-900"
          href={`/estudiantes/${slug}/encargados`}
        >
          Encargados
        </Link>
        <Link href={`/estudiantes/${slug}/facturacion`}>Facturación</Link>
      </nav>
      <div className="flex flex-col space-y-6">
        {estudiante.encargados.length > 1 ? ( // It's with both:
          <>
            {estudiante.encargados
              .sort((madre, padre) =>
                madre.parentezco
                  .toLocaleLowerCase()
                  .localeCompare(padre.parentezco.toLocaleLowerCase())
              )
              .map((encargado, idx) => (
                <EstudianteEncargadoForm
                  id={estudiante.id}
                  encargado={encargado}
                  parentezco={encargado.parentezco}
                  key={`${idx}-${encargado.parentezco}`}
                />
              ))}
          </>
        ) : estudiante.encargados.length ? ( // It's with one only:
          <>
            <EstudianteEncargadoForm
              id={estudiante.id}
              encargado={estudiante.encargados[0]}
              parentezco={estudiante.encargados[0].parentezco}
            />
            <EstudianteEncargadoForm
              id={estudiante.id}
              parentezco={
                estudiante.encargados[0].parentezco === PARENTEZCO.MADRE
                  ? PARENTEZCO.PADRE
                  : PARENTEZCO.MADRE
              }
            />
          </>
        ) : (
          // It's empty:
          <>
            <EstudianteEncargadoForm
              id={estudiante.id}
              parentezco={PARENTEZCO.MADRE}
            />
            <EstudianteEncargadoForm
              id={estudiante.id}
              parentezco={PARENTEZCO.PADRE}
            />
          </>
        )}
      </div>
    </>
  );
}
