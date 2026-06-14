import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface DataTableFooterProps<TData> {
  table: Table<TData>;
}

export function DataTableFooter<TData>({ table }: DataTableFooterProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount() || 1}
      </div>
      <div className="space-x-2">
        <Button
          className={table.getCanPreviousPage() ? "cursor-pointer" : ""}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          variant="outline"
        >
          Anterior
        </Button>
        <Button
          className={table.getCanNextPage() ? "cursor-pointer" : ""}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="outline"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
