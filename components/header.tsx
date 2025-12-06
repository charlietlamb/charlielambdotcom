import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Hey, I'm Charlie</h1>
        <ThemeToggle />
      </div>
      <p className="text-muted-foreground">
        Software Engineer with a passion for building things. Currently working
        as a Founding Engineer at{" "}
        <Link
          href="https://useautumn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline hover:text-foreground/80 transition-colors"
        >
          Autumn
        </Link>
        .
      </p>
    </header>
  );
}
