import { PaperPlaneTiltIcon } from "@phosphor-icons/react/ssr";
import { Contributions } from "@/components/contributions";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Socials } from "@/components/socials";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-8 px-4 py-8 sm:justify-center">
      <Header />
      <Projects />
      <Contributions />
      <footer className="flex flex-col gap-3 pb-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          If you want to get in touch, feel free to send me an{" "}
          <a
            href="mailto:charlielamb20@icloud.com"
            aria-label="Email Charlie"
            className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="grid size-4 place-items-center rounded-[3px] bg-muted-foreground text-background transition-colors group-hover:bg-foreground">
              <PaperPlaneTiltIcon weight="fill" className="size-2.5" />
            </span>
            <span className="font-medium tracking-tight">email</span>
          </a>
          .
        </span>
        <Socials />
      </footer>
    </div>
  );
}
