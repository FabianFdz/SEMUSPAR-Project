import BaseType from "./BaseType";
import { CustomFilter } from "../FilterList";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Encargado, Estudiante, Facturacion } from "@prisma/client";
import XMark from "@/components/icons/XMark";

interface Props {
  defaultValue?: string;
  customFilter:
    | CustomFilter<Estudiante>
    | CustomFilter<Encargado>
    | CustomFilter<Facturacion>;
  modifyFilter: (filtros: Partial<Estudiante>) => void;
  removeFilter: (key: keyof Estudiante) => void;
}

export default function SingleFilter({
  customFilter,
  removeFilter,
  modifyFilter,
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState<string | boolean>(defaultValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      modifyFilter({
        [customFilter.filterKey]: value,
      });
    }
  };

  const renderInput = () => {
    switch (customFilter.type) {
      case "string":
        return (
          <input
            type="text"
            value={value as string}
            onChange={handleInputChange}
            onKeyDown={handleKeyPressEnter}
            className="px-2 py-1 bg-slate-400 outline-none border-r-[1px] w-28"
          />
        );
      case "boolean":
        return (
          <div className="flex flex-row items-center space-x-2 text-center cursor-default">
            {value ? "Activo" : "Inactivo (Retirado)"}
          </div>
        );
    }
  };
  return (
    <BaseType displayName={customFilter.displayName}>
      {renderInput()}
      <button
        onClick={() => removeFilter(customFilter.filterKey as keyof Estudiante)}
      >
        <XMark className="bg-slate-500 rounded-full w-4 h-4 text-white p-[0.1rem]" />
      </button>
    </BaseType>
  );
}
