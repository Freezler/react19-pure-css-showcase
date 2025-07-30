// 🎉 Example of Clean, Refactored Page using our new UI components
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

export default function ExampleRefactored() {
  const features = [
    {
      id: '1',
      title: 'React 19 Features',
      description: 'Latest React capabilities including useOptimistic, useActionState, and Server Actions.',
      icon: 'logos:react',
      status: 'completed',
      tags: ['React', 'Hooks', 'SSR']
    },
    {
      id: '2', 
      title: 'Modern CSS Architecture',
      description: 'CSS Layers, Container Queries, and OKLCH color system for future-proof styling.',
      icon: 'mdi:palette',
      status: 'beta',
      tags: ['CSS', 'Design System', 'Responsive']
    },
    {
      id: '3',
      title: 'Performance Optimization', 
      description: 'Lazy loading, code splitting, and Web Workers for optimal performance.',
      icon: 'mdi:speedometer',
      status: 'experimental',
      tags: ['Performance', 'Optimization', 'Web Workers']
    }
  ]

  const statusColors = {
    completed: 'success',
    beta: 'primary', 
    experimental: 'warning'
  } as const

  return (
    <div className="page-transition-container">
      {/* Hero Section - Clean and composable */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Section.Header centered>
              <Badge variant="primary" icon="mdi:rocket">
                New Component System
              </Badge>
              <Section.Title size="3xl" gradient>
                Clean & Reusable Components
              </Section.Title>
              <Section.Subtitle>
                Built with TypeScript, modern CSS, and accessibility in mind. 
                Create beautiful interfaces with consistent, maintainable code.
              </Section.Subtitle>
            </Section.Header>

            <Cluster gap="lg" justify="center">
              <Button 
                variant="primary" 
                size="lg"
                icon="mdi:rocket-launch"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon="mdi:github"
                iconPosition="right"
              >
                View Source
              </Button>
            </Cluster>

            <Cluster gap="xl" justify="center">
              <div className="stats-item">
                <div className="stats-number">5+</div>
                <div className="stats-label">Components</div>
              </div>
              <div className="stats-item">
                <div className="stats-number">100%</div>
                <div className="stats-label">TypeScript</div>
              </div>
              <div className="stats-item">
                <div className="stats-number">♿</div>
                <div className="stats-label">Accessible</div>
              </div>
            </Cluster>
          </Stack>
        </Container>
      </Section>

      {/* Features Section - Look how clean this is! */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Section.Title size="xl">
              Component <span className="hero__title-accent">Features</span>
            </Section.Title>
            <Section.Subtitle>
              Each component is designed for maximum reusability and developer experience.
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="xl">
              {features.map((feature) => (
                <Card 
                  key={feature.id}
                  variant="feature" 
                  size="lg"
                  interactive
                  onClick={() => console.log(`Clicked ${feature.title}`)}
                >
                  <Card.Header 
                    icon={feature.icon}
                    badge={
                      <Badge 
                        variant={statusColors[feature.status as keyof typeof statusColors]}
                        size="sm"
                      >
                        {feature.status}
                      </Badge>
                    }
                  >
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      icon="mdi:arrow-right"
                      iconPosition="right"
                    >
                      Learn More
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Component Showcase Section */}
      <Section variant="content" size="lg">
        <Container size="reading">
          <Section.Header>
            <Section.Title size="xl">Component Examples</Section.Title>
            <Section.Subtitle>
              See how easy it is to build interfaces with our component system.
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Stack gap="2xl">
              {/* Button Examples */}
              <Card variant="default" size="lg">
                <Card.Header icon="mdi:gesture-tap-button">
                  <Card.Title>Button Variants</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="lg">
                    <Cluster gap="md" wrap>
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="danger">Danger</Button>
                    </Cluster>
                    
                    <Cluster gap="md" wrap>
                      <Button size="sm" icon="mdi:star">Small</Button>
                      <Button size="md" icon="mdi:heart">Medium</Button>
                      <Button size="lg" icon="mdi:rocket">Large</Button>
                      <Button size="xl" icon="mdi:crown">Extra Large</Button>
                    </Cluster>

                    <Cluster gap="md" wrap>
                      <Button loading>Loading</Button>
                      <Button disabled>Disabled</Button>
                      <Button icon="mdi:download" iconPosition="right">
                        With Icon
                      </Button>
                    </Cluster>
                  </Stack>
                </Card.Content>
              </Card>

              {/* Badge Examples */}
              <Card variant="default" size="lg">
                <Card.Header icon="mdi:tag">
                  <Card.Title>Badges & Tags</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="lg">
                    <div>
                      <h4 className="content-subheading">Badge Variants</h4>
                      <Cluster gap="sm" wrap>
                        <Badge variant="default">Default</Badge>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="error">Error</Badge>
                        <Badge variant="info">Info</Badge>
                      </Cluster>
                    </div>

                    <div>
                      <h4 className="content-subheading">Status Badges</h4>
                      <Cluster gap="sm" wrap>
                        <Badge.Status status="online" showText />
                        <Badge.Status status="busy" showText />
                        <Badge.Status status="away" showText />
                        <Badge.Status status="offline" showText />
                      </Cluster>
                    </div>

                    <div>
                      <h4 className="content-subheading">Interactive Tags</h4>
                      <Tag.List 
                        tags={[
                          { id: '1', label: 'React', color: '#61DAFB' },
                          { id: '2', label: 'TypeScript', color: '#3178C6' },
                          { id: '3', label: 'CSS', color: '#1572B6' },
                          { id: '4', label: 'Accessible', removable: true }
                        ]}
                        variant="filled"
                        onRemove={(id) => console.log('Remove tag:', id)}
                        onTagClick={(id) => console.log('Clicked tag:', id)}
                      />
                    </div>
                  </Stack>
                </Card.Content>
              </Card>

              {/* Layout Examples */}
              <Card variant="default" size="lg">
                <Card.Header icon="mdi:view-dashboard">
                  <Card.Title>Layout Utilities</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="lg">
                    <div>
                      <h4 className="content-subheading">Stack Layout</h4>
                      <div className="demo-container">
                        <Stack gap="sm">
                          <div className="demo-element demo-element--primary">Item 1</div>
                          <div className="demo-element demo-element--primary">Item 2</div>
                          <div className="demo-element demo-element--primary">Item 3</div>
                        </Stack>
                      </div>
                    </div>

                    <div>
                      <h4 className="content-subheading">Cluster Layout</h4>
                      <div className="demo-container">
                        <Cluster gap="md" justify="between">
                          <div className="demo-element demo-element--secondary">Left</div>
                          <div className="demo-element demo-element--secondary">Center</div>
                          <div className="demo-element demo-element--secondary">Right</div>
                        </Cluster>
                      </div>
                    </div>
                  </Stack>
                </Card.Content>
              </Card>
            </Stack>
          </Section.Content>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="cta" size="lg">
        <Container size="narrow">
          <Stack gap="xl" align="center">
            <Section.Header centered>
              <Section.Title size="2xl">
                Ready to Build?
              </Section.Title>
              <Section.Subtitle>
                Start using these components in your project today. Clean, maintainable, and accessible by default.
              </Section.Subtitle>
            </Section.Header>

            <Button.Group orientation="horizontal" spacing="lg">
              <Button 
                variant="primary" 
                size="lg"
                icon="mdi:code-tags"
              >
                View Documentation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon="mdi:github"
              >
                GitHub Repository
              </Button>
            </Button.Group>

            <Cluster gap="lg" justify="center">
              <Badge.Count count={42} />
              <span className="stats-label">Components ready to use</span>
            </Cluster>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}