import { useEffect, useRef } from 'react'

/**
 * 🎭 SCROLL REVEAL HOOK - Brings elements to life with intersection magic!
 * 
 * Creates smooth, performant scroll-triggered animations using IntersectionObserver.
 * Elements start hidden and beautifully animate into view as user scrolls.
 */
export function useScrollReveal(options?: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Don't animate if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 🎉 Element is visible - trigger the magic!
          entry.target.classList.add('in-view')
          
          // If it's a stagger container, animate children with delays
          if (entry.target.classList.contains('scroll-stagger')) {
            const children = entry.target.children
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('in-view')
              }, index * 100) // 100ms delay between each child
            })
          }
          
          // Stop observing if we only want to trigger once
          if (options?.triggerOnce !== false) {
            observer.unobserve(entry.target)
          }
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px 0px -100px 0px', // Trigger before element is fully visible
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce])

  return ref
}

/**
 * 🌊 SCROLL REVEAL ALL HOOK - Automatically finds and animates all scroll elements
 * 
 * Scans the page for scroll animation classes and sets up observers.
 * Perfect for batch animating multiple elements without individual hooks.
 */
export function useScrollRevealAll() {
  useEffect(() => {
    // Don't animate if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Make all scroll elements immediately visible
      const allScrollElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-stagger, .scroll-slide-in-left, .scroll-slide-in-right, .scroll-scale-in'
      )
      allScrollElements.forEach(el => el.classList.add('in-view'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            
            // 🎭 Different animation types get different treatments
            if (element.classList.contains('scroll-stagger')) {
              // Stagger children animations
              const children = element.children
              Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('in-view')
                }, index * 150) // Slightly longer delay for more dramatic effect
              })
            }
            
            // Add main in-view class
            element.classList.add('in-view')
            
            // Stop observing this element
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    // Find all elements with scroll animation classes
    const scrollElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-stagger, .scroll-slide-in-left, .scroll-slide-in-right, .scroll-scale-in'
    )

    scrollElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}