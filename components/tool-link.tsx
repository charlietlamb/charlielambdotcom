import Link from "next/link";

type ToolLinkProps = {
  href: string;
  label: string;
  icon: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>;
  suffix?: string;
};

export function ToolLink({ href, label, icon: Icon, suffix }: ToolLinkProps) {
  return (
    <span className="whitespace-nowrap">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-w-full items-center gap-[0.25em] align-baseline text-[0.84375em] font-medium leading-none tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        <Icon className="size-[1em] shrink-0" />
        {label}
      </Link>
      {suffix}
    </span>
  );
}
