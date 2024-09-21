/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { DataTableColumnHeader } from "@/components/table/table-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import defaultImage from "@/assets/user-default.jpg";
import { Reservation } from "@/interfaces/server-interface";
import ReservationStatusBadge from "./reservation-status";
import ReservationTypeBadge from "./reservation-type";

export const columnsReservation: ColumnDef<Reservation>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    accessorKey: "user",
    cell: ({ row }) => {
      const { user, room } = row.original;

      return (
        <div className="flex items-center gap-x-3">
          <img
            src={room?.Image?.url ?? defaultImage.src}
            alt="User"
            className="size-10 rounded-full"
          />{" "}
          {user.name}
        </div>
      );
    },
  },
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
      return <ReservationStatusBadge status={status} />;
    },
  },
  {
    header: () => <span className="flex justify-center">Tipo</span>,
    accessorKey: "type",
    cell: ({ row }) => {
      const { type } = row.original;
      return <ReservationTypeBadge type={type} />;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const router = useRouter();
      const { type } = row.original;
      const action = () => {
        type === "CAR"
          ? router.push(`reservations/car/${row.original.id}`)
          : router.push(`reservations/room/${row.original.id}`);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={action}
              className="flex items-center gap-x-2"
            >
              <Edit strokeWidth={1.2} className="size-5" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
