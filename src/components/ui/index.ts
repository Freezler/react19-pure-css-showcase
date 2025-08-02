// ✨ UI Component Library - Clean & Reusable Components
// Export all our reusable UI components for easy importing

// Layout components
import Layout, {
  Cluster,
  Container,
  Cover,
  Frame,
  Grid,
  Imposter,
  Reel,
  Sidebar,
  Stack,
  Switcher,
  VisuallyHidden
} from './Layout'

export {
  Cluster, Container, Cover,
  Frame, Grid, Imposter, Layout, Reel, Sidebar, Stack, Switcher, VisuallyHidden
}

// Import other components
import { Button } from './Button'
import { Card } from './Card'
import { Section } from './Section'
import { Tag, Badge, Label } from './Tag'

// Card components
export type {
  CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardProps, CardTitleProps
} from './Card'
export { Card }

// Button components
export type {
  ButtonGroupProps, ButtonProps, IconButtonProps,
  LinkButtonProps
} from './Button'
export { Button }

// Section components
export type {
  PageHeaderProps, SectionContentProps, SectionHeaderProps, SectionProps, SectionSubtitleProps, SectionTitleProps
} from './Section'
export { Section }

// Tag, Badge and Label components
export type {
  BadgeProps, CountBadgeProps, TagListProps, TagProps, LabelProps, StatusLabelProps
} from './Tag'
export { Badge, Tag, Label } from './Tag'

// CodeBlock component
export { CodeBlock } from './CodeBlock'

// Interactive context for preventing nested interactive elements
export { InteractiveContext } from './InteractiveContext'

// Common component combinations for convenience
export const UI = {
  // Layout
  Layout,

  // Components
  Card,
  Button,
  Section,
  Badge,
  Tag,
  Label,

  // Layout utilities (using the individual imports)
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
} as const
