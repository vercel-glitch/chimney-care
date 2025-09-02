// import fs from "fs";  // This is commented out but fs is used later

// Utility function to clean domain names
export const cleanDomain = (domain) => {
  if (!domain) return domain;
  return domain
    .replace(/\s+/g, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");
};

export const getDomain = (host) => {
  const defaultDomain = "abcUsama1122.usama";
  // const defaultDomain = "sanjose-chimney.com";

  if (
    host &&
    !["localhost", "vercel", "amplifyapp.com", "amplifytest"].some((sub) =>
      host.includes(sub)
    )
  ) {
    return cleanDomain(host);
  }
  return defaultDomain;
};

// Check if the domain matches specific test or local domains
const checkDomain = (domain) => {
  return (
    domain &&
    [
      "localhost",
      "vercel",
      "amplifyapp",
      "amplifytest",
      "abcUsama1122.usama",
    ].some((sub) => domain.includes(sub))
  );
};

// Extract subdomain from a full domain
const getSubdomain = (domain) => {
  const parts = domain.replace(/(^\w+:|^)\/\//, "").split(".");
  return parts[0];
};

// New function to fetch all data at once
export const callBackendApiAll = async ({ domain, forceRefresh = false }) => {
  const isTemplateURL = checkDomain(domain);
  const isProjectStagingURL = domain?.endsWith("sitebuilderz.com");
  const slug = isProjectStagingURL ? getSubdomain(domain) : null;

  // Clear cache on deployment/build to ensure fresh data
  const isDeployment =
    process.env.NODE_ENV === "production" &&
    (process.env.VERCEL || process.env.CI || process.env.BUILD_ID);

  if (
    isDeployment &&
    typeof window === "undefined" &&
    !isTemplateURL &&
    !isProjectStagingURL
  ) {
    try {
      const { clearDomainCache } = await import("./serverUtils");
      await clearDomainCache({ domain });
      console.log(`🚀 Deployment detected: Cleared cache for ${domain}`);
    } catch (err) {
      console.warn("Could not clear cache on deployment:", err.message);
    }
  }

  let baseURL;
  if (isTemplateURL) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
  } else if (isProjectStagingURL) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_slug/${slug}/data`;
  } else {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
  }

  // Create cache file path for bulk data
  const fileName = baseURL.replace(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/`,
    ""
  );
  const filePath = `${domain}/${fileName
    .replaceAll(`/${domain}`, "")
    .replaceAll("/", "_")}/bulk_data.json`;

  // Check if cached JSON exists first (server-side only)
  if (
    typeof window === "undefined" &&
    !isTemplateURL &&
    !isProjectStagingURL &&
    !forceRefresh
  ) {
    try {
      const { checkAPIJson } = await import("./serverUtils");
      const cachedData = await checkAPIJson({ filePath });
      if (cachedData && cachedData.data && cachedData.data.length > 0) {
        return cachedData;
      }
    } catch (err) {
      // Server utils not available, skipping JSON check
    }
  }

  try {
    // Add timeout and connection optimization for faster responses
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout for bulk fetch

    const response = await fetch(baseURL, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "User-Agent": "NextJS-App/1.0",
      },
      keepalive: true,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
      error.status = response.status;
      error.statusText = response.statusText;
      error.requestedURL = response.url;
      error.responseBody = await response.text();
      throw error;
    }

    const responseData = await response.json();

    // Save bulk data to JSON cache (server-side only)
    if (
      typeof window === "undefined" &&
      !isTemplateURL &&
      !isProjectStagingURL
    ) {
      try {
        const { saveJson } = await import("./serverUtils");
        await saveJson({ filePath, data: responseData });
      } catch (err) {
        // Server utils not available, skipping JSON save
      }
    }

    return responseData;
  } catch (err) {
    console.error("🚀 ~ callBackendApiAll ~ error:", err);

    // Handle timeout errors specifically
    if (err.name === "AbortError") {
      return {
        error: {
          status: 408,
          statusText: "Request Timeout",
          responseBody: "Bulk request timed out after 15 seconds",
        },
      };
    }

    return {
      error: {
        status: err.status || 500,
        statusText: err.statusText || "Unknown Error",
        responseBody: err.responseBody || err.message,
      },
    };
  }
};

// Helper function to extract specific tag data from bulk response
export const extractTagData = (bulkData, tag) => {
  if (!bulkData || bulkData.error) {
    return null;
  }

  // Handle the actual bulk data structure from the API (uses 'key' field)
  if (bulkData.data && Array.isArray(bulkData.data)) {
    const tagData = bulkData.data.find((item) => item.key === tag);
    return tagData ? { data: [tagData] } : null;
  }

  // Handle direct array (for cached responses that use 'key' field)
  if (Array.isArray(bulkData)) {
    const tagData = bulkData.find((item) => item.key === tag);
    return tagData ? { data: [tagData] } : null;
  }

  // Legacy fallback for old format using 'tag' field
  if (Array.isArray(bulkData)) {
    const tagData = bulkData.find((item) => item.tag === tag);
    return tagData ? { data: [tagData] } : null;
  }

  if (bulkData.data && Array.isArray(bulkData.data)) {
    const tagData = bulkData.data.find((item) => item.tag === tag);
    return tagData ? { data: [tagData] } : null;
  }

  // If bulk data has nested structure, search recursively
  if (typeof bulkData === "object") {
    for (const key in bulkData) {
      if (bulkData[key] && typeof bulkData[key] === "object") {
        if (bulkData[key].key === tag || bulkData[key].tag === tag) {
          return { data: [bulkData[key]] };
        }
        if (Array.isArray(bulkData[key])) {
          const tagData = bulkData[key].find(
            (item) => item.key === tag || item.tag === tag
          );
          if (tagData) {
            return { data: [tagData] };
          }
        }
      }
    }
  }

  return null;
};

// Original function kept for backward compatibility and fallback
export const callBackendApi = async ({
  domain,
  tag = "",
  forceRefresh = false,
}) => {
  const isTemplateURL = checkDomain(domain);
  const isProjectStagingURL = domain?.endsWith("sitebuilderz.com");
  const slug = isProjectStagingURL ? getSubdomain(domain) : null;

  let baseURL;
  if (isTemplateURL) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
  } else if (isProjectStagingURL) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_slug/${slug}/data`;
  } else {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data_by_domain/${domain}/data`;
  }

  const fileName = baseURL.replace(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/`,
    ""
  );
  const filePath = `${domain}/${fileName
    .replaceAll(`/${domain}`, "")
    .replaceAll("/", "_")}/${tag}.json`;

  // Enhanced cache checking
  if (
    typeof window === "undefined" &&
    !isTemplateURL &&
    !isProjectStagingURL &&
    !forceRefresh
  ) {
    try {
      const { checkAPIJson } = await import("./serverUtils");
      const cachedData = await checkAPIJson({ filePath });
      if (cachedData && (cachedData.data || cachedData.error)) {
        return cachedData;
      }
    } catch (err) {
      // Server utils not available, skipping JSON check
    }
  }

  try {
    // Add timeout and connection optimization for faster responses
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${baseURL}/${tag}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "User-Agent": "NextJS-App/1.0",
      },
      keepalive: true,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
      error.status = response.status;
      error.statusText = response.statusText;
      error.requestedURL = response.url;
      error.responseBody = await response.text();
      if (
        response.status === 400 &&
        response.statusText === "Bad Request" &&
        error.responseBody.includes("check your parameter")
      ) {
        return {
          error: {
            status: response.status,
            statusText: response.statusText,
            responseBody: error.responseBody,
          },
        };
      }
      throw error;
    }
    const responseData = await response.json();

    if (
      typeof window === "undefined" &&
      !isTemplateURL &&
      !isProjectStagingURL
    ) {
      try {
        const { saveJson } = await import("./serverUtils");
        await saveJson({ filePath, data: responseData });
      } catch (err) {
        // Server utils not available, skipping JSON save
      }
    }
    return responseData;
  } catch (err) {
    console.error("🚀 ~ callBackendApi ~ error:", err);

    // Handle timeout errors specifically
    if (err.name === "AbortError") {
      return {
        error: {
          status: 408,
          statusText: "Request Timeout",
          responseBody: "Request timed out after 10 seconds",
        },
      };
    }

    return {
      error: {
        status: err.status || 500,
        statusText: err.statusText || "Unknown Error",
        responseBody: err.responseBody || err.message,
      },
    };
  }
};

export const robotsTxt = async ({ domain }) => {};

// Cache management utilities
export const clearCache = async ({ domain, tag = null }) => {
  if (typeof window !== "undefined") {
    return false;
  }

  try {
    const { deleteJson, clearDomainCache } = await import("./serverUtils");

    if (tag) {
      // Clear specific tag cache
      const fileName = `api_public_project_data_by_domain_data`;
      const filePath = `${domain}/${fileName}/${tag}.json`;
      return await deleteJson({ filePath });
    } else {
      // Clear all cache for domain
      return await clearDomainCache({ domain });
    }
  } catch (err) {
    console.error("Error clearing cache:", err);
    return false;
  }
};

// Force refresh API data (bypasses cache)
export const refreshApiData = async ({ domain, tag = null }) => {
  if (tag) {
    return await callBackendApi({ domain, tag, forceRefresh: true });
  } else {
    return await callBackendApiAll({ domain, forceRefresh: true });
  }
};

export const getImagePath = (project_id, domain) => {
  const isTemplateURL = checkDomain(domain);
  // const isProjectStagingURL = domain?.endsWith("sitebuilderz.com");

  let imagePath;
  if (isTemplateURL) {
    imagePath = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
  } else {
    imagePath = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/project_images/${project_id}`;
  }
  //  else {
  //   imagePath = `https://www.${domain}/api/images`;
  // }

  return imagePath;
};

const withBaseUrl = (baseUrl, relativeUrl) =>
  `${!baseUrl.startsWith("https://") ? "https://" : ""}${
    !baseUrl.startsWith("www.") ? "www." : ""
  }${baseUrl}${
    relativeUrl
      ? relativeUrl.startsWith("/")
        ? relativeUrl
        : `/${relativeUrl}`
      : ""
  }`;

export async function getSitemaps({ domain }) {
  const sanitizeSitemapUrl = (text) => {
    if (!text) return "";
    return text
      ?.normalize("NFKC")
      ?.toLowerCase()
      ?.replace(/[\u2013\u2014]/g, "-")
      ?.replaceAll(" - ", "-")
      ?.replaceAll(" | ", "-")
      ?.replaceAll(" ", "-")
      ?.replaceAll(":", "")
      ?.replaceAll("/", "-")
      ?.replaceAll("?", "")
      ?.replaceAll("&", "&amp;");
  };

  try {
    let services_list = [];
    let data;

    // Try to get services from API
    try {
      data = await callBackendApi({ domain, tag: "services_list" });
      if (data?.data?.[0]?.value?.list) {
        services_list = data.data[0].value.list;
      }
    } catch (apiErr) {
      // Error fetching services API
    }

    // If API call failed or returned no services and we're on the server,
    // try to read from local JSON file
    if (services_list.length === 0 && typeof window === "undefined") {
      try {
        const jsonPath = `${process.cwd()}/public/json/${domain}/api_public_project_data_by_domain_data/services_list.json`;
        const { readFileSync } = await import("fs");
        const fileContent = readFileSync(jsonPath, "utf8");
        const servicesData = JSON.parse(fileContent);

        if (servicesData?.data?.[0]?.value?.list) {
          services_list = servicesData.data[0].value.list;
        }
      } catch (fileErr) {
        // Error reading services file
      }
    }

    // If still no services found, try to get services from the "services" endpoint
    if (services_list.length === 0) {
      try {
        const servicesData = await callBackendApi({ domain, tag: "services" });
        if (servicesData?.data?.[0]?.value?.list) {
          services_list = servicesData.data[0].value.list;
        }
      } catch (servicesErr) {
        // Error fetching services endpoint
      }
    }

    // Create the current timestamp in ISO format
    const currentDate = new Date().toISOString();
    const [datePart, timePart] = currentDate.split("T");
    const formattedDate = `${datePart}T${timePart.split(".")[0]}+00:00`;

    // Add home page and services pages
    const urls = [
      {
        loc: withBaseUrl(domain, ""),
        lastmod: formattedDate,
      },
    ];

    // Add service pages if we have any services
    if (services_list && services_list.length > 0) {
      const serviceUrls = services_list.map((item) => ({
        loc: withBaseUrl(domain, `/${sanitizeSitemapUrl(item.title)}`),
        lastmod: formattedDate,
      }));
      urls.push(...serviceUrls);
    }

    // Split into chunks of 200 URLs each (for very large sites)
    const sitemaps = [];
    while (urls.length) {
      sitemaps.push(urls.splice(0, 200));
    }
    return sitemaps;
  } catch (err) {
    console.error(`Error generating sitemap for ${domain}:`, err);
    // Return an empty sitemap array with the home page as fallback
    const currentDate = new Date().toISOString();
    return [
      [
        {
          loc: withBaseUrl(domain, ""),
          lastmod: currentDate,
        },
      ],
    ];
  }
}

export const sanitizeUrl = (text) => {
  return text
    ?.normalize("NFKC")
    ?.toLowerCase()
    ?.replace(/[\u2013\u2014]/g, "-")
    ?.replaceAll(" - ", "-")
    ?.replaceAll(" | ", "-")
    ?.replaceAll(" ", "-")
    ?.replaceAll(":", "")
    ?.replaceAll("/", "-")
    ?.replaceAll("?", "");
};
