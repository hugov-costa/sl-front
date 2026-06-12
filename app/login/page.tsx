"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "./_hooks/useLogin";
import { useLoginForm } from "./_hooks/useLoginForm";
import { LoginFormValues } from "./_schemas/formSchema";
import { cn } from "@/lib/utils";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { LoginEmailInput } from "./_components/email-input";
import { LoginPasswordInput } from "./_components/password-input";

export default function LoginPage() {
  const form = useLoginForm();
  const { loading, login } = useLogin(form);

  function onSubmit(data: LoginFormValues) {
    login(data);
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl" id="login-form" />
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <LoginEmailInput form={form} loading={loading} />
                  <LoginPasswordInput form={form} loading={loading} />
                  <Field>
                    <Button
                      className="cursor-pointer"
                      disabled={loading}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
