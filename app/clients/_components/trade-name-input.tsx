import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface TradeNameInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: string | null;
}

export function TradeNameInput({
  disabled,
  form,
  initialValue,
}: TradeNameInputProps) {
  const { field } = useController({
    control: form.control,
    name: "trade_name",
  });
  const hasError = !!form.formState.errors.trade_name;

  useEffect(() => {
    if (initialValue) {
      form.setValue("trade_name", initialValue);
    }
  }, [initialValue, form]);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="trade-name">Nome Fantasia</FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="trade-name"
        maxLength={100}
        {...field}
        value={field.value || ""}
      />
      <FieldErrorZod errors={[form.formState.errors.trade_name]} />
    </Field>
  );
}
