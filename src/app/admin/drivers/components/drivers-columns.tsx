import { DataTableColumnHeader } from "@/components/table/table-header";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
export const columnsDriver: ColumnDef<User>[] = [
    {
      accessorKey: 'id', 
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      accessorKey: 'name',
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      accessorKey: 'email',
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Edad" />
      ),
      accessorKey: 'age',
    },
  ];
  