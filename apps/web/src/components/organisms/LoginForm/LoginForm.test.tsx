import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('mostra erros e não envia com campos vazios', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(await screen.findByText('Informe seu email ou usuário')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envia os valores preenchidos', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'maria')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByLabelText('Lembrar-me'))
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    await vi.waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ identifier: 'maria', password: 'segredo', remember: true }),
    )
  })
})
