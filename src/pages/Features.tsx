import { Link } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
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
  Cover
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

function FeatureCard({ feature }: { feature: FeatureCard }) {
  const statusVariant = {
    stable: 'success',
    beta: 'warning', 
    experimental: 'info'
  } as const

  return (
    <Link to={feature.route}>
      <Card variant="feature" interactive className="hover-lift">
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
              <Card key={api} variant={supported ? "default" : "default"}>
                <Card.Content>
                  <Cluster gap="sm" align="center">
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
    <Cluster gap="lg" justify="center">
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
    </Cluster>
  )
}

export function Features() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <Cover 
        minHeight="70vh"
        centered={
          <Container>
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
        }
      />
      

      {/* Features Grid */}
      <Section variant="content" className="scroll-reveal">
        <Container>
          <Section.Content>
            <Grid columns="auto-fit" minWidth="320px" gap="xl" className="scroll-stagger">
              {features.map((feature, index) => (
                <div key={feature.id} className={index % 2 === 0 ? "scroll-slide-in-left" : "scroll-slide-in-right"}>
                  <FeatureCard feature={feature} />
                </div>
              ))}
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* API Support */}
      <APISupport />

      {/* Getting Started CTA */}
      <Section variant="cta">
        <Container size="narrow">
          <Section.Header centered>
            <Section.Title>Ready to Explore?</Section.Title>
            <Section.Subtitle>
              Choose your path to dive into modern web development
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="300px" gap="xl">
              <Link to="/react19">
                <Card variant="feature" interactive>
                  <Card.Header icon="logos:react">
                    <Card.Title>Start with React 19</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <Card.Description>
                      Explore the latest React features including useOptimistic, useActionState, and Server Actions for modern web development
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Link>
              
              <Link to="/apis">
                <Card variant="feature" interactive>
                  <Card.Header icon="mdi:api">
                    <Card.Title>Try Advanced APIs</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <Card.Description>
                      Interactive demos of modern browser capabilities including View Transitions, Web Workers, and progressive enhancement
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            </Grid>
          </Section.Content>
        </Container>
      </Section>
    </div>
  )
}