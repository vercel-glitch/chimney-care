import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";

export default function About({ image, data, city_name, phone }) {
  return (
    <FullContainer className="pb-12 bg-gray-50" id="about-us">
      <Container className="max-w-7xl mx-auto -mt-7 md:-mt-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Text Content - Left Side */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="max-w-lg">
                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3">
                      {data?.heading?.replaceAll("##city_name##", city_name)}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"></div>
                  </div>

                  <div className="space-y-3 text-gray-600">
                    <p className="text-sm md:text-base leading-relaxed">
                      {data?.description1?.replaceAll(
                        "##city_name##",
                        city_name
                      )}
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      {data?.description2?.replaceAll(
                        "##city_name##",
                        city_name
                      )}
                    </p>
                  </div>

                  {/* Phone Button */}
                  <PrimaryPhone phone={phone} />
                </div>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[300px] md:h-[400px] lg:h-full rounded-xl overflow-hidden">
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
