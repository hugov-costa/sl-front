import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";
import { useNumberMask } from "@/utils/numberInput";

interface PriceInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: number;
}

export function PriceInput({ disabled, form, initialValue }: PriceInputProps) {
  const { value, onChange, setRaw, numericValue } = useNumberMask(9, 2);
  const { field } = useController({
    control: form.control,
    name: "price",
  });
  const hasError = !!form.formState.errors.price;

  useEffect(() => {
    if (initialValue !== undefined && initialValue > 0) {
      setRaw(initialValue / 100);
    }
  }, [initialValue, setRaw]);

  useEffect(() => {
    const cents = Math.round(numericValue * 100);

    field.onChange(cents > 0 ? cents : 0);
  }, [numericValue, field]);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="price">Valor</FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="price"
        onChange={onChange}
        type="text"
        value={value}
      />
      <FieldErrorZod errors={[form.formState.errors.price]} />
    </Field>
  );
}
