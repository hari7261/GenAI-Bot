export function LoadingSpinner({ className }: { className?: string }) {
  // Utility function to combine class names conditionally
  const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className={cn("relative flex h-8 w-8", className)}>
      <div className="absolute h-full w-full rounded-full border-2 border-indigo-500/20"></div>
      <div className="absolute h-full w-full rounded-full border-t-2 border-indigo-500 animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-indigo-500">
        AI
      </div>
    </div>
  )
}
