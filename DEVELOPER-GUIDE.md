# 👨‍💻 Developer Guide

A comprehensive guide for developers working with this React 19 + Compiler showcase application.

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ (for React 19 support)
- npm or yarn
- VS Code (recommended) with React/TypeScript extensions

### **Quick Setup**
```bash
# Clone the repository
git clone <repository-url>
cd react19-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🧠 **Understanding React Compiler**

### **What Gets Optimized Automatically**

The React Compiler automatically handles:

```tsx
// ✅ Automatically optimized - no changes needed
export function MyComponent({ items, onSelect }) {
  // This expensive calculation is auto-memoized
  const total = items.reduce((sum, item) => sum + item.price, 0)
  
  // This event handler is auto-memoized
  const handleSelect = (id) => onSelect(id)
  
  // This filter is auto-memoized based on dependencies
  const activeItems = items.filter(item => item.active)
  
  return (
    <div>
      <p>Total: ${total}</p>
      {activeItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onSelect={handleSelect} 
        />
      ))}
    </div>
  )
}
```

### **Rules to Follow**

The React Compiler requires components to follow the **Rules of React**:

```tsx
// ✅ Good - Pure component function
function GoodComponent({ data }) {
  const processed = processData(data) // Pure function call
  return <div>{processed}</div>
}

// ❌ Bad - Side effects in render
function BadComponent({ data }) {
  localStorage.setItem('data', JSON.stringify(data)) // Side effect!
  return <div>{data.name}</div>
}

// ✅ Good - Side effects in useEffect
function FixedComponent({ data }) {
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])
  
  return <div>{data.name}</div>
}
```

### **When Manual Optimization is Still Needed**

```tsx
// Third-party libraries may need manual optimization
import { expensiveThirdPartyFunction } from 'some-library'

function ComponentWithThirdParty({ data }) {
  // Manual memoization for third-party functions
  const result = useMemo(() => 
    expensiveThirdPartyFunction(data), [data]
  )
  
  return <div>{result}</div>
}
```

## 🎨 **CSS Development Guide**

### **Using the Design System**

#### **Color System:**
```css
/* Use OKLCH colors from design tokens */
.my-component {
  background: var(--color-primary);
  color: var(--color-on-primary);
  
  /* Create variations */
  border: 1px solid oklch(from var(--color-primary) l c h / 0.3);
}

/* Dark mode automatically handled */
[data-theme="dark"] .my-component {
  /* Colors automatically adjust */
}
```

#### **Spacing System:**
```css
.my-component {
  padding: var(--space-md);      /* 24px */
  margin-bottom: var(--space-lg); /* 32px */
  gap: var(--space-sm);          /* 16px */
}

/* Responsive spacing */
@media (max-width: 768px) {
  .my-component {
    padding: var(--space-sm);    /* 16px on mobile */
  }
}
```

#### **Border Radius:**
```css
.card { border-radius: var(--radius-lg); }      /* 12px */
.button { border-radius: var(--radius-md); }    /* 8px */
.badge { border-radius: var(--radius-full); }   /* Full circle */
```

### **Component Styling Patterns**

#### **BEM-like Class Structure:**
```css
/* Block */
.card {
  /* Base styles */
}

/* Block variants */
.card--feature { /* Feature card styles */ }
.card--stat { /* Stat card styles */ }

/* Block modifiers */
.card--interactive:hover { /* Hover styles */ }
.card--loading { /* Loading state */ }

/* Elements */
.card__header { /* Card header */ }
.card__title { /* Card title */ }
```

#### **CSS Layers:**
```css
@layer components {
  .my-component {
    /* Component styles here */
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}
```

### **Animation Guidelines**

#### **Hardware-Accelerated Animations:**
```css
.animated-element {
  /* Force GPU layer */
  transform: translateZ(0);
  will-change: transform, opacity;
  
  /* Only animate transform and opacity for 60fps */
  transition: transform var(--transition-fast),
              opacity var(--transition-fast);
}

.animated-element:hover {
  transform: translateY(-2px) scale(1.02);
  opacity: 0.9;
}
```

#### **Accessible Animations:**
```css
@media (prefers-reduced-motion: reduce) {
  .animated-element,
  .animated-element:hover {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
```

## 🏗️ **Component Development**

### **Component Structure Template**

```tsx
import { ReactNode } from 'react'

// 1. Define comprehensive TypeScript interfaces
interface MyComponentProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

// 2. Component implementation (automatically optimized by compiler)
export function MyComponent({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}: MyComponentProps) {
  // 3. Build CSS classes (automatically memoized)
  const classes = `
    my-component 
    my-component--${variant} 
    my-component--${size}
    ${disabled ? 'my-component--disabled' : ''}
    ${className}
  `.trim()
  
  // 4. Event handlers (automatically memoized)
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }
  
  // 5. Accessible JSX
  return (
    <div 
      className={classes}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
    >
      {children}
    </div>
  )
}
```

### **Compound Components Pattern**

```tsx
// Main component
export function Card({ children, variant = 'default', className = '' }) {
  const classes = `card card--${variant} ${className}`
  return <div className={classes}>{children}</div>
}

// Sub-components
Card.Header = function CardHeader({ children, icon, className = '' }) {
  return (
    <div className={`card__header ${className}`}>
      {icon && <Icon icon={icon} className="card__icon" />}
      {children}
    </div>
  )
}

Card.Title = function CardTitle({ children, className = '' }) {
  return <h3 className={`card__title ${className}`}>{children}</h3>
}

Card.Content = function CardContent({ children, className = '' }) {
  return <div className={`card__content ${className}`}>{children}</div>
}

// Usage
<Card variant="feature">
  <Card.Header icon="mdi:rocket">
    <Card.Title>My Feature</Card.Title>
  </Card.Header>
  <Card.Content>
    Feature description here
  </Card.Content>
</Card>
```

### **TypeScript Best Practices**

#### **Extend HTML Attributes:**
```tsx
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'  // Our custom size prop
  variant?: 'primary' | 'secondary'
  // All other HTML button attributes are inherited
}
```

#### **Discriminated Unions:**
```tsx
type CardProps = 
  | { variant: 'stat'; value: number; label: string }
  | { variant: 'feature'; icon: string; title: string }
  | { variant: 'default'; children: ReactNode }

function Card(props: CardProps) {
  switch (props.variant) {
    case 'stat':
      return <StatCard value={props.value} label={props.label} />
    case 'feature':
      return <FeatureCard icon={props.icon} title={props.title} />
    case 'default':
      return <DefaultCard>{props.children}</DefaultCard>
  }
}
```

## 🧪 **Testing Strategies**

### **Component Testing**
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders with correct variant class', () => {
    render(<Button variant="primary">Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--primary')
  })
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### **React Compiler Testing**
```tsx
// Test that components work correctly with compiler optimizations
describe('React Compiler Integration', () => {
  it('handles re-renders efficiently', () => {
    const renderSpy = jest.fn()
    
    function TestComponent({ data }) {
      renderSpy()
      const processed = expensiveOperation(data)
      return <div>{processed}</div>
    }
    
    const { rerender } = render(<TestComponent data="test" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)
    
    // Same data should not cause re-render due to compiler optimization
    rerender(<TestComponent data="test" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)
    
    // Different data should cause re-render
    rerender(<TestComponent data="different" />)
    expect(renderSpy).toHaveBeenCalledTimes(2)
  })
})
```

## 🎯 **Common Patterns**

### **Loading States**
```tsx
function DataComponent({ id }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchData(id)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])
  
  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <DataDisplay data={data} />
}
```

### **Form Handling**
```tsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  // Automatically optimized by React Compiler
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    submitForm(formData)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      {/* More fields... */}
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## 🚨 **Troubleshooting**

### **React Compiler Issues**

#### **Component Not Optimizing:**
```tsx
// ❌ Problem: Side effects in render
function ProblematicComponent({ data }) {
  console.log('Rendering with:', data) // Side effect!
  return <div>{data.name}</div>
}

// ✅ Solution: Pure component
function FixedComponent({ data }) {
  // Move side effects to useEffect or development-only code
  if (process.env.NODE_ENV === 'development') {
    console.log('Rendering with:', data)
  }
  return <div>{data.name}</div>
}
```

#### **Infinite Re-renders:**
```tsx
// ❌ Problem: Creating new objects in render
function ProblematicComponent({ items }) {
  return (
    <ChildComponent 
      config={{ showAll: true }} // New object every render!
      onSelect={(id) => {}}       // New function every render!
    />
  )
}

// ✅ Solution: Define outside or use stable references
const DEFAULT_CONFIG = { showAll: true }

function FixedComponent({ items, onSelect }) {
  return (
    <ChildComponent 
      config={DEFAULT_CONFIG}
      onSelect={onSelect} // Passed through, will be auto-memoized
    />
  )
}
```

### **CSS Issues**

#### **Styles Not Loading:**
```tsx
// ❌ Problem: Wrong CSS class names
<button className="btn btn-primary">Click me</button>

// ✅ Solution: Use design system classes
<button className="button button--primary">Click me</button>
```

#### **Dark Mode Not Working:**
```css
/* ❌ Problem: Not using CSS custom properties */
.my-component {
  background: #ffffff;
  color: #000000;
}

/* ✅ Solution: Use design tokens */
.my-component {
  background: var(--color-surface);
  color: var(--color-on-surface);
}
```

## 📚 **Additional Resources**

### **Documentation**
- [`README.md`](./README.md) - Project overview and features
- [`REACT-COMPILER.md`](./REACT-COMPILER.md) - React Compiler deep dive
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Architecture decisions
- Component demos at `/example` route

### **External Resources**
- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [OKLCH Color Tool](https://oklch.com)
- [CSS Anchor Positioning](https://developer.chrome.com/blog/tether-elements-to-each-other-with-css-anchor-positioning/)
- [Modern CSS Features](https://web.dev/articles/css-color-mix)

### **VS Code Extensions**
- React snippets
- TypeScript Hero
- CSS Peek
- Color Highlight
- Auto Rename Tag

---

**Happy coding! 🚀**

*Remember: With React Compiler, focus on writing clean, maintainable code. The performance optimization happens automatically!*