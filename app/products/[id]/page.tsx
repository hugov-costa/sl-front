"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import { Dashboard } from "@/components/dashboard/dashboard";
import { PageTitle } from "@/components/page-title";
import { SaveButton } from "@/components/ui/save-button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/data-table/skeleton/data-table-skeleton";
import { BarcodeInput } from "../_components/barcode-input";
import { CodeInput } from "../_components/code-input";
import { DescriptionInput } from "../_components/description-input";
import { PriceInput } from "../_components/value-input";
import { GrossWeightInput } from "../_components/gross-weight-input";
import { NetWeightInput } from "../_components/net-weight-input";
import { useUpdateProductForm } from "../_hooks/useUpdateProductForm";
import { useUpdateProductMutation } from "../_hooks/useUpdateProductMutation";
import { getProduct } from "@/services/productsService";
import { UpdateProductFormValues } from "../_schemas/productSchema";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const productId = Number(id);
  const breadcrumbs = [
    { label: "Produtos", href: "/products" },
    { label: "Editar", href: `/products/${productId}` },
  ];

  const { data: productResponse, isLoading: isFetching } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
  });

  const product = productResponse?.data;
  const form = useUpdateProductForm();
  const { loading: isUpdating, send } = useUpdateProductMutation(
    productId,
    form,
  );
  const isLoading = isFetching || isUpdating;

  function onSubmit(data: UpdateProductFormValues) {
    send(data);
  }

  if (isFetching) {
    return (
      <Dashboard breadcrumbs={breadcrumbs}>
        <DataTableSkeleton />
      </Dashboard>
    );
  }

  return (
    <Dashboard breadcrumbs={breadcrumbs}>
      <PageTitle title="Editar Produto" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <p className="text-sm opacity-40">Informações do Produto</p>
          <Separator />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <CodeInput
                disabled={isLoading}
                form={form}
                initialValue={product?.code}
              />
            </FieldGroup>
            <FieldGroup>
              <BarcodeInput
                disabled={isLoading}
                form={form}
                initialValue={product?.barcode}
              />
            </FieldGroup>
            <FieldGroup>
              <PriceInput
                disabled={isLoading}
                form={form}
                initialValue={product?.price}
              />
            </FieldGroup>
            <FieldGroup>
              <GrossWeightInput
                disabled={isLoading}
                form={form}
                initialValue={product?.gross_weight}
              />
            </FieldGroup>
            <FieldGroup>
              <NetWeightInput
                disabled={isLoading}
                form={form}
                initialValue={product?.net_weight}
              />
            </FieldGroup>
          </div>
          <div className="mt-4">
            <FieldGroup>
              <DescriptionInput
                disabled={isLoading}
                form={form}
                initialValue={product?.description}
              />
            </FieldGroup>
          </div>
        </div>

        <div className="mt-8">
          <SaveButton loading={isUpdating} />
        </div>
      </form>
    </Dashboard>
  );
}
