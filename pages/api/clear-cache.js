// API endpoint to clear cache manually
import { clearCache, refreshApiData } from "@/lib/myFun";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { domain, tag, action = "clear" } = req.body;

    if (!domain) {
      return res.status(400).json({ error: "Domain is required" });
    }

    let result;
    if (action === "clear") {
      result = await clearCache({ domain, tag });
      res.json({ 
        success: result, 
        message: tag 
          ? `Cache cleared for ${tag} on ${domain}` 
          : `All cache cleared for ${domain}` 
      });
    } else if (action === "refresh") {
      result = await refreshApiData({ domain, tag });
      res.json({ 
        success: !!result, 
        message: tag 
          ? `Refreshed ${tag} data for ${domain}` 
          : `Refreshed all data for ${domain}`,
        data: result
      });
    } else {
      res.status(400).json({ error: "Invalid action. Use 'clear' or 'refresh'" });
    }
  } catch (error) {
    console.error("Cache management error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
