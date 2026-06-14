import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
};

export const formatCurrencyValue = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const formatWeightValue = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value / 1000);
};

export const formatDate = (date: string): string => {
  try {
    const parsedDate = parseISO(date);

    return format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return "-";
  }
};
