// Button variant types - type-safe design pattern
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'ghost'
  | 'link'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonShape = 'square' | 'rounded' | 'circle' | 'pill'

// Button state management
export interface ButtonState {
  isLoading: boolean
  isDisabled: boolean
  isActive: boolean
}

// Icon positioning - composition pattern
export type IconPosition = 'left' | 'right' | 'only'

// Button props interface - comprehensive typing
export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  disabled?: boolean
  loading?: boolean
  active?: boolean
  block?: boolean // full width
  icon?: string // icon name or component
  iconPosition?: IconPosition
  loadingText?: string
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
}
