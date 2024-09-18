"use client";
import { DataTableColumnHeader } from "@/components/table/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { StatusVehicles } from "./badge-status-car";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/interfaces/server-interface";

export const columnsVehicles: ColumnDef<Card>[] = [
  {
    header: "Titulo",
    accessorKey: "title",
    cell: ({ row }) => {
      const { title } = row.original;
      return <div className="">{title}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca" />
    ),
    accessorKey: "make",
    cell: ({ row }) => {
      const { make } = row.original;
      return <div className="">{make}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" />
    ),
    accessorKey: "model",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Año" />
    ),
    accessorKey: "year",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio por dia" />
    ),
    cell: ({ row }) => {
      const { priceForDay } = row.original;

      const formatted = new Intl.NumberFormat("es-Es", {
        style: "currency",
        currency: "CUP",
      }).format(priceForDay);

      return <div className="">{formatted}</div>;
    },
    accessorKey: "priceForDay",
  },
  {
    header: () => <span className="flex justify-center items-center">Estado</span>,
    accessorKey: "status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <div className="flex justify-center items-center">
          <StatusVehicles status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const action = () => {
        window.location.href = `vehicle/${row.original.id}`;
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
