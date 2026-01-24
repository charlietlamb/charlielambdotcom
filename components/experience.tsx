"use client";

import { useMemo, useState } from "react";
import experienceData from "@/lib/data.json";
import { SectionHeader } from "./section-header";
import { UrlPreviewTooltip } from "./url-preview-tooltip";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  url?: string;
  previewImage?: string;
}

interface HoverState {
  id: string | null;
  mousePosition: { x: number; y: number };
}

export function Experience() {
  const { experience } = experienceData as { experience: ExperienceItem[] };
  const [hoverState, setHoverState] = useState<HoverState>({
    id: null,
    mousePosition: { x: 0, y: 0 },
  });

  const urlsToPreload = useMemo(
    () =>
      experience
        .filter((item): item is ExperienceItem & { url: string } => !!item.url)
        .map((item) => ({
          id: item.id,
          url: item.url,
          previewImage: item.previewImage,
        })),
    [experience],
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>,
    itemId: string,
  ) => {
    setHoverState({
      id: itemId,
      mousePosition: { x: event.clientX, y: event.clientY },
    });
  };

  const handleMouseLeave = () => {
    setHoverState({ id: null, mousePosition: { x: 0, y: 0 } });
  };

  return (
    <section className="space-y-4">
      <SectionHeader>Experience</SectionHeader>
      <div className="space-y-6">
        {experience.map((item) => (
          <article
            key={item.id}
            onMouseMove={(e) => item.url && handleMouseMove(e, item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-foreground">
                {item.title}{" "}
                <span className="text-muted-foreground">at {item.company}</span>
              </h3>
              <time className="text-sm text-metadata-foreground whitespace-nowrap shrink-0 mt-[2.5px]">
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
      <UrlPreviewTooltip
        urls={urlsToPreload}
        activeId={hoverState.id}
        mousePosition={hoverState.mousePosition}
      />
    </section>
  );
}
