// Animation controller for scroll-triggered reveals
export class AnimationController {
  private observer!: IntersectionObserver
  private animatedElements: NodeListOf<Element>

  constructor() {
    this.animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .card, .terminal, .skill-category, .achievement-card')
    this.init()
  }

  private init(): void {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target as HTMLElement)
          this.observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    this.observeElements()
  }

  private observeElements(): void {
    this.animatedElements.forEach(element => {
      this.observer.observe(element)
    })
  }

  private animateElement(element: HTMLElement): void {
    // Add appropriate animation classes
    if (element.classList.contains('fade-in')) {
      element.classList.add('fade-in--visible')
    }
    
    if (element.classList.contains('slide-in-left')) {
      element.classList.add('slide-in-left--visible')
    }
    
    if (element.classList.contains('slide-in-right')) {
      element.classList.add('slide-in-right--visible')
    }

    // For cards and other elements, just make them visible
    if (element.classList.contains('card') || 
        element.classList.contains('terminal') ||
        element.classList.contains('skill-category') ||
        element.classList.contains('achievement-card')) {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }

    // Add staggered delay for grid items
    this.addStaggeredAnimation(element)
  }

  private addStaggeredAnimation(element: HTMLElement): void {
    const parent = element.parentElement
    if (!parent) return

    const siblings = Array.from(parent.children).filter(child => 
      child.classList.contains('card') || 
      child.classList.contains('achievement-card') ||
      child.classList.contains('skill-category')
    )

    const index = siblings.indexOf(element)
    if (index !== -1) {
      element.style.transitionDelay = `${index * 100}ms`
    }
  }

  // Public method to trigger animations manually
  public triggerAnimation(selector: string): void {
    const elements = document.querySelectorAll(selector)
    elements.forEach(element => {
      this.animateElement(element as HTMLElement)
    })
  }
}

// Initialize animations
new AnimationController() 