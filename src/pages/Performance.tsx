import { Icon } from '@iconify/react'
import { CodeBlock } from '../components/ui/CodeBlock'
import { useState, useEffect, useTransition, useMemo } from 'react'
import { 
  Section, 
  Container, 
  Stack, 
  Grid,
  Badge
} from '../components/ui'

export function Performance() {
  const [metrics, setMetrics] = useState<{
    lcp: number | null
    fid: number | null
    cls: number | null
    fcp: number | null
  }>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null
  })

  const [isPending, startTransition] = useTransition()
  const [heavyCalculation, setHeavyCalculation] = useState(0)

  // Simulate performance monitoring
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, lcp: entry.startTime }))
            break
          case 'first-input':
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }))
            }
            break
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    // Simulate First Contentful Paint
    const fcp = performance.getEntriesByType('navigation')[0]
    if (fcp) {
      setMetrics(prev => ({ ...prev, fcp: (fcp as any).loadEventEnd }))
    }

    return () => observer.disconnect()
  }, [])

  // Expensive calculation demonstrating useMemo optimization
  const expensiveValue = useMemo(() => {
    console.log('🔄 Expensive calculation running...')
    let result = 0
    for (let i = 0; i < heavyCalculation * 1000000; i++) {
      result += Math.sin(i) * Math.cos(i)
    }
    return result.toFixed(2)
  }, [heavyCalculation])

  const handleHeavyWork = () => {
    startTransition(() => {
      setHeavyCalculation(prev => prev + 1)
    })
  }

  const formatMetric = (value: number | null, unit: string) => {
    if (value === null) return 'Measuring...'
    return `${value.toFixed(2)}${unit}`
  }

  const getMetricStatus = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return 'measuring'
    if (value <= thresholds.good) return 'good'
    if (value <= thresholds.poor) return 'needs-improvement'
    return 'poor'
  }

  return (
    <div className="page-transition-container">
      {/* Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Icon icon="mdi:speedometer" className="text-6xl" />
            <Section.Header centered>
              <Section.Title size="3xl" gradient>
                Performance Optimization
              </Section.Title>
              <Section.Subtitle>
                Modern performance techniques, Core Web Vitals monitoring, and React 19 optimizations
              </Section.Subtitle>
            </Section.Header>
          </Stack>
        </Container>
      </Section>
        {/* Live Core Web Vitals */}
        <Section variant="content" size="lg">
          <Container size="wide">
            <Section.Header>
              <Badge variant="primary" icon="mdi:chart-line">
                Real-time Monitoring
              </Badge>
              <Section.Title size="xl">Live Core Web Vitals</Section.Title>
            </Section.Header>
            <Section.Content>
          <div className="vitals-grid vitals-grid--container-responsive"  data-layout="vitals-monitor">
            <div className={`vital-card vital-card--modern vital-card--${getMetricStatus(metrics.lcp, { good: 2500, poor: 4000 })}`}>
              <div className="vital-card__header">
                <Icon icon="mdi:timer" className="vital-card__icon vital-card__icon--lcp" />
                <h3 className="vital-card__title">LCP</h3>
              </div>
              <div className="vital-card__value">{formatMetric(metrics.lcp, 'ms')}</div>
              <div className="vital-card__label">Largest Contentful Paint</div>
              <div className="vital-card__threshold">Good: &lt;2.5s</div>
            </div>
            <div className={`vital-card vital-card--modern vital-card--${getMetricStatus(metrics.fid, { good: 100, poor: 300 })}`}>
              <div className="vital-card__header">
                <Icon icon="mdi:cursor-default-click" className="vital-card__icon vital-card__icon--fid" />
                <h3 className="vital-card__title">FID</h3>
              </div>
              <div className="vital-card__value">{formatMetric(metrics.fid, 'ms')}</div>
              <div className="vital-card__label">First Input Delay</div>
              <div className="vital-card__threshold">Good: &lt;100ms</div>
            </div>
            <div className={`vital-card vital-card--modern vital-card--${getMetricStatus(metrics.cls, { good: 0.1, poor: 0.25 })}`}>
              <div className="vital-card__header">
                <Icon icon="mdi:vector-arrange-below" className="vital-card__icon vital-card__icon--cls" />
                <h3 className="vital-card__title">CLS</h3>
              </div>
              <div className="vital-card__value">{formatMetric(metrics.cls, '')}</div>
              <div className="vital-card__label">Cumulative Layout Shift</div>
              <div className="vital-card__threshold">Good: &lt;0.1</div>
            </div>
            <div className={`vital-card vital-card--modern vital-card--${getMetricStatus(metrics.fcp, { good: 1800, poor: 3000 })}`}>
              <div className="vital-card__header">
                <Icon icon="mdi:palette" className="vital-card__icon vital-card__icon--fcp" />
                <h3 className="vital-card__title">FCP</h3>
              </div>
              <div className="vital-card__value">{formatMetric(metrics.fcp, 'ms')}</div>
              <div className="vital-card__label">First Contentful Paint</div>
              <div className="vital-card__threshold">Good: &lt;1.8s</div>
            </div>
          </div>
            </Section.Content>
          </Container>
        </Section>

        {/* React 19 Performance Demo */}
        <Section variant="feature" size="lg">
          <Container size="wide">
            <Section.Header>
              <Badge variant="success" icon="mdi:react">
                React 19
              </Badge>
              <Section.Title size="xl">React 19 Performance Features</Section.Title>
            </Section.Header>
            <Section.Content>
          <div className="performance-demo">
            <div className="demo-section">
              <h3 className="demo-title">
                <Icon icon="mdi:transition" />
                useTransition Demo
              </h3>
              <p className="demo-description">
                React 19's useTransition keeps the UI responsive during heavy computations
              </p>
              <div className="demo-controls">
                <button 
                  className="demo-button"
                  onClick={handleHeavyWork}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Icon icon="mdi:loading" className="spinning" />
                      Computing...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:calculator" />
                      Trigger Heavy Calculation ({heavyCalculation})
                    </>
                  )}
                </button>
              </div>
              <div className="demo-result">
                <div className="result-label">Expensive Calculation Result:</div>
                <div className="result-value">{expensiveValue}</div>
                <div className="result-note">
                  {isPending ? 'Computing in background...' : 'Completed without blocking UI'}
                </div>
              </div>
            </div>
          </div>
            </Section.Content>
          </Container>
        </Section>

        {/* Performance Techniques */}
        <section className="content-section">
          <h2 className="section-title">Modern Performance Techniques</h2>
          <div className="techniques-grid techniques-grid--container-responsive" data-layout="performance-techniques">
            <div className="technique-card">
              <div className="technique-card__header">
                <Icon icon="mdi:memory" />
                <h3>React Compiler</h3>
              </div>
              <p className="technique-card__description">
                Automatic memoization without manual useMemo/useCallback
              </p>
              <CodeBlock
                code={`// Before: Manual optimization
const MyComponent = memo(({ items }) => {
  const filtered = useMemo(() => 
    items.filter(item => item.active), [items]
  )
  
  const handleClick = useCallback(() => {
    // handler logic
  }, [])
  
  return <div onClick={handleClick}>{filtered.length}</div>
})

// After: React Compiler handles it
function MyComponent({ items }) {
  const filtered = items.filter(item => item.active)
  
  const handleClick = () => {
    // handler logic  
  }
  
  return <div onClick={handleClick}>{filtered.length}</div>
}`}
                language="typescript"
              />
            </div>

            <div className="technique-card">
              <div className="technique-card__header">
                <Icon icon="mdi:server" />
                <h3>Server Components</h3>
              </div>
              <p className="technique-card__description">
                Render components on the server for better performance
              </p>
              <CodeBlock
                code={`// Server Component (zero bundle size)
async function ProductList() {
  const products = await fetchProducts() // Runs on server
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// Client Component (interactive)
'use client'
function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false)
  
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  )
}`}
                language="typescript"
              />
            </div>

            <div className="technique-card">
              <div className="technique-card__header">
                <Icon icon="mdi:image-multiple" />
                <h3>Image Optimization</h3>
              </div>
              <p className="technique-card__description">
                Modern image formats and lazy loading
              </p>
              <CodeBlock
                code={`// Optimized image component
function OptimizedImage({ src, alt, ...props }) {
  return (
    <picture>
      <source srcSet={src.replace('.jpg', '.avif')} type="image/avif" />
      <source srcSet={src.replace('.jpg', '.webp')} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </picture>
  )
}`}
                language="typescript"
              />
            </div>

            <div className="technique-card">
              <div className="technique-card__header">
                <Icon icon="mdi:code-braces" />
                <h3>Code Splitting</h3>
              </div>
              <p className="technique-card__description">
                Load code only when needed with React.lazy
              </p>
              <CodeBlock
                code={`import { lazy, Suspense } from 'react'

// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
const AdminPanel = lazy(() => import('./AdminPanel'))

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {showHeavy && <HeavyComponent />}
        {isAdmin && <AdminPanel />}
      </Suspense>
    </div>
  )
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Performance Monitoring */}
        <section className="content-section">
          <h2 className="section-title">Performance Monitoring</h2>
          <div className="monitoring-section">
            <div className="monitoring-content">
              <h3>Built-in Performance Tracking</h3>
              <p>
                This application includes real-time performance monitoring using the Performance Observer API
                to track Core Web Vitals and provide insights into user experience.
              </p>
              <div className="monitoring-features">
                <div className="monitoring-feature">
                  <Icon icon="mdi:chart-line" />
                  <span>Real-time vitals tracking</span>
                </div>
                <div className="monitoring-feature">
                  <Icon icon="mdi:alert-circle" />
                  <span>Performance alerts</span>
                </div>
                <div className="monitoring-feature">
                  <Icon icon="mdi:database" />
                  <span>Metrics collection</span>
                </div>
                <div className="monitoring-feature">
                  <Icon icon="mdi:trending-up" />
                  <span>Performance insights</span>
                </div>
              </div>
            </div>
            <div className="monitoring-code">
              <CodeBlock
                code={`// Performance monitoring setup
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Track Core Web Vitals
    switch (entry.entryType) {
      case 'largest-contentful-paint':
        trackLCP(entry.startTime)
        break
      case 'first-input':
        trackFID(entry.processingStart - entry.startTime)
        break
      case 'layout-shift':
        if (!entry.hadRecentInput) {
          trackCLS(entry.value)
        }
        break
    }
  }
})

observer.observe({ 
  entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
})`}
                language="typescript"
                title="Performance Observer"
              />
            </div>
          </div>
        </section>
    </div>
  )
}