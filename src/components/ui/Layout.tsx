import { ReactNode } from 'react'

// Container component for consistent max-widths and padding
interface ContainerProps {
  children: ReactNode
  size?: 'narrow' | 'reading' | 'wide' | 'full'
  className?: string
}

export function Container({ children, size = 'wide', className = '' }: ContainerProps) {
  return (
    <div className={`container container--${size} ${className}`}>
      {children}
    </div>
  )
}

// Stack component for vertical spacing
interface StackProps {
  children: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
}

export function Stack({ children, gap = 'md', align = 'stretch', className = '' }: StackProps) {
  return (
    <div className={`stack stack--gap-${gap} stack--align-${align} ${className}`}>
      {children}
    </div>
  )
}

// Cluster component for horizontal groupings
interface ClusterProps {
  children: ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  wrap?: boolean
  className?: string
}

export function Cluster({ 
  children, 
  gap = 'md', 
  justify = 'start', 
  align = 'center',
  wrap = true,
  className = '' 
}: ClusterProps) {
  return (
    <div className={`
      cluster cluster--gap-${gap} cluster--justify-${justify} cluster--align-${align}
      ${wrap ? 'cluster--wrap' : 'cluster--nowrap'}
      ${className}
    `.trim()}>
      {children}
    </div>
  )
}

// Grid component for responsive grids
interface GridProps {
  children: ReactNode
  columns?: number | 'auto-fit' | 'auto-fill'
  minWidth?: string
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export function Grid({ 
  children, 
  columns = 'auto-fit', 
  minWidth = '250px',
  gap = 'lg',
  className = '' 
}: GridProps) {
  const gridTemplate = typeof columns === 'number' 
    ? `repeat(${columns}, 1fr)`
    : `repeat(${columns}, minmax(${minWidth}, 1fr))`

  return (
    <div 
      className={`grid grid--gap-${gap} ${className}`}
      style={{ '--grid-template': gridTemplate } as any}
    >
      {children}
    </div>
  )
}

// Sidebar layout component
interface SidebarProps {
  children: ReactNode
  sidebar: ReactNode
  sidebarWidth?: string
  sidebarPosition?: 'left' | 'right'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Sidebar({ 
  children, 
  sidebar, 
  sidebarWidth = '250px',
  sidebarPosition = 'left',
  gap = 'lg',
  className = '' 
}: SidebarProps) {
  return (
    <div 
      className={`sidebar sidebar--${sidebarPosition} sidebar--gap-${gap} ${className}`}
      style={{ '--sidebar-width': sidebarWidth } as any}
    >
      <aside className="sidebar__side">
        {sidebar}
      </aside>
      <main className="sidebar__main">
        {children}
      </main>
    </div>
  )
}

// Switcher component for responsive layout switching
interface SwitcherProps {
  children: ReactNode
  threshold?: string
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  limit?: number
  className?: string
}

export function Switcher({ 
  children, 
  threshold = '30rem',
  gap = 'lg',
  limit = 4,
  className = '' 
}: SwitcherProps) {
  return (
    <div 
      className={`switcher switcher--gap-${gap} ${className}`}
      style={{ 
        '--switcher-threshold': threshold,
        '--switcher-limit': limit.toString()
      } as any}
    >
      {children}
    </div>
  )
}

// Cover component for full-height sections
interface CoverProps {
  children: ReactNode
  minHeight?: string
  centered?: ReactNode
  className?: string
}

export function Cover({ children, minHeight = '100vh', centered, className = '' }: CoverProps) {
  return (
    <div 
      className={`cover ${className}`}
      style={{ '--cover-min-height': minHeight } as any}
    >
      <div className="cover__content">
        {children}
      </div>
      {centered && (
        <div className="cover__centered">
          {centered}
        </div>
      )}
    </div>
  )
}

// Frame component for aspect ratio containers
interface FrameProps {
  children: ReactNode
  ratio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9' | string
  className?: string
}

export function Frame({ children, ratio = '16:9', className = '' }: FrameProps) {
  const aspectRatio = ratio.includes(':') 
    ? ratio.split(':').map(Number).reduce((a, b) => a / b).toString()
    : ratio

  return (
    <div 
      className={`frame ${className}`}
      style={{ '--frame-aspect-ratio': aspectRatio } as any}
    >
      <div className="frame__content">
        {children}
      </div>
    </div>
  )
}

// Reel component for horizontal scrolling
interface ReelProps {
  children: ReactNode
  itemWidth?: string
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  overflowBehavior?: 'scroll' | 'hidden'
  className?: string
}

export function Reel({ 
  children, 
  itemWidth = '250px',
  gap = 'lg',
  overflowBehavior = 'scroll',
  className = '' 
}: ReelProps) {
  return (
    <div 
      className={`reel reel--gap-${gap} reel--overflow-${overflowBehavior} ${className}`}
      style={{ '--reel-item-width': itemWidth } as any}
    >
      {children}
    </div>
  )
}

// Imposter component for overlays
interface ImposterProps {
  children: ReactNode
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  margin?: string
  className?: string
}

export function Imposter({ 
  children, 
  position = 'center',
  margin = '0',
  className = '' 
}: ImposterProps) {
  return (
    <div 
      className={`imposter imposter--${position} ${className}`}
      style={{ '--imposter-margin': margin } as any}
    >
      {children}
    </div>
  )
}

// Visually hidden component for accessibility
interface VisuallyHiddenProps {
  children: ReactNode
  className?: string
}

export function VisuallyHidden({ children, className = '' }: VisuallyHiddenProps) {
  return (
    <span className={`visually-hidden ${className}`}>
      {children}
    </span>
  )
}

// Compound Layout object for organized access
const Layout = {
  Container,
  Stack,
  Cluster,
  Grid,
  Sidebar,
  Switcher,
  Cover,
  Frame,
  Reel,
  Imposter,
  VisuallyHidden
}

export default Layout