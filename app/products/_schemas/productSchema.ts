import { z } from "zod";

export const createProductSchema = z.object({
  barcode: z
    .string("Código de barras é obrigatório.")
    .min(1, "Código de barras é obrigatório.")
    .max(14, "Código de barras não pode exceder 14 caracteres."),
  code: z
    .number("Código é obrigatório.")
    .max(9999999999, "Código não pode exceder 10 caracteres.")
    .min(0, "Código não pode ser negativo."),
  description: z.string().max(60, "Descrição não pode exceder 60 caracteres."),
  gross_weight: z
    .number("Peso bruto é obrigatório.")
    .int("Peso bruto deve ser um número inteiro.")
    .max(9999999999, "Peso bruto não pode exceder 10 caracteres.")
    .min(0, "Peso bruto não pode ser negativo."),
  net_weight: z
    .number("Peso líquido é obrigatório.")
    .int("Peso líquido deve ser um número inteiro.")
    .max(9999999999, "Peso líquido não pode exceder 10 caracteres.")
    .min(0, "Peso líquido não pode ser negativo."),
  price: z
    .number("Preço é obrigatório.")
    .int("Preço deve ser um número inteiro.")
    .max(999999999, "Preço não pode exceder 9 caracteres.")
    .min(0, "Preço não pode ser negativo."),
});

export const updateProductSchema = z.object({
  barcode: z
    .string("Código de barras é obrigatório.")
    .max(14, "Código de barras não pode exceder 14 caracteres.")
    .optional(),
  code: z
    .number("Código é obrigatório.")
    .max(9999999999, "Código não pode exceder 10 caracteres.")
    .min(0, "Código não pode ser negativo.")
    .optional(),
  description: z
    .string()
    .max(60, "Descrição não pode exceder 60 caracteres.")
    .optional(),
  gross_weight: z
    .number("Peso bruto é obrigatório.")
    .int("Peso bruto deve ser um número inteiro.")
    .max(9999999999, "Peso bruto não pode exceder 10 caracteres.")
    .min(0, "Peso bruto não pode ser negativo.")
    .optional(),
  net_weight: z
    .number("Peso líquido é obrigatório.")
    .int("Peso líquido deve ser um número inteiro.")
    .max(9999999999, "Peso líquido não pode exceder 10 caracteres.")
    .min(0, "Peso líquido não pode ser negativo.")
    .optional(),
  price: z
    .number("Preço é obrigatório.")
    .int("Preço deve ser um número inteiro.")
    .max(999999999, "Preço não pode exceder 9 caracteres.")
    .min(0, "Preço não pode ser negativo.")
    .optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;
