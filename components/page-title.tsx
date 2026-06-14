interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
        {title}
      </h1>
      <div className="h-1 w-12 rounded-full bg-linear-to-r from-primary to-accent"></div>
    </div>
  );
}
