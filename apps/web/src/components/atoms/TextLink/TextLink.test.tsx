import { render, screen } from '@testing-library/react'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('renderiza um link com href', () => {
    render(<TextLink href="/x">Ir</TextLink>)
    expect(screen.getByRole('link', { name: 'Ir' })).toHaveAttribute('href', '/x')
  })
})
