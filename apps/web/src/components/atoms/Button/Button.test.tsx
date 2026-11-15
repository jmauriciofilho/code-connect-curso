import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('dispara onClick e usa type="button" por padrão', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Entrar</Button>)
    const button = screen.getByRole('button', { name: 'Entrar' })
    expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Entrar</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
