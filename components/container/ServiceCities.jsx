"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import Heading from "../common/Heading";

export default function ServiceCities({ data }) {
  const cities = data?.list || [];

  // Memoize the cities list for performance
  const displayCities = useMemo(() => {
    return cities; // Show all cities
  }, [cities]);

  return (
    <FullContainer className="pt-6 overflow-hidden" id="locations">
      <Container className="relative pb-14 pr-4">
        {/* Background Map */}
        <div className="absolute inset-0 z-0">
          <Image
            title="Service Cities Map"
            src="/st-images/maap.webp"
            alt="Service Cities"
            className="w-full h-full object-cover object-center opacity-10"
            fill
            loading="lazy"
          />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>

        {/* Header Section */}
        <div className="relative">
          <Heading text="Service Cities" className="pb-6 pt-12" />

          <div className="grid md:px-2 z-30 grid-cols-3 gap-y-[6px] gap-x-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {displayCities?.map((city, index) => (
              <div key={index} className="flex items-center">
                {/* Use CSS for icon instead of Image component to reduce DOM */}
                <MapPin className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] mr-[10px] text-primary flex-shrink-0" />
                <span className="text-primary text-[13.5px] md:text-[19.5px] font-barlow font-[500] leading-tight md:leading-none">
                  {city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
