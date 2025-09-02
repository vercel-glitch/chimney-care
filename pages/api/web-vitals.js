// API endpoint to collect Web Vitals metrics
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const metric = JSON.parse(req.body);
    const { name, value, id, timestamp, url } = metric;

    // Metric received (in production, you'd save to database or analytics service)

    // Here you can:
    // 1. Save to database
    // 2. Send to analytics service
    // 3. Alert if metrics are poor
    
    // Example: Alert on poor Core Web Vitals
    const thresholds = {
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1,  // Cumulative Layout Shift
      FCP: 1800, // First Contentful Paint
      TTFB: 800, // Time to First Byte
    };

    if (thresholds[name] && value > thresholds[name]) {
      // Poor performance detected - could send alerts here
      // await sendSlackAlert(`Poor ${name} performance on ${url}: ${value}ms`);
    }

    res.status(200).json({ success: true, received: { name, value, id } });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Configure body parser
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1kb',
    },
  },
}
