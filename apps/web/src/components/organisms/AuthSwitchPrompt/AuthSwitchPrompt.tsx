import { Icon } from '../../atoms/Icon'
import { TextLink } from '../../atoms/TextLink'

type AuthSwitchPromptProps = {
  question: string
  linkLabel: string
  href: string
}

/** "Ainda não tem conta? Crie seu cadastro!" (login) ou o inverso (cadastro). */
export function AuthSwitchPrompt({ question, linkLabel, href }: AuthSwitchPromptProps) {
  return (
    <div className="flex flex-col items-center gap-field text-center">
      <p className="text-body font-light">{question}</p>
      <TextLink variant="brand" href={href}>
        {linkLabel}
        <Icon name="clipboard" />
      </TextLink>
    </div>
  )
}
