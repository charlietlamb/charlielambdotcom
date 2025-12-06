import educationData from "@/lib/data.json";
import { SectionHeader } from "./section-header";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export function Education() {
  const { education } = educationData as { education: EducationItem[] };

  return (
    <section className="space-y-4">
      <SectionHeader>Education</SectionHeader>
      <div className="space-y-6">
        {education.map((item) => (
          <article key={item.id}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-foreground">
                {item.institution}{" "}
                <span className="text-muted-foreground font-normal">
                  {item.degree}
                </span>
              </h3>
              <time className="text-sm text-metadata-foreground whitespace-nowrap shrink-0">
                {item.period}
              </time>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
