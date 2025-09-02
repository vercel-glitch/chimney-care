"use client";
import { useEffect } from "react";
import Navbar from "../components/container/Navbar/Navbar";
import Footer from "../components/container/Footer";
import Container from "../components/common/Container";
import MarkdownIt from "markdown-it";
import Head from "next/head";

import {
  callBackendApi,
  callBackendApiAll,
  extractTagData,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";
import FullContainer from "@/components/common/FullContainer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import { useRouter } from "next/router";

export default function PrivacyPolicy({
  logo,
  imagePath,
  services,
  domain,
  favicon,
  meta,
  footer,
  policy,
  contact_info,
  city_name,
  phone,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    policy
      ?.replaceAll("##city_name##", city_name)
      ?.replaceAll("##website##", `${domain}`)
      ?.replaceAll("##phone##", `${phone}`)
      ?.replaceAll("(805) 628-4877", `${phone}`)
      ?.replaceAll("(408) 762-6429", `${phone}`)
      ?.replaceAll("(408) 762-6407", `${phone}`)
      ?.replaceAll("(408) 762-6323", `${phone}`)
  );
  const breadcrumbs = useBreadcrumbs();
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    if (currentPath.includes("%20") || currentPath.includes(" ")) {
      router.replace("/privacy-policy");
    }
  }, [currentPath, router]);

  return (
    <main>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title?.replaceAll("##city_name##", city_name)}</title>
        <meta
          name="description"
          content={meta?.description?.replaceAll("##city_name##", city_name)}
        />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/privacy-policy`} />
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
      </Head>

      <Navbar logo={logo} imagePath={imagePath} phone={phone} data={services} />

      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />

          <div
            className="prose prose-h2:!text-start prose-p:!text-[20px]  text-primary max-w-full w-full mb-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </FullContainer>

      <Footer
        domain={domain}
        data={footer}
        logo={logo}
        imagePath={imagePath}
        contact_info={contact_info}
        phone={phone}
      />
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  
  // Ultra-fast: Fetch ALL data in a single API call
  const bulkData = await callBackendApiAll({ domain });
  
  // Extract individual tags from the bulk response
  const logo = extractTagData(bulkData, "logo");
  const services = extractTagData(bulkData, "services");
  const meta = extractTagData(bulkData, "meta_privacy");
  const favicon = extractTagData(bulkData, "favicon");
  const footer = extractTagData(bulkData, "footer");
  const policy = extractTagData(bulkData, "policy");
  const contact_info = extractTagData(bulkData, "contact_info");
  const city_name = extractTagData(bulkData, "city_name");

  const project_id = logo?.data[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);

  let project = null; // Initialize to null to avoid undefined serialization errors
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
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      services: Array.isArray(services?.data[0]?.value)
        ? services?.data[0]?.value
        : [],
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      footer: footer?.data[0] || null,
      policy: policy?.data[0]?.value || null,
      contact_info: contact_info?.data[0]?.value || null,
      city_name: city_name?.data[0]?.value || null,
      phone: project?.phone || null,
    },
  };
}
