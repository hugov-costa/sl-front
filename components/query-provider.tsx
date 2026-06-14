"use client";

import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HTTPError } from "@/utils/httpError";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { HttpStatusType } from "@/types/httpStatus";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [queryClient] = useState(() => {
    const client = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          handleGlobalError(error, router, client);
        },
      }),

      mutationCache: new MutationCache({
        onError: (error) => {
          handleGlobalError(error, router, client);
        },
      }),

      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60 * 24,
          retry: (failureCount, error) => {
            if (
              (error instanceof HTTPError &&
                error.status === HttpStatusType.UNAUTHORIZED) ||
              (error instanceof FormValidationHTTPError &&
                error.status === HttpStatusType.UNAUTHORIZED)
            ) {
              return false;
            }

            return failureCount < 3;
          },
        },
        mutations: {
          retry: (failureCount, error) => {
            if (
              (error instanceof HTTPError &&
                error.status === HttpStatusType.UNAUTHORIZED) ||
              (error instanceof FormValidationHTTPError &&
                error.status === HttpStatusType.UNAUTHORIZED)
            ) {
              return false;
            }

            return false;
          },
        },
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function handleGlobalError(
  error: Error,
  router: ReturnType<typeof useRouter>,
  queryClient: QueryClient,
): void {
  const isUnauthorized =
    (error instanceof HTTPError &&
      error.status === HttpStatusType.UNAUTHORIZED) ||
    (error instanceof FormValidationHTTPError &&
      error.status === HttpStatusType.UNAUTHORIZED);

  if (isUnauthorized) {
    queryClient.clear();

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (currentPath !== "/login") {
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    }
  }
}
