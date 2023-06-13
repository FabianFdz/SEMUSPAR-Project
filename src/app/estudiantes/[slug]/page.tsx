import DeleteEstudianteBtn from "@/components/estudiante/DeleteEstudianteBtn";
import EstudianteForm from "@/components/estudiante/form/EstudianteForm";
import { prismaClient } from "@/services/prismaClient";
import Link from "next/link";
import { notFound, useRouter, redirect } from "next/navigation";

const fetchEstudiante = async (id: number) => {
  const estudiante = await prismaClient.estudiante.findFirst({
    where: {
      id,
    },
  });

  if (!estudiante) {
    notFound();
  }

  return estudiante;
};

interface Props {
  params: { slug: string };
}

export default async function Estudiante({ params: { slug } }: Props) {
  const estudiante = await fetchEstudiante(parseInt(slug));

  return (
    <>
      <nav className="flex flex-row items-center justify-start space-x-6 border-b mb-8">
        <Link
          className="font-bold text-blue-900 border-b-2 border-blue-900"
          href={`/estudiantes/${slug}`}
        >
          Inicio
        </Link>
        <Link href={`/estudiantes/${slug}/encargados`}>Encargados</Link>
        <Link href={`/estudiantes/${slug}/facturacion`}>Facturación</Link>
        <DeleteEstudianteBtn estudianteId={parseInt(slug)} />
      </nav>
      <EstudianteForm estudiante={estudiante} />
    </>
  );
}
