import { Product } from "@/interfaces/product";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrencyValue, formatWeightValue } from "@/utils/formatters";
import { truncateText } from "@/utils/truncateText";
import { ProductActions } from "../_components/actions";

export const getProductColumns = (): ColumnDef<Product>[] => [
  {
    accessorKey: "code",
    header: "Código",
    enableSorting: true,
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "barcode",
    header: "Código de Barras",
    enableSorting: false,
    cell: ({ row }) => row.original.barcode,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    enableSorting: false,
    cell: ({ row }) => {
      const description = row.original.description;

      return truncateText(description, 30);
    },
  },
  {
    accessorKey: "gross_weight",
    header: "Peso Bruto (kg)",
    enableSorting: false,
    meta: { isNumeric: true },
    cell: ({ row }) => formatWeightValue(row.original.gross_weight),
  },
  {
    accessorKey: "net_weight",
    header: "Peso Líquido (kg)",
    enableSorting: false,
    meta: { isNumeric: true },
    cell: ({ row }) => formatWeightValue(row.original.net_weight),
  },
  {
    accessorKey: "price",
    header: "Valor (R$)",
    enableSorting: true,
    meta: { isNumeric: true },
    cell: ({ row }) => formatCurrencyValue(row.original.price),
  },
  {
    id: "actions",
    header: "Ações",
    enableSorting: false,
    cell: ({ row }) => <ProductActions product={row.original} />,
  },
];
