import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "../_hooks/useLoginForm";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface LoginPasswordInputProps extends React.ComponentProps<"div"> {
  form: ReturnType<typeof useLoginForm>;
  loading: boolean;
}

export function LoginPasswordInput({ form, loading }: LoginPasswordInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor="email">Senha</FieldLabel>
      <Input
        disabled={loading}
        id="password"
        maxLength={250}
        required
        type="password"
        {...form.register("password")}
      />
      <FieldErrorZod errors={[form.formState.errors.password]} />
    </Field>
  );
}
