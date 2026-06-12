"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

type ThemeName = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: ThemeName | undefined;
  setTheme: (
    t: ThemeName | ((prev: ThemeName | undefined) => ThemeName),
  ) => void;
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark";
  themes: string[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    return {
      theme: "system" as ThemeName,
      setTheme: () => {},
      resolvedTheme: "light" as const,
      systemTheme: "light" as const,
      themes: ["light", "dark"],
    };
  return ctx;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
  storageKey = "theme",
  themes = ["light", "dark"],
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: ThemeName;
  enableSystem?: boolean;
  storageKey?: string;
  themes?: string[];
}) {
  const getSystem = useCallback((): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const [theme, setThemeState] = useState<ThemeName | undefined>(() => {
    return undefined;
  });

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      let next: ThemeName | null = null;

      if (stored) {
        next = stored as ThemeName;
      } else {
        next = defaultTheme;
      }

      if (next === "system") {
        const sys = getSystem();

        if (attribute === "class") {
          document.documentElement.classList.remove(...themes);
          document.documentElement.classList.add(sys);
        } else if (attribute) {
          document.documentElement.setAttribute(attribute, sys);
        }

        document.documentElement.style.colorScheme = sys;
      } else if (next) {
        if (attribute === "class") {
          document.documentElement.classList.remove(...themes);
          document.documentElement.classList.add(next);
        } else if (attribute) {
          document.documentElement.setAttribute(attribute, next);
        }

        document.documentElement.style.colorScheme =
          next === "light" || next === "dark" ? next : "light";
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const systemTheme: "light" | "dark" = useMemo(
    () => (typeof window !== "undefined" ? getSystem() : "light"),
    [getSystem],
  );

  const resolvedTheme = useMemo(() => {
    if (!theme) {
      return defaultTheme === "system" && enableSystem
        ? systemTheme
        : (defaultTheme as "light" | "dark");
    }

    if (theme === "system") {
      return enableSystem ? systemTheme : (defaultTheme as "light" | "dark");
    }

    return theme as "light" | "dark";
  }, [theme, defaultTheme, enableSystem, systemTheme]);

  const setTheme = useCallback(
    (value: ThemeName | ((prev: ThemeName | undefined) => ThemeName)) => {
      const next =
        typeof value === "function" ? (value(theme) as ThemeName) : value;

      try {
        localStorage.setItem(storageKey, next);
      } catch {}

      if (attribute === "class") {
        document.documentElement.classList.remove(...themes);

        if (next !== "system") {
          document.documentElement.classList.add(next);
        }
      } else if (attribute) {
        document.documentElement.setAttribute(
          attribute,
          next === "system" ? "" : (value as string),
        );
      }

      if (next === "system" && enableSystem) {
        document.documentElement.style.colorScheme = getSystem();
      } else if (next === "light" || next === "dark") {
        document.documentElement.style.colorScheme = next;
      }

      setThemeState(next);
    },
    [attribute, storageKey, themes, enableSystem, getSystem, theme],
  );

  useEffect(() => {
    const handlePref = () => {
      if (!theme || theme === "system") {
        const sys = getSystem();

        if (attribute === "class") {
          document.documentElement.classList.remove(...themes);
          document.documentElement.classList.add(sys);
        } else if (attribute) {
          document.documentElement.setAttribute(attribute, sys);
        }

        document.documentElement.style.colorScheme = sys;
      }
    };

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", handlePref);

    return () => mq.removeEventListener?.("change", handlePref);
  }, [attribute, themes, theme, getSystem]);

  const ctx = useMemo(
    () => ({ theme, setTheme, resolvedTheme, systemTheme, themes }),
    [theme, setTheme, resolvedTheme, systemTheme, themes],
  );

  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
}
