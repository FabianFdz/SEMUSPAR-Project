import { Estudiante } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
}

export function Input({
  name,
  label,
  register,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name}>
        {label}{" "}
        {required ? (
          <span className="text-red-600 font-semibold">*</span>
        ) : null}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder ?? label}
        disabled={disabled}
        required={required}
        {...register(name)}
      />
    </div>
  );
}
