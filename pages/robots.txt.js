import { getDomain } from "@/lib/myFun";

const RobotsTxt = () => null;
export default RobotsTxt;

export const getServerSideProps = async ({ req, res }) => {
  try {
    const domain = getDomain(req?.headers?.host);
    const fullDomain = domain.startsWith('www.') ? domain : `www.${domain}`;
    
    // Generate default robots.txt content
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

# Sitemaps
Sitemap: https://${fullDomain}/sitemap.xml
`;

    res.setHeader('Content-Type', 'text/plain');
    res.write(robotsTxt);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    // Return basic robots.txt on error
    res.setHeader('Content-Type', 'text/plain');
    res.write(`User-agent: *\nAllow: /\nDisallow: /api/`);
    res.end();
    
    return {
      props: {},
    };
  }
};
