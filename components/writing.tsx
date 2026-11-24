import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { AutumnIcon } from "@/components/icons/autumn-icon";

const POSTS = [
  {
    title: "Redesigning Autumn in 3 days",
    publication: "Autumn",
    icon: AutumnIcon,
    href: "https://useautumn.com/blog/redesigning-autumn-in-3-days",
    publishedAt: "2026-11-24",
  },
] as const;

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function Writing() {
  return (
    <section className="space-y-4">
      <h2 className="font-medium text-foreground">Writing</h2>
      <ul className="divide-y divide-border/40">
        {POSTS.map((post) => (
          <li key={post.href}>
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3"
            >
              <span className="flex min-w-0 items-center gap-3">
                <post.icon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                    <span className="truncate">{post.title}</span>
                    <ArrowUpRightIcon
                      weight="bold"
                      className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {post.publication}
                  </span>
                </span>
              </span>
              <time
                dateTime={post.publishedAt}
                className="text-xs tabular-nums text-muted-foreground"
              >
                {DATE_FORMAT.format(new Date(post.publishedAt))}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
