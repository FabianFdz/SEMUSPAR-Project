import { Facturacion } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "./Input";

interface InputProps {
  name: keyof Facturacion;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
}

export function InputFacturacion({
  type = "text",
  required = false,
  disabled = false,
  ...props
}: InputProps) {
  return (
    <Input type={type} required={required} disabled={disabled} {...props} />
  );
}
