import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "Secondary" | "Primary" | "Danger";
  children: ReactNode;
};

export const baseClasses = `rounded-md font-medium 
disabled:cursor-not-allowed transition-all duration-500 px-4 py-2`;

export const dangerClasses = `text-white bg-red-600 
active:bg-red-400 disabled:bg-red-400 hover:bg-red-500 disabled:bg-red-600`;
export const primaryClasses = `text-white bg-blue-600 
active:bg-blue-400 disabled:bg-blue-400 hover:bg-blue-500 disabled:bg-blue-600`;
export const secondaryClasses = `text-blue-600 bg-transparent 
active:bg-blue-200 border border-blue-600 disabled:border-gray-400 
disabled:text-gray-400 disabled:active:bg-transparent hover:bg-blue-100 disabled:bg-gray-200`;

export function Button({
  variant = "Primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  const classNameWithVariant = () => {
    switch (variant) {
      case "Primary":
        return `${className} ${primaryClasses}`;
      case "Secondary":
        return `${className} ${secondaryClasses}`;
      case "Danger":
        return `${className} ${dangerClasses}`;
      default:
        return "";
    }
  };

  return (
    <button {...rest} className={`${baseClasses} ${classNameWithVariant()}`}>
      {children}
    </button>
  );
}
