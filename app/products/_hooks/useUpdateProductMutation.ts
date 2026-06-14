"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProduct } from "@/services/productsService";
import { UpdateProductFormValues } from "../_schemas/productSchema";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { handleFormValidationError } from "@/utils/handleFormValidationError";
import { UpdateProductResponse } from "@/interfaces/productResponse";

export function useUpdateProductMutation(
  productId: number,
  form: UseFormReturn<UpdateProductFormValues>,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    UpdateProductResponse,
    FormValidationHTTPError,
    UpdateProductFormValues
  >({
    mutationFn: async (data) => {
      return await updateProduct(productId, data);
    },
    onError: (error) => {
      if (!handleFormValidationError(error, form)) {
        toast.error(error.message || "Erro ao atualizar produto.");
      }
    },
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/products");
    },
  });

  return {
    loading: mutation.status === "pending",
    send: mutation.mutate,
  };
}
