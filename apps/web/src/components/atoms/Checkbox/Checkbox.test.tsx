import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('alterna o estado ao clicar', async () => {
    render(<Checkbox aria-label="aceito" />)
    const box = screen.getByRole('checkbox', { name: 'aceito' })
    expect(box).not.toBeChecked()
    await userEvent.click(box)
    expect(box).toBeChecked()
  })
})
