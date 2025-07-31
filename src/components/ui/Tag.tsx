import { Icon } from '@iconify/react'
import { ReactNode } from 'react'

export interface TagProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  removable?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  onRemove?: () => void
  className?: string
}

export function Tag({
  children,
  variant = 'default',
  size = 'sm',
  interactive = false,
  removable = false,
  icon,
  iconPosition = 'left',
  onClick,
  onRemove,
  className = ''
}: TagProps) {
  const baseClasses = `
    tag tag--${variant} tag--${size}
    ${interactive ? 'tag--interactive' : ''}
    ${removable ? 'tag--removable' : ''}
    ${onClick ? 'tag--clickable' : ''}
    ${className}
  `.trim()

  const handleClick = () => {
    if (interactive && onClick) {
      onClick()
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  const TagElement = onClick ? 'button' : 'span'

  return (
    <TagElement
      className={baseClasses}
      onClick={handleClick}
      type={onClick ? 'button' : undefined}
    >
      <div className="tag__content">
        {icon && iconPosition === 'left' && (
          <Icon icon={icon} className="tag__icon tag__icon--left" />
        )}
        
        <span className="tag__text">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <Icon icon={icon} className="tag__icon tag__icon--right" />
        )}
      </div>

      {removable && (
        <button
          className="tag__remove"
          onClick={handleRemove}
          aria-label={`Remove ${children} tag`}
          type="button"
        >
          <Icon icon="mdi:close" className="tag__remove-icon" />
        </button>
      )}

      {/* Ripple effect for interactive tags */}
      {interactive && <span className="tag__ripple" />}
    </TagElement>
  )
}

// Tag List component
export interface TagListProps {
  tags: Array<{
    id: string
    label: ReactNode
    variant?: TagProps['variant']
    icon?: string
    removable?: boolean
    onClick?: () => void
    onRemove?: () => void
  }>
  variant?: TagProps['variant']
  size?: TagProps['size']
  interactive?: boolean
  wrap?: boolean
  maxItems?: number
  className?: string
}

export function TagList({
  tags,
  variant = 'default',
  size = 'sm',
  interactive = false,
  wrap = true,
  maxItems,
  className = ''
}: TagListProps) {
  const visibleTags = maxItems ? tags.slice(0, maxItems) : tags
  const hiddenCount = maxItems && tags.length > maxItems ? tags.length - maxItems : 0

  return (
    <div className={`tag-list ${wrap ? 'tag-list--wrap' : 'tag-list--nowrap'} ${className}`}>
      {visibleTags.map((tag) => (
        <Tag
          key={tag.id}
          variant={tag.variant || variant}
          size={size}
          interactive={interactive}
          removable={tag.removable}
          icon={tag.icon}
          onClick={tag.onClick}
          onRemove={tag.onRemove}
        >
          {tag.label}
        </Tag>
      ))}
      
      {hiddenCount > 0 && (
        <Tag variant="default" size={size} className="tag--overflow">
          +{hiddenCount} more
        </Tag>
      )}
    </div>
  )
}

// Badge component (similar to tags but for status/counts)
export interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill' | 'square'
  pulse?: boolean
  dot?: boolean
  className?: string
}

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  shape = 'pill',
  pulse = false,
  dot = false,
  className = ''
}: BadgeProps) {
  const baseClasses = `
    badge badge--${variant} badge--${size} badge--${shape}
    ${pulse ? 'badge--pulse' : ''}
    ${dot ? 'badge--dot' : ''}
    ${className}
  `.trim()

  return (
    <span className={baseClasses}>
      {dot ? (
        <span className="badge__dot" />
      ) : (
        <span className="badge__content">{children}</span>
      )}
      
      {pulse && <span className="badge__pulse" />}
    </span>
  )
}

// Count Badge component
export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

export function CountBadge({
  count,
  max = 99,
  showZero = false,
  ...badgeProps
}: CountBadgeProps) {
  if (count === 0 && !showZero) {
    return null
  }

  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <Badge {...badgeProps} className={`badge--count ${badgeProps.className || ''}`}>
      {displayCount}
    </Badge>
  )
}

// Label component (for form labels and general labeling)
export interface LabelProps {
  children: ReactNode
  htmlFor?: string
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  required?: boolean
  optional?: boolean
  icon?: string
  tooltip?: string
  className?: string
}

export function Label({
  children,
  htmlFor,
  variant = 'default',
  size = 'sm',
  weight = 'medium',
  required = false,
  optional = false,
  icon,
  tooltip,
  className = ''
}: LabelProps) {
  const baseClasses = `
    label label--${variant} label--${size} label--${weight}
    ${required ? 'label--required' : ''}
    ${optional ? 'label--optional' : ''}
    ${className}
  `.trim()

  return (
    <label className={baseClasses} htmlFor={htmlFor} title={tooltip}>
      <div className="label__content">
        {icon && (
          <Icon icon={icon} className="label__icon" />
        )}
        
        <span className="label__text">{children}</span>
        
        {required && (
          <span className="label__required" aria-label="required">
            *
          </span>
        )}
        
        {optional && (
          <span className="label__optional" aria-label="optional">
            (optional)
          </span>
        )}
      </div>
    </label>
  )
}

// Status Label component
export interface StatusLabelProps {
  children: ReactNode
  status: 'active' | 'inactive' | 'pending' | 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showDot?: boolean
  className?: string
}

export function StatusLabel({
  children,
  status,
  size = 'sm',
  showDot = true,
  className = ''
}: StatusLabelProps) {
  const statusVariantMap = {
    active: 'success',
    inactive: 'default',
    pending: 'warning',
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info'
  } as const

  return (
    <div className={`status-label status-label--${status} status-label--${size} ${className}`}>
      {showDot && <span className="status-label__dot" />}
      <span className="status-label__text">{children}</span>
    </div>
  )
}

// Compound exports
Tag.List = TagList
Badge.Count = CountBadge
Label.Status = StatusLabel

// Export object for organized access
const TagSystem = {
  Tag,
  TagList,
  Badge,
  CountBadge,
  Label,
  StatusLabel
}

export default TagSystem