import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "../_hooks/useRegisterForm";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface RegisterEmailInputProps extends React.ComponentProps<"div"> {
  form: ReturnType<typeof useRegisterForm>;
  loading: boolean;
}

export function RegisterEmailInput({ form, loading }: RegisterEmailInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor="register-email">Email</FieldLabel>
      <Input
        disabled={loading}
        id="register-email"
        maxLength={255}
        required
        type="email"
        {...form.register("email")}
      />
      <FieldErrorZod errors={[form.formState.errors.email]} />
    </Field>
  );
}
