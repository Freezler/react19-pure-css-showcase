import { useEffect } from 'react'

/**
 * Fallback scroll animations using Intersection Observer
 * for browsers that don't support CSS scroll-driven animations
 */
export function useScrollAnimations() {
  useEffect(() => {
    // Optimized Intersection Observer with performance improvements
    const observer = new IntersectionObserver(
      (entries) => {
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement
            
            if (entry.isIntersecting) {
              // Add animate-in class to trigger optimized animations
              element.classList.add('animate-in')
              
              // Handle staggered animations with optimized delays
              if (element.parentElement?.classList.contains('scroll-stagger-cards')) {
                const siblings = Array.from(element.parentElement.children)
                const index = siblings.indexOf(element)
                element.style.transitionDelay = `${index * 0.1}s` // Reduced delay for faster flow
              }
              
              // Clean up will-change after animation completes
              const cleanupWillChange = () => {
                element.style.willChange = 'auto'
                element.removeEventListener('transitionend', cleanupWillChange)
              }
              element.addEventListener('transitionend', cleanupWillChange, { once: true })
              
              // Unobserve after animation to improve performance
              observer.unobserve(element)
            }
          })
        })
      },
      {
        threshold: 0.15, // Slightly higher threshold for better timing
        rootMargin: '0px 0px -5% 0px' // Reduced margin for earlier trigger
      }
    )
    
    // Batch DOM queries for better performance
    const setupAnimations = () => {
      const animationSelectors = [
        '.scroll-stagger-cards > *',
        '.scroll-title-reveal', 
        '.stats-counter',
        '.hero-epic-entrance',
        '.compiler-demo-animate',
        '.code-scroll-reveal .hero__code-line',
        '.showcase-reveal'
      ]
      
      // Use a single DOM query and batch observe calls
      const allElements = animationSelectors.flatMap(selector => 
        Array.from(document.querySelectorAll(selector))
      )
      
      // Batch observe for better performance
      allElements.forEach(element => observer.observe(element))
      
      console.log(`🚀 Optimized animations setup for ${allElements.length} elements`)
    }
    
    // Use requestIdleCallback for better performance, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupAnimations)
    } else {
      setTimeout(setupAnimations, 50)
    }
    
    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])
}