import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label', () => {
  it('associa o texto ao controle via htmlFor', () => {
    render(
      <>
        <Label htmlFor="x">Campo</Label>
        <input id="x" />
      </>,
    )
    expect(screen.getByLabelText('Campo')).toBeInTheDocument()
  })
})
