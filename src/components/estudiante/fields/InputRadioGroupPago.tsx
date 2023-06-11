import { Facturacion } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<Facturacion>;
  getValues: UseFormGetValues<Facturacion>;
}

const isBecaRegOrMun = (value: string) => {
  return value === "Regular" || value === "Beca Municipal";
};

export function InputRadioGroupPago({ setValue, getValues }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    isBecaRegOrMun(getValues("pago")) ? getValues("pago") : "Otro"
  );
  const [customValue, setCustomValue] = useState(
    isBecaRegOrMun(getValues("pago")) ? "" : getValues("pago")
  );

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setValue("pago", event.target.value);
    setCustomValue("");
  };

  const handleCustomValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomValue(event.target.value);
    setValue("pago", event.target.value);
  };

  const handleCustomValueBlur = () => {
    if (selectedOption === "Otro" && !customValue.trim()) {
      setSelectedOption("Regular");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="pago"
          value="Regular"
          checked={selectedOption === "Regular"}
          onChange={handleOptionChange}
          className="text-primary focus:ring-primary"
        />
        <span className="ml-2">Regular</span>
      </label>
      <label className="inline-flex items-center whitespace-nowrap">
        <input
          type="radio"
          name="pago"
          value="Beca Municipal"
          checked={selectedOption === "Beca Municipal"}
          onChange={handleOptionChange}
          className="text-primary focus:ring-primary"
        />
        <span className="ml-2">Beca Municipal</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="pago"
          value="Otro"
          checked={selectedOption === "Otro"}
          onChange={handleOptionChange}
          className="text-primary focus:ring-primary"
        />
        <span className="ml-2">Otro</span>
      </label>
      <input
        type="text"
        value={customValue}
        disabled={selectedOption !== "Otro"}
        onChange={handleCustomValueChange}
        onBlur={handleCustomValueBlur}
        placeholder="Ingrese otro valor"
      />
    </div>
  );
}
