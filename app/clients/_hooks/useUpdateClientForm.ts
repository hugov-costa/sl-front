import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateClientSchema,
  UpdateClientFormValues,
} from "../_schemas/clientSchema";

export function useUpdateClientForm() {
  return useForm<UpdateClientFormValues>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      address: "",
      code: 0,
      document_number: "",
      name: "",
      trade_name: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
}
