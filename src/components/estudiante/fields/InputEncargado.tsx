import { Encargado } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "./Input";

interface InputProps {
  name: keyof Encargado;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
}

export function InputEncargado({
  type = "text",
  required = false,
  disabled = false,
  ...props
}: InputProps) {
  return (
    <Input type={type} required={required} disabled={disabled} {...props} />
  );
}
