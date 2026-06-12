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
import { HttpStatusType } from "@/types/httpStatus";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleGlobalError(error, router);
          },
        }),

        mutationCache: new MutationCache({
          onError: (error) => {
            handleGlobalError(error, router);
          },
        }),

        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
            retry: (failureCount, error) => {
              if (
                error instanceof HTTPError &&
                error.status === HttpStatusType.UNAUTHORIZED
              ) {
                return false;
              }

              return failureCount < 3;
            },
          },
          mutations: {
            retry: (failureCount, error) => {
              if (
                error instanceof HTTPError &&
                error.status === HttpStatusType.UNAUTHORIZED
              ) {
                return false;
              }

              return false;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

async function handleGlobalError(
  error: Error,
  router: ReturnType<typeof useRouter>,
) {
  if (
    error instanceof HTTPError &&
    error.status === HttpStatusType.UNAUTHORIZED
  ) {
    const queryClient = new QueryClient();
    queryClient.clear();

    const currentPath = window.location.pathname;

    if (currentPath !== "/login") {
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }
}
