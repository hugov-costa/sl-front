import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface DescriptionInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: string | null;
}

export function DescriptionInput({
  disabled,
  form,
  initialValue,
}: DescriptionInputProps) {
  const { field } = useController({
    control: form.control,
    name: "description",
  });
  const hasError = !!form.formState.errors.description;

  useEffect(() => {
    if (initialValue) {
      form.setValue("description", initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="description">Descrição</FieldLabel>
      <Textarea
        aria-invalid={hasError}
        disabled={disabled}
        id="description"
        maxLength={60}
        {...field}
        value={field.value || ""}
      />
      <FieldErrorZod errors={[form.formState.errors.description]} />
    </Field>
  );
}
