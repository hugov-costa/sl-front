import { z } from "zod";

const documentNumberSchema = z
  .string("Número de documento é obrigatório.")
  .min(1, "Número de documento é obrigatório.")
  .refine((doc) => {
    const cleanedDoc = doc.replace(/\D/g, "");
    return cleanedDoc.length === 11 || cleanedDoc.length === 14;
  }, "Documento deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ).");

export const createClientSchema = z.object({
  address: z
    .string("Endereço é obrigatório.")
    .min(1, "Endereço é obrigatório.")
    .max(1000, "Endereço não pode exceder 1000 caracteres."),
  code: z
    .number("Código é obrigatório.")
    .max(9999999999, "Código não pode exceder 10 caracteres.")
    .min(0, "Código não pode ser negativo."),
  document_number: documentNumberSchema,
  name: z
    .string("Nome é obrigatório.")
    .min(1, "Nome é obrigatório.")
    .max(60, "Nome não pode exceder 60 caracteres."),
  trade_name: z
    .string("Nome fantasia é obrigatório.")
    .min(1, "Nome fantasia é obrigatório.")
    .max(100, "Nome fantasia não pode exceder 100 caracteres."),
});

export const updateClientSchema = z.object({
  address: z
    .string("Endereço é obrigatório.")
    .max(1000, "Endereço não pode exceder 1000 caracteres.")
    .optional(),
  code: z
    .number("Código é obrigatório.")
    .max(9999999999, "Código não pode exceder 10 caracteres.")
    .min(0, "Código não pode ser negativo.")
    .optional(),
  document_number: documentNumberSchema.optional(),
  name: z
    .string("Nome é obrigatório.")
    .max(60, "Nome não pode exceder 60 caracteres.")
    .optional(),
  trade_name: z
    .string("Nome fantasia é obrigatório.")
    .max(100, "Nome fantasia não pode exceder 100 caracteres.")
    .optional(),
});

export type CreateClientFormValues = z.infer<typeof createClientSchema>;
export type UpdateClientFormValues = z.infer<typeof updateClientSchema>;
