"use client";

import {
  SiBlazor,
  SiBun,
  SiClickhouse,
  SiDocker,
  SiDotnet,
  SiDrizzle,
  SiGit,
  SiGnubash,
  SiGooglecloud,
  SiJenkins,
  SiKubernetes,
  SiLanggraph,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AwsIcon } from "@/components/icons/aws-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { QdrantIcon } from "@/components/icons/qdrant-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

type TechnologyIcon = React.ComponentType<{
  title?: string;
  color?: string;
  size?: string | number;
  className?: string;
}>;

const GitHubActionsIcon: TechnologyIcon = ({ size = 14, className }) => (
  <GitHubIcon className={className} width={size} height={size} />
);

const CustomAwsIcon: TechnologyIcon = ({ size = 14, className }) => (
  <AwsIcon className={className} width={size} height={size} />
);

const CustomQdrantIcon: TechnologyIcon = ({ size = 14, className }) => (
  <QdrantIcon className={className} width={size} height={size} />
);

const technologyIcons: Record<string, TechnologyIcon> = {
  AWS: CustomAwsIcon,
  Bun: SiBun,
  React: SiReact,
  PostgreSQL: SiPostgresql,
  ClickHouse: SiClickhouse,
  Drizzle: SiDrizzle,
  "GitHub Actions": GitHubActionsIcon,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  MongoDB: SiMongodb,
  GCP: SiGooglecloud,
  LangGraph: SiLanggraph,
  Qdrant: CustomQdrantIcon,
  Kubernetes: SiKubernetes,
  "C# .NET": SiDotnet,
  MySQL: SiMysql,
  Docker: SiDocker,
  Jenkins: SiJenkins,
  Blazor: SiBlazor,
  Shell: SiGnubash,
  Git: SiGit,
};

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
          <article key={item.id}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-foreground">
                {item.title}{" "}
                {item.url ? (
                  <>
                    <span className="text-muted-foreground">at </span>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseMove={(event) => handleMouseMove(event, item.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-muted-foreground underline transition-colors hover:text-foreground"
                    >
                      {item.company}
                    </Link>
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    at {item.company}
                  </span>
                )}
              </h3>
              <time className="text-sm text-metadata-foreground whitespace-nowrap shrink-0 mt-[2.5px]">
                {item.period}
              </time>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center text-xs text-metadata-foreground">
              {item.technologies.map((tech, index) => {
                const Icon = technologyIcons[tech];

                return (
                  <div key={tech} className="contents">
                    {index > 0 && (
                      <span className="mx-1.5 text-muted-foreground/50">/</span>
                    )}
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        aria-label={tech}
                      >
                        {Icon ? (
                          <Icon
                            color="currentColor"
                            size={14}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="px-1 text-[11px] font-medium leading-none text-foreground">
                            {tech}
                          </span>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>{tech}</TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
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
