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
      className="inline-flex items-center gap-[0.3em] whitespace-nowrap font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
    >
      <Icon className="size-[0.85em] shrink-0" />
      {label}
    </Link>
  );
}
