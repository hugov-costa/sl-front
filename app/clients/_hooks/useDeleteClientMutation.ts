"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteClient } from "@/services/clientsService";
import { DeleteClientResponse } from "@/interfaces/clientResponse";
import { FormValidationHTTPError } from "@/utils/formValidationError";

export function useDeleteClientMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    DeleteClientResponse,
    FormValidationHTTPError,
    number
  >({
    mutationFn: async (clientId) => {
      return await deleteClient(clientId);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao excluir cliente.");
    },
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/clients");
    },
  });

  return {
    loading: mutation.status === "pending",
    send: mutation.mutate,
  };
}
