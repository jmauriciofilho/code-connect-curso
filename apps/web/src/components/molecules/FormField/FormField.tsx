import { useId } from 'react'
import type { ComponentProps } from 'react'
import { ErrorMessage } from '../../atoms/ErrorMessage'
import { Input } from '../../atoms/Input'
import { Label } from '../../atoms/Label'

type FormFieldProps = ComponentProps<'input'> & {
  label: string
  error?: string
}

export function FormField({ label, error, id, className = '', ...props }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className={`flex flex-col gap-field ${className}`}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </div>
  )
}
