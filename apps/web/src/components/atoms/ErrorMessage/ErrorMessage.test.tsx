import { render, screen } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  it('é anunciada como alerta', () => {
    render(<ErrorMessage>Campo obrigatório</ErrorMessage>)
    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório')
  })
})
