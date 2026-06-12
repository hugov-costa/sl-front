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
            className="w-full text-left disabled:opacity-50 cursor-pointer"
          >
            <div className="flex gap-1 text-sm">
              <div className="flex flex-row font-medium gap-3">
                {children}
                {title}
              </div>
            </div>
          </button>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href!}>
          <div className="flex gap-1 text-sm">
            <div className="flex flex-row font-medium gap-3">
              {children}
              {title}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
