import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Socials } from "./socials";

export function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground">Hey, I'm Charlie</h1>
        <div className="flex items-center gap-2">
          <Socials />
          <ThemeToggle />
        </div>
      </div>
      <p className="text-muted-foreground">
        Software Engineer with a passion for building. Currently working as a
        Founding Engineer at{" "}
        <Link
          href="https://useautumn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground underline transition-colors"
        >
          Autumn
        </Link>{" "}
        and building{" "}
        <Link
          href="https://ferix.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground underline transition-colors"
        >
          Ferix
        </Link>{" "}
        in my free time.
      </p>
    </header>
  );
}
