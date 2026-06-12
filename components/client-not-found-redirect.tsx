"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  target: string;
}

export default function ClientNotFoundRedirect({ target }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return null;
}
