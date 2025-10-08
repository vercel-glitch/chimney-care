import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

import {
  CheckCircle,
  Clock,
  Star,
  Shield,
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import QuoteForm from "@/components/common/QuoteForm";

export default function Banner({
  image,
  data,
  form_head,
  features,
  phone,
  variant = "home", // "home" or "service"
}) {
  const router = useRouter();
  const { service } = router.query;

  const iconMap = {
    Clock,
    Star,
    Shield,
    Award,
    CheckCircle,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
  };

  // Determine content differences based on variant
  const isService = variant === "service";

  return (
    <FullContainer className="relative bg-white overflow-hidden w-full md:!h-[790px] lg:!h-auto">
      <div className="absolute inset-0 w-full h-[600px] md:min-h-[790px] overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority={true}
          fill
          sizes="100vw"
          className="w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      <Container className="py-20 md:pb-36 font-barlow relative z-10 mt-10 md:mt-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-banner gap-16 md:gap-[66px] text-white">
          <div className="relative -mt-10 flex items-center md:items-start flex-col justify-center">
            {/* Title handling for both home and service pages */}
            <h1 className="font-[900] uppercase text-4xl lg:text-[54px] mt-3 px-4 md:px-0 md:text-6xl leading-tight text-center md:text-start lg:text-left text-shadow-lg">
              {isService
                ? data?.heading?.replaceAll(
                    "##service##",
                    service?.replace(/-/g, " ")
                  )
                : data?.title}
            </h1>
            <h2 className="text-[28px] md:px-0 md:text-2xl uppercase font-[900] leading-tight text-[#90D4E1] text-center md:text-start lg:text-left mt-2">
              {isService
                ? data?.tagline?.replaceAll(
                    "##service##",
                    service?.replace(/-/g, " ")
                  )
                : data?.tagline}
            </h2>

            <p className="text-[16px] md:text-3xl text-center md:text-start lg:text-left mt-4 mb-1">
              {data?.description}
            </p>

            {/* Features/List rendering with consistent styling */}
            <ul className="mb-6 space-y-1 md:space-y-2">
              {isService
                ? // Service page - simple list with checkmarks
                  Array.isArray(data?.list) &&
                  data?.list?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white font-medium text-base md:text-[17px]"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                      {item}
                    </li>
                  ))
                : // Home page - features with icons
                  Array.isArray(features) &&
                  features?.map((feature, idx) => {
                    const IconComponent = iconMap[feature.icon];
                    return (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-white font-medium text-base md:text-[17px]"
                      >
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-white" />
                        )}
                        {feature.text}
                      </li>
                    );
                  })}
            </ul>

            {/* Phone button - show on both pages */}
            <div className="">
              <button className="flex items-center gap-3 bg-gradient-to-br from-blue-800 via-sky-500 from-20% to-green-400 text-white px-6 py-3 rounded-full text-3xl font-semibold">
                <Phone className="w-6 h-6" />
                {phone}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <QuoteForm
              data={data}
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
