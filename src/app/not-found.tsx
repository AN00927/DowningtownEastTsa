import { Compass } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Compass className="h-7 w-7" aria-hidden />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or may have moved. Try one
        of the main pages instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          Back to Home
        </ButtonLink>
        <ButtonLink href="/events" variant="outline">
          Browse Events
        </ButtonLink>
      </div>
    </Container>
  );
}
