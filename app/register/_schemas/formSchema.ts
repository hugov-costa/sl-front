import { z } from "zod";

export const registerSchema = () => {
  return z
    .object({
      email: z
        .email({ message: "Email inválido." })
        .max(255, "Email não pode exceder 255 caracteres."),
      name: z
        .string()
        .min(1, "Nome é obrigatório.")
        .min(3, "Nome deve ter ao menos 3 caracteres.")
        .max(255, "Nome não pode exceder 255 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços."),
      password: z
        .string()
        .min(1, "Senha é obrigatória.")
        .min(8, "Senha deve ter ao menos 8 caracteres.")
        .max(255, "Senha não pode exceder 255 caracteres.")
        .refine(
          (password) => /[A-Z]/.test(password),
          "Senha deve conter pelo menos uma letra maiúscula.",
        )
        .refine(
          (password) => /[a-z]/.test(password),
          "Senha deve conter pelo menos uma letra minúscula.",
        )
        .refine(
          (password) => /\d/.test(password),
          "Senha deve conter pelo menos um número.",
        )
        .refine(
          (password) => /[@$!%*?&]/.test(password),
          "Senha deve conter pelo menos um símbolo (@$!%*?&).",
        ),
      passwordConfirmation: z
        .string()
        .min(1, "Confirmação de senha é obrigatória."),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    });
};

export type RegisterFormSchema = ReturnType<typeof registerSchema>;
export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
