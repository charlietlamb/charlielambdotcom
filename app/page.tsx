import { Experience } from "@/components/experience";
import { Header } from "@/components/header";
import { Socials } from "@/components/socials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
      <Header />
      <Socials />
      <Experience />
    </div>
  );
}
