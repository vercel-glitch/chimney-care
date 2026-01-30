import Document, { Html, Head, Main, NextScript } from "next/document";
import { getDomain, extractTagData } from "@/lib/myFun";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    
    let gtm_id = null;
    
    try {
      // Get domain using existing utility
      const domain = getDomain(ctx.req?.headers?.host);
      
      // Determine API base URL
      const siteManager = process.env.NEXT_PUBLIC_SITE_MANAGER;
      const testDomains = ['localhost', 'vercel', 'amplifyapp', 'amplifytest'];
      const isTemplateURL = domain && testDomains.some(sub => domain.includes(sub));
      const isProjectStagingURL = domain?.endsWith('sitebuilderz.com');
      
      let baseURL;
      if (isTemplateURL) {
        baseURL = `${siteManager}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
      } else if (isProjectStagingURL) {
        const slug = domain.split('.')[0];
        baseURL = `${siteManager}/api/public/project_data_by_slug/${slug}/data`;
      } else {
        baseURL = `${siteManager}/api/public/project_data_by_domain/${domain}/data`;
      }
      
      // Fetch bulk data
      const response = await fetch(baseURL, { headers: { Accept: 'application/json' } });
      
      if (response.ok) {
        const bulkData = await response.json();
        const logo = extractTagData(bulkData, 'logo');
        const project_id = logo?.data?.[0]?.project_id;
        
        if (project_id) {
          // Fetch GTM ID from project info
          const projectResponse = await fetch(`${siteManager}/api/public/get_project_info/${project_id}`);
          if (projectResponse.ok) {
            const projectData = await projectResponse.json();
            gtm_id = projectData?.data?.additional_config?.gtm_id || null;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching GTM ID in _document:', error);
    }
    
    return { ...initialProps, gtm_id };
  }

  render() {
    const { gtm_id } = this.props;
    const isValidGtmId = gtm_id && gtm_id !== 'null' && gtm_id !== 'undefined';

    return (
      <Html lang="en" data-gtm-id={isValidGtmId ? gtm_id : ''}>
        <Head>
          {/* Service Worker Registration */}
          {process.env.NODE_ENV === "production" && (
            <script
              dangerouslySetInnerHTML={{
                __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').then(function(registration){}).catch(function(registrationError){});});}`,
              }}
            />
          )}
        </Head>
        <body className="antialiased">
          {/* GTM Injector Script - Runs immediately to inject GTM at top of head */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var gtmId = document.documentElement.getAttribute('data-gtm-id');
                  if (gtmId && gtmId !== '' && gtmId !== 'null' && gtmId !== 'undefined') {
                    var script = document.createElement('script');
                    script.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + gtmId + "');";
                    document.head.insertBefore(script, document.head.firstChild);
                  }
                })();
              `,
            }}
          />
          
          {/* Google Tag Manager (noscript) */}
          {isValidGtmId && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          )}
          {/* End Google Tag Manager (noscript) */}
          
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
