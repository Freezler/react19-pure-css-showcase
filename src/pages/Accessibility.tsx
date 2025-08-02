import { Icon } from '@iconify/react'
import { CodeBlock } from '../components/ui/CodeBlock'
import { useState, useRef } from 'react'

export function Accessibility() {
  const [screenReaderDemo, setScreenReaderDemo] = useState('')
  const [focusDemo, setFocusDemo] = useState(false)
  const skipLinkRef = useRef<HTMLAnchorElement>(null)
  const mainContentRef = useRef<HTMLElement>(null)

  const handleSkipToContent = (e: React.MouseEvent) => {
    e.preventDefault()
    mainContentRef.current?.focus()
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScreenReaderTest = () => {
    setScreenReaderDemo('Button activated! This message is announced to screen readers.')
    setTimeout(() => setScreenReaderDemo(''), 3000)
  }

  const handleFocusDemo = () => {
    setFocusDemo(!focusDemo)
  }

  return (
    <div className="page-container">
      {/* Skip to content link */}
      <a 
        ref={skipLinkRef}
        href="#main-content" 
        className="skip-link"
        onClick={handleSkipToContent}
      >
        Skip to main content
      </a>

      <div className="page-header">
        <div className="page-header__content">
          <div className="page-header__icon">
            <Icon icon="mdi:account-multiple" />
          </div>
          <div className="page-header__text">
            <h1 className="page-header__title">Web Accessibility</h1>
            <p className="page-header__subtitle">
              Building inclusive experiences that work for everyone, following WCAG 2.2 guidelines
            </p>
          </div>
        </div>
      </div>

      <main 
        ref={mainContentRef}
        id="main-content"
        className="page-content"
        tabIndex={-1}
        aria-label="Main content"
      >
        {/* WCAG Principles */}
        <section className="content-section" aria-labelledby="wcag-principles">
          <h2 id="wcag-principles" className="section-title">WCAG 2.2 Principles</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-card__header">
                <Icon icon="mdi:eye" />
                <h3>Perceivable</h3>
              </div>
              <p>Information must be presentable in ways users can perceive</p>
              <ul className="principle-list">
                <li>Text alternatives for images</li>
                <li>Captions for videos</li>
                <li>Sufficient color contrast</li>
                <li>Resizable text up to 200%</li>
              </ul>
            </div>
            <div className="principle-card">
              <div className="principle-card__header">
                <Icon icon="mdi:hand-pointing-up" />
                <h3>Operable</h3>
              </div>
              <p>Interface components must be operable by all users</p>
              <ul className="principle-list">
                <li>Keyboard accessible</li>
                <li>No seizure-inducing content</li>
                <li>Enough time to read content</li>
                <li>Clear navigation</li>
              </ul>
            </div>
            <div className="principle-card">
              <div className="principle-card__header">
                <Icon icon="mdi:lightbulb" />
                <h3>Understandable</h3>
              </div>
              <p>Information and UI operation must be understandable</p>
              <ul className="principle-list">
                <li>Readable and predictable</li>
                <li>Clear error messages</li>
                <li>Consistent navigation</li>
                <li>Input assistance</li>
              </ul>
            </div>
            <div className="principle-card">
              <div className="principle-card__header">
                <Icon icon="mdi:cog" />
                <h3>Robust</h3>
              </div>
              <p>Content must work with assistive technologies</p>
              <ul className="principle-list">
                <li>Valid HTML markup</li>
                <li>Compatible with screen readers</li>
                <li>Future-proof code</li>
                <li>Semantic structure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Accessibility Demos */}
        <section className="content-section" aria-labelledby="a11y-demos">
          <h2 id="a11y-demos" className="section-title">Interactive Accessibility Demos</h2>
          
          {/* Screen Reader Demo */}
          <div className="demo-section">
            <h3 className="demo-title">
              <Icon icon="mdi:account-voice" />
              Screen Reader Announcements
            </h3>
            <p className="demo-description">
              Test how screen readers announce dynamic content changes
            </p>
            <div className="demo-controls">
              <button 
                className="demo-button"
                onClick={handleScreenReaderTest}
                aria-describedby="sr-demo-desc"
              >
                <Icon icon="mdi:volume-high" />
                Test Screen Reader Announcement
              </button>
              <div id="sr-demo-desc" className="demo-description">
                Activates an ARIA live region to announce content to screen readers
              </div>
            </div>
            <div 
              className="demo-result"
              aria-live="polite"
              aria-atomic="true"
            >
              {screenReaderDemo && (
                <div className="announcement">
                  <Icon icon="mdi:microphone" />
                  {screenReaderDemo}
                </div>
              )}
            </div>
          </div>

          {/* Focus Management Demo */}
          <div className="demo-section">
            <h3 className="demo-title">
              <Icon icon="mdi:target" />
              Focus Management
            </h3>
            <p className="demo-description">
              Proper focus indicators and keyboard navigation
            </p>
            <div className="demo-controls">
              <button 
                className="demo-button"
                onClick={handleFocusDemo}
                aria-expanded={focusDemo}
                aria-controls="focus-demo-content"
              >
                <Icon icon={focusDemo ? 'mdi:eye-off' : 'mdi:eye'} />
                {focusDemo ? 'Hide' : 'Show'} Focus Demo
              </button>
            </div>
            {focusDemo && (
              <div id="focus-demo-content" className="focus-demo">
                <p>Try navigating these elements with the Tab key:</p>
                <div className="focus-demo-elements">
                  <button className="focus-demo-button">Button 1</button>
                  <button className="focus-demo-button">Button 2</button>
                  <input 
                    type="text" 
                    placeholder="Input field"
                    className="focus-demo-input"
                    aria-label="Demo input field"
                  />
                  <a href="#" className="focus-demo-link">Demo Link</a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* React Accessibility Patterns */}
        <section className="content-section" aria-labelledby="react-patterns">
          <h2 id="react-patterns" className="section-title">React Accessibility Patterns</h2>
          <div className="patterns-grid">
            <div className="pattern-card">
              <div className="pattern-card__header">
                <Icon icon="mdi:form-select" />
                <h3>Accessible Forms</h3>
              </div>
              <p className="pattern-card__description">
                Proper labeling, error handling, and validation
              </p>
              <CodeBlock
                code={`function AccessibleForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    try {
      await submitForm({ email })
    } catch (err) {
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="email">
          Email Address
          <span aria-label="required">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={error ? 'email-error' : undefined}
          aria-invalid={!!error}
          required
        />
        {error && (
          <div id="email-error" className="error" role="alert">
            <Icon icon="mdi:alert-circle" />
            {error}
          </div>
        )}
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        aria-describedby="submit-status"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      <div id="submit-status" className="sr-only">
        {isSubmitting ? 'Form is being submitted' : ''}
      </div>
    </form>
  )
}`}
                language="typescript"
              />
            </div>

            <div className="pattern-card">
              <div className="pattern-card__header">
                <Icon icon="mdi:menu" />
                <h3>Modal Dialogs</h3>
              </div>
              <p className="pattern-card__description">
                Focus trapping and proper ARIA attributes
              </p>
              <CodeBlock
                code={`function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      // Focus the modal when it opens
      modalRef.current?.focus()
      
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
        
        // Focus trapping logic
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusableElements) {
            const firstElement = focusableElements[0] as HTMLElement
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}`}
                language="typescript"
              />
            </div>

            <div className="pattern-card">
              <div className="pattern-card__header">
                <Icon icon="mdi:navigation" />
                <h3>Accessible Navigation</h3>
              </div>
              <p className="pattern-card__description">
                Skip links, landmarks, and keyboard navigation
              </p>
              <CodeBlock
                code={`function AccessibleNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header role="banner">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      
      <nav role="navigation" aria-label="Main navigation">
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-icon" aria-hidden="true" />
          Menu
        </button>
        
        <ul 
          id="main-menu"
          className={\`menu \${isMenuOpen ? 'menu--open' : ''}\`}
          role="menubar"
        >
          <li role="none">
            <a href="/" role="menuitem" aria-current="page">
              Home
            </a>
          </li>
          <li role="none">
            <a href="/about" role="menuitem">
              About
            </a>
          </li>
          <li role="none">
            <button 
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={false}
            >
              Products
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}`}
                language="typescript"
              />
            </div>

            <div className="pattern-card">
              <div className="pattern-card__header">
                <Icon icon="mdi:alert" />
                <h3>Live Regions</h3>
              </div>
              <p className="pattern-card__description">
                Dynamic content announcements for screen readers
              </p>
              <CodeBlock
                code={`function LiveRegionsDemo() {
  const [status, setStatus] = useState('')
  const [alerts, setAlerts] = useState<string[]>([])
  
  const addAlert = (message: string) => {
    setAlerts(prev => [...prev, message])
    setTimeout(() => {
      setAlerts(prev => prev.slice(1))
    }, 5000)
  }
  
  const updateStatus = (message: string) => {
    setStatus(message)
    setTimeout(() => setStatus(''), 3000)
  }
  
  return (
    <div>
      <button onClick={() => updateStatus('Status updated!')}>
        Update Status
      </button>
      <button onClick={() => addAlert('Important alert!')}>
        Add Alert
      </button>
      
      {/* Polite announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {status}
      </div>
      
      {/* Assertive announcements */}
      <div 
        aria-live="assertive" 
        aria-atomic="false"
        className="sr-only"
      >
        {alerts.map((alert, index) => (
          <div key={index}>{alert}</div>
        ))}
      </div>
      
      {/* Visual alerts for sighted users */}
      <div className="alerts-container">
        {alerts.map((alert, index) => (
          <div key={index} className="alert" role="alert">
            {alert}
          </div>
        ))}
      </div>
    </div>
  )
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Accessibility Checklist */}
        <section className="content-section" aria-labelledby="a11y-checklist">
          <h2 id="a11y-checklist" className="section-title">Accessibility Checklist</h2>
          <div className="checklist-grid">
            <div className="checklist-category">
              <h3 className="checklist-title">
                <Icon icon="mdi:keyboard" />
                Keyboard Navigation
              </h3>
              <ul className="checklist" role="list">
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  All interactive elements are keyboard accessible
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Visible focus indicators on all focusable elements
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Logical tab order throughout the page
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Skip links for main content areas
                </li>
              </ul>
            </div>
            
            <div className="checklist-category">
              <h3 className="checklist-title">
                <Icon icon="mdi:format-color-fill" />
                Visual Design
              </h3>
              <ul className="checklist" role="list">
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Color contrast ratio of at least 4.5:1
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Information conveyed beyond color alone
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Text resizable up to 200% without loss of functionality
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  No content flashes more than 3 times per second
                </li>
              </ul>
            </div>
            
            <div className="checklist-category">
              <h3 className="checklist-title">
                <Icon icon="mdi:code-tags" />
                Semantic HTML
              </h3>
              <ul className="checklist" role="list">
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Proper heading hierarchy (h1-h6)
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Meaningful link text and button labels
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Form labels associated with inputs
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  ARIA attributes used appropriately
                </li>
              </ul>
            </div>
            
            <div className="checklist-category">
              <h3 className="checklist-title">
                <Icon icon="mdi:account-voice" />
                Screen Readers
              </h3>
              <ul className="checklist" role="list">
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Alt text for all meaningful images
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Live regions for dynamic content
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Descriptive page titles and landmarks
                </li>
                <li role="listitem">
                  <Icon icon="mdi:check-circle" className="check-icon" />
                  Clear error messages and instructions
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}