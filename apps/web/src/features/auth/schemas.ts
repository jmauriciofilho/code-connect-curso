import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Informe seu email ou usuário'),
  password: z.string().min(1, 'Informe sua senha'),
  remember: z.boolean(),
})

export type LoginValues = z.infer<typeof loginSchema>
