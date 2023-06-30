"use client";

import Filtros from "./Filtros";
import Table from "@/components/Table";
import { useState } from "react";
import { estudiantesColumnsDef } from "./columns/columnsDef";

export interface EstudiantesInfoTable {
  id: number;
  estado: boolean;
  fecha_nacimiento: string;
  cedula: string;
  nombre_completo: string;
  email: string | null;
  instrumento: string;
  docente: string | null;
}

interface Props {
  estudiantes: Array<EstudiantesInfoTable>;
  searchParams: Partial<EstudiantesInfoTable>;
}

export default function EstudiantesList({ estudiantes, searchParams }: Props) {
  const [filteredEstudiantes, setFilteredEstudiantes] = useState(estudiantes);

  return (
    <>
      <Filtros
        estudiantes={estudiantes}
        searchParams={searchParams}
        filteredEstudiantes={filteredEstudiantes}
        setFilteredEstudiantes={setFilteredEstudiantes}
      />
      <Table columns={estudiantesColumnsDef} data={filteredEstudiantes} />
    </>
  );
}
