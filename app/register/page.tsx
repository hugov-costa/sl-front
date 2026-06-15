"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegister } from "./_hooks/useRegister";
import { useRegisterForm } from "./_hooks/useRegisterForm";
import { RegisterFormValues } from "./_schemas/formSchema";
import { cn } from "@/lib/utils";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { RegisterEmailInput } from "./_components/email-input";
import { RegisterNameInput } from "./_components/name-input";
import { RegisterPasswordInput } from "./_components/password-input";
import { RegisterPasswordConfirmationInput } from "./_components/password-confirmation-input";
import { useUser } from "@/contexts/user-context";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useUser();
  const form = useRegisterForm();
  const { loading, register } = useRegister(form);

  useEffect(() => {
    if (user?.id) {
      router.push("/");
    }
  }, [user, router]);

  function onSubmit(data: RegisterFormValues) {
    register(data);
  }

  if (user?.id) {
    return null;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Criar Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <RegisterEmailInput form={form} loading={loading} />
                  <RegisterNameInput form={form} loading={loading} />
                  <RegisterPasswordInput form={form} loading={loading} />
                  <RegisterPasswordConfirmationInput
                    form={form}
                    loading={loading}
                  />
                  <Field>
                    <Button
                      className="cursor-pointer w-full"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Registrando..." : "Registrar"}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="font-medium text-primary hover:underline cursor-pointer"
                  disabled={loading}
                >
                  Faça login aqui
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
