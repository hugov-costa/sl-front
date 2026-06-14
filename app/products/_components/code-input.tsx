import { useController, UseFormReturn, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface CodeInputProps {
  disabled?: boolean;
  form: UseFormReturn<FieldValues>;
  initialValue?: number;
}

export function CodeInput({ disabled, form, initialValue }: CodeInputProps) {
  const { field } = useController({
    control: form.control,
    name: "code",
  });
  const hasError = !!form.formState.errors.code;

  useEffect(() => {
    if (initialValue !== undefined && initialValue > 0) {
      form.setValue("code", initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let stringValue = event.target.value;
    
    if (stringValue.length > 10) {
      stringValue = stringValue.slice(0, 10);
    }
    const numericValue = stringValue === "" ? 0 : parseInt(stringValue, 10);

    if (!isNaN(numericValue)) {
      field.onChange(numericValue);
    }
  };

  return (
    <Field data-invalid={hasError}>
      <FieldLabel htmlFor="code">Código</FieldLabel>
      <Input
        aria-invalid={hasError}
        disabled={disabled}
        id="code"
        maxLength={10}
        onChange={handleChange}
        type="text"
        value={field.value || ""}
      />
      <FieldErrorZod errors={[form.formState.errors.code]} />
    </Field>
  );
}
