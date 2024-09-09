import { DataTableColumnHeader } from "@/components/table/table-header";
import { ColumnDef } from "@tanstack/react-table";

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
];
