import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Contact() {
  return (
    <section className="space-y-4">
      <Separator />
      <footer className="text-muted-foreground inline-flex text-center w-full">
        <p className="text-sm">
          If you want to get in touch, feel free to send me an{" "}
          <Link
            href="mailto:charlielamb20@icloud.com"
            className="text-foreground underline hover:text-foreground/80 transition-colors"
          >
            email
          </Link>
          .
        </p>
      </footer>
    </section>
  );
}
