import ExportarData from "./ExportarData";
import FiltrosAvanzados from "./FiltrosAvanzados";
import { StatusChip } from "@/components/StatusChip";
import { EstudiantesInfoTable } from "./EstudiantesList";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface Props {
  estudiantes: Array<EstudiantesInfoTable>;
  searchParams: Partial<EstudiantesInfoTable>;
  filteredEstudiantes: Array<EstudiantesInfoTable>;
  setFilteredEstudiantes: Dispatch<SetStateAction<EstudiantesInfoTable[]>>;
}

export default function Filtros({
  estudiantes,
  searchParams,
  filteredEstudiantes,
  setFilteredEstudiantes,
}: Props) {
  const router = useRouter();
  const [openFiltrosAvanzados, setOpenFiltrosAvanzados] = useState(false);
  const [generalFiltro, setGeneralFiltro] = useState<string>("");
  const [filtrosAvanzados, setFiltrosAvanzados] =
    useState<Partial<EstudiantesInfoTable>>(searchParams);

  const handleLimpiarFiltros = () => {
    setFilteredEstudiantes(estudiantes);
    setFiltrosAvanzados({});
    setGeneralFiltro("");
  };

  const generalFilterEstudiantes = (searchCriteria: string) => {
    setGeneralFiltro(searchCriteria);
    setFilteredEstudiantes(
      estudiantes.filter((estudiante) =>
        Object.values(estudiante)
          .join("")
          .toLowerCase()
          .includes(searchCriteria.trim().toLowerCase())
      )
    );
  };

  const applyFiltroAvanzado = (filtros: Partial<EstudiantesInfoTable>) => {
    setFiltrosAvanzados({
      ...filtros,
    });
    setFilteredEstudiantes(
      estudiantes.filter((estudiante) => {
        const matches: Boolean[] = [];
        for (let filtroAvanzado in filtros) {
          const field =
            estudiante[filtroAvanzado as keyof EstudiantesInfoTable];
          const filtroAvanzadoValue =
            filtros[filtroAvanzado as keyof EstudiantesInfoTable];
          if (
            (typeof field === "string" &&
              field.toLowerCase().includes(filtroAvanzadoValue as string)) ||
            (typeof field === "boolean" && field === filtroAvanzadoValue)
          ) {
            matches.push(true);
          } else {
            matches.push(false);
          }
        }
        return !matches.includes(false);
      })
    );
  };

  useEffect(() => {
    router.push(
      "/estudiantes?" +
        Object.keys(filtrosAvanzados)
          .map(
            (filtro) =>
              `${filtro}=${encodeURIComponent(
                filtrosAvanzados[filtro as keyof EstudiantesInfoTable] ?? ""
              )}`
          )
          .reduce((prev, curr) => `${prev}&${curr}`, "")
    );
  }, [filtrosAvanzados, router]);

  useEffect(() => {
    if (Object.keys(filtrosAvanzados).length) {
      console.log(searchParams);
      applyFiltroAvanzado({ ...searchParams });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full space-x-12">
        <input
          type="text"
          value={generalFiltro}
          placeholder="Buscar nombre o cédula..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            generalFilterEstudiantes(e.target.value)
          }
          className="border w-2/12 p-2 px-3 py-2 rounded-md bg-gray-100"
        />
        <div className="flex flex-row items-center space-x-2 text-center">
          {[true, false].map((status) => (
            <div
              key={status ? "true-status" : "false-status"}
              className="cursor-pointer"
              onClick={() =>
                applyFiltroAvanzado({
                  ...filtrosAvanzados,
                  estado: status,
                })
              }
            >
              {filtrosAvanzados?.estado !== undefined ? (
                <StatusChip
                  active={status}
                  disabled={filtrosAvanzados.estado !== status}
                />
              ) : (
                <StatusChip active={status} />
              )}
            </div>
          ))}
        </div>
        <button
          className="py-2 px-3 bg-transparent underline text-blue-600 rounded-lg hover:no-underline active:underline"
          onClick={handleLimpiarFiltros}
        >
          Limpiar filtros
        </button>
        <ExportarData data={filteredEstudiantes} />
      </div>
      <div className="flex flex-col w-full space-y-2 mt-3">
        <button
          className="px-3 bg-transparent underline text-blue-600 rounded-lg hover:no-underline active:underline w-fit"
          onClick={() => setOpenFiltrosAvanzados(!openFiltrosAvanzados)}
        >
          Filtros avanzados...
        </button>
        {openFiltrosAvanzados && (
          <FiltrosAvanzados
            applyFiltroAvanzado={applyFiltroAvanzado}
            estudiantes={estudiantes}
            filtrosAvanzados={filtrosAvanzados ?? {}}
          />
        )}
      </div>
    </div>
  );
}
