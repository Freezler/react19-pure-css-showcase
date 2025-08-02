import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { CompilerDemo } from '../components/CompilerDemo'
import { Section, Button, Tag, Badge } from '../components/ui'
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

      {/* Features section - using design system classes */}
      <section className="section section--feature section--lg scroll-reveal">
        <div className="container container--wide">
          <div className="section__header section__header--centered">
            <h2 className="section__title section__title--xl scroll-title-reveal">
              Why Choose <span style={{ color: 'var(--color-accent)' }}>React 19</span>?
            </h2>
            <p className="section__subtitle scroll-title-reveal">
              Discover the powerful features that make modern web development faster, safer, and more enjoyable.
            </p>
          </div>

          <div className="section__content">
            <div className="features-grid features-grid--container-responsive scroll-stagger-cards">
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
                  className="card card--feature hover-glow card-link"
                >
                  <div className="card__header">
                    <Icon 
                      icon={feature.icon} 
                      className="card__icon card__icon--feature"
                    />
                    <h3 className="card__title card__title--lg">{feature.title}</h3>
                  </div>

                  <div className="card__content">
                    <p className="card__description">{feature.description}</p>
                  </div>

                  <div className="card__footer">
                    <Tag.List
                      tags={feature.tags.map((tag, tagIndex) => ({
                        id: `${feature.id}-${tagIndex}`,
                        label: tag
                      }))}
                      variant="primary"
                      size="xs"
                    />
                  </div>
                </Link>
              )})
              }
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Showcase section - Using Design System */}
      <section className="section section--showcase section--lg scroll-reveal">

        <div className="container container--wide">
          <div className="section__header section__header--centered">
            <h2 className="section__title section__title--xl scroll-title-reveal">
              Explore Our <span className="text-accent">Showcase</span>
            </h2>
            <p className="section__subtitle scroll-title-reveal">
              Dive deep into our comprehensive examples, documentation, and interactive demos. 
              Each section is crafted to demonstrate real-world applications of modern web development.
            </p>
          </div>

          <div className="section__content">
            <div className="showcase-grid showcase-grid--container-responsive scroll-stagger-cards">
            
            {/* Card 1 - Tech Stack */}
            <div className="card card--showcase hover-glow">
              <div className="card__header">
                <Icon 
                  icon="mdi:cog-outline" 
                  className="card__icon card__icon--showcase card__icon--primary"
                />
                <h3 className="card__title card__title--lg">Tech Stack Deep Dive</h3>
              </div>
              
              <div className="card__content">
                <p className="card__description">
                  Explore React 19's features, modern CSS techniques, and the development ecosystem powering this showcase.
                </p>
              </div>
              
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
            </div>

            {/* Card 2 - Interactive Examples */}
            <div className="card card--showcase hover-glow">
              <div className="card__header">
                <Icon 
                  icon="mdi:cube-outline" 
                  className="card__icon card__icon--showcase card__icon--secondary"
                />
                <h3 className="card__title card__title--lg">Interactive Examples</h3>
              </div>
              
              <div className="card__content">
                <p className="card__description">
                  See these technologies in action with live, interactive demonstrations. Play with components, test features, and experience the difference.
                </p>
              </div>
              
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
            </div>

            {/* Card 3 - Resources & Guides */}
            <div className="card card--showcase hover-glow">
              <div className="card__header">
                <Icon 
                  icon="mdi:library" 
                  className="card__icon card__icon--showcase card__icon--accent"
                />
                <h3 className="card__title card__title--lg">Resources & Guides</h3>
              </div>
              
              <div className="card__content">
                <p className="card__description">
                  Comprehensive documentation, implementation guides, and insights into the architectural decisions behind this modern React application.
                </p>
              </div>
              
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
            </div>

            </div>
          </div>
        </div>
      </section>

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
