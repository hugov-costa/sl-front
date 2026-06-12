"use client";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider, useUser } from "@/contexts/user-context";
import { useEffect } from "react";
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
        <AuthInitializer />
        {children}
        <Toaster />
      </UserProvider>
    </QueryProvider>
  );
}

function AuthInitializer() {
  const { user, setUser } = useUser();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  const { data } = useQuery<CheckAuthResponse>({
    queryKey: ["authenticatedUser"],
    queryFn: checkAuth,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    enabled: !isLoginPage,
  });

  useEffect(() => {
    if (data?.user) {
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

  return null;
}
