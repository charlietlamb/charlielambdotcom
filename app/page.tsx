import { Experience } from "@/components/experience";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full max-w-3xl mx-auto px-4 py-8">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-foreground">
            Hey, I'm Charlie
          </h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground mb-1">
          Software Engineer with a passion for building things. Currently
          working as a Founding Engineer at{" "}
          <span className="text-foreground">Autumn</span>.
        </p>
      </header>
      <Experience />
    </div>
  );
}
