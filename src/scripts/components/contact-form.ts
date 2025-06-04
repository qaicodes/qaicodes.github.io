// Contact form functionality
export class ContactForm {
  private form: HTMLFormElement | null
  private submitButton: HTMLButtonElement | null
  private originalButtonText: string

  constructor() {
    this.form = document.querySelector('.contact-form')
    this.submitButton = this.form?.querySelector('button[type="submit"]') || null
    this.originalButtonText = this.submitButton?.textContent || 'Send Message'
    this.init()
  }

  private init(): void {
    if (!this.form) return

    this.form.addEventListener('submit', this.handleSubmit.bind(this))
    this.setupValidation()
  }

  private setupValidation(): void {
    if (!this.form) return

    const inputs = this.form.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input as HTMLInputElement))
      input.addEventListener('input', () => this.clearFieldError(input as HTMLInputElement))
    })
  }

  private validateField(field: HTMLInputElement): boolean {
    const value = field.value.trim()
    let isValid = true
    let errorMessage = ''

    // Remove existing error styles
    this.clearFieldError(field)

    // Required field validation
    if (field.required && !value) {
      isValid = false
      errorMessage = `${this.getFieldLabel(field)} is required`
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = 'Please enter a valid email address'
      }
    }

    // Name validation (no numbers)
    if (field.name === 'name' && value) {
      const nameRegex = /^[a-zA-Z\s'-]+$/
      if (!nameRegex.test(value)) {
        isValid = false
        errorMessage = 'Name should only contain letters, spaces, hyphens, and apostrophes'
      }
    }

    // Message minimum length
    if (field.name === 'message' && value && value.length < 10) {
      isValid = false
      errorMessage = 'Message should be at least 10 characters long'
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage)
    }

    return isValid
  }

  private getFieldLabel(field: HTMLInputElement): string {
    const label = this.form?.querySelector(`label[for="${field.id}"]`)
    return label?.textContent || field.name || 'Field'
  }

  private showFieldError(field: HTMLInputElement, message: string): void {
    field.classList.add('error')
    
    // Remove existing error message
    const existingError = field.parentElement?.querySelector('.error-message')
    if (existingError) {
      existingError.remove()
    }

    // Add new error message
    const errorElement = document.createElement('div')
    errorElement.className = 'error-message'
    errorElement.textContent = message
    errorElement.style.color = 'var(--color-error, #ff5f56)'
    errorElement.style.fontSize = 'var(--font-size-sm)'
    errorElement.style.marginTop = 'var(--spacing-xs)'
    
    field.parentElement?.appendChild(errorElement)
  }

  private clearFieldError(field: HTMLInputElement): void {
    field.classList.remove('error')
    const errorMessage = field.parentElement?.querySelector('.error-message')
    if (errorMessage) {
      errorMessage.remove()
    }
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault()
    
    if (!this.form || !this.submitButton) return

    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>
    let isFormValid = true

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false
      }
    })

    if (!isFormValid) {
      this.showFormMessage('Please fix the errors above', 'error')
      return
    }

    // Show loading state
    this.setLoadingState(true)

    try {
      const formData = new FormData(this.form)
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        this.showFormMessage('Thank you! Your message has been sent successfully.', 'success')
        this.form.reset()
        this.trackFormSubmission('success')
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error')
      this.trackFormSubmission('error')
    } finally {
      this.setLoadingState(false)
    }
  }

  private setLoadingState(loading: boolean): void {
    if (!this.submitButton) return

    if (loading) {
      this.submitButton.disabled = true
      this.submitButton.textContent = 'Sending...'
      this.submitButton.classList.add('loading')
    } else {
      this.submitButton.disabled = false
      this.submitButton.textContent = this.originalButtonText
      this.submitButton.classList.remove('loading')
    }
  }

  private showFormMessage(message: string, type: 'success' | 'error'): void {
    // Remove existing message
    const existingMessage = this.form?.querySelector('.form-message')
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create new message
    const messageElement = document.createElement('div')
    messageElement.className = `form-message form-message--${type}`
    messageElement.textContent = message
    messageElement.style.padding = 'var(--spacing-sm)'
    messageElement.style.borderRadius = 'var(--border-radius-sm)'
    messageElement.style.marginTop = 'var(--spacing-md)'
    messageElement.style.textAlign = 'center'
    
    if (type === 'success') {
      messageElement.style.backgroundColor = 'rgba(39, 202, 63, 0.1)'
      messageElement.style.color = '#27ca3f'
      messageElement.style.border = '1px solid #27ca3f'
    } else {
      messageElement.style.backgroundColor = 'rgba(255, 95, 86, 0.1)'
      messageElement.style.color = '#ff5f56'
      messageElement.style.border = '1px solid #ff5f56'
    }

    this.form?.appendChild(messageElement)

    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageElement.remove()
      }, 5000)
    }
  }

  private trackFormSubmission(status: 'success' | 'error'): void {
    // Analytics tracking - will be implemented in analytics.ts
    if ((window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        'form_name': 'contact',
        'status': status
      })
    }
  }
}

// Initialize contact form
new ContactForm() 