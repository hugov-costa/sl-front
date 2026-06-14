"use client";

import { useMemo } from "react";
import { Dashboard } from "@/components/dashboard/dashboard";
import { DataTable } from "@/components/data-table/data-table";
import { PageTitle } from "@/components/page-title";
import { useClients } from "./_hooks/useClients";
import { getClientColumns } from "./_assets/columnDefs";
import { LoadingDataTable } from "@/components/data-table/loading-page/loading-data-table";

export default function ClientsPage() {
  const breadcrumbs = [{ label: "Clientes", href: "/clients" }];

  const { clients, isLoading } = useClients();
  const columns = useMemo(() => getClientColumns(), []);

  if (isLoading) {
    return (
      <LoadingDataTable
        breadcrumbs={breadcrumbs}
        pageTitle="Listagem de Clientes"
      />
    );
  }

  return (
    <Dashboard breadcrumbs={breadcrumbs}>
      <PageTitle title="Listagem de Clientes" />
      <DataTable
        columns={columns}
        createHref="/clients/create"
        data={clients?.data}
        searchFields={{
          code: "código",
          document_number: "CPF/CNPJ",
          name: "nome",
          trade_name: "nome fantasia",
        }}
      />
    </Dashboard>
  );
}
