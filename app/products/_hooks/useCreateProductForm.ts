import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  CreateProductFormValues,
} from "../_schemas/productSchema";

export function useCreateProductForm() {
  return useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      barcode: "",
      code: 0,
      gross_weight: 0,
      net_weight: 0,
      description: "",
      price: 0,
    },
    mode: "onSubmit",
  });
}
