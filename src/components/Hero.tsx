import { Icon } from '@iconify/react'

export function Hero() {
  return (
    <section className="hero hero-epic-entrance">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress"></div>
      
      {/* Background gradient with floating elements */}
      <div className="hero__background">
        <div className="hero__floating-elements">
          <div className="hero__shape hero__shape--1 parallax-float"></div>
          <div className="hero__shape hero__shape--2 parallax-float--slow"></div>
          <div className="hero__shape hero__shape--3 parallax-float--reverse"></div>
          <div className="hero__shape hero__shape--4 parallax-float"></div>
          <div className="hero__shape hero__shape--5 parallax-float--slow"></div>
        </div>
      </div>

      {/* Main hero content */}
      <div className="hero__content">
        <div className="hero__text">
          <div className="hero__badge">
            <Icon icon="mdi:sparkles" className="hero__badge-icon" aria-hidden="true" />
            <span>New in React 19</span>
          </div>

          <h1 className="hero__title">
            Build the Future with <span className="hero__title-accent">Modern React</span>
          </h1>

          <p className="hero__description">
            Experience next-generation web development with React 19, TypeScript, and cutting-edge tools. 
            Create fast, accessible, and beautiful applications that users love.
          </p>

          <div className="hero__actions">
            <button className="button button--primary hero__cta" aria-label="Get started with React 19 development">
              <Icon icon="mdi:rocket-launch" aria-hidden="true" />
              <span>Get Started</span>
            </button>
            <button className="button button--ghost hero__demo" aria-label="Watch React 19 demo video">
              <Icon icon="mdi:play-circle" aria-hidden="true" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="hero__stats stats-counter">
            <div className="hero__stat">
              <div className="hero__stat-number">99%</div>
              <div className="hero__stat-label">Performance</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">100%</div>
              <div className="hero__stat-label">Type Safe</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">A+</div>
              <div className="hero__stat-label">Accessibility</div>
            </div>
          </div>
        </div>

        {/* Visual element - could be an illustration or code preview */}
        <div className="hero__visual">
          <div className="hero__code-preview code-scroll-reveal">
            <div className="hero__code-header">
              <span className="hero__code-title">App.tsx</span>
              <div className="hero__code-dots">
                <div className="hero__code-dot hero__code-dot--red"></div>
                <div className="hero__code-dot hero__code-dot--yellow"></div>
                <div className="hero__code-dot hero__code-dot--green"></div>
              </div>
            </div>
            <div className="hero__code-content">
              <div className="hero__code-line">
                <span className="hero__code-keyword">import</span>{' '}
                <span className="hero__code-text">&#123; Button &#125;</span>{' '}
                <span className="hero__code-keyword">from</span>{' '}
                <span className="hero__code-string">'./ui'</span>
              </div>
              <div className="hero__code-line"></div>
              <div className="hero__code-line">
                <span className="hero__code-keyword">export</span>{' '}
                <span className="hero__code-keyword">function</span>{' '}
                <span className="hero__code-function">App</span>
                <span className="hero__code-text">() &#123;</span>
              </div>
              <div className="hero__code-line hero__code-line--indent">
                <span className="hero__code-keyword">return</span>{' '}
                <span className="hero__code-tag">&lt;Button&gt;</span>
                <span className="hero__code-text">Hello!</span>
                <span className="hero__code-tag">&lt;/Button&gt;</span>
              </div>
              <div className="hero__code-line">
                <span className="hero__code-text">&#125;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}