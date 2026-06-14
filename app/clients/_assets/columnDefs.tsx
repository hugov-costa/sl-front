import { Client } from "@/interfaces/client";
import { ColumnDef } from "@tanstack/react-table";
import { truncateText } from "@/utils/truncateText";
import { ClientActions } from "../_components/actions";

function formatDocument(document: string): string {
  const cleaned = document.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }

  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
}

export const getClientColumns = (): ColumnDef<Client>[] => [
  {
    accessorKey: "code",
    header: "Código",
    enableSorting: true,
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "name",
    header: "Nome",
    enableSorting: true,
    cell: ({ row }) => truncateText(row.original.name, 20),
  },
  {
    accessorKey: "document_number",
    header: "CPF/CNPJ",
    enableSorting: false,
    cell: ({ row }) => formatDocument(row.original.document_number),
  },
  {
    accessorKey: "trade_name",
    header: "Nome Fantasia",
    enableSorting: false,
    cell: ({ row }) => truncateText(row.original.trade_name, 30),
  },
  {
    accessorKey: "address",
    header: "Endereço",
    enableSorting: false,
    cell: ({ row }) => truncateText(row.original.address, 30),
  },
  {
    id: "actions",
    header: "Ações",
    enableSorting: false,
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
