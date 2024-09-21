/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { DataTableColumnHeader } from "@/components/table/table-header";

import { ColumnDef } from "@tanstack/react-table";
import { Reservation } from "@/interfaces/server-interface";
import ReservationTypeBadge from "@/app/admin/reservations/components/reservation-type";
import ReservationStatusBadge from "@/app/admin/reservations/components/reservation-status";

export const columnsReservationClient: ColumnDef<Reservation>[] = [
  {
    header: "Fecha Inicio",
    accessorKey: "startDate",
    cell: ({ row }) => {
      const { startDate } = row.original;
      return <div>{new Date(startDate).toLocaleDateString()}</div>;
    },
  },
  {
    header: "Fecha Fin",
    accessorKey: "endDate",
    cell: ({ row }) => {
      const { endDate } = row.original;
      return <div>{new Date(endDate).toLocaleDateString()}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Días"
        className="flex justify-center"
      />
    ),
    accessorKey: "days",
    cell: ({ row }) => {
      const { days } = row.original;
      return <div className="flex justify-center">{days}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Costo Total" />
    ),
    accessorKey: "totalCost",
    cell: ({ row }) => {
      const { totalCost } = row.original;
      return <div className="flex justify-center">${totalCost.toFixed(2)}</div>;
    },
  },
  {
    header: () => <span className="flex justify-center">Estado</span>,
    accessorKey: "status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <div className="flex justify-center">
          <ReservationStatusBadge status={status} />
        </div>
      );
    },
  },
  {
    header: () => <span className="flex justify-center">Tipo</span>,
    accessorKey: "type",
    cell: ({ row }) => {
      const { type } = row.original;
      return (
        <div className="flex justify-center">
          <ReservationTypeBadge type={type} />
        </div>
      );
    },
  },
];
