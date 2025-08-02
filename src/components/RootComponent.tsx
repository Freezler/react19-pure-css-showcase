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
                  popoverTarget="react19-menu"
                  type="button"
                  style={{ anchorName: '--react19-button' } as React.CSSProperties}
                >
                  React 19 ▼
                </button>
                <div
                  className="navbar__popover"
                  id="react19-menu"
                  popover="auto"
                  style={{ positionAnchor: '--react19-button' } as React.CSSProperties}
                >
                  <div className="popover__simple">
                    <ul className="popover__list">
                      <li>
                        <Link to="/react19" className="popover__link" role="menuitem">
                          <Icon icon="logos:react" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">React 19 Features</span>
                            <span className="popover__desc">Server Components, Actions & more</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/features" className="popover__link" role="menuitem">
                          <Icon icon="mdi:rocket" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Interactive Demos</span>
                            <span className="popover__desc">Try React 19 features live</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/typescript" className="popover__link" role="menuitem">
                          <Icon icon="logos:typescript-icon" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">TypeScript Integration</span>
                            <span className="popover__desc">Type-safe React 19 development</span>
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
                  popoverTarget="development-menu"
                  type="button"
                  style={{ anchorName: '--development-button' } as React.CSSProperties}
                >
                  Development ▼
                </button>
                <div
                  className="navbar__popover"
                  id="development-menu"
                  popover="auto"
                  style={{ positionAnchor: '--development-button' } as React.CSSProperties}
                >
                  <div className="popover__simple">
                    <ul className="popover__list">
                      <li>
                        <Link to="/performance" className="popover__link" role="menuitem">
                          <Icon icon="mdi:speedometer" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Performance</span>
                            <span className="popover__desc">Optimization & Core Web Vitals</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/accessibility" className="popover__link" role="menuitem">
                          <Icon icon="mdi:account-multiple" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Accessibility</span>
                            <span className="popover__desc">WCAG 2.2 & inclusive design</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/apis" className="popover__link" role="menuitem">
                          <Icon icon="mdi:api" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Advanced APIs</span>
                            <span className="popover__desc">Modern web platform APIs</span>
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
                  popoverTarget="design-menu"
                  type="button"
                  style={{ anchorName: '--design-button' } as React.CSSProperties}
                >
                  Design & CSS ▼
                </button>
                <div
                  className="navbar__popover"
                  id="design-menu"
                  popover="auto"
                  style={{ positionAnchor: '--design-button' } as React.CSSProperties}
                >
                  <div className="popover__simple">
                    <ul className="popover__list">
                      <li>
                        <Link to="/design" className="popover__link" role="menuitem">
                          <Icon icon="mdi:palette" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Design System</span>
                            <span className="popover__desc">Colors, typography & components</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/container-queries" className="popover__link" role="menuitem">
                          <Icon icon="mdi:crop-free" className="popover__icon" />
                          <div className="popover__content">
                            <span className="popover__title">Container Queries</span>
                            <span className="popover__desc">Component-based responsive design</span>
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
              <li>
                <Link
                  to="/about"
                  className="navbar__link"
                  aria-current={router.location.pathname === '/about' ? 'page' : undefined}
                >
                  About
                </Link>
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
          <div className="navbar__mobile-header">
            <button
              className="navbar__mobile-close"
              onClick={(e) => {
                e.stopPropagation()
                closeMenu()
              }}
              aria-label="Close navigation menu"
              type="button"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <Icon icon="mdi:close" className="navbar__close-icon" aria-hidden="true" />
            </button>
          </div>
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
                  to="/features"
                  className={`navbar__mobile-link ${isActive('/features') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/features') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:rocket" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Demos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/typescript"
                  className={`navbar__mobile-link ${isActive('/typescript') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/typescript') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="logos:typescript-icon" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>TypeScript</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/performance"
                  className={`navbar__mobile-link ${isActive('/performance') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/performance') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:speedometer" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Performance</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className={`navbar__mobile-link ${isActive('/accessibility') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/accessibility') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:account-multiple" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Accessibility</span>
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
                  <span>Design System</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/container-queries"
                  className={`navbar__mobile-link ${isActive('/container-queries') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive('/container-queries') ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <Icon icon="mdi:crop-free" className="navbar__mobile-icon" aria-hidden="true" />
                  <span>Container Queries</span>
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
