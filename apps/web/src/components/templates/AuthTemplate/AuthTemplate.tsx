import type { ReactNode } from 'react'
import { Heading } from '../../atoms/Heading'

type AuthTemplateProps = {
  /** Banner lateral: cada página de auth usa o seu. */
  bannerSrc: string
  bannerAlt?: string
  title: string
  subtitle: string
  children: ReactNode
}

/** Layout base de login e cadastro: banner à esquerda, conteúdo à direita. */
export function AuthTemplate({ bannerSrc, bannerAlt = '', title, subtitle, children }: AuthTemplateProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4 lg:p-[2vh]">
      <div className="grid w-full max-w-6xl gap-10 rounded-[2rem] bg-surface p-card lg:max-h-[calc(100dvh-4vh)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        {/* A imagem é absoluta: preenche a altura do formulário sem nunca aumentá-la. */}
        <div className="relative hidden lg:block">
          <img src={bannerSrc} alt={bannerAlt} className="absolute inset-0 size-full rounded-sm object-cover" />
        </div>
        <section className="flex flex-col gap-section">
          <header className="flex flex-col gap-section">
            <Heading>{title}</Heading>
            <Heading as="p" variant="subtitle">
              {subtitle}
            </Heading>
          </header>
          {children}
        </section>
      </div>
    </main>
  )
}
