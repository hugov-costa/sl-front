"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProduct } from "@/services/productsService";
import { DeleteProductResponse } from "@/interfaces/productResponse";
import { FormValidationHTTPError } from "@/utils/formValidationError";

export function useDeleteProductMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    DeleteProductResponse,
    FormValidationHTTPError,
    number
  >({
    mutationFn: async (productId) => {
      return await deleteProduct(productId);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao excluir produto.");
    },
    onSuccess: () => {
      toast.success("Produto excluído com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/products");
    },
  });

  return {
    loading: mutation.status === "pending",
    send: mutation.mutate,
  };
}
