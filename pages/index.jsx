import Head from "next/head";
import dynamic from "next/dynamic";
import Banner from "../components/container/home/Banner";
import Navbar from "../components/container/Navbar/Navbar";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import CallButton from "@/components/CallButton";

import {
  callBackendApiAll,
  extractTagData,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

// Dynamic imports for components below the fold with loading optimization
const WhyChoose = dynamic(
  () => import("../components/container/home/WhyChoose"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);
const ServiceCities = dynamic(
  () => import("../components/container/ServiceCities"),
  {
    loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
  }
);
const FAQs = dynamic(() => import("../components/container/FAQs"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const Testimonials = dynamic(
  () => import("../components/container/Testimonials"),
  {
    loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
  }
);
const About = dynamic(() => import("../components/container/home/About"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const Footer = dynamic(() => import("../components/container/Footer"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});
const Contact = dynamic(() => import("../components/container/Contact"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});
const ServiceBenefits = dynamic(
  () => import("../components/container/home/ServiceBenefits"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);
const FullMonthPromotion = dynamic(() => import("@/components/Promotion"), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />,
});
const OurServices = dynamic(
  () => import("@/components/container/home/OurServices"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});

export default function Home({
  contact_info,
  logo,
  imagePath,
  project_id,
  banner,
  services,
  features,
  about,
  benefits,
  testimonials,
  meta,
  domain,
  favicon,
  footer,
  locations,
  faqs,
  why_us,
  prices,
  slogan_1,
  form_head,
  city_name,
  phone_data,
  project,
}) {
  // Try to get phone from multiple sources: project data first, then phone_data, then contact_info
  const phone =
    project?.phone ||
    phone_data?.data?.[0]?.value ||
    contact_info?.phone ||
    contact_info?.phone_number ||
    contact_info?.contact_number ||
    contact_info?.mobile ||
    contact_info?.telephone ||
    contact_info?.tel ||
    null;

  // Extract GTM ID from project data
  const gtm_id = project?.additional_config?.gtm_id || null;

  // Extract niche from project data
  const niche = project?.domain_id?.niche_id?.name || null;



  return (
    <div className="bg-white">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title?.replaceAll("##city_name##", city_name)}</title>
        <meta
          name="description"
          content={meta?.description?.replaceAll("##city_name##", city_name)}
        />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${favicon}`}
        />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SITE_MANAGER} />

        {/* Preload LCP banner image for faster loading */}
        {banner?.file_name && (
          <>
            <link
              rel="preload"
              as="image"
              href={`${imagePath}/${banner.file_name}`}
              fetchPriority="high"
            />
            <link
              rel="preload"
              as="image"
              href={`${imagePath}/${banner.file_name}`}
              type="image/webp"
              fetchPriority="high"
            />
          </>
        )}

        {/* Preload logo for above-the-fold content */}
        {logo?.file_name && (
          <link
            rel="preload"
            as="image"
            href={`${imagePath}/${logo.file_name}`}
            fetchPriority="high"
          />
        )}

        {/* Critical CSS hint */}
        <link rel="preload" href="/_next/static/css/" as="style" />

        {/* <!-- Google Tag Manager --> */}
        {gtm_id && gtm_id !== "null" && gtm_id !== "undefined" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  if (!window.gtmLoaded && typeof window !== 'undefined') {
                    window.gtmLoaded = true;
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${gtm_id}');
                  }
                `,
            }}
          />
        )}
        {/* <!-- End Google Tag Manager --> */}
      </Head>
      {/* {gtm_id && gtm_id} */}
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtm_id}`}
          height="0"
          width="10"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}

      <div>
        <Navbar
          logo={logo}
          imagePath={imagePath}
          phone={phone}
          data={services}
        />
        <Banner
          data={banner?.value}
          image={`${imagePath}/${banner?.file_name}`}
          imagePath={imagePath}
          phone={phone}
          form_head={form_head}
          features={features?.value}
          niche={niche}
        />

        <FullMonthPromotion why_us={why_us} prices={prices} />
        {testimonials && (
          <Testimonials logo={logo} imagePath={imagePath} data={testimonials} />
        )}

        <BeforeAfter project_id={project_id} niche={niche} />

        <OurServices data={services} phone={phone} imagePath={imagePath} />

        <WhyChoose
          data={features?.value}
          image={`${imagePath}/${features?.file_name}`}
          phone={phone}
        />

        {/* <Gallery
          data={gallery_head}
          gallery={gallery}
          imagePath={imagePath}
          phone={phone}
        /> */}

        {/* Slogan 1 */}
        <FullContainer className="bg-white pt-6 md:pt-10 flex flex-col items-center justify-center">
          <Container className="text-center flex flex-col items-center justify-center">
            <h2 className="text-3xl font-extrabold text-[#1A2956] mb-4">
              {slogan_1?.title}
            </h2>
            <p className="text-base md:text-lg text-[#1A2956] mb-4">
              {slogan_1?.description}
            </p>
          </Container>
        </FullContainer>

        <About
          services={services?.list}
          data={about?.value}
          image={`${imagePath}/${about?.file_name}`}
          city_name={city_name}
        />

        <ServiceBenefits
          phone={phone}
          data={benefits?.value}
          image={`${imagePath}/${benefits?.file_name}`}
        />

        <div id="contact-us">
          <Contact />
        </div>
        <FAQs faqs={faqs} city_name={city_name} />
        <ServiceCities data={locations} />
        <Footer
          domain={domain}
          data={footer}
          logo={logo}
          imagePath={imagePath}
          contact_info={contact_info}
          phone={phone}
        />
      </div>

      {/* Fixed Call Button */}
      <CallButton phone={phone} />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  try {
    // ⚡ ULTRA-FAST: Single bulk data fetch
    const bulkData = await callBackendApiAll({ domain });

    // Extract logo to get project_id for parallel project info fetch
    const logo = extractTagData(bulkData, "logo");
    const project_id = logo?.data[0]?.project_id || null;

    // Fetch project data for GTM ID, niche, and phone
    let project = null;
    if (project_id) {
      try {
        const projectInfoResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/get_project_info/${project_id}`
        );

        if (projectInfoResponse.ok) {
          const projectInfoData = await projectInfoResponse.json();
          project = projectInfoData?.data || null;
        } else {
          console.error(
            "Failed to fetch project info:",
            projectInfoResponse.status
          );
          project = null;
        }
      } catch (error) {
        console.error("Error fetching project info:", error);
        project = null;
      }
    }

    // ⚡ PARALLEL: Process data extraction while waiting for project info
    const [
      // Extract individual tags from the bulk response
      faqs,
      contact_info,
      banner,
      services,
      features,
      about,
      benefits,
      testimonials,
      meta,
      favicon,
      footer,
      locations,
      why_us,
      prices,
      slogan_1,
      form_head,
      city_name,
      phone_data,
      imagePath,
    ] = await Promise.all([
      Promise.resolve(extractTagData(bulkData, "faqs")),
      Promise.resolve(extractTagData(bulkData, "contact_info")),
      Promise.resolve(extractTagData(bulkData, "banner")),
      Promise.resolve(extractTagData(bulkData, "services")),
      Promise.resolve(extractTagData(bulkData, "features")),
      Promise.resolve(extractTagData(bulkData, "about")),
      Promise.resolve(extractTagData(bulkData, "benefits")),
      Promise.resolve(extractTagData(bulkData, "testimonials")),
      Promise.resolve(extractTagData(bulkData, "meta_home")),
      Promise.resolve(extractTagData(bulkData, "favicon")),
      Promise.resolve(extractTagData(bulkData, "footer")),
      Promise.resolve(extractTagData(bulkData, "locations")),
      Promise.resolve(extractTagData(bulkData, "why_us")),
      Promise.resolve(extractTagData(bulkData, "prices")),
      Promise.resolve(extractTagData(bulkData, "slogan_1")),
      Promise.resolve(extractTagData(bulkData, "form_head")),
      Promise.resolve(extractTagData(bulkData, "city_name")),
      Promise.resolve(extractTagData(bulkData, "phone")),
      getImagePath(project_id, domain),
    ]);

    robotsTxt({ domain });

    // Keep secret variables server-side only
    return {
      props: {
        contact_info: contact_info?.data[0]?.value || null,
        domain,
        imagePath,
        project_id,
        faqs: faqs?.data[0]?.value || null,
        logo: logo?.data[0] || null,
        banner: banner?.data[0] || null,
        services: Array.isArray(services?.data[0]?.value)
          ? services?.data[0]?.value
          : [],
        features: features?.data[0] || null,
        about: about?.data[0] || null,
        benefits: benefits?.data[0] || null,
        testimonials: testimonials?.data[0]?.value || null,
        meta: meta?.data[0]?.value || null,
        favicon: favicon?.data[0]?.file_name || null,
        footer: footer?.data[0] || null,
        locations: locations?.data[0]?.value || {},
        why_us: Array.isArray(why_us?.data[0]?.value)
          ? why_us?.data[0]?.value
          : [],
        prices: prices?.data[0]?.value || null,
        slogan_1: slogan_1?.data[0]?.value || null,
        form_head: form_head?.data[0]?.value || null,
        city_name: city_name?.data[0]?.value || null,
        phone_data: phone_data || null,
        project: project || null,
      },
    };
  } catch (error) {
    console.error("Critical error in getServerSideProps:", error);
    // Return minimal fallback data
    return {
      props: {
        contact_info: null,
        domain,
        imagePath: "",
        project_id: null,
        faqs: null,
        logo: null,
        banner: null,
        services: [],
        features: null,
        about: null,
        benefits: null,
        testimonials: null,
        meta: null,
        favicon: null,
        footer: null,
        locations: {},
        why_us: [],
        prices: null,
        slogan_1: null,
        form_head: null,
        city_name: null,
        phone_data: null,
        project: null,
      },
    };
  }
}
