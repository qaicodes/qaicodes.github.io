// Navigation functionality
export class Navigation {
  private navLinks: NodeListOf<HTMLAnchorElement>
  private sections: NodeListOf<HTMLElement>

  constructor() {
    this.navLinks = document.querySelectorAll('.nav__link')
    this.sections = document.querySelectorAll('section[id]')
    this.init()
  }

  private init(): void {
    this.setupSmoothScrolling()
    this.setupActiveNavigation()
  }

  private setupSmoothScrolling(): void {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = link.getAttribute('href')
        
        if (href?.startsWith('#')) {
          const target = document.querySelector(href)
          
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
            
            // Update URL without triggering page reload
            history.pushState(null, '', href)
          }
        }
      })
    })
  }

  private setupActiveNavigation(): void {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: '-50px 0px -50px 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          this.updateActiveNavLink(id)
        }
      })
    }, observerOptions)

    this.sections.forEach(section => {
      observer.observe(section)
    })
  }

  private updateActiveNavLink(activeId: string): void {
    this.navLinks.forEach(link => {
      link.classList.remove('nav__link--active')
      
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('nav__link--active')
      }
    })
  }
}

// Initialize navigation
new Navigation() 