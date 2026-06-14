"use client";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider, useUser } from "@/contexts/user-context";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/services/authService";
import { CheckAuthResponse } from "@/interfaces/authResponse";
import { User } from "@/interfaces/user";
import { usePathname } from "next/navigation";

interface ProvidersProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <QueryProvider>
      <UserProvider initialUser={initialUser}>
        <AuthInitializerWrapper />
        {children}
        <Toaster />
      </UserProvider>
    </QueryProvider>
  );
}

function AuthInitializerWrapper() {
  const pathname = usePathname();
  
  if (pathname === "/login") {
    return null;
  }

  return <AuthInitializer />;
}

function AuthInitializer() {
  const { user, setUser, clearUser } = useUser();
  const hasCleared = useRef(false);

  const { data, isError } = useQuery<CheckAuthResponse>({
    queryKey: ["authenticatedUser"],
    queryFn: checkAuth,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (data?.user) {
      hasCleared.current = false;
      if (!user || user.id !== data.user.id) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
          name: data.user.name ?? "",
          updated_at: data.user.updated_at,
        });
      }
    }
  }, [data, user, setUser]);

  useEffect(() => {
    if (isError && !hasCleared.current) {
      hasCleared.current = true;
      clearUser();
    }
  }, [isError, clearUser]);

  return null;
}
