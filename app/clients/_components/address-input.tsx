import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface AddressInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: string | null;
}

export function AddressInput({
  disabled,
  form,
  initialValue,
}: AddressInputProps) {
  const { field } = useController({
    control: form.control,
    name: "address",
  });
  const hasError = !!form.formState.errors.address;

  useEffect(() => {
    if (initialValue) {
      form.setValue("address", initialValue);
    }
  }, [initialValue, form]);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="address">Endereço</FieldLabel>
      <Textarea
        aria-invalid={hasError}
        disabled={disabled}
        id="address"
        maxLength={1000}
        {...field}
        value={field.value || ""}
      />
      <FieldErrorZod errors={[form.formState.errors.address]} />
    </Field>
  );
}
