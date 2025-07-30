import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react'
import { CodeBlock } from '../components/ui';
import { 
  Card, 
  Button, 
  Section, 
  Badge, 
  Container,
  Stack,
  Grid,
  Cluster
} from '../components/ui'

const colorTokens = [
  { name: '--color-primary', value: 'oklch(70% 0.15 250)', category: 'primary' },
  { name: '--color-secondary', value: 'oklch(65% 0.12 180)', category: 'secondary' },
  { name: '--color-success', value: 'oklch(70% 0.15 120)', category: 'semantic' },
  { name: '--color-warning', value: 'oklch(75% 0.15 60)', category: 'semantic' },
  { name: '--color-error', value: 'oklch(65% 0.15 25)', category: 'semantic' },
  { name: '--color-surface', value: 'oklch(98% 0.01 250)', category: 'surface' },
  { name: '--color-surface-variant', value: 'oklch(95% 0.02 250)', category: 'surface' },
];

const spacingTokens = [
  { name: '--space-xs', value: '0.75rem', px: '12px' },
  { name: '--space-sm', value: '1rem', px: '16px' },
  { name: '--space-md', value: '1.5rem', px: '24px' },
  { name: '--space-lg', value: '2rem', px: '32px' },
  { name: '--space-xl', value: '3rem', px: '48px' },
  { name: '--space-2xl', value: '4rem', px: '64px' },
  { name: '--space-3xl', value: '6rem', px: '96px' },
  { name: '--space-4xl', value: '8rem', px: '128px' },
];

const typographyTokens = [
  { name: '--text-sm', value: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)', example: 'Small text' },
  { name: '--text-base', value: 'clamp(1rem, 0.96rem + 0.22vw, 1.125rem)', example: 'Base text' },
  { name: '--text-lg', value: 'clamp(1.125rem, 1.08rem + 0.25vw, 1.25rem)', example: 'Large text' },
  { name: '--text-xl', value: 'clamp(1.25rem, 1.2rem + 0.3vw, 1.5rem)', example: 'Extra large' },
  { name: '--text-2xl', value: 'clamp(1.5rem, 1.4rem + 0.5vw, 2rem)', example: 'Heading' },
  { name: '--text-3xl', value: 'clamp(2rem, 1.8rem + 1vw, 3rem)', example: 'Big heading' },
];

export function DesignSystem() {
  const [selectedColor, setSelectedColor] = useState(colorTokens[0]);
  const [customHue, setCustomHue] = useState(250);
  const [customSaturation, setCustomSaturation] = useState(15);
  const [customLightness, setCustomLightness] = useState(70);

  // Update CSS custom property when color changes
  useEffect(() => {
    const customColor = `oklch(${customLightness}% ${customSaturation}% ${customHue})`;
    document.documentElement.style.setProperty('--color-custom', customColor);
  }, [customHue, customSaturation, customLightness]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-transition-container">
      {/* Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Icon icon="mdi:palette" className="text-6xl" />
            <Section.Header centered>
              <Section.Title size="3xl" gradient>
                Design System
              </Section.Title>
              <Section.Subtitle>
                Explore our modern CSS architecture with layers, custom properties, 
                container queries, and responsive design tokens
              </Section.Subtitle>
            </Section.Header>
          </Stack>
        </Container>
      </Section>

      {/* Color System */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="primary" icon="mdi:color-helper">
              Color System
            </Badge>
            <Section.Title size="xl">OKLCH Color System</Section.Title>
            <Section.Subtitle>
              Modern color space with better transparency and mixing
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns={2} gap="2xl">
              <Stack gap="lg">
                <h3 className="section-heading">Color Tokens</h3>
                <Grid columns={1} gap="sm">
                  {colorTokens.map((token) => (
                    <Card 
                      key={token.name}
                      variant={selectedColor.name === token.name ? 'feature' : 'default'}
                      size="sm"
                      interactive
                      onClick={() => setSelectedColor(token)}
                    >
                      <Card.Content>
                        <Cluster gap="md" justify="between" align="center">
                          <Cluster gap="sm" align="center">
                            <div 
                              className="color-swatch--small"
                              style={{ background: `var(${token.name})` }}
                            />
                            <Stack gap="xs">
                              <span className="token-name">{token.name}</span>
                              <span className="token-value">{token.value}</span>
                            </Stack>
                          </Cluster>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            icon="mdi:content-copy"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(token.name);
                            }}
                          >
                            Copy
                          </Button>
                        </Cluster>
                      </Card.Content>
                    </Card>
                  ))}
                </Grid>
              </Stack>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>OKLCH Color Playground</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="lg">
                    <Stack gap="md">
                      <div className="space-y-4">
                        <label className="field-label">Hue: {customHue}°</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="360" 
                          value={customHue}
                          onChange={(e) => setCustomHue(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="field-label">Saturation: {customSaturation}%</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="50" 
                          value={customSaturation}
                          onChange={(e) => setCustomSaturation(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="field-label">Lightness: {customLightness}%</label>
                        <input 
                          type="range" 
                          min="10" 
                          max="90" 
                          value={customLightness}
                          onChange={(e) => setCustomLightness(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </Stack>
                    
                    <Cluster gap="md" align="center">
                      <div 
                        className="color-swatch--large"
                        style={{ background: 'var(--color-custom)' }}
                      />
                      <div className="color-code-display">
                        oklch({customLightness}% {customSaturation}% {customHue})
                      </div>
                    </Cluster>
                  </Stack>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      <main>
        {/* Spacing System */}
        <section className="design-section">
          <div className="section-header">
            <Icon icon="mdi:ruler" className="section-icon" />
            <div>
              <h2>Spacing Scale</h2>
              <p>Consistent spacing using design tokens</p>
            </div>
          </div>

          <div className="spacing-showcase">
            {spacingTokens.map((token) => (
              <div key={token.name} className="spacing-token">
                <div className="spacing-info">
                  <span className="spacing-name">{token.name}</span>
                  <span className="spacing-value">{token.value} ({token.px})</span>
                </div>
                <div 
                  className="spacing-visual"
                  style={{ width: `var(${token.name})`, height: '1rem' }}
                />
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(token.name)}
                >
                  <Icon icon="mdi:content-copy" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Typography System */}
        <section className="design-section">
          <div className="section-header">
            <Icon icon="mdi:format-text" className="section-icon" />
            <div>
              <h2>Fluid Typography</h2>
              <p>Responsive type scale using clamp() functions</p>
            </div>
          </div>

          <div className="typography-showcase">
            {typographyTokens.map((token) => (
              <div key={token.name} className="typography-token">
                <div className="typography-info">
                  <span className="typography-name">{token.name}</span>
                  <span className="typography-value">{token.value}</span>
                </div>
                <div 
                  className="typography-example"
                  style={{ fontSize: `var(${token.name})` }}
                >
                  {token.example}
                </div>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(token.name)}
                >
                  <Icon icon="mdi:content-copy" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Component Examples */}
        <section className="design-section">
          <div className="section-header">
            <Icon icon="mdi:view-dashboard" className="section-icon" />
            <div>
              <h2>Component Patterns</h2>
              <p>Reusable components using our design system</p>
            </div>
          </div>

          <div className="component-showcase">
            <div className="component-example">
              <h3>Cards</h3>
              <div className="example-cards">
                <div className="example-card">
                  <h4>Basic Card</h4>
                  <p>Using surface colors and consistent spacing</p>
                  <button className="example-button">Action</button>
                </div>
                <div className="example-card example-card--featured">
                  <h4>Featured Card</h4>
                  <p>With primary color accent</p>
                  <button className="example-button example-button--primary">Primary</button>
                </div>
              </div>
            </div>

            <div className="component-example">
              <h3>Form Elements</h3>
              <div className="example-form">
                <div className="form-group">
                  <label>Input Field</label>
                  <input type="text" placeholder="Enter text..." />
                </div>
                <div className="form-group">
                  <label>Select</label>
                  <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Textarea</label>
                  <textarea placeholder="Enter description..."></textarea>
                </div>
              </div>
            </div>

            <Card variant="default" size="lg">
              <Card.Header icon="mdi:view-dashboard">
                <Card.Title>Layout Primitives</Card.Title>
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
                      <Cluster gap="md" justify="center">
                        <span className="demo-element demo-element--secondary">Tag 1</span>
                        <span className="demo-element demo-element--secondary">Tag 2</span>
                        <span className="demo-element demo-element--secondary">Tag 3</span>
                      </Cluster>
                    </div>
                  </div>

                  <div>
                    <h4 className="content-subheading">Auto Grid</h4>
                    <div className="demo-container">
                      <Grid columns="auto-fit" minWidth="60px" gap="sm">
                        <div className="demo-element demo-element--primary">1</div>
                        <div className="demo-element demo-element--primary">2</div>
                        <div className="demo-element demo-element--primary">3</div>
                        <div className="demo-element demo-element--primary">4</div>
                      </Grid>
                    </div>
                  </div>
                </Stack>
              </Card.Content>
            </Card>
          </div>
        </section>

        {/* CSS Architecture */}
        <section className="design-section">
          <div className="section-header">
            <Icon icon="mdi:layers" className="section-icon" />
            <div>
              <h2>CSS Architecture</h2>
              <p>Layer-based organization for maintainable styles</p>
            </div>
          </div>

          <div className="architecture-showcase">
            <div className="architecture-diagram">
              <div className="layer" data-layer="states">
                <span className="layer-name">States</span>
                <span className="layer-description">Hover, focus, active states</span>
              </div>
              <div className="layer" data-layer="utilities">
                <span className="layer-name">Utilities</span>
                <span className="layer-description">Single-purpose classes</span>
              </div>
              <div className="layer" data-layer="components">
                <span className="layer-name">Components</span>
                <span className="layer-description">UI component styles</span>
              </div>
              <div className="layer" data-layer="layout">
                <span className="layer-name">Layout</span>
                <span className="layer-description">Page and section layouts</span>
              </div>
              <div className="layer" data-layer="theme">
                <span className="layer-name">Theme</span>
                <span className="layer-description">Design tokens and variables</span>
              </div>
              <div className="layer" data-layer="reset">
                <span className="layer-name">Reset</span>
                <span className="layer-description">Browser normalization</span>
              </div>
            </div>

            <div className="architecture-code">
              <CodeBlock language="css">
{`/* CSS Layer Architecture - Our Current Approach */
@layer reset, properties, theme, layout, components, utilities, states;

@layer properties {
  :root {
    /* Design tokens using OKLCH color space */
    --color-primary: oklch(70% 0.15 250);
    --space-md: 1.5rem;
    --text-base: clamp(1rem, 0.96rem + 0.22vw, 1.125rem);
  }
}

@layer components {
  /* Semantic component classes - NO utilities! */
  .button {
    --btn-bg: var(--color-primary);
    padding: var(--space-sm) var(--space-md);
    background: var(--btn-bg);
  }
  
  .text-accent {
    color: var(--color-primary);
  }
  
  .demo-container {
    padding: var(--space-md);
    border: 1px solid var(--color-outline-variant);
    border-radius: var(--radius-md);
  }
}`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Container Queries Demo */}
        <section className="design-section">
          <div className="section-header">
            <Icon icon="mdi:responsive" className="section-icon" />
            <div>
              <h2>Container Queries</h2>
              <p>Component-level responsiveness based on container size</p>
            </div>
          </div>

          <div className="container-queries-demo">
            <div className="container-example">
              <h3>Resize the containers below:</h3>
              <div className="resizable-containers">
                <div className="resizable-container" style={{ width: '300px' }}>
                  <div className="responsive-card">
                    <h4>Narrow Container</h4>
                    <p>This card adapts to its container width, not the viewport.</p>
                  </div>
                </div>

                <div className="resizable-container" style={{ width: '600px' }}>
                  <div className="responsive-card">
                    <h4>Wide Container</h4>
                    <p>Notice how the layout changes based on the container size, not the browser window.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-code">
              <CodeBlock language="css">
{`.responsive-card {
  container: card / inline-size;
  padding: var(--space-md);
}

@container card (min-width: 400px) {
  .responsive-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-lg);
  }
}`}
              </CodeBlock>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}