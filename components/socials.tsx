import { GitHubIcon } from "@/components/icons/github-icon";
import { XIcon } from "@/components/icons/x-icon";
import { LinkedInIcon } from "./icons/linkedin-icon";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://go.charlielamb.com/github",
    icon: <GitHubIcon className="size-4" />,
  },
  {
    label: "X",
    href: "https://go.charlielamb.com/x",
    icon: <XIcon className="size-4" />,
  },
  {
    label: "LinkedIn",
    href: "https://go.charlielamb.com/linkedin",
    icon: <LinkedInIcon className="size-4" />,
  },
] as const;

export function Socials() {
  return (
    <nav aria-label="Social profiles" className="flex items-center gap-4">
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          {social.icon}
        </a>
      ))}
    </nav>
  );
}
