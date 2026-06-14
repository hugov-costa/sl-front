"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { PageTitle } from "@/components/page-title";
import { SaveButton } from "@/components/ui/save-button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { CodeInput } from "../_components/code-input";
import { NameInput } from "../_components/name-input";
import { TradeNameInput } from "../_components/trade-name-input";
import { DocumentNumberInput } from "../_components/document-number-input";
import { AddressInput } from "../_components/address-input";
import { useCreateClientForm } from "../_hooks/useCreateClientForm";
import { useCreateClientMutation } from "../_hooks/useCreateClientMutation";
import { CreateClientFormValues } from "../_schemas/clientSchema";
import { FieldValues, UseFormReturn } from "react-hook-form";

export default function CreateClientPage() {
  const breadcrumbs = [
    { label: "Clientes", href: "/clients" },
    { label: "Criar", href: "/clients/create" },
  ];

  const form = useCreateClientForm();
  const { loading, send } = useCreateClientMutation(form);

  function onSubmit(data: CreateClientFormValues) {
    send(data);
  }

  return (
    <Dashboard breadcrumbs={breadcrumbs}>
      <PageTitle title="Criar Cliente" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <p className="text-sm opacity-40">Informações do Cliente</p>
          <Separator />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <CodeInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
            <FieldGroup>
              <NameInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
            <FieldGroup>
              <TradeNameInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <DocumentNumberInput
                disabled={loading}
                form={form as unknown as UseFormReturn<FieldValues>}
              />
            </FieldGroup>
          </div>
          <div className="mt-4">
            <FieldGroup>
              <AddressInput
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
