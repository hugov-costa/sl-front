import React, { useEffect, useState } from "react";
import { FieldError } from "./field";
import type { FieldError as RHFFieldError } from "react-hook-form";

type FieldErrorLike = RHFFieldError | { message?: string } | undefined;

function extractCombinedMessages(errors?: FieldErrorLike[]): string[] {
  const messages: string[] = [];

  (errors || []).forEach((error: FieldErrorLike) => {
    if (!error) return;

    const rhf = error as RHFFieldError;
    const types = rhf.types as Record<string, unknown> | undefined;
    const custom = types?.custom as unknown;

    if (rhf.message) {
      messages.push(String(rhf.message));
    }

    if (custom) {
      if (typeof custom === "string") {
        messages.push(custom);
      } else if (Array.isArray(custom)) {
        messages.push(...custom.filter(Boolean).map(String));
      } else if (typeof custom === "object") {
        messages.push(...Object.values(custom).filter(Boolean).map(String));
      }
    }
  });

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const m of messages) {
    if (!seen.has(m)) {
      seen.add(m);
      unique.push(m);
    }
  }

  return unique;
}

export function FieldErrorZod({
  errors,
  ...props
}: React.ComponentProps<typeof FieldError> & { errors?: FieldErrorLike[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (mounted) {
    const allMessages = extractCombinedMessages(errors);

    if (allMessages.length > 0) {
      const mapped = allMessages.map((m) => ({ message: m }));
      return (
        <>
          {mapped.map((e, i) => (
            <FieldError key={`zod-${i}`} errors={[e]} {...props} />
          ))}
        </>
      );
    }
  }

  const mappedFallback = (errors || []).map((err) => {
    if (!err) return undefined;
    const msg = (err as { message?: unknown }).message;
    return { message: typeof msg === "string" ? msg : undefined };
  });

  return <FieldError errors={mappedFallback} {...props} />;
}

export default FieldErrorZod;
