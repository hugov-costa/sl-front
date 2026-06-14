import "@/types/tanstackTable";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";

interface DataTableBodyProps<TData> {
  columns: ColumnDef<TData>[];
  table: Table<TData>;
}

export function DataTableBody<TData>({
  columns,
  table,
}: DataTableBodyProps<TData>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                className={
                  cell.column.columnDef.meta?.isNumeric ? "text-right" : ""
                }
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center" colSpan={columns.length}>
            Nenhum resultado encontrado.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
