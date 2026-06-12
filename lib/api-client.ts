import { HttpMethodType } from "@/types/httpMethod";
import { apiUrl } from "@/utils/apiUrl";
import { FormValidationHTTPError } from "@/utils/formValidationError";

interface ApiClientOptions {
  url: string;
  method?: HttpMethodType;
  body?: unknown | null;
  headers?: HeadersInit;
  errorMessage?: string;
}

export async function apiClient<T = unknown>({
  url,
  method = HttpMethodType.GET,
  body = null,
  headers = {},
  errorMessage = "Erro na requisição.",
}: ApiClientOptions): Promise<T> {
  const response = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    credentials: "include",
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJson
    ? ((await response.json().catch(() => null)) as Record<
        string,
        unknown
      > | null)
    : null;

  if (!response.ok) {
    const payloadObj = payload as Record<string, unknown> | null;
    const detailMsg = payloadObj?.detail ?? payloadObj?.message ?? errorMessage;

    let errorsPayload: string[] | undefined;

    if (payloadObj?.errors && Array.isArray(payloadObj.errors)) {
      errorsPayload = payloadObj.errors as string[];
    } else if (payloadObj?.title) {
      errorsPayload = [String(payloadObj.title)];
    }

    throw new FormValidationHTTPError(
      response.status,
      String(detailMsg),
      errorsPayload,
      payloadObj,
    );
  }

  return (payload ?? {}) as unknown as T;
}
