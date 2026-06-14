import "@/types/tanstackTable";
import { ArrowUpDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              className={
                header.column.columnDef.meta?.isNumeric ? "text-right" : ""
              }
              key={header.id}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={`${
                    header.column.getCanSort()
                      ? "flex cursor-pointer select-none items-center gap-2"
                      : ""
                  } ${
                    header.column.columnDef.meta?.isNumeric ? "justify-end" : ""
                  }`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getCanSort() && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
