"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import achievementsData from "@/lib/data.json";
import { SectionHeader } from "./section-header";
import { UrlPreviewTooltip } from "./url-preview-tooltip";

interface AchievementItem {
  id: string;
  startText: string;
  linkText: string;
  endText: string;
  url?: string;
  previewImage?: string;
}

interface HoverState {
  id: string | null;
  mousePosition: { x: number; y: number };
}

export function Achievements() {
  const { achievements } = achievementsData as {
    achievements: AchievementItem[];
  };
  const [hoverState, setHoverState] = useState<HoverState>({
    id: null,
    mousePosition: { x: 0, y: 0 },
  });

  const urlsToPreload = useMemo(
    () =>
      achievements
        .filter((item): item is AchievementItem & { url: string } => !!item.url)
        .map((item) => ({
          id: item.id,
          url: item.url,
          previewImage: item.previewImage,
        })),
    [achievements],
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
      <SectionHeader>Misc</SectionHeader>
      <div className="space-y-2">
        {achievements.map((item) => {
          return (
            <p
              key={item.id}
              className="text-sm text-muted-foreground leading-relaxed"
              onMouseMove={(e) => item.url && handleMouseMove(e, item.id)}
              onMouseLeave={handleMouseLeave}
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
      <UrlPreviewTooltip
        urls={urlsToPreload}
        activeId={hoverState.id}
        mousePosition={hoverState.mousePosition}
        position="above"
      />
    </section>
  );
}
