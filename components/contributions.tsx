"use client";

import { GitCommitIcon } from "@phosphor-icons/react";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  ContribDay,
  Contributions as ContributionsData,
} from "@/lib/github/contributions";

const SIZE = 11;
const GAP = 3;
const STEP = SIZE + GAP;
const DAY_MS = 86_400_000;
const LEVEL_VARS = [
  "var(--contrib-0)",
  "var(--contrib-1)",
  "var(--contrib-2)",
  "var(--contrib-3)",
  "var(--contrib-4)",
];
const random = (index: number, salt: number) => {
  const value = Math.sin((index + 1) * (salt + 1) * 999) * 10_000;
  return value - Math.floor(value);
};
const SKELETON_CELLS = Array.from({ length: 53 * 7 }, (_, index) => ({
  key: `${Math.floor(index / 7)}-${index % 7}`,
  delay: `${(-random(index, 1) * 3).toFixed(2)}s`,
  duration: `${(2.6 + random(index, 2) * 1.6).toFixed(2)}s`,
}));
const SKELETON_GRID: Grid = {
  cells: [],
  width: 53 * STEP - GAP,
  height: 7 * STEP - GAP,
};

type GridCell = { col: number; row: number; level: number; day?: ContribDay };
type Grid = { cells: GridCell[]; width: number; height: number };
type Hover = { day: ContribDay; x: number; y: number };

function buildGrid(days: ContribDay[]): Grid {
  if (days.length === 0) return { cells: [], width: 0, height: 0 };

  const start = new Date(`${days[0].date}T00:00:00Z`);
  const end = new Date(`${days[days.length - 1].date}T00:00:00Z`);
  const gridStart = new Date(start);
  gridStart.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const byDate = new Map(days.map((day) => [day.date, day]));

  const cells: GridCell[] = [];
  let weeks = 0;
  for (let t = gridStart.getTime(); t <= end.getTime(); t += DAY_MS) {
    const date = new Date(t);
    const col = Math.floor((t - gridStart.getTime()) / (7 * DAY_MS));
    const day =
      t >= start.getTime()
        ? byDate.get(date.toISOString().slice(0, 10))
        : undefined;
    cells.push({ col, row: date.getUTCDay(), level: day?.level ?? 0, day });
    weeks = Math.max(weeks, col + 1);
  }
  return { cells, width: weeks * STEP - GAP, height: 7 * STEP - GAP };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase();
}

export function Contributions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ContributionsData | null>(null);
  const [hover, setHover] = useState<Hover | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-heatmap")
      .then((response) => (response.ok ? response.json() : null))
      .then((json: ContributionsData | null) => {
        if (!cancelled && json) setData(json);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const grid = useMemo(
    () => (data ? buildGrid(data.days) : SKELETON_GRID),
    [data],
  );
  const cellByKey = useMemo(
    () => new Map(grid.cells.map((cell) => [`${cell.col}-${cell.row}`, cell])),
    [grid],
  );

  const track = (event: MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const box = svg.getBoundingClientRect();
    const scale = grid.width / box.width;
    const col = Math.floor(((event.clientX - box.left) * scale) / STEP);
    const row = Math.floor(((event.clientY - box.top) * scale) / STEP);
    const cell = cellByKey.get(`${col}-${row}`);
    const container = containerRef.current?.getBoundingClientRect();
    if (cell?.day && container) {
      setHover({
        day: cell.day,
        x: event.clientX - container.left,
        y: event.clientY - container.top,
      });
    } else {
      setHover(null);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-medium tracking-tight text-foreground">
          Recent Contributions
        </h2>
        <div className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
          <GitCommitIcon weight="fill" className="size-3.5" />
          {data ? (
            data.total.toLocaleString("en-US")
          ) : (
            <Skeleton className="h-3 w-8 rounded-sm">
              <span className="sr-only">Loading</span>
            </Skeleton>
          )}{" "}
          last yr
        </div>
      </div>
      <div ref={containerRef} className="relative w-full">
        <div className="overflow-x-auto">
          <svg
            aria-label="github contributions over the last year"
            aria-busy={!data}
            role="img"
            viewBox={`0 0 ${grid.width} ${grid.height}`}
            className="w-full min-w-[560px]"
            onMouseMove={track}
            onMouseLeave={() => setHover(null)}
          >
            {data ? (
              grid.cells.map((cell) => (
                <rect
                  key={`${cell.col}-${cell.row}`}
                  x={cell.col * STEP}
                  y={cell.row * STEP}
                  width={SIZE}
                  height={SIZE}
                  rx={2}
                  fill={LEVEL_VARS[cell.level] ?? LEVEL_VARS[0]}
                  className={
                    hover?.day.date === cell.day?.date
                      ? "brightness-125"
                      : undefined
                  }
                />
              ))
            ) : (
              <foreignObject width={grid.width} height={grid.height}>
                <div className="grid grid-flow-col grid-cols-[repeat(53,11px)] grid-rows-[repeat(7,11px)] gap-[3px]">
                  {SKELETON_CELLS.map((cell) => (
                    <Skeleton
                      key={cell.key}
                      shimmer={false}
                      className="size-[11px] rounded-[2px]"
                      style={{
                        animationDelay: cell.delay,
                        animationDuration: cell.duration,
                      }}
                    />
                  ))}
                </div>
              </foreignObject>
            )}
          </svg>
        </div>
        {hover ? (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-sm"
            style={{ left: hover.x, top: hover.y - 6 }}
          >
            <span className="block whitespace-nowrap font-medium">
              {hover.day.count === 1
                ? "1 contribution"
                : `${hover.day.count} contributions`}
            </span>
            <span className="mt-0.5 block whitespace-nowrap text-muted-foreground">
              {formatDate(hover.day.date)}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
