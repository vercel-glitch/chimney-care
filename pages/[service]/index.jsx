import dynamic from "next/dynamic";
import Navbar from "../../components/container/Navbar/Navbar";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ServiceBanner from "@/components/container/ServiceBanner";

import {
  callBackendApi,
  callBackendApiAll,
  extractTagData,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

import { useRouter } from "next/router";
import Head from "next/head";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Link from "next/link";
import { Phone } from "lucide-react";
import CallButton from "@/components/CallButton";

// Dynamic imports for components below the fold with loading optimization
const FAQs = dynamic(() => import("../../components/container/FAQs"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});
const Contact = dynamic(() => import("../../components/container/Contact"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});
const ServiceCities = dynamic(() => import("../../components/container/ServiceCities"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />
});
const Footer = dynamic(() => import("../../components/container/Footer"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />
});
const Gallery = dynamic(() => import("../../components/container/home/Gallery"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});
const ServiceDescription = dynamic(() => import("../../components/container/services/ServiceDescription"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />
});
const ServiceDescription1 = dynamic(() => import("../../components/container/services/ServicwDescription1"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />
});
const ServiceDescription2 = dynamic(() => import("../../components/container/services/ServicwDescription2"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />
});
const ServiceText = dynamic(() => import("../../components/container/services/ServiceText"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />
});

const capitalizeFirstLetterOfEachWord = (string) => {
  return string
    ?.split(" ")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

export default function Service({
  contact_info,
  logo,
  services,
  imagePath,
  gallery,
  footer,
  meta,
  domain,
  favicon,
  locations,
  service_banner,
  state_,
  faqs,
  service_text1,
  service_text2,
  service_description,
  service_description1,
  service_description2,
  city_name,
  service_why,
  form_head,
  features,
  phone,
}) {
  const router = useRouter();
  const { service } = router.query;
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title
            ?.replaceAll(
              "##service##",
              capitalizeFirstLetterOfEachWord(service?.replaceAll("-", " "))
            )
            ?.replaceAll(
              "##city_name##",
              capitalizeFirstLetterOfEachWord(city_name)
            )}
        </title>
        <meta
          name="description"
          content={meta?.description
            ?.replaceAll(
              "##service##",
              capitalizeFirstLetterOfEachWord(service?.replaceAll("-", " "))
            )
            ?.replaceAll(
              "##city_name##",
              capitalizeFirstLetterOfEachWord(city_name)
            )}
        />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/${service}`} />
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar logo={logo} imagePath={imagePath} phone={phone} data={services} />

      <ServiceBanner
        data={service_banner?.value}
        image={`${imagePath}/${service_banner?.file_name}`}
        imagePath={imagePath}
        phone={phone}
        form_head={form_head}
        features={features?.value}
      />
      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="pt-7" />
        </Container>
      </FullContainer>

      {service_description?.value && (
        <ServiceDescription
          data={service_description?.value}
          image={`${imagePath}/${service_banner?.file_name}`}
          phone={phone}
          service={service}
          city_name={city_name}
          state_={state_}
        />
      )}

      <Gallery
        phone={phone}
        gallery={gallery}
        service={service}
        data={service_why?.value}
        city_name={city_name}
        file_names={service_why?.file_names}
        imagePath={imagePath}
      />

      {service_description1?.value && (
        <ServiceDescription1
          data={service_description1?.value}
          service={service}
          city_name={city_name}
          state_={state_}
        />
      )}

      {service_description2?.value && (
        <ServiceDescription2
          data={service_description2?.value}
          phone={phone}
          service={service}
          city_name={city_name}
          state_={state_}
        />
      )}

      <ServiceText
        phone={phone}
        data={service_text1}
        service={service}
        data2={service_text2}
      />
      <div id="quote-form-section">
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

      {/* Fixed Call Button */}
      <CallButton phone={phone} />
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const domain = getDomain(req?.headers?.host);
  const { service } = params; // Extract service name from route parameters

  // Ultra-fast: Fetch ALL data in a single API call
  const bulkData = await callBackendApiAll({ domain });
  
  // Extract individual tags from the bulk response
  const faqs = extractTagData(bulkData, "faqs");
  const service_text1 = extractTagData(bulkData, "service_text1");
  const service_text2 = extractTagData(bulkData, "service_text2");
  const contact_info = extractTagData(bulkData, "contact_info");
  const logo = extractTagData(bulkData, "logo");
  const services = extractTagData(bulkData, "services");
  const features = extractTagData(bulkData, "features");
  const gallery = extractTagData(bulkData, "gallery");
  const meta = extractTagData(bulkData, "meta_service");
  const favicon = extractTagData(bulkData, "favicon");
  const footer = extractTagData(bulkData, "footer");
  const locations = extractTagData(bulkData, "locations");
  const service_why = extractTagData(bulkData, `service-why-${service}`);
  const service_banner = extractTagData(bulkData, "service_banner");
  const service_description = extractTagData(bulkData, "service_description");
  const service_description1 = extractTagData(bulkData, "service_description1");
  const service_description2 = extractTagData(bulkData, "service_description2");
  const city_name = extractTagData(bulkData, "city_name");
  const form_head = extractTagData(bulkData, "form_head");
  const state_ = extractTagData(bulkData, "state_");
  const phone_data = extractTagData(bulkData, "phone");

  const project_id = logo?.data[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);

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

  robotsTxt({ domain });



  return {
    props: {
      contact_info: contact_info?.data[0]?.value || null,
      service_why: service_why?.data[0] || null,
      faqs: faqs?.data[0]?.value || null,
      service_text1: service_text1?.data[0]?.value || null,
      service_text2: service_text2?.data[0]?.value || null,
      service_banner: service_banner?.data[0] || null,
      state_: state_?.data[0]?.value || null,
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      services: Array.isArray(services?.data[0]?.value) ? services?.data[0]?.value : [],
      features: features?.data[0] || null,
      gallery: Array.isArray(gallery?.data[0]?.value) ? gallery?.data[0]?.value : [],
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      footer: footer?.data[0] || null,
      locations: locations?.data[0]?.value || {},
      service_description: service_description?.data[0] || null,
      service_description1: service_description1?.data[0] || null,
      service_description2: service_description2?.data[0] || null,
      city_name: city_name?.data[0]?.value || null,
      form_head: form_head?.data[0]?.value || null,
      phone: project?.phone ||
             phone_data?.data?.[0]?.value ||
             contact_info?.data[0]?.value?.phone || 
             contact_info?.data[0]?.value?.phone_number || 
             contact_info?.data[0]?.value?.contact_number ||
             contact_info?.data[0]?.value?.mobile ||
             contact_info?.data[0]?.value?.telephone ||
             contact_info?.data[0]?.value?.tel ||
             null,
    },
  };
}
