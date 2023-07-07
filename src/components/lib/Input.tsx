import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  children: ReactNode;
};

export function Input({ children, ...props }: InputProps) {
  return <input {...props}>{children}</input>;
}
