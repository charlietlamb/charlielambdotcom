import data from "@/lib/data.json";

interface JsonLdProps {
  baseUrl: string;
}

export function JsonLd({ baseUrl }: JsonLdProps) {
  const currentJob = data.experience[0];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charlie Lamb",
    url: baseUrl,
    jobTitle: currentJob.title,
    worksFor: {
      "@type": "Organization",
      name: currentJob.company,
      url: currentJob.url,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
