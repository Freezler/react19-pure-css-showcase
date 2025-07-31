import { Icon } from '@iconify/react'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export function RootComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouterState()
  const navRef = useRef<HTMLElement>(null)

  // Handle theme toggle with enhanced light/dark system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  // Enhanced scroll behavior for modern navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeScrolled = scrollTop > 20

      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled)

        // Add hardware acceleration class for smooth transitions
        if (navRef.current) {
          navRef.current.style.transform = shouldBeScrolled
            ? 'translateZ(0) translateY(0)'
            : 'translateZ(0)'
        }
      }
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [isScrolled])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }


  const closeMenu = () => {
    setIsMenuOpen(false)
    
    // Return focus to menu toggle button for accessibility
    const menuToggle = document.querySelector('.navbar__menu-toggle') as HTMLElement
    if (menuToggle) {
      menuToggle.focus()
    }
  }

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  // Close menu on route change
  useEffect(() => {
    closeMenu()
  }, [router.location.pathname])

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMenuOpen) return
      
      const target = event.target as Element
      const mobileMenu = document.getElementById('mobile-menu')
      const menuToggle = document.querySelector('.navbar__menu-toggle')
      
      // Don't close if clicking on the menu itself or the toggle button
      if (
        mobileMenu?.contains(target) || 
        menuToggle?.contains(target)
      ) {
        return
      }
      
      closeMenu()
    }

    // Listen for both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  const isActive = (path: string) => {
    return router.location.pathname === path
  }

  return (
    <div className="app-layout">
      <header
        ref={navRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar__container">
          <Link
            to="/"
            className="navbar__brand"
            aria-label="React 19 - Home"
          >
            <Icon icon="mdi:rocket" className="navbar__logo" aria-hidden="true" />
            <span className="navbar__title">React 19</span>
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation" role="navigation">
            <ul className="navbar__list">
              <li className="navbar__dropdown">
                <button
                  className="navbar__dropdown-toggle"
                  popoverTarget="tech-stack-menu"
                  type="button"
                  style={{ anchorName: '--tech-button' } as React.CSSProperties}
                >
                  Tech Stack ▼
                </button>
                <div
                  className="navbar__popover"
                  id="tech-stack-menu"
                  popover="auto"
                  style={{ positionAnchor: '--tech-button' } as React.CSSProperties}
                >
                  <div className="popover__grid">
                    <div className="popover__category">
                      <h3 className="popover__category-title">Frontend</h3>
                      <ul className="popover__list">
                        <li>
                          <Link to="/react19" className="popover__link" role="menuitem">
                            <Icon icon="logos:react" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">React 19</span>
                              <span className="popover__desc">Latest React features</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <a href="#typescript" className="popover__link" role="menuitem">
                            <Icon icon="logos:typescript-icon" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">TypeScript</span>
                              <span className="popover__desc">Type-safe development</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#vite" className="popover__link" role="menuitem">
                            <Icon icon="logos:vitejs" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Vite</span>
                              <span className="popover__desc">Lightning-fast builds</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#router" className="popover__link" role="menuitem">
                            <Icon icon="mdi:router" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">TanStack Router</span>
                              <span className="popover__desc">Type-safe routing</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="popover__category">
                      <h3 className="popover__category-title">Styling</h3>
                      <ul className="popover__list">
                        <li>
                          <Link to="/design" className="popover__link" role="menuitem">
                            <Icon icon="mdi:palette" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Modern CSS</span>
                              <span className="popover__desc">Latest CSS features</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <a href="#layers" className="popover__link" role="menuitem">
                            <Icon icon="mdi:layers" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">CSS Layers</span>
                              <span className="popover__desc">Cascade control</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#container-queries" className="popover__link" role="menuitem">
                            <Icon icon="mdi:crop-free" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Container Queries</span>
                              <span className="popover__desc">Element-based responsive design</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#scope" className="popover__link" role="menuitem">
                            <Icon icon="mdi:target" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">CSS @scope</span>
                              <span className="popover__desc">Scoped styling</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="popover__category">
                      <h3 className="popover__category-title">APIs & Features</h3>
                      <ul className="popover__list">
                        <li>
                          <Link to="/apis" className="popover__link" role="menuitem">
                            <Icon icon="mdi:api" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Advanced APIs</span>
                              <span className="popover__desc">Modern web platform</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <a href="#web-platform" className="popover__link" role="menuitem">
                            <Icon icon="mdi:web" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Web Platform</span>
                              <span className="popover__desc">Native browser features</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#performance" className="popover__link" role="menuitem">
                            <Icon icon="mdi:speedometer" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Performance</span>
                              <span className="popover__desc">Optimization techniques</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#accessibility" className="popover__link" role="menuitem">
                            <Icon icon="mdi:account-multiple" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Accessibility</span>
                              <span className="popover__desc">Inclusive design</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="popover__category">
                      <h3 className="popover__category-title">Build & Deploy</h3>
                      <ul className="popover__list">
                        <li>
                          <a href="#vite-build" className="popover__link" role="menuitem">
                            <Icon icon="logos:vitejs" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Vite Build</span>
                              <span className="popover__desc">Optimized production builds</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#github-actions" className="popover__link" role="menuitem">
                            <Icon icon="mdi:github" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">GitHub Actions</span>
                              <span className="popover__desc">CI/CD automation</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#deployment" className="popover__link" role="menuitem">
                            <Icon icon="mdi:rocket-launch" className="popover__icon" />
                            <div className="popover__content">
                              <span className="popover__title">Deployment</span>
                              <span className="popover__desc">Modern hosting solutions</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="navbar__dropdown">
                <button
                  className="navbar__dropdown-toggle"
                  popoverTarget="examples-menu"
                  type="button"
                  style={{ anchorName: '--examples-button' } as React.CSSProperties}
                >
                  Examples ▼
                </button>
                <div
                  className="navbar__popover"
                  id="examples-menu"
                  popover="auto"
                  style={{ positionAnchor: '--examples-button' } as React.CSSProperties}
                >
                  <div className="popover__simple">
                    <ul className="popover__list">
                      <li>
                        <Link to="/features" className="popover__link" role="menuitem">
                          <Icon icon="mdi:rocket" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Features Showcase</span>
                            <span className="popover__desc">Interactive feature demos</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/example" className="popover__link" role="menuitem">
                          <Icon icon="mdi:components" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Component Library</span>
                            <span className="popover__desc">Reusable UI components</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="navbar__dropdown">
                <button
                  className="navbar__dropdown-toggle"
                  popoverTarget="resources-menu"
                  type="button"
                  style={{ anchorName: '--resources-button' } as React.CSSProperties}
                >
                  Resources ▼
                </button>
                <div
                  className="navbar__popover"
                  id="resources-menu"
                  popover="auto"
                  style={{ positionAnchor: '--resources-button' } as React.CSSProperties}
                >
                  <div className="popover__simple">
                    <ul className="popover__list">
                      <li>
                        <Link to="/about" className="popover__link" role="menuitem">
                          <Icon icon="mdi:information" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">About</span>
                            <span className="popover__desc">Project information</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div className="navbar__actions">
            <button
              className="navbar__theme-toggle"
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              aria-pressed={isDarkMode}
              type="button"
              title={`Current theme: ${isDarkMode ? 'dark' : 'light'} mode`}
            >
              <Icon
                icon={isDarkMode ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'}
                className="navbar__theme-icon"
                aria-hidden="true"
              />
            </button>

            <button
              className="navbar__menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              <div className="navbar__hamburger">
                <div className="navbar__hamburger-line"></div>
                <div className="navbar__hamburger-line"></div>
                <div className="navbar__hamburger-line"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu backdrop */}
        <div 
          className={`navbar__mobile-backdrop ${isMenuOpen ? 'navbar__mobile-backdrop--open' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Mobile menu */}
        <div
          className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
          id="mobile-menu"
          aria-hidden={!isMenuOpen}
        >
          <nav className="navbar__mobile-nav" aria-label="Mobile navigation" role="navigation">
            <ul className="navbar__mobile-list">
              <li>
                <Link
                  to="/"
                  className={`navbar__mobile-link ${isActive('/') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:home" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className={`navbar__mobile-link ${isActive('/features') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/features') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:rocket" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/react19"
                  className={`navbar__mobile-link ${isActive('/react19') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/react19') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="logos:react" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>React 19</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/design"
                  className={`navbar__mobile-link ${isActive('/design') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/design') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:palette" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Design</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/apis"
                  className={`navbar__mobile-link ${isActive('/apis') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/apis') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:api" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>APIs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/example"
                  className={`navbar__mobile-link ${isActive('/example') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/example') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:components" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Components</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`navbar__mobile-link ${isActive('/about') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/about') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:information" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <button
                  className="navbar__mobile-theme"
                  onClick={() => {
                    toggleDarkMode()
                    closeMenu()
                  }}
                  type="button"
                  aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                  aria-pressed={isDarkMode}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon
                    icon={isDarkMode ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'}
                    className="navbar__mobile-icon"
                    aria-hidden="true"
                  />
                  <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
