import { render, screen } from '@testing-library/react'
import { AuthSwitchPrompt } from './AuthSwitchPrompt'

describe('AuthSwitchPrompt', () => {
  it('renderiza pergunta e link', () => {
    render(<AuthSwitchPrompt question="Já tem conta?" linkLabel="Entre" href="/login" />)
    expect(screen.getByText('Já tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Entre' })).toHaveAttribute('href', '/login')
  })
})
