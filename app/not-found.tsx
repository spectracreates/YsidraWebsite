import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-3xl font-extrabold text-indigo">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink/60">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button href="/" className="mt-6">
        Back to home
      </Button>
    </Container>
  );
}
