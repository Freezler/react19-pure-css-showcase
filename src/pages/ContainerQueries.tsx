import { Icon } from '@iconify/react'
import { CodeBlock } from '../components/ui/CodeBlock'
import { useState } from 'react'

export function ContainerQueries() {
  const [containerWidth, setContainerWidth] = useState(400)
  const [selectedDemo, setSelectedDemo] = useState<'card' | 'gallery' | 'sidebar'>('card')

  const demos = {
    card: {
      title: 'Responsive Card Component',
      description: 'Card layout adapts based on its container size, not viewport',
      css: `.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-outline);
}

/* Small container: Stack vertically */
@container card (max-width: 300px) {
  .card {
    flex-direction: column;
    text-align: center;
  }
  
  .card__image {
    align-self: center;
    width: 80px;
    height: 80px;
  }
  
  .card__title {
    font-size: 1rem;
  }
}

/* Medium container: Horizontal layout */
@container card (min-width: 301px) and (max-width: 500px) {
  .card {
    flex-direction: row;
    align-items: center;
  }
  
  .card__image {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
  
  .card__title {
    font-size: 1.125rem;
  }
}

/* Large container: Full horizontal with more spacing */
@container card (min-width: 501px) {
  .card {
    flex-direction: row;
    align-items: flex-start;
    padding: 1.5rem;
  }
  
  .card__image {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  
  .card__title {
    font-size: 1.25rem;
  }
  
  .card__description {
    font-size: 1rem;
    line-height: 1.6;
  }
}`
    },
    gallery: {
      title: 'Adaptive Gallery Grid',
      description: 'Gallery adjusts columns based on container space',
      css: `.gallery-container {
  container-type: inline-size;
  container-name: gallery;
}

.gallery {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

/* Small container: Single column */
@container gallery (max-width: 400px) {
  .gallery {
    grid-template-columns: 1fr;
  }
  
  .gallery-item {
    aspect-ratio: 16/9;
  }
}

/* Medium container: Two columns */
@container gallery (min-width: 401px) and (max-width: 700px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery-item {
    aspect-ratio: 4/3;
  }
}

/* Large container: Three or more columns */
@container gallery (min-width: 701px) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .gallery-item {
    aspect-ratio: 1;
  }
  
  .gallery-item:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }
}`
    },
    sidebar: {
      title: 'Intelligent Sidebar',
      description: 'Sidebar content adapts based on available width',
      css: `.sidebar-container {
  container-type: inline-size;
  container-name: sidebar;
}

.sidebar {
  background: var(--color-surface-variant);
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Narrow sidebar: Icons only */
@container sidebar (max-width: 80px) {
  .nav-item__text {
    display: none;
  }
  
  .nav-item {
    justify-content: center;
    padding: 0.75rem 0.5rem;
  }
  
  .nav-item__icon {
    font-size: 1.25rem;
  }
}

/* Medium sidebar: Icons + text */
@container sidebar (min-width: 81px) and (max-width: 200px) {
  .nav-item {
    flex-direction: column;
    align-items: center;
    padding: 1rem 0.5rem;
    gap: 0.25rem;
  }
  
  .nav-item__text {
    font-size: 0.75rem;
    text-align: center;
  }
}

/* Wide sidebar: Full horizontal layout */
@container sidebar (min-width: 201px) {
  .nav-item {
    flex-direction: row;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1rem;
  }
  
  .nav-item__text {
    font-size: 0.875rem;
  }
  
  .nav-section {
    margin-bottom: 1.5rem;
  }
  
  .nav-section__title {
    display: block;
    padding: 0.5rem 1.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.7;
  }
}`
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header__content">
          <div className="page-header__icon">
            <Icon icon="mdi:crop-free" />
          </div>
          <div className="page-header__text">
            <h1 className="page-header__title">CSS Container Queries</h1>
            <p className="page-header__subtitle">
              Element-based responsive design that adapts to container size, not viewport size
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Container Queries Explanation */}
        <section className="content-section">
          <h2 className="section-title">Why Container Queries?</h2>
          <div className="explanation-grid">
            <div className="explanation-card">
              <div className="explanation-card__header">
                <Icon icon="mdi:responsive" />
                <h3>True Component Responsiveness</h3>
              </div>
              <p>
                Components adapt based on their container's size, not the viewport. 
                This enables truly reusable components that work in any context.
              </p>
            </div>
            <div className="explanation-card">
              <div className="explanation-card__header">
                <Icon icon="mdi:puzzle" />
                <h3>Modular Design</h3>
              </div>
              <p>
                Design components in isolation without worrying about where they'll be used. 
                Perfect for design systems and component libraries.
              </p>
            </div>
            <div className="explanation-card">
              <div className="explanation-card__header">
                <Icon icon="mdi:layout-grid" />
                <h3>Complex Layouts</h3>
              </div>
              <p>
                Handle scenarios where components appear in sidebars, grids, or 
                variable-width containers that media queries can't address.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demo Controls */}
        <section className="content-section">
          <h2 className="section-title">Interactive Container Query Demo</h2>
          <div className="demo-controls">
            <div className="demo-control-group">
              <label htmlFor="container-width" className="demo-label">
                Container Width: {containerWidth}px
              </label>
              <input
                id="container-width"
                type="range"
                min="200"
                max="800"
                value={containerWidth}
                onChange={(e) => setContainerWidth(Number(e.target.value))}
                className="demo-slider"
              />
            </div>
            <div className="demo-tabs">
              <button
                className={`demo-tab ${selectedDemo === 'card' ? 'demo-tab--active' : ''}`}
                onClick={() => setSelectedDemo('card')}
              >
                <Icon icon="mdi:card" />
                Card Demo
              </button>
              <button
                className={`demo-tab ${selectedDemo === 'gallery' ? 'demo-tab--active' : ''}`}
                onClick={() => setSelectedDemo('gallery')}
              >
                <Icon icon="mdi:grid" />
                Gallery Demo
              </button>
              <button
                className={`demo-tab ${selectedDemo === 'sidebar' ? 'demo-tab--active' : ''}`}
                onClick={() => setSelectedDemo('sidebar')}
              >
                <Icon icon="mdi:menu" />
                Sidebar Demo
              </button>
            </div>
          </div>

          {/* Live Demo */}
          <div className="container-demo">
            <div 
              className="demo-container"
              style={{ width: `${containerWidth}px` }}
            >
              {selectedDemo === 'card' && (
                <div className="card-container cq-demo">
                  <div className="card">
                    <div className="card__image">
                      <Icon icon="mdi:account-circle" />
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">John Doe</h3>
                      <p className="card__description">
                        Frontend Developer with expertise in React, TypeScript, and modern CSS.
                        Passionate about accessibility and performance optimization.
                      </p>
                      <div className="card__meta">
                        <span className="card__role">Senior Developer</span>
                        <span className="card__location">San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedDemo === 'gallery' && (
                <div className="gallery-container cq-demo">
                  <div className="gallery">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="gallery-item">
                        <div className="gallery-item__content">
                          <Icon icon="mdi:image" />
                          <span>Image {i + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedDemo === 'sidebar' && (
                <div className="sidebar-container cq-demo">
                  <nav className="sidebar">
                    <div className="nav-section">
                      <div className="nav-section__title">Navigation</div>
                      <div className="nav-item">
                        <Icon icon="mdi:home" className="nav-item__icon" />
                        <span className="nav-item__text">Home</span>
                      </div>
                      <div className="nav-item">
                        <Icon icon="mdi:chart-line" className="nav-item__icon" />
                        <span className="nav-item__text">Analytics</span>
                      </div>
                      <div className="nav-item">
                        <Icon icon="mdi:cog" className="nav-item__icon" />
                        <span className="nav-item__text">Settings</span>
                      </div>
                    </div>
                    <div className="nav-section">
                      <div className="nav-section__title">Account</div>
                      <div className="nav-item">
                        <Icon icon="mdi:account" className="nav-item__icon" />
                        <span className="nav-item__text">Profile</span>
                      </div>
                      <div className="nav-item">
                        <Icon icon="mdi:logout" className="nav-item__icon" />
                        <span className="nav-item__text">Logout</span>
                      </div>
                    </div>
                  </nav>
                </div>
              )}
            </div>
            <div className="demo-info">
              <p className="demo-info__text">
                {containerWidth <= 300 && selectedDemo === 'card' && "📱 Stacked layout for narrow containers"}
                {containerWidth > 300 && containerWidth <= 500 && selectedDemo === 'card' && "💻 Horizontal layout for medium containers"}
                {containerWidth > 500 && selectedDemo === 'card' && "🖥️ Full layout with enhanced spacing"}
                
                {containerWidth <= 400 && selectedDemo === 'gallery' && "📱 Single column for narrow containers"}
                {containerWidth > 400 && containerWidth <= 700 && selectedDemo === 'gallery' && "💻 Two columns for medium containers"}
                {containerWidth > 700 && selectedDemo === 'gallery' && "🖥️ Multi-column grid with featured item"}
                
                {containerWidth <= 80 && selectedDemo === 'sidebar' && "📱 Icons-only compact mode"}
                {containerWidth > 80 && containerWidth <= 200 && selectedDemo === 'sidebar' && "💻 Vertical icons with labels"}
                {containerWidth > 200 && selectedDemo === 'sidebar' && "🖥️ Full horizontal navigation"}
              </p>
            </div>
          </div>
        </section>

        {/* CSS Code Examples */}
        <section className="content-section">
          <h2 className="section-title">CSS Implementation</h2>
          <div className="code-demo">
            <h3 className="code-demo__title">{demos[selectedDemo].title}</h3>
            <p className="code-demo__description">{demos[selectedDemo].description}</p>
            <CodeBlock
              code={demos[selectedDemo].css}
              language="css"
              showLineNumbers
            />
          </div>
        </section>

        {/* Container Query Syntax */}
        <section className="content-section">
          <h2 className="section-title">Container Query Syntax</h2>
          <div className="syntax-grid">
            <div className="syntax-card">
              <h3 className="syntax-card__title">
                <Icon icon="mdi:cube" />
                Container Setup
              </h3>
              <CodeBlock
                code={`/* Define a container */
.container {
  container-type: inline-size; /* or block-size, size */
  container-name: sidebar;     /* Optional name */
}

/* Shorthand */
.container {
  container: sidebar / inline-size;
}`}
                language="css"
              />
            </div>

            <div className="syntax-card">
              <h3 className="syntax-card__title">
                <Icon icon="mdi:ruler" />
                Query Conditions
              </h3>
              <CodeBlock
                code={`/* Width-based queries */
@container (min-width: 300px) { }
@container (max-width: 500px) { }
@container (width >= 300px) { }

/* Height-based queries */
@container (min-height: 200px) { }

/* Named container queries */
@container sidebar (min-width: 200px) { }

/* Complex queries */
@container (min-width: 300px) and (max-width: 600px) { }`}
                language="css"
              />
            </div>

            <div className="syntax-card">
              <h3 className="syntax-card__title">
                <Icon icon="mdi:format-list-bulleted" />
                Container Types
              </h3>
              <CodeBlock
                code={`/* inline-size: responds to width changes */
container-type: inline-size;

/* block-size: responds to height changes */
container-type: block-size;

/* size: responds to both width and height */
container-type: size;

/* normal: no container queries (default) */
container-type: normal;`}
                language="css"
              />
            </div>

            <div className="syntax-card">
              <h3 className="syntax-card__title">
                <Icon icon="mdi:react" />
                React Integration
              </h3>
              <CodeBlock
                code={`function ResponsiveCard({ children, className }) {
  return (
    <div 
      className={\`card-container \${className}\`}
      style={{ containerType: 'inline-size' }}
    >
      <div className="card">
        {children}
      </div>
    </div>
  )
}

// Usage in any layout context
function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <ResponsiveCard>Content adapts to sidebar width</ResponsiveCard>
      </aside>
      <main className="content">
        <ResponsiveCard>Same component, different container</ResponsiveCard>
      </main>
    </div>
  )
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Browser Support */}
        <section className="content-section">
          <h2 className="section-title">Browser Support & Fallbacks</h2>
          <div className="support-info">
            <div className="support-status">
              <h3>Current Support</h3>
              <div className="browser-support">
                <div className="browser-item browser-item--supported">
                  <Icon icon="logos:chrome" />
                  <span>Chrome 105+</span>
                </div>
                <div className="browser-item browser-item--supported">
                  <Icon icon="logos:firefox" />
                  <span>Firefox 110+</span>
                </div>
                <div className="browser-item browser-item--supported">
                  <Icon icon="logos:safari" />
                  <span>Safari 16+</span>
                </div>
                <div className="browser-item browser-item--supported">
                  <Icon icon="logos:edge" />
                  <span>Edge 105+</span>
                </div>
              </div>
            </div>
            <div className="fallback-strategy">
              <h3>Progressive Enhancement</h3>
              <CodeBlock
                code={`/* Fallback with media queries */
.card {
  flex-direction: column;
}

/* Media query fallback */
@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}

/* Container query enhancement */
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }
  
  @container (min-width: 400px) {
    .card {
      flex-direction: row;
    }
  }
}`}
                language="css"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}