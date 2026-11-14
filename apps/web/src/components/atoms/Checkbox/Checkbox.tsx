import type { ComponentProps } from 'react'
import { Icon } from '../Icon'

export function Checkbox({ className = '', ...props }: Omit<ComponentProps<'input'>, 'type'>) {
  return (
    <span className={`relative inline-flex size-[1.6em] text-body shrink-0 ${className}`}>
      <input
        type="checkbox"
        className="peer size-full cursor-pointer appearance-none rounded-md border-2 border-muted bg-transparent focus-visible:outline-2 focus-visible:outline-brand"
        {...props}
      />
      <Icon
        name="check"
        className="pointer-events-none absolute inset-0 m-auto size-5 text-brand opacity-0 peer-checked:opacity-100"
      />
    </span>
  )
}
