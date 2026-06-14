"use client";

import { useMemo } from "react";
import { Dashboard } from "@/components/dashboard/dashboard";
import { DataTable } from "@/components/data-table/data-table";
import { PageTitle } from "@/components/page-title";
import { useProducts } from "./_hooks/useProducts";
import { getProductColumns } from "./_assets/columnDefs";
import { LoadingDataTable } from "@/components/data-table/loading-page/loading-data-table";

export default function ProductsPage() {
  const breadcrumbs = [{ label: "Produtos", href: "/products" }];

  const { products, isLoading } = useProducts();
  const columns = useMemo(() => getProductColumns(), []);

  if (isLoading) {
    return (
      <LoadingDataTable
        breadcrumbs={breadcrumbs}
        pageTitle="Listagem de Produtos"
      />
    );
  }

  return (
    <Dashboard breadcrumbs={breadcrumbs}>
      <PageTitle title="Listagem de Produtos" />
      <DataTable
        columns={columns}
        createHref="/products/create"
        data={products?.data}
        searchFields={{
          barcode: "código de barras",
          code: "código",
          description: "descrição",
        }}
      />
    </Dashboard>
  );
}
