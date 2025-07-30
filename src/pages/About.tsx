import { Icon } from '@iconify/react'

export function About() {
  return (
    <div className="page-container scroll-reveal">
      {/* Enhanced header section matching homepage hero structure */}
      <section className="hero about-hero">
        {/* Background gradient with floating elements - same as homepage */}
        <div className="hero__background">
          <div className="hero__floating-elements">
            <div className="hero__shape hero__shape--1"></div>
            <div className="hero__shape hero__shape--2"></div>
            <div className="hero__shape hero__shape--3"></div>
            <div className="hero__shape hero__shape--4"></div>
            <div className="hero__shape hero__shape--5"></div>
          </div>
        </div>

        {/* Main hero content - matching homepage structure */}
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__badge">
              <Icon icon="mdi:information" className="hero__badge-icon" aria-hidden="true" />
              <span>About This Project</span>
            </div>

            <h1 className="hero__title">
              Built with <span className="hero__title-accent">Modern Standards</span>
            </h1>

            <p className="hero__description">
              Discover how this React 19 application demonstrates cutting-edge development practices, accessibility excellence, and performance optimization for the modern web.
            </p>

            <div className="hero__actions">
              <button className="button button--primary hero__cta" aria-label="Explore the tech stack">
                <Icon icon="mdi:code-braces" aria-hidden="true" />
                <span>Explore Stack</span>
              </button>
              <button className="button button--ghost hero__demo" aria-label="View source code">
                <Icon icon="mdi:github" aria-hidden="true" />
                <span>View Code</span>
              </button>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-number">React 19</div>
                <div className="hero__stat-label">Latest Version</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">100%</div>
                <div className="hero__stat-label">Type Safe</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">WCAG 2.2</div>
                <div className="hero__stat-label">Compliant</div>
              </div>
            </div>
          </div>

          {/* Visual element - tech showcase instead of code preview */}
          <div className="hero__visual">
            <div className="about-hero__tech-showcase">
              <div className="about-hero__tech-header">
                <div className="about-hero__tech-title">Tech Stack</div>
              </div>
              <div className="about-hero__tech-content">
                <div className="about-hero__tech-item">
                  <Icon icon="mdi:react" className="about-hero__tech-icon" aria-hidden="true" />
                  <span className="about-hero__tech-name">React 19</span>
                </div>
                <div className="about-hero__tech-item">
                  <Icon icon="mdi:language-typescript" className="about-hero__tech-icon" aria-hidden="true" />
                  <span className="about-hero__tech-name">TypeScript</span>
                </div>
                <div className="about-hero__tech-item">
                  <Icon icon="mdi:router" className="about-hero__tech-icon" aria-hidden="true" />
                  <span className="about-hero__tech-name">TanStack Router</span>
                </div>
                <div className="about-hero__tech-item">
                  <Icon icon="mdi:palette" className="about-hero__tech-icon" aria-hidden="true" />
                  <span className="about-hero__tech-name">Modern CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced main content with modern styling */}
      <section className="about-content">
        <div className="about-content__container">
          <section className="tech-stack-section">
            <header className="tech-stack-section__header">
              <h2 className="tech-stack-section__title">
                Our <span className="tech-stack-section__title-accent">Tech Stack</span>
              </h2>
              <p className="tech-stack-section__subtitle">
                Built with the most advanced tools and frameworks for modern web development.
              </p>
            </header>
            
            <div className="tech-stack-grid">
              <article className="tech-item" data-tech="react">
                <div className="tech-item__icon-wrapper">
                  <Icon icon="mdi:react" className="tech-item__icon" aria-hidden="true" />
                  <div className="tech-item__icon-bg"></div>
                </div>
                <div className="tech-item__content">
                  <h3 className="tech-item__title">React 19</h3>
                  <p className="tech-item__description">
                    Latest React features including Actions, useOptimistic, and enhanced concurrent rendering capabilities.
                  </p>
                  <div className="tech-item__tags">
                    <span className="tech-item__tag">Actions</span>
                    <span className="tech-item__tag">Concurrent</span>
                  </div>
                </div>
              </article>
              
              <article className="tech-item" data-tech="typescript">
                <div className="tech-item__icon-wrapper">
                  <Icon icon="mdi:language-typescript" className="tech-item__icon" aria-hidden="true" />
                  <div className="tech-item__icon-bg"></div>
                </div>
                <div className="tech-item__content">
                  <h3 className="tech-item__title">TypeScript</h3>
                  <p className="tech-item__description">
                    Full type safety across the entire application with advanced TypeScript patterns and strict mode.
                  </p>
                  <div className="tech-item__tags">
                    <span className="tech-item__tag">Type Safe</span>
                    <span className="tech-item__tag">Strict Mode</span>
                  </div>
                </div>
              </article>
              
              <article className="tech-item" data-tech="router">
                <div className="tech-item__icon-wrapper">
                  <Icon icon="mdi:router" className="tech-item__icon" aria-hidden="true" />
                  <div className="tech-item__icon-bg"></div>
                </div>
                <div className="tech-item__content">
                  <h3 className="tech-item__title">TanStack Router</h3>
                  <p className="tech-item__description">
                    Type-safe routing with built-in data loading, prefetching, and seamless navigation experiences.
                  </p>
                  <div className="tech-item__tags">
                    <span className="tech-item__tag">Type Safe</span>
                    <span className="tech-item__tag">Prefetch</span>
                  </div>
                </div>
              </article>
              
              <article className="tech-item" data-tech="css">
                <div className="tech-item__icon-wrapper">
                  <Icon icon="mdi:language-css3" className="tech-item__icon" aria-hidden="true" />
                  <div className="tech-item__icon-bg"></div>
                </div>
                <div className="tech-item__content">
                  <h3 className="tech-item__title">Modern CSS</h3>
                  <p className="tech-item__description">
                    CSS layers, custom properties, OKLCH colors, and container queries for responsive design systems.
                  </p>
                  <div className="tech-item__tags">
                    <span className="tech-item__tag">CSS Layers</span>
                    <span className="tech-item__tag">OKLCH</span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="features-showcase">
            <header className="features-showcase__header">
              <h2 className="features-showcase__title">
                Key <span className="features-showcase__title-accent">Features</span>
              </h2>
              <p className="features-showcase__subtitle">
                Everything you need for modern, accessible, and performant web applications.
              </p>
            </header>
            
            <div className="features-list">
              <div className="feature-highlight" data-feature="responsive">
                <div className="feature-highlight__icon">
                  <Icon icon="mdi:responsive" className="feature-highlight__icon-element" aria-hidden="true" />
                </div>
                <div className="feature-highlight__content">
                  <h3 className="feature-highlight__title">Responsive Design</h3>
                  <p className="feature-highlight__description">Mobile-first approach with fluid layouts and adaptive components</p>
                </div>
              </div>
              
              <div className="feature-highlight" data-feature="dark-mode">
                <div className="feature-highlight__icon">
                  <Icon icon="mdi:weather-night" className="feature-highlight__icon-element" aria-hidden="true" />
                </div>
                <div className="feature-highlight__content">
                  <h3 className="feature-highlight__title">Dark Mode Support</h3>
                  <p className="feature-highlight__description">Automatic theme detection with smooth transitions</p>
                </div>
              </div>
              
              <div className="feature-highlight" data-feature="accessibility">
                <div className="feature-highlight__icon">
                  <Icon icon="mdi:accessibility" className="feature-highlight__icon-element" aria-hidden="true" />
                </div>
                <div className="feature-highlight__content">
                  <h3 className="feature-highlight__title">WCAG 2.2 Compliant</h3>
                  <p className="feature-highlight__description">Full accessibility with keyboard navigation and screen reader support</p>
                </div>
              </div>
              
              <div className="feature-highlight" data-feature="performance">
                <div className="feature-highlight__icon">
                  <Icon icon="mdi:rocket" className="feature-highlight__icon-element" aria-hidden="true" />
                </div>
                <div className="feature-highlight__content">
                  <h3 className="feature-highlight__title">Performance Optimized</h3>
                  <p className="feature-highlight__description">Code splitting, lazy loading, and modern bundling techniques</p>
                </div>
              </div>
              
              <div className="feature-highlight" data-feature="type-safety">
                <div className="feature-highlight__icon">
                  <Icon icon="mdi:shield-check" className="feature-highlight__icon-element" aria-hidden="true" />
                </div>
                <div className="feature-highlight__content">
                  <h3 className="feature-highlight__title">Type-Safe Navigation</h3>
                  <p className="feature-highlight__description">End-to-end type safety with TanStack Router</p>
                </div>
              </div>
              
              <div className="feature-highlight" data-feature="modern-css">
                <div className="feature-highlight__icon">
                  <Icon icon="mdi:palette" className="feature-highlight__icon-element" aria-hidden="true" />
                </div>
                <div className="feature-highlight__content">
                  <h3 className="feature-highlight__title">Modern CSS Architecture</h3>
                  <p className="feature-highlight__description">CSS cascade layers, custom properties, and component-scoped variables</p>
                </div>
              </div>
            </div>
          </section>

          <section className="getting-started-section">
            <div className="getting-started-section__content">
              <div className="getting-started-section__text">
                <h2 className="getting-started-section__title">
                  Ready to <span className="getting-started-section__title-accent">Get Started</span>?
                </h2>
                <p className="getting-started-section__description">
                  This project demonstrates modern React development practices with a focus on clean architecture, performance, and developer experience.
                </p>
                
                <div className="development-principles">
                  <h3 className="development-principles__title">Core Principles</h3>
                  <ul className="development-principles__list">
                    <li className="development-principles__item">
                      <Icon icon="mdi:architecture" className="development-principles__icon" aria-hidden="true" />
                      <span>Clean architecture and component design</span>
                    </li>
                    <li className="development-principles__item">
                      <Icon icon="mdi:speedometer" className="development-principles__icon" aria-hidden="true" />
                      <span>Performance optimization techniques</span>
                    </li>
                    <li className="development-principles__item">
                      <Icon icon="mdi:universal-access" className="development-principles__icon" aria-hidden="true" />
                      <span>Accessibility best practices</span>
                    </li>
                    <li className="development-principles__item">
                      <Icon icon="mdi:responsive" className="development-principles__icon" aria-hidden="true" />
                      <span>Responsive and adaptive layouts</span>
                    </li>
                    <li className="development-principles__item">
                      <Icon icon="mdi:code-tags" className="development-principles__icon" aria-hidden="true" />
                      <span>Modern CSS features and methodologies</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="getting-started-section__actions">
                <button className="button button--primary" aria-label="Start exploring the codebase">
                  <Icon icon="mdi:code-braces" aria-hidden="true" />
                  <span>Explore Code</span>
                </button>
                <button className="button button--ghost" aria-label="View documentation">
                  <Icon icon="mdi:book-open" aria-hidden="true" />
                  <span>Read Docs</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
