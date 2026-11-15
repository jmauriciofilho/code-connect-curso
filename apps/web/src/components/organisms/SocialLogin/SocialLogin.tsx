import { DividerWithText } from '../../molecules/DividerWithText'
import { SocialButton } from '../../molecules/SocialButton'

export type SocialProvider = 'github' | 'google'

type SocialLoginProps = {
  onSelect?: (provider: SocialProvider) => void
}

export function SocialLogin({ onSelect }: SocialLoginProps) {
  return (
    <div className="flex flex-col gap-field">
      <DividerWithText>ou entre com outras contas</DividerWithText>
      <div className="flex justify-center gap-10">
        <SocialButton icon="/git.png" label="Github" onClick={() => onSelect?.('github')} />
        <SocialButton icon="/gmail.png" label="Gmail" onClick={() => onSelect?.('google')} />
      </div>
    </div>
  )
}
