import experienceData from "@/lib/data.json";

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
      <section className="space-y-8">
        {experience.map((item) => (
          <article key={item.id}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-foreground">
                {item.title}{" "}
                <span className="text-muted-foreground font-normal">
                  at {item.company}
                </span>
              </h3>
              <time className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                {item.period}
              </time>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-x-1 text-xs text-muted-foreground">
              {item.technologies.map((tech, index) => (
                <span key={tech}>
                  {tech}
                  {index < item.technologies.length - 1 && (
                    <span className="mx-1">/</span>
                  )}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
  );
}
