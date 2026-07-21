import { AutumnIcon } from "@/components/icons/autumn-icon";
import { BunIcon } from "@/components/icons/bun-icon";
import { EffectIcon } from "@/components/icons/effect-icon";
import { ZodIcon } from "@/components/icons/zod-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { ToolLink } from "@/components/tool-link";
import { Socials } from "./socials";

export function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground tracking-tight">
          Charlie Lamb
        </h1>
        <div className="flex items-center gap-2">
          <Socials />
          <ThemeToggle />
        </div>
      </div>
      <p className="text-pretty text-muted-foreground">
        London based software engineer, founding engineer at{" "}
        <ToolLink
          href="https://useautumn.com"
          label="Autumn"
          icon={AutumnIcon}
        />
        {". "}I like writing strict, clean TypeScript with tools like{" "}
        <ToolLink
          href="https://effect.website"
          label="Effect"
          icon={EffectIcon}
        />
        , <ToolLink href="https://bun.sh" label="Bun" icon={BunIcon} />, and{" "}
        <ToolLink href="https://zod.dev" label="Zod" icon={ZodIcon} />
        {" - "}the stronger the types, the better.
      </p>
    </header>
  );
}
