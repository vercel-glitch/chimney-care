"use client";
import React from "react";
import Container from "../../common/Container";
import Image from "next/image";
import banner from "../../../public/images/banner.webp";
import FullContainer from "../../common/FullContainer";

export default function Banner({ primaryColor, data }) {
  return (
    <FullContainer className="relative h-[780px]">
      <Image
        title="Banner Image"
        src={banner}
        alt="Professional chimney sweep services"
        priority
        fill
        className="object-cover brightness-75"
      />

      <div className="absolute inset-0 bg-gradient-to-b  from-black/60 via-black/40 to-black/70"></div>
      <Container className="h-full py-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-left md:text-center">
          <div className="flex flex-col gap-4 max-w-2xl ">
            <h1 className="flex flex-col gap-4 text-4xl  md:text-5xl lg:text-6xl font-bold text-white">
              <span className="text-[#90D4E1] drop-shadow-lg ">
                {data?.title}
              </span>
              <span className="block mb-3 text-3xl md:text-4xl lg:text-5xl font-semibold drop-shadow-lg">
                {data?.tagline}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light drop-shadow-md">
              Professional & Reliable Chimney Services You Can Trust
            </p>

            <div className="flex flex-col  sm:flex-row  gap-4 justify-start md:justify-center mt-8">
              <Button
                primaryColor={primaryColor}
                className="transform hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col lg:items-start">
                <span className="text-white/80 text-lg">
                  Need immediate help?
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-white hover:text-[#90D4E1] transition-colors cursor-pointer">
                  Call Us Today
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
