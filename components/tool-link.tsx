import Link from "next/link";

type ToolLinkProps = {
  href: string;
  label: string;
  icon: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>;
};

export function ToolLink({ href, label, icon: Icon }: ToolLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full items-center gap-1 whitespace-nowrap align-baseline font-medium leading-none tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}
