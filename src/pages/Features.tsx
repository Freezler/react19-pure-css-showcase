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
    compatibility: 100,
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
  
  return (
    <Section variant="feature">
      <Container>
        <Section.Header centered>
          <Section.Title>Browser API Support</Section.Title>
          <Section.Subtitle>
            Check which modern web APIs are supported in your browser
          </Section.Subtitle>
        </Section.Header>

        <Section.Content>
          <Grid columns="auto-fit" minWidth="200px" gap="md">
            {Object.entries(apiSupport).map(([api, supported]) => (
              <Card key={api} variant={supported ? "default" : "default"} className="text-center md:text-left">
                <Card.Content>
                  <Stack gap="xs" align="center" className="md:hidden">
                    <Icon 
                      icon={supported ? 'mdi:check-circle' : 'mdi:close-circle'} 
                      className={`text-lg ${supported ? 'text-success' : 'text-error'}`}
                    />
                    <span className="text-sm">
                      {api.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </Stack>
                  <Cluster gap="sm" align="center" className="hidden md:flex">
                    <Icon 
                      icon={supported ? 'mdi:check-circle' : 'mdi:close-circle'} 
                      className={supported ? 'text-success' : 'text-error'}
                    />
                    <span>
                      {api.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </Cluster>
                </Card.Content>
              </Card>
            ))}
          </Grid>
        </Section.Content>
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
    <>
      {/* Mobile: Stack vertically */}
      <Stack gap="md" align="center" className="sm:hidden">
        <Card variant="stat" className="w-full max-w-xs">
          <Card.Content>
            <div className="stat-number">{totalSupported}/{totalApis}</div>
            <div className="stat-label">APIs Supported</div>
          </Card.Content>
        </Card>
        
        <Card variant="stat" className="w-full max-w-xs">
          <Card.Content>
            <div className="stat-number">{supportPercentage}%</div>
            <div className="stat-label">Browser Compatibility</div>
          </Card.Content>
        </Card>
        
        <Card variant="stat" className="w-full max-w-xs">
          <Card.Content>
            <div className="stat-number">{features.length}</div>
            <div className="stat-label">Feature Categories</div>
          </Card.Content>
        </Card>
      </Stack>
      
      {/* Desktop: Grid horizontally */}
      <Grid columns="auto-fit" minWidth="120px" gap="md" className="justify-center hidden sm:grid">
        <Card variant="stat">
          <Card.Content>
            <div className="stat-number">{totalSupported}/{totalApis}</div>
            <div className="stat-label">APIs Supported</div>
          </Card.Content>
        </Card>
        
        <Card variant="stat">
          <Card.Content>
            <div className="stat-number">{supportPercentage}%</div>
            <div className="stat-label">Browser Compatibility</div>
          </Card.Content>
        </Card>
        
        <Card variant="stat">
          <Card.Content>
            <div className="stat-number">{features.length}</div>
            <div className="stat-label">Feature Categories</div>
          </Card.Content>
        </Card>
      </Grid>
    </>
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
      {/* Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Icon icon="mdi:rocket" className="hero-icon" />
            <Section.Header centered>
              <Section.Title size="3xl" gradient>
                Modern Web Features
              </Section.Title>
              <Section.Subtitle>
                Explore cutting-edge web technologies, React 19 capabilities, and modern development patterns
              </Section.Subtitle>
            </Section.Header>

            <HeroStats />
          </Stack>
        </Container>
      </Section>
      

      {/* Features Grid */}
      <Section variant="content">
        <Container>
          <Section.Content>
            <Grid columns="auto-fit" minWidth="300px" gap="xl" className="grid--responsive scroll-stagger">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.id} 
                  feature={feature}
                  className={`${index % 2 === 0 ? "scroll-slide-in-left" : "scroll-slide-in-right"} hover-glow`}
                />
              ))}
            </Grid>
          </Section.Content>
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