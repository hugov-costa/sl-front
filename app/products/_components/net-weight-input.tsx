import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";
import { useNumberMask } from "@/utils/numberInput";

interface NetWeightInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: number;
}

export function NetWeightInput({
  disabled,
  form,
  initialValue,
}: NetWeightInputProps) {
  const { value, onChange, setRaw, numericValue } = useNumberMask(10, 3);
  const { field } = useController({
    control: form.control,
    name: "net_weight",
  });
  const hasError = !!form.formState.errors.net_weight;

  useEffect(() => {
    if (initialValue !== undefined && initialValue > 0) {
      setRaw(initialValue / 1000);
    }
  }, [initialValue, setRaw]);

  useEffect(() => {
    const grams = Math.round(numericValue * 1000);

    field.onChange(grams > 0 ? grams : 0);
  }, [numericValue, field]);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="net-weight">Peso Líquido (kg)</FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="net-weight"
        maxLength={10}
        onChange={onChange}
        type="text"
        value={value}
      />
      <FieldErrorZod errors={[form.formState.errors.net_weight]} />
    </Field>
  );
}
