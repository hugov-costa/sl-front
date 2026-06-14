import Link from "next/link";
import { NavigationMenuLink } from "../ui/navigation-menu";

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  title: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ListItem({
  title,
  children,
  href,
  onClick,
  disabled,
  ...props
}: ListItemProps) {
  const isButton = onClick !== undefined;

  if (isButton) {
    return (
      <li {...props}>
        <NavigationMenuLink asChild>
          <button
            onClick={onClick}
            disabled={disabled}
            className="w-full text-left rounded-[calc(var(--radius)-0.25rem)] mx-1 px-3 py-2.5 disabled:opacity-50 cursor-pointer transition-colors hover:bg-muted/50 focus:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring/50 focus:text-foreground disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="flex h-5 w-5 items-center justify-center text-muted-foreground group-hover:text-foreground">
                {children}
              </div>
              {title}
            </div>
          </button>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          className="rounded-[calc(var(--radius)-0.25rem)] mx-1 px-3 py-2.5 block transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50 focus:bg-primary/10 focus:text-foreground"
        >
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="flex h-5 w-5 items-center justify-center text-muted-foreground group-hover:text-foreground">
              {children}
            </div>
            {title}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
