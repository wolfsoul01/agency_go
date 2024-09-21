import { Badge } from "@/components/ui/badge";
import { Reservation, TypeReservation } from "@/interfaces/server-interface";
import React from "react";
import { cva } from "class-variance-authority";
import { BedIcon, CarIcon, PlaneIcon } from "lucide-react";

// Definir las variantes de estilo según el tipo de reserva
const badgeStyles = cva(
  "px-2 font-medium ", // Clases base
  {
    variants: {
      type: {
        ROOM: "bg-gray-500 text-white",
        CAR: "bg-teal-500 text-white",
        TRAVEL: "bg-purple-500 text-white",
      },
    },
    defaultVariants: {
      type: "ROOM",
    },
  }
);

interface Props {
  type: TypeReservation;
}

// Mapeo de tipos de reserva a sus traducciones
const typeTranslations: Record<TypeReservation, string> = {
  ROOM: "Habitación",
  CAR: "Auto",
  TRAVEL: "Actividad",
};
const getTypeIcon = (type: Reservation["type"]) => {
  switch (type) {
    case "CAR":
      return <CarIcon className="h-4 w-4 mr-2" />;
    case "ROOM":
      return <BedIcon className="h-4 w-4 mr-2" />;
    case "TRAVEL":
      return <PlaneIcon className="h-4 w-4 mr-2" />;
  }
};

function ReservationTypeBadge({ type }: Props) {
  return (
    <Badge className={badgeStyles({ type })}>
      {getTypeIcon(type)}
      {typeTranslations[type]} {/* Mostrar texto en español */}
    </Badge>
  );
}

export default ReservationTypeBadge;
