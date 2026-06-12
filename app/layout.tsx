import type { Metadata } from "next";
import { Poppins, Inter, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { User } from "@/interfaces/user";
import { apiUrlServer } from "@/utils/apiUrl";
import { headers } from "next/headers";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softline",
  description: "Sistema de gerenciamento de produtos",
};

async function fetchInitialUser(): Promise<User | null> {
  try {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "/";

    if (pathname === "/login") {
      return null;
    }

    if (!apiUrlServer) {
      return null;
    }

    const response = await fetch(`${apiUrlServer}/check-auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await fetchInitialUser();

  return (
    <html
      className={cn(
        "h-full",
        "antialiased",
        poppins.className,
        inter.className,
        "font-sans",
        geist.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Providers initialUser={initialUser}>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
