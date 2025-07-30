import { Icon } from '@iconify/react'
import { ReactNode, useContext } from 'react'
import { InteractiveContext } from './InteractiveContext'

export interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconPosition?: 'left' | 'right'
  dot?: boolean
  removable?: boolean
  onRemove?: () => void
  className?: string
}

export interface TagProps extends Omit<BadgeProps, 'variant'> {
  variant?: 'default' | 'outlined' | 'filled' | 'subtle'
  color?: string
  interactive?: boolean
  selected?: boolean
  onClick?: () => void
}

export interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away' | 'loading'
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface CountBadgeProps {
  count: number
  max?: number
  showZero?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  dot = false,
  removable = false,
  onRemove,
  className = ''
}: BadgeProps) {
  const baseClasses = `
    badge badge--${variant} badge--${size}
    ${dot ? 'badge--dot' : ''}
    ${removable ? 'badge--removable' : ''}
    ${className}
  `.trim()

  return (
    <span className={baseClasses}>
      {dot && <span className="badge__dot" />}
      
      {!dot && (
        <>
          {icon && iconPosition === 'left' && (
            <Icon icon={icon} className="badge__icon badge__icon--left" />
          )}
          
          <span className="badge__text">{children}</span>
          
          {icon && iconPosition === 'right' && (
            <Icon icon={icon} className="badge__icon badge__icon--right" />
          )}
          
          {removable && (
            <button
              type="button"
              className="badge__remove"
              onClick={onRemove}
              aria-label="Remove badge"
            >
              <Icon icon="mdi:close" />
            </button>
          )}
        </>
      )}
    </span>
  )
}

export function Tag({
  children,
  variant = 'default',
  size = 'md',
  color,
  icon,
  iconPosition = 'left',
  interactive = false,
  selected = false,
  removable = false,
  onRemove,
  onClick,
  className = ''
}: TagProps) {
  const isInsideInteractive = useContext(InteractiveContext)
  
  const baseClasses = `
    tag tag--${variant} tag--${size}
    ${interactive ? 'tag--interactive' : ''}
    ${selected ? 'tag--selected' : ''}
    ${removable ? 'tag--removable' : ''}
    ${className}
  `.trim()

  // Prevent nested interactive elements - if we're inside an interactive container, 
  // render as span even if onClick is provided
  const Component = (onClick && !isInsideInteractive) ? 'button' : 'span'
  const customStyle = color ? { '--tag-color': color } as any : undefined
  
  // Handle click events for spans inside interactive containers
  const handleClick = (onClick && isInsideInteractive) ? (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  } : onClick

  return (
    <Component 
      className={baseClasses}
      onClick={handleClick}
      style={customStyle as any}
      type={(onClick && !isInsideInteractive) ? 'button' : undefined}
    >
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} className="tag__icon tag__icon--left" />
      )}
      
      <span className="tag__text">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <Icon icon={icon} className="tag__icon tag__icon--right" />
      )}
      
      {removable && (
        isInsideInteractive ? (
          <span
            className="tag__remove"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onRemove?.()
              }
            }}
            aria-label="Remove tag"
          >
            <Icon icon="mdi:close" />
          </span>
        ) : (
          <button
            type="button"
            className="tag__remove"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            aria-label="Remove tag"
          >
            <Icon icon="mdi:close" />
          </button>
        )
      )}
    </Component>
  )
}

export function StatusBadge({
  status,
  showText = false,
  size = 'md',
  className = ''
}: StatusBadgeProps) {
  const statusConfig = {
    online: { color: 'success', text: 'Online', icon: 'mdi:circle' },
    offline: { color: 'error', text: 'Offline', icon: 'mdi:circle' },
    busy: { color: 'error', text: 'Busy', icon: 'mdi:minus-circle' },
    away: { color: 'warning', text: 'Away', icon: 'mdi:clock' },
    loading: { color: 'info', text: 'Loading', icon: 'mdi:loading' }
  }

  const config = statusConfig[status]

  return (
    <Badge
      variant={config.color as 'success' | 'error' | 'warning' | 'info'}
      size={size}
      icon={config.icon}
      className={`status-badge status-badge--${status} ${className}`}
    >
      {showText ? config.text : ''}
    </Badge>
  )
}

export function CountBadge({
  count,
  max = 99,
  showZero = false,
  size = 'md',
  className = ''
}: CountBadgeProps) {
  if (count === 0 && !showZero) return null

  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <span className={`count-badge count-badge--${size} ${className}`}>
      {displayCount}
    </span>
  )
}

// Tag List component for managing multiple tags
export interface TagListProps {
  tags: Array<{ id: string; label: string; color?: string; removable?: boolean }>
  onRemove?: (id: string) => void
  onTagClick?: (id: string) => void
  variant?: 'default' | 'outlined' | 'filled' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function TagList({
  tags,
  onRemove,
  onTagClick,
  variant = 'default',
  size = 'md',
  className = ''
}: TagListProps) {
  return (
    <div className={`tag-list ${className}`}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          variant={variant}
          size={size}
          color={tag.color}
          removable={tag.removable}
          interactive={!!onTagClick}
          onRemove={() => onRemove?.(tag.id)}
          onClick={() => onTagClick?.(tag.id)}
        >
          {tag.label}
        </Tag>
      ))}
    </div>
  )
}

// Compound exports
Badge.Status = StatusBadge
Badge.Count = CountBadge
Tag.List = TagList