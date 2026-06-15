import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "../_schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useRegisterForm() {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema()),
    defaultValues: {
      email: undefined,
      name: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    },
    mode: "onSubmit",
  });
}
