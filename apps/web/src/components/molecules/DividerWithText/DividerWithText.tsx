export function DividerWithText({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-6" role="separator">
      <span className="h-px flex-1 bg-white" />
      <span className="text-body font-light">{children}</span>
      <span className="h-px flex-1 bg-white" />
    </div>
  )
}
