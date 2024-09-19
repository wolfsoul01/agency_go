import { Badge } from "@/components/ui/badge";
import { ReservationStatus } from "@/interfaces/server-interface";
import React from "react";
import { cva } from "class-variance-authority";

const badgeStyles = cva(
  "px-2  font-medium ", // Clases base
  {
    variants: {
      status: {
        Pending: "bg-yellow-500 text-black",
        Confirmed: "bg-green-500 text-black",
        Cancelled: "bg-red-500 text-black",
        Completed: "bg-blue-500 text-black",
      },
    },
    defaultVariants: {
      status: "Pending",
    },
  }
);

interface Props {
  status: ReservationStatus;
}

const statusTranslations: Record<ReservationStatus, string> = {
  Pending: "Pendiente",
  Confirmed: "Confirmada",
  Cancelled: "Cancelada",
  Completed: "Completada",
};

function ReservationStatusBadge({ status }: Props) {
  return (
    <Badge className={badgeStyles({ status })}>
      {statusTranslations[status]} {/* Mostrar texto en español */}
    </Badge>
  );
}

export default ReservationStatusBadge;
