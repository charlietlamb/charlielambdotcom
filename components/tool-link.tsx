import Link from "next/link";

type ToolLinkProps = {
  backgroundTint?: "autumn" | "typescript" | "effect" | "bun" | "zod" | "spurs";
  href: string;
  label: string;
  icon?: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>;
  iconClassName?: string;
  suffix?: string;
};

export function ToolLink({
  backgroundTint,
  href,
  label,
  icon: Icon,
  iconClassName = "size-[0.84375em]",
  suffix,
}: ToolLinkProps) {
  return (
    <span className="mx-[0.15em] whitespace-nowrap">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-background-tint={backgroundTint}
        className="group/tool inline-flex max-w-full translate-y-0.5 items-end gap-[0.3em] align-baseline leading-none text-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        {Icon ? <Icon className={`${iconClassName} shrink-0`} /> : null}
        <span className="underline decoration-border decoration-1 underline-offset-[0.2em] transition-colors group-hover/tool:decoration-current">
          {label}
        </span>
      </Link>
      {suffix}
    </span>
  );
}
