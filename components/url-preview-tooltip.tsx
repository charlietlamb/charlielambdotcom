"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UrlPreviewItem {
  id: string;
  url: string;
  previewImage?: string;
}

interface UrlPreviewTooltipProps {
  urls: UrlPreviewItem[];
  activeId: string | null;
  mousePosition: { x: number; y: number };
  position?: "above" | "below";
}

export function UrlPreviewTooltip({
  urls,
  activeId,
  mousePosition,
  position = "below",
}: UrlPreviewTooltipProps) {
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());

  const handleLoad = (id: string) => {
    setLoadedUrls((prev) => new Set(prev).add(id));
  };

  const tooltipWidth = 400;
  const tooltipHeight = 300;
  const offsetX = 20;
  const offsetY = 20;

  const left = mousePosition.x + offsetX;
  const top =
    position === "above"
      ? mousePosition.y - tooltipHeight - offsetY
      : mousePosition.y + offsetY;

  const activeUrl = urls.find((u) => u.id === activeId);
  const isActiveLoaded = activeId
    ? activeUrl?.previewImage
      ? true
      : loadedUrls.has(activeId)
    : false;

  return (
    <>
      {/* Hidden prefetch container for iframes only */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        {urls
          .filter(({ previewImage }) => !previewImage)
          .map(({ id, url }) => (
            <iframe
              key={id}
              src={url}
              title={`Prefetch ${url}`}
              className="w-[800px] h-[600px]"
              onLoad={() => handleLoad(id)}
              sandbox="allow-scripts allow-same-origin"
            />
          ))}
      </div>
      {/* Visible tooltip */}
      {activeId && activeUrl && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${left}px`,
            top: `${top}px`,
            width: `${tooltipWidth}px`,
            height: `${tooltipHeight}px`,
          }}
        >
          <div
            className={cn(
              "w-full h-full rounded-none overflow-hidden",
              "border-2 border-border bg-background",
              "shadow-2xl shadow-black/20",
              "transition-opacity duration-200",
              isActiveLoaded ? "opacity-100" : "opacity-0",
            )}
          >
            {activeUrl.previewImage ? (
              <Image
                src={activeUrl.previewImage}
                alt={`Preview of ${activeUrl.url}`}
                fill
                className="object-cover object-top"
              />
            ) : (
              <iframe
                src={activeUrl.url}
                title={`Preview of ${activeUrl.url}`}
                className="w-[800px] h-[600px] origin-top-left pointer-events-none"
                style={{
                  transform: "scale(0.5)",
                }}
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </div>
          {!isActiveLoaded && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-border bg-muted">
              <div className="animate-pulse text-muted-foreground text-sm">
                Loading preview...
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
