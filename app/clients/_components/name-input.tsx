import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface NameInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: string | null;
}

export function NameInput({ disabled, form, initialValue }: NameInputProps) {
  const { field } = useController({
    control: form.control,
    name: "name",
  });
  const hasError = !!form.formState.errors.name;

  useEffect(() => {
    if (initialValue) {
      form.setValue("name", initialValue);
    }
  }, [initialValue, form]);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="name">Nome</FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="name"
        maxLength={60}
        {...field}
        value={field.value || ""}
      />
      <FieldErrorZod errors={[form.formState.errors.name]} />
    </Field>
  );
}
