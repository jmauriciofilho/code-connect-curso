import { useId } from 'react'
import type { ComponentProps } from 'react'
import { Checkbox } from '../../atoms/Checkbox'

type CheckboxFieldProps = Omit<ComponentProps<'input'>, 'type'> & { label: string }

export function CheckboxField({ label, id, ...props }: CheckboxFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex items-center gap-4">
      <Checkbox id={inputId} {...props} />
      <label htmlFor={inputId} className="cursor-pointer text-body font-light text-muted">
        {label}
      </label>
    </div>
  )
}
