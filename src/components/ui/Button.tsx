import { Icon } from '@iconify/react'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses = `
    button button--${variant} button--${size}
    ${loading ? 'button--loading' : ''}
    ${disabled ? 'button--disabled' : ''}
    ${fullWidth ? 'button--full-width' : ''}
    ${className}
  `.trim()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return
    onClick?.(e)
  }

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="button__spinner" />}
      
      <div className={`button__content ${loading ? 'button__content--hidden' : ''}`}>
        {icon && iconPosition === 'left' && (
          <Icon icon={icon} className="button__icon button__icon--left" />
        )}
        
        <span className="button__text">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <Icon icon={icon} className="button__icon button__icon--right" />
        )}
      </div>

      {/* Ripple effect container */}
      <span className="button__ripple" />
    </button>
  )
}

// Button group component
export interface ButtonGroupProps {
  children: ReactNode
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ButtonGroup({ 
  children, 
  orientation = 'horizontal', 
  spacing = 'md',
  className = '' 
}: ButtonGroupProps) {
  return (
    <div className={`button-group button-group--${orientation} button-group--spacing-${spacing} ${className}`}>
      {children}
    </div>
  )
}

// Icon button component
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: string
  'aria-label': string
  tooltip?: string
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`button--icon-only ${className}`}
      {...props}
    >
      <Icon icon={icon} />
    </Button>
  )
}

// Link button component  
export interface LinkButtonProps extends ButtonProps {
  href: string
  external?: boolean
  download?: string
}

export function LinkButton({
  href,
  external = false,
  download,
  children,
  className = '',
  ...buttonProps
}: LinkButtonProps) {
  const linkProps = {
    href,
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
    ...(download && { download })
  }

  return (
    <a 
      {...linkProps}
      className={`button button--${buttonProps.variant || 'primary'} button--${buttonProps.size || 'md'} ${className}`}
    >
      {buttonProps.loading && <div className="button__spinner" />}
      
      <div className={`button__content ${buttonProps.loading ? 'button__content--hidden' : ''}`}>
        {buttonProps.icon && buttonProps.iconPosition === 'left' && (
          <Icon icon={buttonProps.icon} className="button__icon button__icon--left" />
        )}
        
        <span className="button__text">{children}</span>
        
        {buttonProps.icon && buttonProps.iconPosition === 'right' && (
          <Icon icon={buttonProps.icon} className="button__icon button__icon--right" />
        )}
        
        {external && <Icon icon="mdi:open-in-new" className="button__icon button__icon--right" />}
      </div>

      <span className="button__ripple" />
    </a>
  )
}

// Compound exports
Button.Group = ButtonGroup
Button.Icon = IconButton  
Button.Link = LinkButton