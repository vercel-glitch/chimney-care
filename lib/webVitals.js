// Web Vitals performance monitoring
export function reportWebVitals(metric) {
  // Only track in production
  if (process.env.NODE_ENV !== 'production') return;

  const { name, value, id } = metric;
  

  
  // Send to analytics (Google Analytics example)
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      custom_parameter_1: id,
      custom_parameter_2: Math.round(name === 'CLS' ? value * 1000 : value),
    });
  }
  
  // You can also send to other analytics services here
  // Example: send to custom analytics endpoint
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/web-vitals', JSON.stringify({
      name,
      value,
      id,
      timestamp: Date.now(),
      url: window.location.href,
    }));
  }
}

// Function to track page load performance
export function trackPageLoad() {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('load', () => {
    // Track load time
    const loadTime = performance.now();
    
    // Track DOM content loaded
    if (performance.getEntriesByType) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        // Performance metrics available but not logged
      }
    }
  });
}

// Function to preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;
  
  // Preload next page if it's likely to be visited
  const links = document.querySelectorAll('a[href^="/"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const link = entry.target;
        const href = link.getAttribute('href');
        
        // Preload the page
        const linkEl = document.createElement('link');
        linkEl.rel = 'prefetch';
        linkEl.href = href;
        document.head.appendChild(linkEl);
        
        observer.unobserve(link);
      }
    });
  }, { threshold: 0.1 });
  
  links.forEach((link) => observer.observe(link));
}
