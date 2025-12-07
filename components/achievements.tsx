import Link from "next/link";
import achievementsData from "@/lib/data.json";
import { SectionHeader } from "./section-header";

interface AchievementItem {
  id: string;
  startText: string;
  linkText: string;
  endText: string;
  url?: string;
}

export function Achievements() {
  const { achievements } = achievementsData as {
    achievements: AchievementItem[];
  };

  return (
    <section className="space-y-4">
      <SectionHeader>Misc</SectionHeader>
      <div className="space-y-2">
        {achievements.map((item) => {
          return (
            <p
              key={item.id}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              • {item.startText}
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline hover:text-foreground transition-colors"
                >
                  {item.linkText}
                </Link>
              ) : (
                item.linkText
              )}
              {item.endText}
            </p>
          );
        })}
      </div>
    </section>
  );
}
