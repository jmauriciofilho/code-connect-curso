import { render, screen } from '@testing-library/react'
import { DividerWithText } from './DividerWithText'

describe('DividerWithText', () => {
  it('mostra o texto no separador', () => {
    render(<DividerWithText>ou entre</DividerWithText>)
    expect(screen.getByRole('separator')).toHaveTextContent('ou entre')
  })
})
