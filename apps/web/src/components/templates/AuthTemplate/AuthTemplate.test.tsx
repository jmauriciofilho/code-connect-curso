import { render, screen } from '@testing-library/react'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renderiza banner, títulos e conteúdo', () => {
    render(
      <AuthTemplate bannerSrc="/b.png" bannerAlt="banner" title="Cadastro" subtitle="Crie sua conta">
        <p>conteúdo</p>
      </AuthTemplate>,
    )
    expect(screen.getByAltText('banner')).toHaveAttribute('src', '/b.png')
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByText('Crie sua conta')).toBeInTheDocument()
    expect(screen.getByText('conteúdo')).toBeInTheDocument()
  })
})
