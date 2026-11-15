import type { ComponentProps } from 'react'

export function Input({ className = '', ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={`h-control w-full rounded-lg bg-field px-5 text-body text-white placeholder:text-white/70 focus:outline-2 focus:outline-brand aria-invalid:outline-2 aria-invalid:outline-danger ${className}`}
      {...props}
    />
  )
}
