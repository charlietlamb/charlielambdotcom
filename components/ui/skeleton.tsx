import { cn } from "@/lib/utils";

type SkeletonProps = React.ComponentProps<"div"> & { shimmer?: boolean };

function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md bg-accent",
        shimmer
          ? "skeleton-shimmer"
          : "animate-pulse motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
