"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProduct } from "@/services/productsService";
import { CreateProductFormValues } from "../_schemas/productSchema";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { handleFormValidationError } from "@/utils/handleFormValidationError";
import { CreateProductResponse } from "@/interfaces/productResponse";

export function useCreateProductMutation(
  form: UseFormReturn<CreateProductFormValues>,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateProductResponse,
    FormValidationHTTPError,
    CreateProductFormValues
  >({
    mutationFn: async (data) => {
      return await createProduct(data);
    },
    onError: (error) => {
      if (!handleFormValidationError(error, form)) {
        toast.error(error.message || "Erro ao criar produto.");
      }
    },
    onSuccess: () => {
      toast.success("Produto criado com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/products");
    },
  });

  return {
    loading: mutation.status === "pending",
    send: mutation.mutate,
  };
}
