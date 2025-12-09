import type { Metadata } from "next";

const name = "Charlie Lamb";
const description =
  "Software Engineer with a passion for building. Currently working as a Founding Engineer at Autumn (YC S25).";

export const metadata: Metadata = {
  title: {
    default: name,
    template: `%s | ${name}`,
  },
  description,
  keywords: [
    name,
    "Software Engineer",
    "Full Stack Developer",
    "Autumn",
    "YC S25",
  ],
  authors: [{ name, url: "https://charlielamb.com" }],
  creator: name,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    title: name,
    description,
    siteName: name,
  },
  twitter: {
    card: "summary_large_image",
    title: name,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
