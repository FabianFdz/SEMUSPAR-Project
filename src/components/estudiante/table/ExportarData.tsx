import { exportToJsonToExcel } from "@/utils/estudianteUtils";

interface Props {
  data: Array<any>;
}

export default function ExportarData({ data }: Props) {
  const handleExportar = async () => {
    try {
      await exportToJsonToExcel(data);
    } catch (error) {
      console.error("Error exporting JSON to Excel:", error);
    }
  };

  return (
    <button
      className="px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none hover:bg-primary-dark"
      onClick={handleExportar}
    >
      Exportar
    </button>
  );
}
