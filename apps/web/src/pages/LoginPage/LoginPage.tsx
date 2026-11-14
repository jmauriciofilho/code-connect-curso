import { AuthSwitchPrompt } from '../../components/organisms/AuthSwitchPrompt'
import { LoginForm } from '../../components/organisms/LoginForm'
import { SocialLogin } from '../../components/organisms/SocialLogin'
import { AuthTemplate } from '../../components/templates/AuthTemplate'

export function LoginPage() {
  // TODO: integrar com a API quando existir (onSubmit / onSelect).
  return (
    <AuthTemplate
      bannerSrc="/banner_login.png"
      bannerAlt="Mulher sorrindo programando em um ambiente com luzes verdes"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
    >
      <LoginForm />
      <SocialLogin />
      <AuthSwitchPrompt question="Ainda não tem conta?" linkLabel="Crie seu cadastro!" href="/cadastro" />
    </AuthTemplate>
  )
}
