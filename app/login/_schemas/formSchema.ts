import { z } from "zod";

export const loginSchema = () => {
  return z.object({
    email: z.email({ message: "Email inválido." }).min(1, "Email é obrigatório."),
    password: z
      .string()
      .min(1, "Senha é obrigatória.")
      .min(6, "Senha deve ter pelo menos 6 caracteres."),
  });
};

export type LoginFormSchema = ReturnType<typeof loginSchema>;
export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
