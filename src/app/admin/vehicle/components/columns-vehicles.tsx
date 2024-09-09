import { DataTableColumnHeader } from "@/components/table/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { StatusVehicles } from "./badge-status-car";

export interface Driver {
  id: number;
  title: string;
  make: string;
  model: string;
  status: string;
  year: number;
  priceForDay: number;
}

export const columnsVehicles: ColumnDef<Driver>[] = [
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
    header: "Estado",
    accessorKey: "status",
    cell: ({ row }) => {
      const { status } = row.original;
      return <StatusVehicles status={status} />;
    },
  },
];
