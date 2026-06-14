"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-linear-to-r from-border via-border to-transparent data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
