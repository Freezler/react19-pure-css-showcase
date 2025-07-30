# React 19 + UI Component System + TypeScript + Vite

A modern React application showcasing React 19 features with a comprehensive, reusable UI component system built for maintainability and developer experience.

## 🎨 UI Component System

This project features a complete design system with reusable components that follow DRY principles and maintain consistency across the application.

### Component Library

Located in `src/components/ui/`, our component system includes:

#### Layout Components
- **Container**: Responsive max-width containers (`narrow`, `reading`, `wide`, `full`)
- **Stack**: Vertical spacing with configurable gaps and alignment
- **Cluster**: Horizontal groupings with flexible layout options
- **Grid**: Responsive CSS Grid with auto-fit/auto-fill capabilities
- **Sidebar**: Layout with sidebar positioning
- **Switcher**: Responsive layout switching at breakpoints

#### UI Components
- **Card**: Versatile card system with variants (`default`, `feature`, `tech`, `stat`, `info`)
  - Compound components: `Card.Header`, `Card.Content`, `Card.Footer`
- **Button**: Complete button system with variants, sizes, and states
  - Includes loading states, icons, and accessibility features
- **Section**: Page sections with headers, titles, and structured content
- **Badge & Tag**: Labeling components with status indicators and interactive tags

### Usage Examples

```tsx
import { Card, Button, Section, Container, Stack } from '../components/ui'

// Clean, composable components
<Section variant="hero" size="lg">
  <Container size="wide">
    <Stack gap="xl" align="center">
      <Card variant="feature" interactive>
        <Card.Header icon="mdi:rocket">
          <Card.Title>Feature Title</Card.Title>
        </Card.Header>
        <Card.Content>
          <Card.Description>Feature description</Card.Description>
        </Card.Content>
        <Card.Footer>
          <Button variant="primary" icon="mdi:arrow-right">
            Learn More
          </Button>
        </Card.Footer>
      </Card>
    </Stack>
  </Container>
</Section>
```

### Design Principles

- **Composable**: Components work together seamlessly
- **Accessible**: Built with ARIA attributes and keyboard navigation
- **Responsive**: Container queries and modern CSS features
- **Consistent**: Unified spacing, typography, and color systems
- **TypeScript**: Full type safety with comprehensive interfaces

## 🚀 React 19 Features

This application demonstrates modern React 19 capabilities:

- **useOptimistic**: Optimistic UI updates
- **useActionState**: Form state management
- **Server Actions**: Server-side form handling
- **Enhanced Suspense**: Better loading states
- **Concurrent Features**: Improved performance

## 🎯 Modern CSS Architecture

### ✨ Advanced Features Implemented
- **CSS Layers**: Organized cascade management (`base`, `components`, `utilities`, `animations`)
- **Container Queries**: Element-based responsive design for cards, grids, and layouts
- **OKLCH Color System**: Future-proof color definitions with opacity support
- **CSS Nesting**: Clean, maintainable stylesheets with logical hierarchy
- **Custom Properties**: Dynamic theming system with systematic design tokens

### 🎪 Animation System
- **Scroll-driven animations**: Smooth reveal effects using modern CSS animations
- **Interactive hover effects**: Sophisticated transitions with hardware acceleration
- **Loading states**: Comprehensive shimmer/skeleton components for all UI patterns
- **Performance optimized**: GPU acceleration, reduced motion support, layout containment

### 🎨 Design Token System
- **Systematic Border Radius**: 8-step scale from `--radius-xs` (2px) to `--radius-full` (∞)
- **Spacing Scale**: Consistent spacing using CSS custom properties
- **Typography Scale**: Responsive text sizing with clamp() functions
- **Color Variants**: OKLCH-based color system with automatic variants and opacity

### 🏗️ Loading States Architecture
- **Skeleton Components**: Text, buttons, icons, badges, circles, cards
- **Composite Layouts**: Full skeleton patterns for cards, lists, forms, tables
- **Shimmer Effects**: Smooth wave animations across all skeleton elements
- **State Management**: Loading, success, error states with visual feedback
- **Progress Indicators**: Determinate and indeterminate progress bars with animations

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI component library
│   │   ├── Card.tsx          # Card component system
│   │   ├── Button.tsx        # Button variants and states
│   │   ├── Section.tsx       # Page section components
│   │   ├── Badge.tsx         # Badge and tag components
│   │   ├── Layout.tsx        # Layout utility components
│   │   └── index.ts          # Barrel exports
│   └── RootComponent.tsx     # Root layout with navigation
├── pages/                    # Application pages
├── styles/                   # CSS architecture
│   ├── ui/                   # Component-specific styles
│   └── ...                   # Base styles and themes
└── routes.tsx               # TanStack Router configuration
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Component Documentation

Visit the `/example` route in the application to see comprehensive component examples and usage patterns. This page demonstrates:

- All component variants and sizes
- Composition patterns
- Interactive examples
- Code snippets
- Best practices

## 🔧 Development

### Component Development Guidelines

1. **Consistency**: Follow existing patterns and naming conventions
2. **Accessibility**: Include ARIA attributes and keyboard support
3. **Performance**: Use memo and optimization where appropriate
4. **TypeScript**: Provide comprehensive type definitions
5. **Documentation**: Include JSDoc comments and examples

### Styling Approach

- Components use CSS classes following BEM-like conventions
- Styles are organized in CSS layers for proper cascade management
- CSS custom properties enable dynamic theming
- Container queries provide responsive behavior

## 🚀 Deployment

The application is built with Vite and can be deployed to any static hosting service:

```bash
npm run build
# Deploy the `dist` folder
```

## 📈 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **CSS Optimization**: Critical CSS inlining
- **Modern Bundle**: ES modules for modern browsers
- **Fast Refresh**: Instant development feedback

---

Built with ❤️ using React 19, TypeScript, Vite, and modern web standards.