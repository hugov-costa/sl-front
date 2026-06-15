import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "../_hooks/useRegisterForm";
import FieldErrorZod from "@/components/ui/field-zod-error";
import { PasswordRequirementsBadge } from "./password-requirements-badge";

interface RegisterPasswordInputProps extends React.ComponentProps<"div"> {
  form: ReturnType<typeof useRegisterForm>;
  loading: boolean;
}

export function RegisterPasswordInput({
  form,
  loading,
}: RegisterPasswordInputProps) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel htmlFor="register-password">Senha</FieldLabel>
        <PasswordRequirementsBadge />
      </div>
      <Input
        disabled={loading}
        id="register-password"
        maxLength={255}
        required
        type="password"
        {...form.register("password")}
      />
      <FieldErrorZod errors={[form.formState.errors.password]} />
    </Field>
  );
}
