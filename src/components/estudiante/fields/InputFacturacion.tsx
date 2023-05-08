import { Facturacion } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  name: keyof Facturacion;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
}

export function InputFacturacion({
  name,
  label,
  register,
  placeholder,
  type = "text",
  disabled = false,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder ?? label}
        disabled={disabled}
        {...register(name)}
      />
    </div>
  );
}
