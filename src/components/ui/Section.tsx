import { Icon } from '@iconify/react'
import { JSX, ReactNode } from 'react'

export interface SectionProps {
  children: ReactNode
  variant?: 'default' | 'hero' | 'feature' | 'cta' | 'content' | 'showcase'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  id?: string
}

export interface SectionHeaderProps {
  children: ReactNode
  icon?: string
  iconColor?: string
  badge?: ReactNode
  actions?: ReactNode
  centered?: boolean
  className?: string
}

export interface SectionTitleProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  gradient?: boolean
  className?: string
}

export interface SectionSubtitleProps {
  children: ReactNode
  className?: string
}

export interface SectionContentProps {
  children: ReactNode
  maxWidth?: 'narrow' | 'reading' | 'wide' | 'full' | 'none'
  className?: string
}

export function Section({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  id
}: SectionProps) {
  const baseClasses = `
    section section--${variant} section--${size}
    ${className}
  `.trim()

  return (
    <section className={baseClasses} id={id}>
      {children}
    </section>
  )
}

export function SectionHeader({
  children,
  icon,
  iconColor,
  badge,
  actions,
  centered = false,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`section__header ${centered ? 'section__header--centered' : ''} ${className}`}>
      <div className="section__header-main">
        {icon && (
          <div className="section__icon-wrapper">
            <Icon
              icon={icon}
              className="section__icon"
              style={iconColor ? { color: iconColor } : undefined}
            />
          </div>
        )}
        <div className="section__header-content">
          {children}
        </div>
        {badge && (
          <div className="section__header-badge">
            {badge}
          </div>
        )}
      </div>
      {actions && (
        <div className="section__header-actions">
          {actions}
        </div>
      )}
    </div>
  )
}

export function SectionTitle({
  children,
  level = 2,
  size = 'lg',
  gradient = false,
  className = ''
}: SectionTitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const titleClasses = `
    section__title section__title--${size}
    ${gradient ? 'section__title--gradient' : ''}
    ${className}
  `.trim()

  return (
    <Tag className={titleClasses}>
      {children}
    </Tag>
  )
}

export function SectionSubtitle({ children, className = '' }: SectionSubtitleProps) {
  return (
    <p className={`section__subtitle ${className}`}>
      {children}
    </p>
  )
}

export function SectionContent({
  children,
  maxWidth = 'wide',
  className = ''
}: SectionContentProps) {
  const contentClasses = `
    section__content section__content--${maxWidth}
    ${className}
  `.trim()

  return (
    <div className={contentClasses}>
      {children}
    </div>
  )
}

// Page Header component for top-level pages
export interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  breadcrumb?: ReactNode
  actions?: ReactNode
  hero?: boolean
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  hero = false,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`page-header ${hero ? 'page-header--hero' : ''} ${className}`}>
      <div className="page-header__container">
        {breadcrumb && (
          <div className="page-header__breadcrumb">
            {breadcrumb}
          </div>
        )}
        <div className="page-header__main">
          <div className="page-header__content">
            <h1 className="page-header__title">{title}</h1>
            {subtitle && (
              <div className="page-header__subtitle">{subtitle}</div>
            )}
          </div>
          {actions && (
            <div className="page-header__actions">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Compound component pattern
Section.Header = SectionHeader
Section.Title = SectionTitle
Section.Subtitle = SectionSubtitle
Section.Content = SectionContent
Section.PageHeader = PageHeader