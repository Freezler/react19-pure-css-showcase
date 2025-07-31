import { Icon } from '@iconify/react'
import { Hero } from '../components/Hero'
import { CompilerDemo } from '../components/CompilerDemo'
import { Section, Button, Tag, Badge } from '../components/ui'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

export function Home() {
  // 🎭 Activate scroll reveal magic for all sections!
  useScrollRevealAll()
  const features = [
    {
      id: 'architecture',
      title: 'Modern Architecture',
      description: 'Built with React 19, TypeScript, and cutting-edge tooling for unmatched performance and developer experience.',
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
      <div className="scroll-reveal">
        <CompilerDemo />
      </div>

      {/* Features section - using design system classes */}
      <section className="section section--feature section--lg scroll-reveal">
        <div className="container container--wide">
          <div className="section__header section__header--centered scroll-scale-in">
            <h2 className="section__title section__title--xl">
              Why Choose <span style={{ color: 'var(--color-accent)' }}>React 19</span>?
            </h2>
            <p className="section__subtitle">
              Discover the powerful features that make modern web development faster, safer, and more enjoyable.
            </p>
          </div>

          <div className="section__content">
            <div className="grid grid--auto-fit-lg grid--gap-xl scroll-stagger">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="card card--feature hover-glow"
                  onClick={() => console.log(`Learn more about ${feature.title}`)}
                >
                  <div className="card__header">
                    <Icon 
                      icon={feature.icon} 
                      style={{ 
                        fontSize: 'var(--text-2xl)', 
                        color: 'var(--color-primary)',
                        marginBottom: 'var(--space-md)'
                      }} 
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Showcase section - Using Design System */}
      <section className="section section--showcase section--lg scroll-reveal">

        <div className="container container--wide">
          <div className="section__header section__header--centered scroll-slide-in-left">
            <h2 className="section__title section__title--xl">
              Explore Our <span className="text-accent">Showcase</span>
            </h2>
            <p className="section__subtitle">
              Dive deep into our comprehensive examples, documentation, and interactive demos. 
              Each section is crafted to demonstrate real-world applications of modern web development.
            </p>
          </div>

          <div className="section__content">
            <div className="showcase-grid scroll-stagger">
            
            {/* Card 1 - Tech Stack */}
            <div className="card card--showcase hover-glow">
              <div className="card__header">
                <Icon 
                  icon="mdi:cog-outline" 
                  style={{ 
                    fontSize: 'var(--text-2xl)', 
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--space-md)'
                  }} 
                />
                <h3 className="card__title card__title--lg">Tech Stack Deep Dive</h3>
              </div>
              
              <div className="card__content">
                <p className="card__description">
                  Explore React 19's cutting-edge features, modern CSS techniques, and the complete development ecosystem powering this showcase.
                </p>
              </div>
              
              <div className="showcase-links">
                <a href="/react19" className="showcase-link">
                  <Icon icon="mdi:react" />
                  <span>React 19 Features</span>
                </a>
                <a href="/design" className="showcase-link">
                  <Icon icon="mdi:palette-advanced" />
                  <span>Modern CSS</span>
                </a>
                <a href="/apis" className="showcase-link">
                  <Icon icon="mdi:application-cog" />
                  <span>Advanced APIs</span>
                </a>
              </div>
            </div>

            {/* Card 2 - Interactive Examples */}
            <div className="card card--showcase hover-glow">
              <div className="card__header">
                <Icon 
                  icon="mdi:cube-outline" 
                  style={{ 
                    fontSize: 'var(--text-2xl)', 
                    color: 'var(--color-secondary)',
                    marginBottom: 'var(--space-md)'
                  }} 
                />
                <h3 className="card__title card__title--lg">Interactive Examples</h3>
              </div>
              
              <div className="card__content">
                <p className="card__description">
                  See these technologies in action with live, interactive demonstrations. Play with components, test features, and experience the difference.
                </p>
              </div>
              
              <div className="showcase-links">
                <a href="/features" className="showcase-link">
                  <Icon icon="mdi:view-dashboard" />
                  <span>Features Showcase</span>
                </a>
                <a href="/example" className="showcase-link">
                  <Icon icon="mdi:toy-brick" />
                  <span>Component Library</span>
                </a>
              </div>
            </div>

            {/* Card 3 - Resources & Guides */}
            <div className="card card--showcase hover-glow">
              <div className="card__header">
                <Icon 
                  icon="mdi:library" 
                  style={{ 
                    fontSize: 'var(--text-2xl)', 
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-md)'
                  }} 
                />
                <h3 className="card__title card__title--lg">Resources & Guides</h3>
              </div>
              
              <div className="card__content">
                <p className="card__description">
                  Comprehensive documentation, implementation guides, and insights into the architectural decisions behind this modern React application.
                </p>
              </div>
              
              <div className="showcase-links">
                <a href="/about" className="showcase-link">
                  <Icon icon="mdi:file-document-outline" />
                  <span>Documentation</span>
                </a>
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
                Join thousands of developers creating the future with modern React development.
              </p>
            </div>

            <Button.Group orientation="horizontal" spacing="lg">
              <Button 
                variant="primary" 
                size="lg"
                icon="mdi:rocket-launch"
                onClick={() => console.log('Start building clicked')}
              >
                Start Building
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                icon="mdi:github"
                onClick={() => console.log('GitHub clicked')}
              >
                View on GitHub
              </Button>
            </Button.Group>

            <div className="stack stack--gap-sm stack--align-center">
              <div className="cluster cluster--gap-sm cluster--justify-center">
                <Badge variant="primary" size="sm" shape="pill">React</Badge>
                <Badge variant="secondary" size="sm" shape="pill">TypeScript</Badge>
                <Badge variant="accent" size="sm" shape="pill">Vite</Badge>
                <Badge.Count count={1000} variant="success" size="sm" />
              </div>
              <p className="stats-label">
                Trusted by <strong>1,000+</strong> developers worldwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
