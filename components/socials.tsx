import { Github, Linkedin, Mail } from "lucide-react";
import { XIcon } from "@/components/x-icon";

export function Socials() {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/charlietlamb"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="GitHub"
      >
        <Github className="h-5 w-5" />
      </a>
      <a
        href="https://x.com/charlietlamb"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="X (Twitter)"
      >
        <XIcon />
      </a>
      <a
        href="https://linkedin.com/in/charlielamb"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </a>
      <a
        href="mailto:charlielamb20@icloud.com"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Email"
      >
        <Mail className="h-5 w-5" />
      </a>
    </div>
  );
}
