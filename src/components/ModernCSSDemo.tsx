import { Card, Button, Section, Container, Stack } from './ui'

export function ModernCSSDemo() {
  return (
    <div className="modern-css-demo">
      <Section variant="hero" size="lg" className="scroll-reveal">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Section.Header centered className="scroll-reveal">
              <Section.Title size="2xl" gradient>
                Modern CSS Features Demo
              </Section.Title>
              <Section.Subtitle>
                See cutting-edge CSS features in action
              </Section.Subtitle>
            </Section.Header>
          </Stack>
        </Container>
      </Section>

      <Section variant="content" size="lg" className="scroll-reveal">
        <Container size="wide">
          <Stack gap="2xl" className="scroll-stagger">
            
            {/* Container Queries Demo */}
            <Card variant="feature" className="demo-container-queries scroll-slide-in-left hover-glow">
              <Card.Header>
                <Card.Title>Container Queries</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="responsive-grid">
                  <div className="grid-item">Resize this card to see container queries in action</div>
                  <div className="grid-item">Items will rearrange based on card width, not viewport</div>
                  <div className="grid-item">This is the future of responsive design</div>
                </div>
              </Card.Content>
            </Card>

            {/* CSS Nesting Demo */}
            <Card variant="tech" className="demo-nesting scroll-slide-in-right hover-tilt">
              <Card.Header>
                <Card.Title>CSS Nesting & Modern Colors</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="nested-styles-demo">
                  <div className="parent">
                    <div className="child">Nested CSS styles work!</div>
                    <div className="child child--special">With OKLCH colors</div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Animations Demo */}
            <Card variant="default" className="demo-animations scroll-scale-in hover-lift">
              <Card.Header>
                <Card.Title>Modern Animations</Card.Title>
              </Card.Header>
              <Card.Content>
                <Stack gap="md">
                  <div className="animate-float">🚀 Floating Animation (watch it move!)</div>
                  <div className="animate-shimmer">✨ Shimmer Loading</div>
                  <div className="animate-gradient">🌈 Gradient Animation</div>
                  <Button className="hover-lift morph-button">🎯 Interactive Button</Button>
                </Stack>
              </Card.Content>
            </Card>

            {/* Glassmorphism Demo */}
            <div className="glass-demo-container scroll-scale-in">
              <Card className="glass-card hover-glow">
                <Card.Header>
                  <Card.Title>🪟 Glassmorphism Effect</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p>This card uses backdrop-filter for a glass effect</p>
                </Card.Content>
              </Card>
            </div>

          </Stack>
        </Container>
      </Section>
    </div>
  )
}