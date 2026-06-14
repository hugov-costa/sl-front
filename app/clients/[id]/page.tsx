"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dashboard } from "@/components/dashboard/dashboard";
import { PageTitle } from "@/components/page-title";
import { SaveButton } from "@/components/ui/save-button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/data-table/skeleton/data-table-skeleton";
import { CodeInput } from "../_components/code-input";
import { NameInput } from "../_components/name-input";
import { TradeNameInput } from "../_components/trade-name-input";
import { DocumentNumberInput } from "../_components/document-number-input";
import { AddressInput } from "../_components/address-input";
import { useUpdateClientForm } from "../_hooks/useUpdateClientForm";
import { useUpdateClientMutation } from "../_hooks/useUpdateClientMutation";
import { getClient } from "@/services/clientsService";
import { UpdateClientFormValues } from "../_schemas/clientSchema";

interface EditClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditClientPage({ params }: EditClientPageProps) {
  const { id } = use(params);
  const clientId = Number(id);
  const breadcrumbs = [
    { label: "Clientes", href: "/clients" },
    { label: "Editar", href: `/clients/${clientId}` },
  ];

  const { data: clientResponse, isLoading: isFetching } = useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => getClient(clientId),
  });

  const client = clientResponse?.data;
  const form = useUpdateClientForm();
  const { loading: isUpdating, send } = useUpdateClientMutation(clientId, form);
  const isLoading = isFetching || isUpdating;

  function onSubmit(data: UpdateClientFormValues) {
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
      <PageTitle title="Editar Cliente" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <p className="text-sm opacity-40">Informações do Cliente</p>
          <Separator />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <CodeInput
                disabled={isLoading}
                form={form}
                initialValue={client?.code}
              />
            </FieldGroup>
            <FieldGroup>
              <NameInput
                disabled={isLoading}
                form={form}
                initialValue={client?.name}
              />
            </FieldGroup>
            <FieldGroup>
              <TradeNameInput
                disabled={isLoading}
                form={form}
                initialValue={client?.trade_name}
              />
            </FieldGroup>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <DocumentNumberInput
                disabled={isLoading}
                form={form}
                initialValue={client?.document_number}
              />
            </FieldGroup>
          </div>
          <div className="mt-4">
            <FieldGroup>
              <AddressInput
                disabled={isLoading}
                form={form}
                initialValue={client?.address}
              />
            </FieldGroup>
          </div>
        </div>

        <div className="mt-8">
          <SaveButton loading={isLoading} />
        </div>
      </form>
    </Dashboard>
  );
}
