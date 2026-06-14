"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/services/clientsService";
import { CreateClientFormValues } from "../_schemas/clientSchema";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { handleFormValidationError } from "@/utils/handleFormValidationError";
import { CreateClientResponse } from "@/interfaces/clientResponse";

export function useCreateClientMutation(
  form: UseFormReturn<CreateClientFormValues>,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateClientResponse,
    FormValidationHTTPError,
    CreateClientFormValues
  >({
    mutationFn: async (data) => {
      return await createClient(data);
    },
    onError: (error) => {
      if (!handleFormValidationError(error, form)) {
        toast.error(error.message || "Erro ao criar cliente.");
      }
    },
    onSuccess: () => {
      toast.success("Cliente criado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/clients");
    },
  });

  return {
    loading: mutation.status === "pending",
    send: mutation.mutate,
  };
}
