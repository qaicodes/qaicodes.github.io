// Analytics utility for tracking user interactions
export class Analytics {
  private isProduction: boolean

  constructor() {
    this.isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    this.init()
  }

  private init(): void {
    if (this.isProduction) {
      this.loadGoogleAnalytics()
    }
    this.trackPageView()
  }

  private loadGoogleAnalytics(): void {
    // Replace with your actual GA4 measurement ID
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
    
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    const gtagScript = document.createElement('script')
    gtagScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `
    document.head.appendChild(gtagScript)
  }

  private trackPageView(): void {
    this.track('page_view', {
      page_title: document.title,
      page_location: window.location.href
    })
  }

  // Public method to track events
  public track(eventName: string, parameters: Record<string, any> = {}): void {
    if (this.isProduction && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters)
    } else {
      // Development mode - log to console
      console.log('Analytics Event:', eventName, parameters)
    }
  }

  // Track navigation clicks
  public trackNavigation(section: string): void {
    this.track('navigation_click', {
      section_name: section,
      timestamp: new Date().toISOString()
    })
  }

  // Track CTA button clicks
  public trackCTA(buttonName: string, location: string): void {
    this.track('cta_click', {
      button_name: buttonName,
      button_location: location,
      timestamp: new Date().toISOString()
    })
  }

  // Track project link clicks
  public trackProjectClick(projectName: string, linkType: 'github' | 'demo' | 'case_study'): void {
    this.track('project_click', {
      project_name: projectName,
      link_type: linkType,
      timestamp: new Date().toISOString()
    })
  }

  // Track contact method usage
  public trackContact(method: 'email' | 'linkedin' | 'github' | 'phone' | 'form'): void {
    this.track('contact_attempt', {
      contact_method: method,
      timestamp: new Date().toISOString()
    })
  }

  // Track scroll depth
  public trackScrollDepth(percentage: number): void {
    this.track('scroll_depth', {
      scroll_percentage: percentage,
      page_title: document.title
    })
  }

  // Track time spent on page
  public trackTimeOnPage(): void {
    const startTime = Date.now()
    
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      this.track('time_on_page', {
        time_seconds: timeSpent,
        page_title: document.title
      })
    })
  }
}

// Initialize analytics
const analytics = new Analytics()

// Set up automatic tracking
document.addEventListener('DOMContentLoaded', () => {
  // Track navigation clicks
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement)
      const href = target.getAttribute('href')
      if (href?.startsWith('#')) {
        analytics.trackNavigation(href.substring(1))
      }
    })
  })

  // Track CTA button clicks
  document.querySelectorAll('.btn--primary').forEach(button => {
    button.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement)
      const buttonText = target.textContent || 'Unknown'
      const section = target.closest('section')?.id || 'unknown'
      analytics.trackCTA(buttonText, section)
    })
  })

  // Track contact link clicks
  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement)
      const href = target.getAttribute('href') || ''
      
      let method: 'email' | 'linkedin' | 'github' | 'phone' | 'form' = 'form'
      if (href.includes('mailto:')) method = 'email'
      else if (href.includes('linkedin')) method = 'linkedin'
      else if (href.includes('github')) method = 'github'
      else if (href.includes('tel:')) method = 'phone'
      
      analytics.trackContact(method)
    })
  })

  // Track scroll depth
  let maxScrollDepth = 0
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)
    
    if (scrollPercent > maxScrollDepth && scrollPercent <= 100) {
      maxScrollDepth = scrollPercent
      
      // Track at 25%, 50%, 75%, and 100%
      if ([25, 50, 75, 100].includes(scrollPercent)) {
        analytics.trackScrollDepth(scrollPercent)
      }
    }
  })

  // Track time on page
  analytics.trackTimeOnPage()
})

export { analytics } 