import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createClientSchema,
  CreateClientFormValues,
} from "../_schemas/clientSchema";

export function useCreateClientForm() {
  return useForm<CreateClientFormValues>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      address: "",
      code: 0,
      document_number: "",
      name: "",
      trade_name: "",
    },
    mode: "onSubmit",
  });
}
