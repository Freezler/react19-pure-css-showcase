import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { CompilerDemo } from '../components/CompilerDemo'
import { Section, Button, Tag, Badge, Container, Grid, Card } from '../components/ui'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

export function Home() {
  // 🎭 Activate scroll reveal magic for all sections!
  useScrollRevealAll()
  // 🌟 Fallback scroll animations for better browser support
  useScrollAnimations()
  const features = [
    {
      id: 'architecture',
      title: 'Modern Architecture',
      description: 'Built with React 19, TypeScript, and modern tooling for improved performance and developer experience.',
      icon: 'mdi:react',
      tags: ['React 19', 'TypeScript', 'Vite 7']
    },
    {
      id: 'routing',
      title: 'TanStack Router',
      description: 'Type-safe routing with automatic code splitting, prefetching, and seamless navigation experiences.',
      icon: 'mdi:routes',
      tags: ['Type Safe', 'Code Splitting']
    },
    {
      id: 'styling',
      title: 'Modern CSS',
      description: 'CSS layers, custom properties, OKLCH colors, and container queries for responsive design systems.',
      icon: 'mdi:palette-swatch',
      tags: ['CSS Layers', 'OKLCH']
    },
    {
      id: 'accessibility',
      title: 'Accessibility First',
      description: 'WCAG 2.2 compliant with keyboard navigation, screen reader support, and inclusive design patterns.',
      icon: 'mdi:human-handsup',
      tags: ['WCAG 2.2', 'Inclusive']
    }
  ]

  return (
    <div className="page-transition-container">
      {/* Modern Hero Component */}
      <Hero />

      {/* React Compiler Demo */}
      <div className="compiler-demo-animate">
        <CompilerDemo />
      </div>

      {/* Features section - using design system */}
      <Section variant="feature" size="lg" className="scroll-reveal">
        <Container size="wide">
          <Section.Header centered>
            <Section.Title size="xl" className="scroll-title-reveal">
              Why Choose <span style={{ color: 'var(--color-accent)' }}>React 19</span>?
            </Section.Title>
            <Section.Subtitle className="scroll-title-reveal">
              Discover the powerful features that make modern web development faster, safer, and more enjoyable.
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="280px" gap="xl" className="scroll-stagger-cards">
              {features.map((feature, index) => {
                const getFeatureLink = (id: string) => {
                  switch(id) {
                    case 'architecture': return '/react19'
                    case 'routing': return '/typescript'
                    case 'styling': return '/design'
                    case 'accessibility': return '/accessibility'
                    default: return '/features'
                  }
                }
                
                return (
                <Link 
                  key={feature.id}
                  to={getFeatureLink(feature.id)}
                  className="card-link"
                >
                  <Card variant="feature" size="lg" interactive>
                    <Card.Header icon={feature.icon}>
                      <Card.Title size="lg">{feature.title}</Card.Title>
                    </Card.Header>

                    <Card.Content>
                      <Card.Description>{feature.description}</Card.Description>
                    </Card.Content>

                    <Card.Footer>
                      <Tag.List
                        tags={feature.tags.map((tag, tagIndex) => ({
                          id: `${feature.id}-${tagIndex}`,
                          label: tag
                        }))}
                        variant="primary"
                        size="xs"
                      />
                    </Card.Footer>
                  </Card>
                </Link>
              )})
              }
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Explore Our Showcase section - Using Design System */}
      <Section variant="showcase" size="lg" className="scroll-reveal">
        <Container size="wide">
          <Section.Header centered>
            <Section.Title size="xl" className="scroll-title-reveal">
              Explore Our <span className="text-accent">Showcase</span>
            </Section.Title>
            <Section.Subtitle className="scroll-title-reveal">
              Dive deep into our comprehensive examples, documentation, and interactive demos. 
              Each section is crafted to demonstrate real-world applications of modern web development.
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="320px" gap="xl" className="scroll-stagger-cards">
            
            {/* Card 1 - Tech Stack */}
            <Card variant="showcase" size="lg" interactive>
              <Card.Header icon="mdi:cog-outline">
                <Card.Title size="lg">Tech Stack Deep Dive</Card.Title>
              </Card.Header>
              
              <Card.Content>
                <Card.Description>
                  Explore React 19's features, modern CSS techniques, and the development ecosystem powering this showcase.
                </Card.Description>
              </Card.Content>
              
              <Card.Footer>
                <div className="showcase-links">
                  <Link to="/react19" className="showcase-link">
                    <Icon icon="mdi:react" />
                    <span>React 19 Features</span>
                  </Link>
                  <Link to="/design" className="showcase-link">
                    <Icon icon="mdi:palette-advanced" />
                    <span>Design System</span>
                  </Link>
                  <Link to="/apis" className="showcase-link">
                    <Icon icon="mdi:application-cog" />
                    <span>Advanced APIs</span>
                  </Link>
                </div>
              </Card.Footer>
            </Card>

            {/* Card 2 - Interactive Examples */}
            <Card variant="showcase" size="lg" interactive>
              <Card.Header icon="mdi:cube-outline">
                <Card.Title size="lg">Interactive Examples</Card.Title>
              </Card.Header>
              
              <Card.Content>
                <Card.Description>
                  See these technologies in action with live, interactive demonstrations. Play with components, test features, and experience the difference.
                </Card.Description>
              </Card.Content>
              
              <Card.Footer>
                <div className="showcase-links">
                  <Link to="/features" className="showcase-link">
                    <Icon icon="mdi:view-dashboard" />
                    <span>Interactive Demos</span>
                  </Link>
                  <Link to="/container-queries" className="showcase-link">
                    <Icon icon="mdi:crop-free" />
                    <span>Container Queries</span>
                  </Link>
                  <Link to="/example" className="showcase-link">
                    <Icon icon="mdi:toy-brick" />
                    <span>Component Library</span>
                  </Link>
                </div>
              </Card.Footer>
            </Card>

            {/* Card 3 - Resources & Guides */}
            <Card variant="showcase" size="lg" interactive>
              <Card.Header icon="mdi:library">
                <Card.Title size="lg">Resources & Guides</Card.Title>
              </Card.Header>
              
              <Card.Content>
                <Card.Description>
                  Comprehensive documentation, implementation guides, and insights into the architectural decisions behind this modern React application.
                </Card.Description>
              </Card.Content>
              
              <Card.Footer>
                <div className="showcase-links">
                  <Link to="/performance" className="showcase-link">
                    <Icon icon="mdi:speedometer" />
                    <span>Performance</span>
                  </Link>
                  <Link to="/accessibility" className="showcase-link">
                    <Icon icon="mdi:account-multiple" />
                    <span>Accessibility</span>
                  </Link>
                  <Link to="/about" className="showcase-link">
                    <Icon icon="mdi:file-document-outline" />
                    <span>About</span>
                  </Link>
                </div>
              </Card.Footer>
            </Card>

            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* CTA section - refactored with design system */}
      <section className="section section--cta section--lg">
        <div className="container container--narrow">
          <div className="stack stack--gap-2xl stack--align-center">
            <div className="section__header section__header--centered">
              <h2 className="section__title section__title--2xl">
                Ready to Build Something Amazing?
              </h2>
              <p className="section__subtitle">
                Join the community creating modern applications with React 19 development.
              </p>
            </div>

            <div className="button-group button-group--horizontal button-group--spacing-lg">
              <Link to="/features">
                <Button 
                  variant="primary" 
                  size="lg"
                  icon="mdi:rocket-launch"
                  elevated
                  glowEffect="primary"
                >
                  Explore Features
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="lg"
                icon="mdi:github"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                View on GitHub
              </Button>
            </div>

            <div className="stack stack--gap-sm stack--align-center">
              <div className="cluster cluster--gap-sm cluster--justify-center">
                <Badge variant="primary" size="sm" shape="pill">React 19</Badge>
                <Badge variant="secondary" size="sm" shape="pill">TypeScript</Badge>
                <Badge variant="accent" size="sm" shape="pill">Vite 7</Badge>
                <Badge variant="success" size="sm" shape="pill">Container Queries</Badge>
              </div>
              <p className="stats-label">
                <strong>Open Source</strong> demonstration project
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
