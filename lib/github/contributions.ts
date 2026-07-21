export type ContribDay = { date: string; level: number; count: number };
export type Contributions = {
  login: string;
  total: number;
  days: ContribDay[];
};

const LEVEL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }>;
          }>;
        };
      };
    };
  };
  errors?: unknown;
};

export async function fetchContributions(
  login: string,
  token: string,
): Promise<Contributions> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "content-type": "application/json",
      "user-agent": "charlielamb-portfolio-heatmap",
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });

  if (!response.ok) {
    throw new Error(`github graphql ${response.status}`);
  }

  const json = (await response.json()) as GraphQLResponse;
  const calendar =
    json.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) {
    throw new Error(
      `github graphql: ${JSON.stringify(json.errors ?? "no data")}`,
    );
  }

  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      level: LEVEL[day.contributionLevel] ?? 0,
      count: day.contributionCount,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return { login, total: calendar.totalContributions, days };
}
