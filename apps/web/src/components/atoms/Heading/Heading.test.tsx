import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renderiza h1 por padrão e permite trocar a tag', () => {
    render(
      <>
        <Heading>Título</Heading>
        <Heading as="p" variant="subtitle">Sub</Heading>
      </>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Título' })).toBeInTheDocument()
    expect(screen.getByText('Sub').tagName).toBe('P')
  })
})
