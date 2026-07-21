import {
  ArrowUpRightIcon,
  GitCommitIcon,
  PackageIcon,
  StarIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react/ssr";
import { GitHubIcon } from "@/components/icons/github-icon";
import { SphynxIcon } from "@/components/icons/sphynx-icon";

type Repository = {
  stargazerCount: number;
  defaultBranchRef: { target: { history: { totalCount: number } } } | null;
};

type Stats = Record<string, { stars: number; commits: number }>;

const PROJECTS = [
  {
    slug: "sphynx",
    name: "Sphynx",
    description: "Agentic code review",
    website: "https://sphynx.sh",
    icon: (
      <SphynxIcon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
    ),
  },
  {
    slug: "openlogs",
    name: "OpenLogs",
    description: "Give coding agents access to your logs",
    website: "https://openlogs.dev",
    icon: (
      <TerminalWindowIcon
        weight="fill"
        className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
      />
    ),
  },
  {
    slug: "ferix",
    name: "Ferix",
    description: "Discover and share agent skills",
    website: "https://www.ferix.ai",
    icon: (
      <PackageIcon
        weight="fill"
        className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
      />
    ),
  },
] as const;

const QUERY = `query {
  sphynx: repository(owner: "charlietlamb", name: "sphynx") {
    stargazerCount defaultBranchRef { target { ... on Commit { history { totalCount } } } }
  }
  openlogs: repository(owner: "charlietlamb", name: "openlogs") {
    stargazerCount defaultBranchRef { target { ... on Commit { history { totalCount } } } }
  }
  ferix: repository(owner: "charlietlamb", name: "ferix") {
    stargazerCount defaultBranchRef { target { ... on Commit { history { totalCount } } } }
  }
}`;

async function getStats(): Promise<Stats> {
  if (!process.env.GITHUB_TOKEN) return {};

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "content-type": "application/json",
      "user-agent": "charlielamb-portfolio-projects",
    },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return {};

  const { data } = (await response.json()) as {
    data?: Record<string, Repository>;
  };
  if (!data) return {};

  return Object.fromEntries(
    Object.entries(data).map(([slug, repository]) => [
      slug,
      {
        stars: repository.stargazerCount,
        commits: repository.defaultBranchRef?.target.history.totalCount ?? 0,
      },
    ]),
  );
}

export async function Projects() {
  const stats = await getStats();

  return (
    <section className="space-y-3">
      <h2 className="text-base font-medium tracking-tight text-foreground">
        Things I’m building
      </h2>
      <ul className="divide-y divide-border/60">
        {PROJECTS.map((project) => {
          const projectStats = stats[project.slug];

          return (
            <li
              key={project.slug}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3"
            >
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-3"
              >
                {project.icon}
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                    {project.name}
                    <ArrowUpRightIcon
                      weight="bold"
                      className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {project.description}
                  </span>
                </span>
              </a>
              <span className="flex items-center gap-3 text-xs tabular-nums text-muted-foreground">
                <span className="flex items-center gap-1">
                  <StarIcon weight="fill" className="size-3.5" />
                  {projectStats?.stars.toLocaleString("en-US") ?? "—"}
                  <span className="sr-only"> stars</span>
                </span>
                <span className="flex items-center gap-1">
                  <GitCommitIcon weight="fill" className="size-3.5" />
                  {projectStats?.commits.toLocaleString("en-US") ?? "—"}
                  <span className="sr-only"> commits</span>
                </span>
                <a
                  href={`https://github.com/charlietlamb/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                  className="ml-1 transition-colors hover:text-foreground"
                >
                  <GitHubIcon className="size-4" />
                </a>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
