import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "../_hooks/useLoginForm";
import FieldErrorZod from "@/components/ui/field-zod-error";

interface LoginEmailInputProps extends React.ComponentProps<"div"> {
  form: ReturnType<typeof useLoginForm>;
  loading: boolean;
}

export function LoginEmailInput({ form, loading }: LoginEmailInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        disabled={loading}
        id="email"
        maxLength={250}
        placeholder="email@email.com"
        required
        type="email"
        {...form.register("email")}
      />
      <FieldErrorZod errors={[form.formState.errors.email]} />
    </Field>
  );
}
