import type { ComponentProps } from 'react'

const variants = {
  underline: 'text-white underline',
  brand: 'text-brand text-cta',
} as const

type TextLinkProps = ComponentProps<'a'> & { variant?: keyof typeof variants }

export function TextLink({ variant = 'underline', className = '', ...props }: TextLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-3 text-body font-light hover:opacity-80 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
