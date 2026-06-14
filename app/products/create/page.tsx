"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { PageTitle } from "@/components/page-title";
import { SaveButton } from "@/components/ui/save-button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { BarcodeInput } from "../_components/barcode-input";
import { CodeInput } from "../_components/code-input";
import { DescriptionInput } from "../_components/description-input";
import { PriceInput } from "../_components/value-input";
import { GrossWeightInput } from "../_components/gross-weight-input";
import { NetWeightInput } from "../_components/net-weight-input";
import { useCreateProductForm } from "../_hooks/useCreateProductForm";
import { useCreateProductMutation } from "../_hooks/useCreateProductMutation";
import { CreateProductFormValues } from "../_schemas/productSchema";
import { FieldValues, UseFormReturn } from "react-hook-form";

export default function CreateProductPage() {
  const breadcrumbs = [
    { label: "Produtos", href: "/products" },
    { label: "Criar", href: "/products/create" },
  ];

  const form = useCreateProductForm();
  const { loading, send } = useCreateProductMutation(form);

  function onSubmit(data: CreateProductFormValues) {
    send(data);
  }

  return (
    <Dashboard breadcrumbs={breadcrumbs}>
      <PageTitle title="Criar Produto" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <p className="text-sm opacity-40">Informações do Produto</p>
          <Separator />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <CodeInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
            <FieldGroup>
              <BarcodeInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
            <FieldGroup>
              <PriceInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
            <FieldGroup>
              <GrossWeightInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
            <FieldGroup>
              <NetWeightInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
          </div>
          <div className="mt-4">
            <FieldGroup>
              <DescriptionInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
          </div>
        </div>

        <div className="mt-8">
          <SaveButton loading={loading} />
        </div>
      </form>
    </Dashboard>
  );
}
