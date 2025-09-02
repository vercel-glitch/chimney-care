import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function About({ image, data, city_name }) {
  return (
    <FullContainer className="py-4 md:py-8 " id="about-us">
      <Container className="relative overflow-hidden !px-0 md:!px-4">
        <div className="relative">
          {/* Image with overlay */}
          <div className="relative">
            <Image
              title="About Image"
              src={image}
              alt="About"
              width={1500}
              height={1500}
              className="w-full h-[580px] sm:h-[400px] md:h-[310px] object-cover"
              loading="lazy"
              sizes="100vw"
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-gray-950/60"></div>
          </div>

          {/* Centered heading */}
          <div className="absolute inset-0 flex items-center justify-center px-4 flex-col gap-4 text-center">
            <h2
              className={`text-white text-[26px] md:text-[28px] font-bold z-10`}
            >
              {data?.heading?.replaceAll("##city_name##", city_name)}
            </h2>
            <p className={`text-white text-[22px] leading-none z-10`}>
              {data?.description1?.replaceAll("##city_name##", city_name)}
            </p>
            <p className={`text-white text-[22px] leading-none z-10`}>
              {data?.description2?.replaceAll("##city_name##", city_name)}
            </p>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
