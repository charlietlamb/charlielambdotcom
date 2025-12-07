import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
      <Header />
      <Experience />
      <Education />
      <Achievements />
      <Contact />
    </div>
  );
}
