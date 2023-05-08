"use client";

import Table from "@/components/Table";
import { estudiantesColumnsDef } from "./columns/columnsDef";

export interface EstudiantesInfoTable {
  id: number;
  nombre: string;
  apellidos: string;
  estado: boolean;
  fecha_matricula: Date;
  fecha_retiro: Date | null;
  cedula: string;
  email: string | null;
  fecha_nacimiento: Date;
}

interface Props {
  estudiantes: Array<EstudiantesInfoTable>;
}

export default function EstudiantesList({ estudiantes }: Props) {
  return <Table columns={estudiantesColumnsDef} data={estudiantes} />;
}
