import type { ComponentProps } from 'react'

export function ErrorMessage({ className = '', ...props }: ComponentProps<'p'>) {
  return <p role="alert" className={`text-base text-danger ${className}`} {...props} />
}
