import { extractTagData, getDomain } from "@/lib/myFun";
import { Html, Head, Main, NextScript } from "next/document";

const isValidGtmId = (gtm_id) => {
  return gtm_id && gtm_id !== "null" && gtm_id !== "undefined";
};

export default function Document({ gtm_id }) {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        // Service worker registered
                      })
                      .catch(function(registrationError) {
                        // Service worker registration failed
                      });
                  });
                }
              `,
            }}
          />
        )}
      </Head>
      <body className="antialiased">
        {isValidGtmId(gtm_id) && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm_id}`}
              height="0"
              width="10"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  let gtm_id = null;

  try {
    const domain = getDomain(ctx.req?.headers?.host);
    const baseURL = getApiBaseUrl(domain);
    
    const response = await fetch(baseURL, {
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const bulkData = await response.json();
      const logo = extractTagData(bulkData, "logo");
      const project_id = logo?.data[0]?.project_id || bulkData?.project_id;

      if (project_id) {
        gtm_id = await fetchGtmId(project_id);
      }
    }
  } catch (error) {
    console.error("Error in Document.getInitialProps:", error);
  }

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    });

  const { default: DocumentBase } = await import("next/document");
  const initialProps = await DocumentBase.getInitialProps(ctx);

  return {
    ...initialProps,
    gtm_id,
  };
};

// Helper function to determine API base URL based on domain type
const getApiBaseUrl = (domain) => {
  const siteManager = process.env.NEXT_PUBLIC_SITE_MANAGER;
  const testDomains = ["localhost", "vercel", "amplifyapp", "amplifytest"];
  const isTemplateURL = domain && testDomains.some((sub) => domain.includes(sub));
  const isProjectStagingURL = domain?.endsWith("sitebuilderz.com");

  if (isTemplateURL) {
    return `${siteManager}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
  }

  if (isProjectStagingURL) {
    const slug = domain.replace(/(^\w+:|^)\/\//, "").split(".")[0];
    return `${siteManager}/api/public/project_data_by_slug/${slug}/data`;
  }

  return `${siteManager}/api/public/project_data_by_domain/${domain}/data`;
};

// Helper function to fetch GTM ID from project info
const fetchGtmId = async (project_id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/get_project_info/${project_id}`
    );

    if (response.ok) {
      const data = await response.json();
      return data?.data?.additional_config?.gtm_id || null;
    }
  } catch (error) {
    console.error("Error fetching project info:", error);
  }
  return null;
};
