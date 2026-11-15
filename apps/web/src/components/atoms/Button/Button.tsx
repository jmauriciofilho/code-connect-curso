import type { ComponentProps } from 'react'

export function Button({ className = '', type = 'button', ...props }: ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={`flex h-control-lg w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-brand text-cta font-semibold text-brand-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  )
}
