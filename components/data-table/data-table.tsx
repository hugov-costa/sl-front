"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";

import { Table } from "@/components/ui/table";
import { DataTableSearchBar } from "./data-table-search-bar";
import { DataTableHeader } from "./data-table-header";
import { DataTableBody } from "./data-table-body";
import { DataTableFooter } from "./data-table-footer";
import { useFilteredData } from "./hooks/useFIlteredData";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  createHref?: string;
  data: TData[] | undefined;
  pageSize?: number;
  searchFields?: Partial<Record<keyof TData, string>>;
}

export function DataTable<TData>({
  columns,
  createHref,
  data,
  pageSize = 12,
  searchFields,
}: DataTableProps<TData>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data: useFilteredData({
      data,
      searchFields,
      searchQuery,
    }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className="w-full max-w-full py-4">
      <div className="flex flex-col md:flex-row md:items-end md:gap-2 md:justify-between gap-2">
        <DataTableSearchBar
          createHref={createHref}
          searchFields={searchFields}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="mt-6">
        <Table>
          <DataTableHeader table={table} />

          <DataTableBody columns={columns} table={table} />
        </Table>
      </div>

      <DataTableFooter table={table} />
    </div>
  );
}
