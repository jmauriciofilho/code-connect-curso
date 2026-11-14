import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('aceita digitação', async () => {
    render(<Input aria-label="nome" />)
    await userEvent.type(screen.getByLabelText('nome'), 'abc')
    expect(screen.getByLabelText('nome')).toHaveValue('abc')
  })

  it('repassa ref ao elemento nativo', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} aria-label="x" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
