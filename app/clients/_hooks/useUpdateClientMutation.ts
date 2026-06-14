"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateClient } from "@/services/clientsService";
import { UpdateClientFormValues } from "../_schemas/clientSchema";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { handleFormValidationError } from "@/utils/handleFormValidationError";
import { UpdateClientResponse } from "@/interfaces/clientResponse";

export function useUpdateClientMutation(
  clientId: number,
  form: UseFormReturn<UpdateClientFormValues>,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    UpdateClientResponse,
    FormValidationHTTPError,
    UpdateClientFormValues
  >({
    mutationFn: async (data) => {
      return await updateClient(clientId, data);
    },
    onError: (error) => {
      if (!handleFormValidationError(error, form)) {
        toast.error(error.message || "Erro ao atualizar cliente.");
      }
    },
    onSuccess: () => {
      toast.success("Cliente atualizado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/clients");
    },
  });

  return {
    loading: mutation.status === "pending",
    send: mutation.mutate,
  };
}
