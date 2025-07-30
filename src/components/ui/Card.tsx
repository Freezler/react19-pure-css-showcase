import { Icon } from '@iconify/react'
import { ReactNode } from 'react'
import { InteractiveContext } from './InteractiveContext'

export interface CardProps {
  children: ReactNode
  variant?: 'default' | 'feature' | 'tech' | 'stat' | 'info'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  interactive?: boolean
  className?: string
  onClick?: () => void
}

export interface CardHeaderProps {
  children: ReactNode
  icon?: string
  iconColor?: string
  badge?: ReactNode
  className?: string
}

export interface CardContentProps {
  children: ReactNode
  className?: string
}

export interface CardFooterProps {
  children: ReactNode
  className?: string
}

export interface CardTitleProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function Card({ 
  children, 
  variant = 'default', 
  size = 'md', 
  interactive = false,
  className = '',
  onClick
}: CardProps) {
  const baseClasses = `
    card card--${variant} card--${size}
    ${interactive ? 'card--interactive' : ''}
    ${className}
  `.trim()

  const Component = onClick ? 'button' : 'div'

  return (
    <InteractiveContext.Provider value={!!onClick}>
      <Component 
        className={baseClasses}
        onClick={onClick}
        type={onClick ? 'button' : undefined}
      >
        {children}
      </Component>
    </InteractiveContext.Provider>
  )
}

export function CardHeader({ children, icon, iconColor, badge, className = '' }: CardHeaderProps) {
  return (
    <div className={`card__header ${className}`}>
      <div className="card__header-main">
        {icon && (
          <div className="card__icon-wrapper">
            <div className="card__icon-bg" />
            <Icon 
              icon={icon} 
              className="card__icon"
              style={iconColor ? { color: iconColor } : undefined}
            />
          </div>
        )}
        <div className="card__header-content">
          {children}
        </div>
      </div>
      {badge && (
        <div className="card__header-badge">
          {badge}
        </div>
      )}
    </div>
  )
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`card__content ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`card__footer ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, size = 'md', className = '' }: CardTitleProps) {
  const sizeClasses = {
    sm: 'card__title--sm',
    md: 'card__title--md', 
    lg: 'card__title--lg',
    xl: 'card__title--xl'
  }

  return (
    <h3 className={`card__title ${sizeClasses[size]} ${className}`}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`card__description ${className}`}>
      {children}
    </p>
  )
}

// Compound component pattern
Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription