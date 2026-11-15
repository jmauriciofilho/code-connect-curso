import type { ComponentProps } from 'react'

export function Label({ className = '', ...props }: ComponentProps<'label'>) {
  return <label className={`text-body font-light ${className}`} {...props} />
}
