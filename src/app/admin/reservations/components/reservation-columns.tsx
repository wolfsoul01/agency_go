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

export const columnsReservation: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    accessorKey: "user",
    cell: ({ row }) => {
      const { user } = row.original;
      return (
        <div className="flex items-center gap-x-3">
          <img
            src={user?.image?.url ?? defaultImage.src}
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
      <DataTableColumnHeader column={column} title="Días" />
    ),
    accessorKey: "days",
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
    header: "Estado",
    accessorKey: "status",
    cell: ({ row }) => {
      const { status } = row.original;
      return <div className="capitalize">{status}</div>;
    },
  },
  {
    header: "Tipo",
    accessorKey: "type",
    cell: ({ row }) => {
      const { type } = row.original;
      return <div className="capitalize">{type}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const router = useRouter();
      const action = () => {
        router.push(`reservations/${row.original.id}`);
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
