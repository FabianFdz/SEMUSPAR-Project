interface StatusChipProps {
  active?: boolean;
  disabled?: boolean;
}

export function StatusChip({ active, disabled }: StatusChipProps) {
  return (
    <div
      className={`flex flex-row items-center px-2 py-1 rounded-full text-sm w-fit justify-start space-x-2 font-semibold ${
        !disabled && active
          ? "bg-green-100 text-green-800 border-solid border-[1px] border-green-800"
          : !disabled && !active
          ? "bg-red-100 text-red-800 border-solid border-[1px] border-red-800"
          : "bg-gray-100 text-gray-800 border-solid border-[1px] border-gray-800"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          !disabled && active
            ? "bg-green-800"
            : !disabled && !active
            ? "bg-red-800"
            : "bg-gray-800"
        }`}
      />
      <span>{active ? "Activo" : "Inactivo"}</span>
    </div>
  );
}
