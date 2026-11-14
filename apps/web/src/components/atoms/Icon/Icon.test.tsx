import { render } from '@testing-library/react'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renderiza o SVG como decorativo', () => {
    const { container } = render(<Icon name="check" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelector('path')).toBeInTheDocument()
  })
})
