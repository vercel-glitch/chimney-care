import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Image from "next/image";
import React, { useMemo } from "react";

const PLACEHOLDER = "/placeholder-service.jpg"; // Place a placeholder image in your public folder

export default function OurServices({ phone, data, imagePath }) {
  // Limit services to reduce DOM size and improve performance
  const displayServices = useMemo(() => {
    const services = Array.isArray(data) ? data : [];
    return services.slice(0, 8); // Show only first 8 services to reduce DOM elements
  }, [data]);

  return (
    <FullContainer>
      <Container>
        <h2 className="text-4xl font-extrabold text-center text-[#002B5B] mb-8 tracking-tight">
          Services Provided
        </h2>
        <div className="grid grid-cols-2 md:gap-8 gap-4">
          {displayServices?.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-blue-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <div className="w-full h-28 md:h-56 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={service.image ? `${imagePath}/${service.image}` : `${imagePath}/${PLACEHOLDER}`}
                  alt={service.title || "Service"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <div className="flex flex-col flex-1 p-3 md:p-6 pb-4">
                <h3 className="md:text-2xl font-bold text-blue-900 mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-800 text-sm md:text-base font-medium text-center mb-3 md:min-h-[48px]">
                  {service.description || "No description provided."}
                </p>
                <a
                  href={`tel:${phone}`}
                  className="mt-auto w-fit bg-blue-950 text-white font-bold py-1 md:py-2 px-4 md:px-8 mx-auto text-center text-sm md:text-lg hover:bg-blue-900 transition-colors duration-200"
                >
                  Call Us Today
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {data && data.length > 8 && (
          <div className="mt-6 text-center">
            <p className="text-[#002B5B] text-lg font-semibold">
              {data.length - 8} more services available - <a href={`tel:${phone}`} className="underline hover:text-blue-700">Call for details</a>
            </p>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
