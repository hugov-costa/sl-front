import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface BarcodeInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: string | null;
}

export function BarcodeInput({
  disabled,
  form,
  initialValue,
}: BarcodeInputProps) {
  const { field } = useController({
    control: form.control,
    name: "barcode",
  });
  const hasError = !!form.formState.errors.barcode;

  useEffect(() => {
    if (initialValue) {
      form.setValue("barcode", initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="barcode">Código de Barras</FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="barcode"
        maxLength={14}
        {...field}
        value={field.value || ""}
      />
      <FieldErrorZod errors={[form.formState.errors.barcode]} />
    </Field>
  );
}
