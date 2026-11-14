import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../../features/auth/schemas'
import type { LoginValues } from '../../../features/auth/schemas'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import { TextLink } from '../../atoms/TextLink'
import { CheckboxField } from '../../molecules/CheckboxField'
import { FormField } from '../../molecules/FormField'

type LoginFormProps = {
  onSubmit?: (values: LoginValues) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', remember: false },
  })

  return (
    <form onSubmit={handleSubmit((values) => onSubmit?.(values))} noValidate className="flex flex-col gap-section">
      <FormField
        label="Email ou usuário"
        placeholder="usuario123"
        autoComplete="username"
        error={errors.identifier?.message}
        {...register('identifier')}
      />
      <div className="flex flex-col gap-field">
        <FormField
          label="Senha"
          type="password"
          placeholder="******"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center justify-between">
          <CheckboxField label="Lembrar-me" {...register('remember')} />
          <TextLink href="#">Esqueci a senha</TextLink>
        </div>
      </div>
      <Button type="submit" className="mt-field">
        Login
        <Icon name="arrowRight" />
      </Button>
    </form>
  )
}
