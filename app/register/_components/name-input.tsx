import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "../_hooks/useRegisterForm";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface RegisterNameInputProps extends React.ComponentProps<"div"> {
  form: ReturnType<typeof useRegisterForm>;
  loading: boolean;
}

export function RegisterNameInput({ form, loading }: RegisterNameInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor="register-name">Nome</FieldLabel>
      <Input
        disabled={loading}
        id="register-name"
        maxLength={255}
        required
        type="text"
        {...form.register("name")}
      />
      <FieldErrorZod errors={[form.formState.errors.name]} />
    </Field>
  );
}
