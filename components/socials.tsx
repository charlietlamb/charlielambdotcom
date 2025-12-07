import { Github } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";
import { LinkedInIcon } from "./icons/linkedin-icon";

export function Socials() {
  return (
    <div className="flex gap-4">
      <a
        href="https://go.charlielamb.com/github"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="GitHub"
      >
        <Github className="h-5 w-5" />
      </a>
      <a
        href="https://go.charlielamb.com/x"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="X (Twitter)"
      >
        <XIcon />
      </a>
      <a
        href="https://go.charlielamb.com/linkedin"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="LinkedIn"
      >
        <LinkedInIcon className="h-5 w-5" />
      </a>
    </div>
  );
}
