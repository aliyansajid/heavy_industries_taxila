"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "./schema";
import { DataTableColumnHeader } from "./ColumnHeader";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("subject")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("reference")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[110px] items-center">
          <span className="capitalize"> {row.getValue("priority")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "receivedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Received Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("receivedDate"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
];
