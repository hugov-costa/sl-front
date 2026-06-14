import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

export function SaveButton({ loading, className, ...props }: SaveButtonProps) {
  return (
    <Button
      className={cn(
        "w-full md:w-auto md:justify-self-end px-5",
        "cursor-pointer",
        className,
      )}
      disabled={loading}
      type="submit"
      {...props}
    >
      Salvar
    </Button>
  );
}
