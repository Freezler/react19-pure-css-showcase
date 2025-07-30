import { Hero } from '../components/Hero'
import { 
  Card, 
  Button, 
  Section, 
  Badge, 
  Tag,
  Container,
  Stack,
  Grid,
  Cluster
} from '../components/ui'

export function Home() {
  const features = [
    {
      id: 'architecture',
      title: 'Modern Architecture',
      description: 'Built with React 19, TypeScript, and cutting-edge tooling for unmatched performance and developer experience.',
      icon: 'mdi:rocket',
      tags: ['React 19', 'TypeScript', 'Vite 7']
    },
    {
      id: 'routing',
      title: 'TanStack Router',
      description: 'Type-safe routing with automatic code splitting, prefetching, and seamless navigation experiences.',
      icon: 'mdi:router',
      tags: ['Type Safe', 'Code Splitting']
    },
    {
      id: 'styling',
      title: 'Modern CSS',
      description: 'CSS layers, custom properties, OKLCH colors, and container queries for responsive design systems.',
      icon: 'mdi:palette',
      tags: ['CSS Layers', 'OKLCH']
    },
    {
      id: 'accessibility',
      title: 'Accessibility First',
      description: 'WCAG 2.2 compliant with keyboard navigation, screen reader support, and inclusive design patterns.',
      icon: 'mdi:accessibility',
      tags: ['WCAG 2.2', 'Inclusive']
    }
  ]

  return (
    <div className="page-transition-container">
      {/* Modern Hero Component */}
      <Hero />

      {/* Features section - now using our clean component system */}
      <Section variant="feature" size="lg" className="scroll-reveal">
        <Container size="wide">
          <Section.Header centered className="scroll-reveal">
            <Section.Title size="xl">
              Why Choose <span className="text-accent">React 19</span>?
            </Section.Title>
            <Section.Subtitle>
              Discover the powerful features that make modern web development faster, safer, and more enjoyable.
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="300px" gap="xl" className="grid--responsive scroll-stagger">
              {features.map((feature, index) => (
                <Card 
                  key={feature.id}
                  variant="feature" 
                  size="lg"
                  interactive
                  className={`${index % 2 === 0 ? "scroll-slide-in-left" : "scroll-slide-in-right"} hover-glow`}
                  onClick={() => console.log(`Learn more about ${feature.title}`)}
                >
                  <Card.Header icon={feature.icon}>
                    <Card.Title size="lg">{feature.title}</Card.Title>
                  </Card.Header>

                  <Card.Content>
                    <Card.Description>{feature.description}</Card.Description>
                  </Card.Content>

                  <Card.Footer>
                    <Tag.List 
                      tags={feature.tags.map((tag, index) => ({
                        id: `${feature.id}-${index}`,
                        label: tag
                      }))}
                      variant="subtle"
                      size="sm"
                    />
                  </Card.Footer>
                </Card>
              ))}
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* CTA section - refactored with components */}
      <Section variant="cta" size="lg" className="scroll-scale-in">
        <Container size="narrow">
          <Stack gap="2xl" align="center">
            <Section.Header centered className="scroll-reveal">
              <Section.Title size="2xl">
                Ready to Build Something Amazing?
              </Section.Title>
              <Section.Subtitle>
                Join thousands of developers creating the future with modern React development.
              </Section.Subtitle>
            </Section.Header>

            <Button.Group orientation="horizontal" spacing="lg" className="scroll-reveal">
              <Button 
                variant="primary" 
                size="lg"
                icon="mdi:rocket-launch"
                className="hover-lift"
              >
                Start Building
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                icon="mdi:github"
                className="hover-tilt"
              >
                View on GitHub
              </Button>
            </Button.Group>

            <Stack gap="sm" align="center" className="scroll-reveal">
              <Cluster gap="sm" justify="center">
                <div className="avatar avatar--primary">A</div>
                <div className="avatar avatar--secondary">B</div>
                <div className="avatar avatar--accent">C</div>
                <Badge.Count count={99} />
              </Cluster>
              <p className="stats-label">
                Trusted by <strong>1,000+</strong> developers worldwide
              </p>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
