"use client";

import Table from "@/components/Table";
import { estudiantesColumnsDef } from "./columns/columnsDef";
import { ChangeEvent, useEffect, useState } from "react";
import { StatusChip } from "@/components/StatusChip";
import { useRouter } from "next/navigation";

export interface EstudiantesInfoTable {
  id: number;
  estado: boolean;
  fecha_nacimiento: string;
  cedula: string;
  nombre: string;
  apellidos: string;
  email: string | null;
  instrumento: string;
  docente: string | null;
}

interface Props {
  estudiantes: Array<EstudiantesInfoTable>;
}

export default function EstudiantesList({ estudiantes }: Props) {
  const [estado, setEstado] = useState<boolean | null>(null);
  const [filtro, setFiltro] = useState<string>("");
  const router = useRouter();

  const handleLimpiarFiltros = () => {
    setEstado(null);
    setFiltro("");
  };

  const estudiantesFiltered = () => {
    return estudiantes.filter(
      (estudiante) =>
        (estado === null || estudiante.estado === estado) &&
        (estudiante.nombre
          .toLowerCase()
          .includes(filtro.trim().toLowerCase()) ||
          estudiante.cedula
            .toLowerCase()
            .includes(filtro.trim().toLowerCase()) ||
          estudiante.apellidos
            .toLowerCase()
            .includes(filtro.trim().toLowerCase()))
    );
  };

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full space-x-12">
        <input
          type="text"
          className="border w-2/12 p-2 px-3 py-2 rounded-md bg-gray-100"
          placeholder="Buscar nombre o cédula..."
          value={filtro}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFiltro(e.target.value)
          }
        />
        <div className="flex flex-row items-center space-x-2 text-center">
          <div className="cursor-pointer" onClick={() => setEstado(true)}>
            {estado === false ? (
              <StatusChip active disabled />
            ) : (
              <StatusChip active />
            )}
          </div>
          <div className="cursor-pointer" onClick={() => setEstado(false)}>
            {estado === true ? (
              <StatusChip active={false} disabled />
            ) : (
              <StatusChip active={false} />
            )}
          </div>
        </div>
        <button
          className="py-2 px-3 bg-transparent underline text-blue-600 rounded-lg hover:no-underline active:underline"
          onClick={handleLimpiarFiltros}
        >
          Limpiar filtros
        </button>
      </div>
      <Table columns={estudiantesColumnsDef} data={estudiantesFiltered()} />
    </div>
  );
}
