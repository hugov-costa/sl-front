import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

export function SaveButton({ loading, className, ...props }: SaveButtonProps) {
  return (
    <Button
      className={cn(
        "w-full md:w-auto md:justify-self-end px-6 gap-2 font-medium shadow-md hover:shadow-lg",
        "cursor-pointer",
        className,
      )}
      disabled={loading}
      type="submit"
      {...props}
    >
      {loading ? (
        <>
          <span className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Salvando...
        </>
      ) : (
        "Salvar"
      )}
    </Button>
  );
}
