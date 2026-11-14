import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  it('é nomeado pelo label e dispara onClick', async () => {
    const onClick = vi.fn()
    render(<SocialButton icon="/git.png" label="Github" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Github' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
