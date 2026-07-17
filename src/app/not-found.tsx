import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">This page could not be found.</p>
      <Button asChild>
        <a href="/">Back to home</a>
      </Button>
    </div>
  );
}
