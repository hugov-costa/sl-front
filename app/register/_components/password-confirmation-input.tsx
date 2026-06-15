import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "../_hooks/useRegisterForm";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface RegisterPasswordConfirmationInputProps extends React.ComponentProps<"div"> {
  form: ReturnType<typeof useRegisterForm>;
  loading: boolean;
}

export function RegisterPasswordConfirmationInput({
  form,
  loading,
}: RegisterPasswordConfirmationInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor="register-password-confirmation">
        Confirmar Senha
      </FieldLabel>
      <Input
        disabled={loading}
        id="register-password-confirmation"
        maxLength={255}
        required
        type="password"
        {...form.register("passwordConfirmation")}
      />
      <FieldErrorZod errors={[form.formState.errors.passwordConfirmation]} />
    </Field>
  );
}
