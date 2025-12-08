import experienceData from "@/lib/data.json";
import { SectionHeader } from "./section-header";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export function Experience() {
  const { experience } = experienceData as { experience: ExperienceItem[] };

  return (
    <section className="space-y-4">
      <SectionHeader>Experience</SectionHeader>
      <div className="space-y-6">
        {experience.map((item) => (
          <article key={item.id}>
            <div className="flex items-start md:items-center justify-between gap-4 mb-2">
              <h3 className="text-foreground">
                {item.title}{" "}
                <span className="text-muted-foreground">at {item.company}</span>
              </h3>
              <time className="text-sm text-metadata-foreground whitespace-nowrap shrink-0">
                {item.period}
              </time>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {item.description}
            </p>

            <div className="flex flex-wrap text-xs text-metadata-foreground gap-1.5">
              {item.technologies.map((tech, index) => (
                <span key={tech}>
                  {tech}
                  {index < item.technologies.length - 1 && (
                    <span className="text-muted-foreground/50 ml-1.5">/</span>
                  )}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
