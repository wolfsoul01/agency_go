import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: string;
}


export const StatusVehicles = ({ status }: Props) => {
  const getText = () => {
    switch (status) {
      case "Ok":
        return "Buen estado";
      case "Broken":
        return "Averiado";
      default:
        return "Desconocido";
    }
  };

  const getColor = () => {
    switch (status) {
      case "Ok":
        return "bg-green-500 text-white";
      case "Broken":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };
  return <Badge className={cn(getColor())}>{getText()}</Badge>;
};
