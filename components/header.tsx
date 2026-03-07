"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Socials } from "./socials";
import { UrlPreviewTooltip } from "./url-preview-tooltip";

export function Header() {
  const [hoverState, setHoverState] = useState({
    id: null as string | null,
    mousePosition: { x: 0, y: 0 },
  });

  return (
    <>
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-foreground tracking-tight">
            Hey, I'm Charlie
          </h1>
          <div className="flex items-center gap-2">
            <Socials />
            <ThemeToggle />
          </div>
        </div>
        <p className="text-muted-foreground">
          Software Engineer with a passion for building. Currently working as a
          Founding Engineer at{" "}
          <Link
            href="https://useautumn.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={(event) =>
              setHoverState({
                id: "autumn",
                mousePosition: { x: event.clientX, y: event.clientY },
              })
            }
            onMouseLeave={() =>
              setHoverState({ id: null, mousePosition: { x: 0, y: 0 } })
            }
            className="text-muted-foreground hover:text-foreground underline transition-colors"
          >
            Autumn
          </Link>
          .
        </p>
      </header>
      <UrlPreviewTooltip
        urls={[{ id: "autumn", url: "https://useautumn.com" }]}
        activeId={hoverState.id}
        mousePosition={hoverState.mousePosition}
      />
    </>
  );
}
