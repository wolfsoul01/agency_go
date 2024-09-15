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
import { Edit , MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  license: string;
  age: number;
  phoneNumber: string;
}
export const columnsDriver: ColumnDef<Driver>[] = [
  {
    header: "Nombre",
    accessorKey: "firstName",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <div className="capitalize">
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    header: "Licencia",
    accessorKey: "license",
    cell: ({ row }) => {
      const { license } = row.original;
      return <div className="capitalize">{license}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Edad" />
    ),
    accessorKey: "age",
  },
  {
    header: "Teléfono",
    accessorKey: "phoneNumber",
    cell: ({ row }) => {
      const { phoneNumber } = row.original;
      return <div className="capitalize">{phoneNumber}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const router = useRouter();
      const action = () => {
        router.push(`drivers/${row.original.id}`);
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
