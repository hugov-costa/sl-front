import { UseFormReturn, FieldPath } from "react-hook-form";
import { FormValidationHTTPError } from "./formValidationError";

export function handleFormValidationError<T extends Record<string, unknown>>(
  error: FormValidationHTTPError,
  form: UseFormReturn<T>,
): boolean {
  if (
    error.payload &&
    typeof error.payload === "object" &&
    "errors" in error.payload
  ) {
    const payloadObj = error.payload as Record<string, unknown>;
    const errorsObj = payloadObj.errors as Record<string, unknown> | undefined;

    if (errorsObj && typeof errorsObj === "object") {
      Object.entries(errorsObj).forEach(([field, messages]) => {
        const message = Array.isArray(messages)
          ? (messages as unknown as string[])[0]
          : String(messages);

        form.setError(field as FieldPath<T>, {
          type: "manual",
          message,
        });
      });
      return true;
    }
  }

  return false;
}
