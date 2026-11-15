import type { ComponentProps } from 'react'

const variants = {
  title: 'text-title font-semibold',
  subtitle: 'text-subtitle font-light',
} as const

type HeadingProps = ComponentProps<'h1'> & {
  variant?: keyof typeof variants
  as?: 'h1' | 'h2' | 'p'
}

export function Heading({ variant = 'title', as: Tag = 'h1', className = '', ...props }: HeadingProps) {
  return <Tag className={`${variants[variant]} ${className}`} {...props} />
}
