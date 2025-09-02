import { callBackendApi, getDomain } from "@/lib/myFun";

/**
 * Secure API endpoint to fetch sensitive configuration
 * This keeps secrets server-side and prevents them from being
 * exposed in the __NEXT_DATA__ script
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the domain from the request headers (same as getServerSideProps)
    const domain = getDomain(req.headers.host);
    
    // What configuration we want to fetch is specified in the query
    const { configType } = req.query;
    
    if (!configType) {
      return res.status(400).json({ error: 'Missing configType parameter' });
    }
    
    // Only allow specific configuration types to be fetched
    const allowedTypes = ['gtm', 'analytics'];
    
    if (!allowedTypes.includes(configType)) {
      return res.status(400).json({ error: 'Invalid configType' });
    }
    
    // Handle GTM configuration
    if (configType === 'gtm') {
      const gtmId = await callBackendApi({ domain, tag: "gtmId" });
      const gtm_head = await callBackendApi({ domain, tag: "gtm_head" });
      const gtm_body = await callBackendApi({ domain, tag: "gtm_body" });
      
      return res.status(200).json({
        gtmId: gtmId?.data?.[0]?.value || null,
        gtm_head: gtm_head?.data?.[0]?.value || null,
        gtm_body: gtm_body?.data?.[0]?.value || null,
      });
    }
    
    // Handle other configuration types
    if (configType === 'analytics') {
      // Fetch analytics configuration
      const analytics = await callBackendApi({ domain, tag: "analytics" });
      
      return res.status(200).json({
        analytics: analytics?.data?.[0]?.value || null,
      });
    }
    
    // If we somehow get here
    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 