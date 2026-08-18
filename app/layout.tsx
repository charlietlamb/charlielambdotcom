import { Databuddy } from "@databuddy/sdk/react";
import { Geist, Geist_Mono } from "next/font/google";
import { metadata } from "@/app/metadata";
import { BackgroundVideo } from "@/components/background-video";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd
          baseUrl={
            process.env.NEXT_PUBLIC_SITE_URL || "https://charlielamb.com"
          }
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundVideo />
          {children}
        </ThemeProvider>
        <Databuddy
          clientId="e6408ef2-d44e-4d1f-8f7a-babfebd3aea8"
          disabled={process.env.NODE_ENV !== "production"}
          trackErrors
          trackInteractions
          trackOutgoingLinks
          trackWebVitals
        />
      </body>
    </html>
  );
}
