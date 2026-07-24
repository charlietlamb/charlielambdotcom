import { AutumnIcon } from "@/components/icons/autumn-icon";
import { BunIcon } from "@/components/icons/bun-icon";
import { EffectIcon } from "@/components/icons/effect-icon";
import { TypeScriptIcon } from "@/components/icons/typescript-icon";
import { ZodIcon } from "@/components/icons/zod-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { ToolLink } from "@/components/tool-link";

export function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground tracking-tight">
          Charlie Lamb
        </h1>
        <ThemeToggle />
      </div>
      <p className="text-pretty text-muted-foreground">
        London based software engineer, working as a founding engineer at{" "}
        <ToolLink
          backgroundTint="autumn"
          href="https://useautumn.com"
          label="Autumn"
          icon={AutumnIcon}
          suffix="."
        />{" "}
        I like writing strict, clean{" "}
        <ToolLink
          backgroundTint="typescript"
          href="https://www.typescriptlang.org"
          label="TypeScript"
          icon={TypeScriptIcon}
        />{" "}
        with tools like{" "}
        <ToolLink
          backgroundTint="effect"
          href="https://effect.website"
          label="Effect"
          icon={EffectIcon}
          suffix=","
        />{" "}
        <ToolLink
          backgroundTint="bun"
          href="https://bun.sh"
          label="Bun"
          icon={BunIcon}
          suffix=","
        />{" "}
        and{" "}
        <ToolLink
          backgroundTint="zod"
          href="https://zod.dev"
          label="Zod"
          icon={ZodIcon}
          suffix=" - the"
        />{" "}
        stronger the types, the better.
      </p>
    </header>
  );
}
