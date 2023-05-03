interface StatusChipProps {
  active: boolean;
}

export function StatusChip({ active }: StatusChipProps) {
  return (
    <div
      className={`flex flex-row items-center px-3 py-1 rounded-full text-sm w-fit justify-start space-x-2 font-semibold ${
        active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          active ? "bg-green-800" : "bg-red-800"
        }`}
      />
      <span>{active ? "Activo" : "Inactivo"}</span>
    </div>
  );
}
