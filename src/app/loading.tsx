export default function Loading() {
  return(
    <div
    className="flex flex-col items-center justify-center gap-4 py-24"
    role="status"
    aria-live="polite"
  >
    <div
      className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary"
      aria-hidden
    />
    <p className="text-muted-foreground">Loading ...</p>
  </div>
  )
}
