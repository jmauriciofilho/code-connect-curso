import type { ComponentProps } from 'react'

type SocialButtonProps = ComponentProps<'button'> & {
  icon: string
  label: string
}

export function SocialButton({ icon, label, className = '', type = 'button', ...props }: SocialButtonProps) {
  return (
    <button
      type={type}
      className={`flex cursor-pointer flex-col items-center gap-2 text-body font-light hover:opacity-80 focus-visible:outline-2 focus-visible:outline-brand ${className}`}
      {...props}
    >
      <img src={icon} alt="" className="size-social object-contain" />
      {label}
    </button>
  )
}
