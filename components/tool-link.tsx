import Link from "next/link";

type ToolLinkProps = {
  backgroundTint?: "autumn" | "typescript" | "effect" | "bun" | "zod";
  href: string;
  label: string;
  icon: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>;
  suffix?: string;
};

export function ToolLink({
  backgroundTint,
  href,
  label,
  icon: Icon,
  suffix,
}: ToolLinkProps) {
  return (
    <span className="whitespace-nowrap">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-background-tint={backgroundTint}
        className="inline-flex max-w-full translate-y-0.5 items-end gap-[0.2em] align-baseline font-medium leading-none tracking-tight text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        <Icon className="size-[0.84375em] shrink-0" />
        {label}
      </Link>
      {suffix}
    </span>
  );
}
