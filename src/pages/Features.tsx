import { Link } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { getAPISupport } from '../lib'
import { 
  Card, 
  Section, 
  Badge, 
  Tag,
  Container,
  Stack,
  Grid,
  Cluster,
  Cover,
  Button,
  CodeBlock
} from '../components/ui'

interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  route: string
  status: 'stable' | 'beta' | 'experimental'
  compatibility: number
  highlights: string[]
}

const features: FeatureCard[] = [
  {
    id: 'react19',
    title: 'React 19 Features',
    description: 'Latest React capabilities including useOptimistic, useActionState, and Server Actions',
    icon: 'logos:react',
    route: '/react19',
    status: 'stable',
    compatibility: 95,
    highlights: ['Optimistic Updates', 'Advanced Forms', 'Server Actions', 'Concurrent Features']
  },
  {
    id: 'design-system',
    title: 'Modern Design System',
    description: 'CSS layers, custom properties, container queries, and responsive design patterns',
    icon: 'mdi:palette',
    route: '/design',
    status: 'stable',
    compatibility: 92,
    highlights: ['CSS Layers', 'Container Queries', 'OKLCH Colors', '@property Rules']
  },
  {
    id: 'web-apis',
    title: 'Advanced Web APIs',
    description: 'Modern browser APIs including View Transitions, Web Workers, and progressive enhancement',
    icon: 'mdi:api',
    route: '/apis',
    status: 'stable',
    compatibility: 85,
    highlights: ['View Transitions', 'Web Workers', 'Intersection Observer', 'Web Share']
  },
  {
    id: 'pwa',
    title: 'Progressive Web App',
    description: 'Service Workers, notifications, caching strategies, and offline-first capabilities',
    icon: 'mdi:application',
    route: '/apis',
    status: 'stable',
    compatibility: 88,
    highlights: ['Service Workers', 'Push Notifications', 'Background Sync', 'Offline Mode']
  },
  {
    id: 'performance',
    title: 'Performance Lab',
    description: 'Core Web Vitals optimization, bundle analysis, and modern performance techniques',
    icon: 'mdi:speedometer',
    route: '/apis',
    status: 'beta',
    compatibility: 90,
    highlights: ['Core Web Vitals', 'Bundle Analysis', 'Speculation Rules', 'Resource Preloading']
  },
  {
    id: 'accessibility',
    title: 'Accessibility First',
    description: 'WCAG 2.2 compliance, screen reader support, and inclusive design patterns',
    icon: 'mdi:accessibility',
    route: '/about',
    status: 'experimental',
    compatibility: 95,
    highlights: ['WCAG 2.2 AA', 'Screen Readers', 'Keyboard Navigation', 'Focus Management']
  }
]

function FeatureCard({ feature, className }: { feature: FeatureCard; className?: string }) {
  const statusVariant = {
    stable: 'success',
    beta: 'warning', 
    experimental: 'info'
  } as const

  return (
    <Link to={feature.route}>
      <Card variant="feature" size="lg" interactive className={`hover-lift ${className || ''}`}>
        <Card.Header icon={feature.icon}>
          <Cluster gap="sm" justify="between" align="center">
            <Card.Title>{feature.title}</Card.Title>
            <Stack gap="xs" align="end">
              <Badge 
                variant={statusVariant[feature.status]} 
                size="sm"
              >
                {feature.status}
              </Badge>
              <span className="text-sm text-muted">
                {feature.compatibility}% compatible
              </span>
            </Stack>
          </Cluster>
        </Card.Header>
        
        <Card.Content>
          <Stack gap="md">
            <Card.Description>{feature.description}</Card.Description>
            
            <Tag.List 
              tags={feature.highlights.map((highlight, index) => ({
                id: `${feature.id}-${index}`,
                label: highlight
              }))}
              variant="subtle"
              size="sm"
            />
          </Stack>
        </Card.Content>
        
        <Card.Footer>
          <Cluster gap="xs" align="center">
            <span>Explore {feature.title}</span>
            <Icon icon="mdi:arrow-right" />
          </Cluster>
        </Card.Footer>
      </Card>
    </Link>
  )
}

function APISupport() {
  const apiSupport = getAPISupport()
  
  // Split APIs into two bands for the moving effect
  const apiEntries = Object.entries(apiSupport)
  const firstBand = apiEntries.slice(0, Math.ceil(apiEntries.length / 2))
  const secondBand = apiEntries.slice(Math.ceil(apiEntries.length / 2))
  
  // Duplicate the arrays to create seamless infinite scroll
  const firstBandExtended = [...firstBand, ...firstBand, ...firstBand]
  const secondBandExtended = [...secondBand, ...secondBand, ...secondBand]
  
  return (
    <Section variant="feature" size="lg">
      <Container size="wide">
        <div className="api-support-section">
          <div className="api-support-header">
            <div className="api-support-badge">
              <Icon icon="mdi:api" className="api-support-badge__icon" />
              <span>Live Browser Support</span>
            </div>
            <h2 className="api-support-title">
              Modern <span className="api-support-title__highlight">Web APIs</span>
            </h2>
            <p className="api-support-subtitle">
              Real-time detection of cutting-edge browser capabilities in your current environment
            </p>
          </div>

          <div className="api-support-bands">
            {/* First Band - Moving Right */}
            <div className="api-band api-band--right">
              <div className="api-band__track">
                {firstBandExtended.map(([api, supported], index) => (
                  <div 
                    key={`first-${api}-${index}`} 
                    className={`api-badge ${supported ? 'api-badge--supported' : 'api-badge--unsupported'}`}
                  >
                    <Icon 
                      icon={supported ? 'mdi:check-circle' : 'mdi:close-circle'} 
                      className="api-badge__icon"
                    />
                    <span className="api-badge__text">
                      {api.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {supported && <div className="api-badge__glow"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Second Band - Moving Left */}
            <div className="api-band api-band--left">
              <div className="api-band__track">
                {secondBandExtended.map(([api, supported], index) => (
                  <div 
                    key={`second-${api}-${index}`} 
                    className={`api-badge ${supported ? 'api-badge--supported' : 'api-badge--unsupported'}`}
                  >
                    <Icon 
                      icon={supported ? 'mdi:check-circle' : 'mdi:close-circle'} 
                      className="api-badge__icon"
                    />
                    <span className="api-badge__text">
                      {api.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {supported && <div className="api-badge__glow"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="api-support-stats">
            <div className="api-stat">
              <div className="api-stat__value">{Object.values(apiSupport).filter(Boolean).length}</div>
              <div className="api-stat__label">APIs Supported</div>
            </div>
            <div className="api-stat">
              <div className="api-stat__value">{Math.round((Object.values(apiSupport).filter(Boolean).length / Object.keys(apiSupport).length) * 100)}%</div>
              <div className="api-stat__label">Browser Coverage</div>
            </div>
            <div className="api-stat">
              <div className="api-stat__value">{Object.keys(apiSupport).length}</div>
              <div className="api-stat__label">Total APIs</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function HeroStats() {
  const apiSupport = getAPISupport()
  const totalSupported = Object.values(apiSupport).filter(Boolean).length
  const totalApis = Object.keys(apiSupport).length
  const supportPercentage = Math.round((totalSupported / totalApis) * 100)

  return (
    <div className="features-hero__metrics">
      <div className="features-metric">
        <div className="features-metric__value">{totalSupported}<span className="features-metric__slash">/</span>{totalApis}</div>
        <div className="features-metric__label">APIs Supported</div>
      </div>
      <div className="features-metric">
        <div className="features-metric__value">{supportPercentage}<span className="features-metric__percent">%</span></div>
        <div className="features-metric__label">Browser Compatible</div>
      </div>
      <div className="features-metric">
        <div className="features-metric__value">{features.length}<span className="features-metric__plus">+</span></div>
        <div className="features-metric__label">Interactive Demos</div>
      </div>
    </div>
  )
}

// Tech Stack Section
function TechStackSection() {
  const [activeDemo, setActiveDemo] = useState('typescript')
  
  const techFeatures = [
    {
      id: 'typescript',
      title: 'TypeScript',
      icon: 'logos:typescript-icon',
      description: 'Full type safety across the entire application with advanced TypeScript patterns',
      code: `interface FeatureCard {
  id: string
  title: string
  status: 'stable' | 'beta' | 'experimental'
  compatibility: number
}

// Type-safe component props
function Card({ feature }: { feature: FeatureCard }) {
  return <div>{feature.title}</div>
}`,
      highlights: ['Advanced Types', 'Strict Mode', 'Type Inference', 'Generic Components']
    },
    {
      id: 'vite',
      title: 'Vite',
      icon: 'logos:vitejs',
      description: 'Lightning-fast development with instant HMR and optimized production builds',
      code: `// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true
  },
  css: {
    postcss: './postcss.config.js'
  }
})`,
      highlights: ['Hot Module Replacement', 'ES Modules', 'Tree Shaking', 'Code Splitting']
    },
    {
      id: 'router',
      title: 'TanStack Router',
      icon: 'mdi:router',
      description: 'Type-safe routing with automatic code splitting and advanced navigation patterns',
      code: `// Type-safe route definition
const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/features',
  component: Features,
})

// Type-safe navigation
<Link to="/features" activeProps={{ className: 'active' }}>
  Features
</Link>`,
      highlights: ['Type Safety', 'Code Splitting', 'Search Params', 'Nested Routes']
    }
  ]

  return (
    <Section id="typescript" variant="feature">
      <Container>
        <Section.Header centered>
          <Section.Title>Frontend Technology Stack</Section.Title>
          <Section.Subtitle>
            Modern development tools and frameworks powering this application
          </Section.Subtitle>
        </Section.Header>

        <Section.Content>
          <Card variant="feature" interactive>
              <Card.Header>
                <Cluster gap="md" justify="center" wrap>
                  {techFeatures.map((tech) => (
                    <Button
                      key={tech.id}
                      variant={activeDemo === tech.id ? 'primary' : 'ghost'}
                      size="sm"
                      icon={tech.icon}
                      onClick={() => setActiveDemo(tech.id)}
                    >
                      {tech.title}
                    </Button>
                  ))}
                </Cluster>
              </Card.Header>
              
              <Card.Content>
                {techFeatures.map((tech) => (
                  activeDemo === tech.id && (
                    <Stack key={tech.id} gap="lg">
                      <div>
                        <Card.Title>{tech.title}</Card.Title>
                        <Card.Description>{tech.description}</Card.Description>
                      </div>
                      
                      <CodeBlock 
                        code={tech.code}
                        language="typescript"
                        showLineNumbers
                      />
                      
                      <Tag.List 
                        tags={tech.highlights.map((highlight, index) => ({
                          id: `${tech.id}-${index}`,
                          label: highlight
                        }))}
                        variant="outline"
                        size="sm"
                      />
                    </Stack>
                  )
                ))}
              </Card.Content>
            </Card>
        </Section.Content>
      </Container>
    </Section>
  )
}

// Styling Section
function StylingSection() {
  const [activeFeature, setActiveFeature] = useState('layers')
  
  const stylingFeatures = [
    {
      id: 'layers',
      title: 'CSS Layers',
      icon: 'mdi:layers',
      description: 'Organized cascade management for predictable styling',
      code: `@layer base, components, utilities, animations;

@layer base {
  body {
    font-family: 'Inter', sans-serif;
    color: var(--color-on-surface);
  }
}

@layer components {
  .navbar {
    background: var(--color-surface);
    backdrop-filter: blur(20px);
  }
}`,
      compatibility: 89
    },
    {
      id: 'container-queries',
      title: 'Container Queries',
      icon: 'mdi:crop-free',
      description: 'Element-based responsive design beyond viewport queries',
      code: `/* Container query responsive card */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card__content {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }
}`,
      compatibility: 92
    },
    {
      id: 'scope',
      title: 'CSS @scope',
      icon: 'mdi:target',
      description: 'True component-level style isolation and scoping',
      code: `@scope (.navbar) {
  /* Styles only apply within .navbar */
  .button {
    background: var(--color-primary);
    border-radius: var(--radius-md);
  }
  
  /* Exclude certain elements */
  .button:not(.mobile-only) {
    display: inline-flex;
  }
}`,
      compatibility: 85
    }
  ]

  return (
    <Section id="layers" variant="content">
      <Container>
        <Section.Header centered>
          <Section.Title>Pure CSS Architecture</Section.Title>
          <Section.Subtitle>
            Zero framework dependencies - built with modern CSS features
          </Section.Subtitle>
        </Section.Header>

        <Section.Content>
          <Stack gap="lg">
            {/* Mobile-First Feature Selection */}
            <div className="md:hidden">
              <Stack gap="sm">
                {stylingFeatures.map((feature) => (
                  <Button
                    key={feature.id}
                    variant={activeFeature === feature.id ? 'primary' : 'ghost'}
                    size="md"
                    icon={feature.icon}
                    onClick={() => setActiveFeature(feature.id)}
                    className="w-full justify-start"
                  >
                    {feature.title}
                  </Button>
                ))}
              </Stack>
            </div>
            
            {/* Desktop: Horizontal selection */}
            <div className="hidden md:block">
              <Cluster gap="md" justify="center" wrap>
                {stylingFeatures.map((feature) => (
                  <Button
                    key={feature.id}
                    variant={activeFeature === feature.id ? 'primary' : 'ghost'}
                    size="sm"
                    icon={feature.icon}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    {feature.title}
                  </Button>
                ))}
              </Cluster>
            </div>

            {/* Single full-width demo card */}
            <Card variant="feature">
              {stylingFeatures.map((feature) => (
                activeFeature === feature.id && (
                  <Card.Content key={feature.id}>
                    <Stack gap="lg">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted">{feature.description}</p>
                      </div>
                      
                      {/* Responsive code block */}
                      <div className="overflow-x-auto">
                        <CodeBlock 
                          code={feature.code}
                          language="css"
                          showLineNumbers
                        />
                      </div>
                      
                      <Cluster gap="sm" align="center" wrap>
                        <Badge variant="success">
                          Modern CSS
                        </Badge>
                        <span className="text-sm text-muted">
                          {feature.compatibility}% browser support
                        </span>
                      </Cluster>
                    </Stack>
                  </Card.Content>
                )
              ))}
            </Card>
          </Stack>
        </Section.Content>
      </Container>
    </Section>
  )
}

// Advanced APIs Section
function AdvancedAPIsSection() {
  return (
    <Section id="web-platform" variant="feature">
      <Container>
        <Section.Header centered>
          <Section.Title>Advanced Web Platform APIs</Section.Title>  
          <Section.Subtitle>
            Cutting-edge browser capabilities and progressive enhancement
          </Section.Subtitle>
        </Section.Header>

        <Section.Content>
          <Grid columns="auto-fit" minWidth="380px" gap="lg">
            <Card variant="feature" id="performance">
              <Card.Header icon="mdi:speedometer">
                <Card.Title>Performance APIs</Card.Title>
              </Card.Header>
              <Card.Content>
                <Stack gap="md">
                  <Card.Description>
                    Core Web Vitals monitoring, Performance Observer, and resource optimization
                  </Card.Description>
                  <Tag.List 
                    tags={[
                      { id: 'cwv', label: 'Core Web Vitals' },
                      { id: 'observer', label: 'Performance Observer' },
                      { id: 'navigation', label: 'Navigation Timing' },
                      { id: 'resource', label: 'Resource Timing' }
                    ]}
                    variant="outline"
                    size="sm"
                  />
                </Stack>
              </Card.Content>
              <Card.Footer>
                <Button as={Link} to="/apis" variant="primary" size="sm">
                  Try Performance APIs
                </Button>
              </Card.Footer>
            </Card>

            <Card variant="feature" id="accessibility">
              <Card.Header icon="mdi:accessibility">
                <Card.Title>Accessibility APIs</Card.Title>
              </Card.Header>
              <Card.Content>
                <Stack gap="md">
                  <Card.Description>
                    WCAG 2.2 compliance, screen reader support, and inclusive design patterns
                  </Card.Description>
                  <Tag.List 
                    tags={[
                      { id: 'wcag', label: 'WCAG 2.2 AA' },
                      { id: 'aria', label: 'ARIA Labels' },
                      { id: 'focus', label: 'Focus Management' },
                      { id: 'keyboard', label: 'Keyboard Navigation' }
                    ]}
                    variant="outline"
                    size="sm"
                  />
                </Stack>
              </Card.Content>
              <Card.Footer>
                <Button as={Link} to="/apis" variant="primary" size="sm">
                  Explore Accessibility
                </Button>
              </Card.Footer>
            </Card>
          </Grid>
        </Section.Content>
      </Container>
    </Section>
  )
}

// Build & Deploy Section  
function BuildDeploySection() {
  return (
    <Section id="vite-build" variant="content">
      <Container>
        <Section.Header centered>
          <Section.Title>Build & Deployment Pipeline</Section.Title>
          <Section.Subtitle>
            Modern tooling for optimized production builds and seamless deployment
          </Section.Subtitle>
        </Section.Header>

        <Section.Content>
          <Grid columns="auto-fit" minWidth="350px" gap="xl">
            <Card variant="feature" id="github-actions">
              <Card.Header icon="mdi:github">
                <Card.Title>GitHub Actions CI/CD</Card.Title>
              </Card.Header>
              <Card.Content>
                <Stack gap="md">
                  <Card.Description>
                    Automated testing, building, and deployment pipeline with GitHub Actions
                  </Card.Description>
                  <CodeBlock 
                    code={`name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25`}
                    language="yaml"
                    showLineNumbers={false}
                  />
                </Stack>
              </Card.Content>
            </Card>

            <Card variant="feature" id="deployment">
              <Card.Header icon="mdi:rocket-launch">
                <Card.Title>Vercel Deployment</Card.Title>
              </Card.Header>
              <Card.Content>
                <Stack gap="md">
                  <Card.Description>
                    Lightning-fast edge deployment with automatic optimizations and global CDN
                  </Card.Description>
                  <Tag.List 
                    tags={[
                      { id: 'edge', label: 'Edge Runtime' },
                      { id: 'cdn', label: 'Global CDN' },
                      { id: 'ssl', label: 'Automatic SSL' },
                      { id: 'preview', label: 'Preview Deployments' }
                    ]}
                    variant="outline"
                    size="sm"
                  />
                </Stack>
              </Card.Content>
            </Card>
          </Grid>
        </Section.Content>
      </Container>
    </Section>
  )
}

export function Features() {
  return (
    <div className="page-transition-container">
      {/* Spectacular Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <div className="features-hero">
            <div className="features-hero__background">
              <div className="features-floating-icons">
                <Icon icon="logos:react" className="features-floating-icons__react" />
                <Icon icon="logos:typescript-icon" className="features-floating-icons__ts" />
                <Icon icon="logos:vitejs" className="features-floating-icons__vite" />
                <Icon icon="mdi:api" className="features-floating-icons__api" />
              </div>
              <div className="features-particles"></div>
            </div>
            
            <div className="features-hero__content">
              <div className="features-hero__badge">
                <div className="features-badge">
                  <div className="features-badge__glow"></div>
                  <Icon icon="mdi:rocket-launch" className="features-badge__icon" />
                  <span className="features-badge__text">Interactive Showcase</span>
                </div>
              </div>
              
              <h1 className="features-hero__title">
                <span className="features-hero__title-main">Modern Web</span>
                <span className="features-hero__title-highlight">Technology Showcase</span>
                <span className="features-hero__title-sub">Interactive Demos</span>
              </h1>
              
              <p className="features-hero__description">
                Explore React 19 features, modern CSS techniques, and 
                web APIs through interactive examples and educational demonstrations.
              </p>
              
              <div className="features-hero__actions">
                <Button variant="primary" size="lg" icon="mdi:play" elevated glowEffect="primary">
                  Start Interactive Tour
                </Button>
                <Button variant="glass" size="lg" icon="mdi:github" className="features-hero__source-btn">
                  View Source
                </Button>
              </div>
              
              <HeroStats />
            </div>
          </div>
        </Container>
      </Section>
      

      {/* Stunning Features Showcase */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <div className="features-showcase-section">
            <div className="features-showcase-header">
              <div className="features-showcase-badge">
                <Icon icon="mdi:star" className="features-showcase-badge__icon" />
                <span>Feature Showcase</span>
              </div>
              <h2 className="features-showcase-title">
                Explore <span className="features-showcase-title__highlight">Interactive Demos</span>
              </h2>
              <p className="features-showcase-subtitle">
                Hands-on experience with modern web technologies and React 19 capabilities
              </p>
            </div>

            <div className="features-showcase-grid">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="features-showcase-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={feature.route}>
                    <div className="features-card-glass">
                      <div className="features-card-header">
                        <div className="features-card-icon">
                          <Icon icon={feature.icon} className="features-card-icon__main" />
                        </div>
                        <div className="features-card-status">
                          <div className={`features-status-badge features-status-badge--${feature.status}`}>
                            {feature.status}
                          </div>
                          <div className="features-compatibility">
                            <span className="features-compatibility__value">{feature.compatibility}%</span>
                            <span className="features-compatibility__label">compatible</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="features-card-content">
                        <h3 className="features-card-title">{feature.title}</h3>
                        <p className="features-card-description">{feature.description}</p>
                        
                        <div className="features-card-highlights">
                          {feature.highlights.map((highlight, highlightIndex) => (
                            <div key={highlightIndex} className="features-highlight-tag">
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="features-card-footer">
                        <div className="features-card-arrow">
                          <span>Explore {feature.title}</span>
                          <Icon icon="mdi:arrow-right" className="features-card-arrow__icon" />
                        </div>
                      </div>
                      
                      <div className="features-card-ripple"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* API Support */}
      <APISupport />

      {/* Tech Stack Deep Dive */}
      <TechStackSection />
      
      {/* Styling Features */}
      <StylingSection />
      
      {/* Advanced APIs */}
      <AdvancedAPIsSection />
      
      {/* Build & Deploy */}
      <BuildDeploySection />

      {/* Getting Started CTA */}
      <Section variant="cta">
        <Container>
          <Section.Header centered>
            <Section.Title>Ready to Explore?</Section.Title>
            <Section.Subtitle>
              Choose your path to dive into modern web development
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Cluster gap="lg" justify="center" wrap>
              <Button 
                as={Link} 
                to="/react19" 
                variant="primary" 
                size="lg"
                icon="logos:react"
              >
                Start with React 19
              </Button>
              
              <Button 
                as={Link} 
                to="/apis" 
                variant="outline" 
                size="lg"
                icon="mdi:api"
              >
                Try Advanced APIs
              </Button>
            </Cluster>
          </Section.Content>
        </Container>
      </Section>
    </div>
  )
}