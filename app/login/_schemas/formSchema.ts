import { z } from "zod";

export const loginSchema = () => {
  return z.object({
    email: z
      .email({ message: "Email inválido." })
      .min(1, "Email é obrigatório."),
    password: z
      .string()
      .min(1, "Senha é obrigatória.")
      .min(8, "Senha deve ter ao menos 8 caracteres."),
  });
};

export type LoginFormSchema = ReturnType<typeof loginSchema>;
export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
