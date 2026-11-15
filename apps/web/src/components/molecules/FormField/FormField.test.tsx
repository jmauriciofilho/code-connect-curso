import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormField } from './FormField'

describe('FormField', () => {
  it('liga o label ao input', async () => {
    render(<FormField label="Senha" type="password" />)
    const input = screen.getByLabelText('Senha')
    await userEvent.type(input, '123')
    expect(input).toHaveValue('123')
  })

  it('exibe o erro e o associa ao input', () => {
    render(<FormField label="Email" error="Informe seu email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Informe seu email')
  })
})
