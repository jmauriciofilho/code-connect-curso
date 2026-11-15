import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckboxField } from './CheckboxField'

describe('CheckboxField', () => {
  it('marca ao clicar no texto do label', async () => {
    render(<CheckboxField label="Lembrar-me" />)
    await userEvent.click(screen.getByText('Lembrar-me'))
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeChecked()
  })
})
