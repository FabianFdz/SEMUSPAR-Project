import { Button } from "@/components/lib";
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
    <Button variant="Secondary" onClick={handleExportar}>
      Exportar
    </Button>
  );
}
