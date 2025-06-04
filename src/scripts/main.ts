import './components/navigation'
import './components/animations'
import './components/contact-form'
import './utils/analytics'
import './utils/performance'

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio loaded successfully!')
  
  // Add any global initialization here
  initializeApp()
})

function initializeApp(): void {
  // Set up global error handling
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // In production, you could send this to an error tracking service
  })

  // Set up global unhandled promise rejection handling
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    event.preventDefault()
  })

  // Add smooth scrolling polyfill for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Adding smooth scroll polyfill for older browsers')
    // Polyfill would be implemented here if needed
  }

  // Initialize intersection observer for animations
  if ('IntersectionObserver' in window) {
    // Modern browsers - animations will work
  } else {
    // Fallback for older browsers - make everything visible
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
      el.classList.add('fade-in--visible', 'slide-in-left--visible', 'slide-in-right--visible')
    })
  }
} 