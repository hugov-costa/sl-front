import { useCallback, useMemo, useState } from "react";

export type DocumentType = "cpf" | "cnpj";

type UseDocumentMaskReturn = {
  value: string;
  documentType: DocumentType;
  onlyDigits: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRaw: (raw: string) => void;
  setDocumentType: (type: DocumentType) => void;
  clearDigits: () => void;
};

export function useDocumentMask(): UseDocumentMaskReturn {
  const [digits, setDigits] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("cpf");

  const formatCPF = useCallback((unformatted: string) => {
    const cleaned = unformatted.replace(/\D/g, "").slice(0, 11);

    if (cleaned.length === 0) return "";
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9)
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  }, []);

  const formatCNPJ = useCallback((unformatted: string) => {
    const cleaned = unformatted.replace(/\D/g, "").slice(0, 14);

    if (cleaned.length === 0) return "";
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5)
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    if (cleaned.length <= 8)
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
    if (cleaned.length <= 12)
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
  }, []);

  const format = useCallback(
    (d: string) => {
      if (documentType === "cpf") {
        return formatCPF(d);
      }
      return formatCNPJ(d);
    },
    [documentType, formatCPF, formatCNPJ],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const incoming = e.target.value;
      const only = incoming.replace(/\D/g, "");

      const maxLength = documentType === "cpf" ? 11 : 14;
      setDigits(only.slice(0, maxLength));
    },
    [documentType],
  );

  const setRaw = useCallback((raw: string) => {
    const cleaned = raw.replace(/\D/g, "");

    if (cleaned.length === 11) {
      setDocumentType("cpf");
      setDigits(cleaned);
    } else if (cleaned.length === 14) {
      setDocumentType("cnpj");
      setDigits(cleaned);
    } else {
      setDigits(cleaned.slice(0, 11));
    }
  }, []);

  const clearDigits = useCallback(() => {
    setDigits("");
  }, []);

  const formattedValue = useMemo(() => format(digits), [digits, format]);

  return {
    value: formattedValue,
    documentType,
    onlyDigits: digits,
    onChange,
    setRaw,
    setDocumentType,
    clearDigits,
  };
}
