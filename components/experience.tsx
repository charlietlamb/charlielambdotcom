import experienceData from "@/lib/data.json";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-foreground">
            Hey, I'm Charlie
          </h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground mb-1">
          Software Engineer with a passion for building things. Currently
          working as a Product Engineer at{" "}
          <span className="text-foreground">LightWork</span>.
        </p>
      </header>

      <div className="space-y-8">
        {experience.map((item) => (
          <article key={item.id}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-foreground">
                {item.title}{" "}
                <span className="text-muted-foreground font-normal">
                  at {item.company}
                </span>
              </h3>
              <time className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
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
      </div>
    </section>
  );
}
