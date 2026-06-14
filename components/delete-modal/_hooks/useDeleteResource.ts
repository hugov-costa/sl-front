import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseDeleteResourceParams {
  deleteService: (resourceId: string | number) => Promise<void>;
  resourceId: string | number;
  queryKeysToInvalidate?: (readonly unknown[])[];
  onSuccess?: () => void;
}

export function useDeleteResource({
  deleteService,
  resourceId,
  queryKeysToInvalidate,
  onSuccess,
}: UseDeleteResourceParams) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteService(resourceId);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao excluir registro.");
    },
    onSuccess: () => {
      if (queryKeysToInvalidate && queryKeysToInvalidate.length > 0) {
        queryKeysToInvalidate.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      } else {
        queryClient.removeQueries();
      }
      toast.success("Registro excluído com sucesso.");
      onSuccess?.();
    },
  });

  return {
    loading: mutation.status === "pending",
    delete: mutation.mutate,
  };
}
