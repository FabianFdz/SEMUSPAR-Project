import XMark from "@/components/icons/XMark";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { EstudiantesInfoTable } from "./EstudiantesList";

interface Props {
  estudiantes: Array<EstudiantesInfoTable>;
  filtrosAvanzados: Partial<EstudiantesInfoTable>;
  applyFiltroAvanzado: (filtros: Partial<EstudiantesInfoTable>) => void;
}

export default function FiltrosAvanzados({
  estudiantes,
  filtrosAvanzados,
  applyFiltroAvanzado,
}: Props) {
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="bg-gray-100 rounded w-full p-4 mt-2">
      <div className="flex flex-row space-x-2">
        <select
          value={selectedOption ?? ""}
          onChange={handleOptionChange}
          className="block w-2/12 py-2 px-3 text-base border border-primary rounded-md appearance-none focus:outline-none focus:ring-primary capitalize"
        >
          <option className="normal-case" value="" disabled>
            Seleccione un filtro...
          </option>
          {Object.keys(estudiantes[0])
            .filter(
              (key) =>
                typeof estudiantes[0][key as keyof EstudiantesInfoTable] ===
                  "string" && !Object.keys(filtrosAvanzados).includes(key)
            )
            .map((filter) => (
              <option className="capitalize" key={filter} value={filter}>
                {filter.split("_").join(" ")}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Valor..."
          value={filterValue ?? ""}
          onChange={(e) => setFilterValue(e.target.value)}
          className="py-2 px-3 rounded-md bg-white w-2/12 disabled:bg-gray-300 duration-300 ease-in-out"
        />
        <button
          className="px-4 py-2 text-white bg-blue-900 rounded-md focus:outline-none hover:bg-primary-dark"
          onClick={() => {
            if (selectedOption && filterValue) {
              setFilterValue(null);
              setSelectedOption(null);
              applyFiltroAvanzado({
                ...filtrosAvanzados,
                [selectedOption]: filterValue,
              });
            }
          }}
        >
          Agregar filtro
        </button>
      </div>
      <div className="flex flex-row flex-wrap mt-3">
        {Object.keys(filtrosAvanzados)
          .filter(
            (key) =>
              typeof estudiantes[0][key as keyof EstudiantesInfoTable] ===
              "string"
          )
          .map((key) => (
            <span
              className="rounded bg-slate-600 px-3 py-1 text-white mr-2 flex flex-row items-center mt-2 transition-all ease-in-out duration-500"
              key={key}
            >
              <span className="capitalize">{key.split("_").join(" ")}</span>
              <span className="mx-2">=</span>
              <span className="font-bold mr-3">
                {filtrosAvanzados[key as keyof EstudiantesInfoTable]}
              </span>
              <button
                className="rounded-full"
                onClick={() => {
                  const deleteFiltro = { ...filtrosAvanzados };
                  delete deleteFiltro[key as keyof EstudiantesInfoTable];
                  applyFiltroAvanzado({ ...deleteFiltro });
                }}
              >
                <XMark className="h-5 w-5 bg-slate-500 rounded-full p-[0.25rem]" />
              </button>
            </span>
          ))}
      </div>
    </div>
  );
}
