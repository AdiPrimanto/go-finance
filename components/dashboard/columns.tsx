"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "../../pages/dashboard/ActionButtons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  year: number;
  color: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ActionButtons payment={row.original} />,
  },
];
