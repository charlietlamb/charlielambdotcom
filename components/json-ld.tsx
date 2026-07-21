interface JsonLdProps {
  baseUrl: string;
}

export function JsonLd({ baseUrl }: JsonLdProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charlie Lamb",
    url: baseUrl,
    jobTitle: "Founding Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Autumn (YC S25)",
      url: "https://useautumn.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Leeds",
    },
    sameAs: [
      "https://github.com/charlielamb",
      "https://linkedin.com/in/charlielamb",
      "https://x.com/charlielamb",
    ],
    knowsAbout: [
      "Software Engineering",
      "TypeScript",
      "React",
      "Node.js",
      "Full Stack Development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Charlie Lamb",
    url: baseUrl,
    description:
      "Software Engineer with a passion for building. Currently working as a Founding Engineer at Autumn (YC S25).",
    author: {
      "@type": "Person",
      name: "Charlie Lamb",
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </>
  );
}
