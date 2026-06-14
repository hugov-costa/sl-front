import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";
import { useDocumentMask, DocumentType } from "@/utils/documentMask";

interface DocumentNumberInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: string | null;
}

export function DocumentNumberInput({
  disabled,
  form,
  initialValue,
}: DocumentNumberInputProps) {
  const { field } = useController({
    control: form.control,
    name: "document_number",
  });
  const hasError = !!form.formState.errors.document_number;
  const {
    value,
    documentType,
    onChange,
    setRaw,
    setDocumentType,
    onlyDigits,
    clearDigits,
  } = useDocumentMask();

  useEffect(() => {
    if (initialValue) {
      setRaw(initialValue);
    }
  }, [initialValue, setRaw]);

  useEffect(() => {
    field.onChange(onlyDigits);
  }, [onlyDigits, field]);

  const handleDocumentTypeChange = (newType: DocumentType) => {
    clearDigits();
    setDocumentType(newType);
  };

  return (
    <Field data-invalid={hasError}>
      <FieldLabel>Tipo de Documento</FieldLabel>
      <div className="flex gap-4 mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="documentType"
            value="cpf"
            checked={documentType === "cpf"}
            onChange={() => handleDocumentTypeChange("cpf")}
            disabled={disabled}
            className="cursor-pointer"
          />
          <span className="text-sm">CPF</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="documentType"
            value="cnpj"
            checked={documentType === "cnpj"}
            onChange={() => handleDocumentTypeChange("cnpj")}
            disabled={disabled}
            className="cursor-pointer"
          />
          <span className="text-sm">CNPJ</span>
        </label>
      </div>
      <FieldLabel htmlFor="document-number">
        {documentType === "cpf" ? "CPF" : "CNPJ"}
      </FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="document-number"
        maxLength={documentType === "cpf" ? 14 : 18}
        onChange={onChange}
        type="text"
        value={value}
      />
      <FieldErrorZod errors={[form.formState.errors.document_number]} />
    </Field>
  );
}
