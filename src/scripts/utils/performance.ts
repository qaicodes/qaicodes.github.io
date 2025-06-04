// Performance monitoring utility
export class PerformanceMonitor {
  private isProduction: boolean

  constructor() {
    this.isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    this.init()
  }

  private init(): void {
    this.measureCoreWebVitals()
    this.trackResourceLoading()
    this.monitorLongTasks()
  }

  private measureCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    this.measureLCP()
    
    // First Input Delay (FID)
    this.measureFID()
    
    // Cumulative Layout Shift (CLS)
    this.measureCLS()
  }

  private measureLCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        
        if (lastEntry) {
          const lcp = lastEntry.startTime
          this.reportMetric('LCP', lcp)
          
          // Stop observing after first meaningful paint
          observer.disconnect()
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('LCP measurement not supported:', error)
    }
  }

  private measureFID(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = entry.processingStart - entry.startTime
          this.reportMetric('FID', fid)
        }
      })
      
      observer.observe({ entryTypes: ['first-input'], buffered: true })
    } catch (error) {
      console.warn('FID measurement not supported:', error)
    }
  }

  private measureCLS(): void {
    try {
      let clsValue = 0
      let clsEntries: PerformanceEntry[] = []

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only count unexpected layout shifts
          if (!(entry as any).hadRecentInput) {
            clsEntries.push(entry)
            clsValue += (entry as any).value
          }
        }
      })

      observer.observe({ entryTypes: ['layout-shift'], buffered: true })

      // Report CLS when page visibility changes or page unloads
      const reportCLS = () => {
        this.reportMetric('CLS', clsValue)
      }

      document.addEventListener('visibilitychange', reportCLS)
      window.addEventListener('beforeunload', reportCLS)
    } catch (error) {
      console.warn('CLS measurement not supported:', error)
    }
  }

  private trackResourceLoading(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        // DNS lookup time
        const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart
        this.reportMetric('DNS_Time', dnsTime)
        
        // Connection time
        const connectTime = navigation.connectEnd - navigation.connectStart
        this.reportMetric('Connection_Time', connectTime)
        
        // Time to First Byte (TTFB)
        const ttfb = navigation.responseStart - navigation.requestStart
        this.reportMetric('TTFB', ttfb)
        
        // DOM Content Loaded
        const dcl = navigation.domContentLoadedEventEnd - navigation.navigationStart
        this.reportMetric('DCL', dcl)
        
        // Load Complete
        const loadComplete = navigation.loadEventEnd - navigation.navigationStart
        this.reportMetric('Load_Complete', loadComplete)
      }
    })
  }

  private monitorLongTasks(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportMetric('Long_Task', entry.duration)
        }
      })
      
      observer.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      console.warn('Long task monitoring not supported:', error)
    }
  }

  private reportMetric(name: string, value: number): void {
    const metric = {
      name,
      value: Math.round(value),
      timestamp: Date.now(),
      url: window.location.href
    }

    if (this.isProduction) {
      // Send to analytics or monitoring service
      this.sendToAnalytics(metric)
    } else {
      // Log to console in development
      console.log('Performance Metric:', metric)
    }
  }

  private sendToAnalytics(metric: any): void {
    // Send to Google Analytics as custom event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        metric_name: metric.name,
        metric_value: metric.value,
        custom_parameter_url: metric.url
      })
    }

    // You could also send to other monitoring services like:
    // - New Relic
    // - DataDog
    // - Sentry Performance
    // - Your own analytics endpoint
  }

  // Public method to measure custom metrics
  public measureCustom(name: string, startTime: number): void {
    const endTime = performance.now()
    const duration = endTime - startTime
    this.reportMetric(`Custom_${name}`, duration)
  }

  // Measure paint timing
  public measurePaintTiming(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportMetric(entry.name.replace('-', '_'), entry.startTime)
        }
      })
      
      observer.observe({ entryTypes: ['paint'] })
    } catch (error) {
      console.warn('Paint timing not supported:', error)
    }
  }

  // Memory usage monitoring
  public monitorMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      
      setInterval(() => {
        this.reportMetric('Memory_Used', memory.usedJSHeapSize)
        this.reportMetric('Memory_Total', memory.totalJSHeapSize)
        this.reportMetric('Memory_Limit', memory.jsHeapSizeLimit)
      }, 30000) // Report every 30 seconds
    }
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor()

// Add custom performance marks for key events
document.addEventListener('DOMContentLoaded', () => {
  performance.mark('dom-content-loaded')
  performanceMonitor.measurePaintTiming()
})

window.addEventListener('load', () => {
  performance.mark('window-loaded')
  performanceMonitor.monitorMemoryUsage()
})

export { performanceMonitor } 