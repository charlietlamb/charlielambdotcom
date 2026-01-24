import { Separator } from "./ui/separator";

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-1">
      <h2 className="text-lg text-foreground tracking-tight">{children}</h2>
      <Separator />
    </div>
  );
}
