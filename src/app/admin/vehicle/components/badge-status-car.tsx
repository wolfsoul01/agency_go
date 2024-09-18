import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: string;
}


export const StatusVehicles = ({ status }: Props) => {
  const getText = () => {
    switch (status) {
      case "OK":
        return "Buen estado";
      case "BROKEN":
        return "Averiado";
      default:
        return "Desconocido";
    }
  };

  const getColor = () => {
    switch (status) {
      case "OK":
        return "bg-green-500 text-white";
      case "BROKEN":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };
  return <Badge className={cn(getColor())}>{getText()}</Badge>;
};
