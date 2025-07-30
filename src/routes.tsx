import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootComponent } from './components/RootComponent'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { AdvancedAPIs } from './pages/AdvancedAPIs'
import { Features } from './pages/Features'
import { React19 } from './pages/React19'
import { DesignSystem } from './pages/DesignSystem'
import ExampleRefactored from './pages/ExampleRefactored'
import { NotFound } from './pages/NotFound'
import { ModernCSSDemo } from './components/ModernCSSDemo'

// Create root route
const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

// Create index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Create about route
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

// Create features overview route
const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/features',
  component: Features,
})

// Create React 19 showcase route
const react19Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/react19',
  component: React19,
})

// Create design system route  
const designRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/design',
  component: DesignSystem,
})

// Create advanced APIs route
const advancedAPIsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apis',
  component: AdvancedAPIs,
})

// Create example refactored route
const exampleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/example',
  component: ExampleRefactored,
})

// Create modern CSS demo route
const modernCSSRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/modern-css',
  component: ModernCSSDemo,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute, 
  aboutRoute, 
  featuresRoute,
  react19Route,
  designRoute,
  advancedAPIsRoute,
  exampleRoute,
  modernCSSRoute
])

// Create router
export const router = createRouter({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
