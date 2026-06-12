import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useLoginForm() {
  return useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    mode: "onSubmit",
  });
}
