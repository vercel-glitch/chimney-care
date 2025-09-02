import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import {
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
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Link from "next/link";

export default function WhyChoose({ image, phone, data }) {
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

  return (
    <FullContainer id="whychooseus" className="py-8 md:py-12 bg-white mt-4">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: Text & Features */}
          <div className="w-full md:w-5/12 flex flex-col items-start justify-center">
            <h2 className="text-4xl font-extrabold text-[#1A2956] mb-4">
              Why Choose Us
            </h2>
            <ul className="mb-6 space-y-3">
              {data?.map((feature, idx) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-[#1A2956] font-medium text-base md:text-[17px]"
                  >
                    {IconComponent && (
                      <IconComponent className="min-w-5 w-5 h-5 text-[#1A2956]" />
                    )}
                    {feature.text}
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-full bg-[#1A2956] text-white font-semibold text-lg shadow hover:bg-[#22397a] transition-all"
              >
                <Phone className="w-5 h-5" />
                {phone}
              </a>
              <Link
                href="#contact-us"
                className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-full bg-[#6B9AED] text-[#1A2956] font-semibold text-lg shadow hover:bg-[#4d7edc] transition-all"
              >
                <FileText className="w-5 h-5" />
                GET A QUOTE
              </Link>
            </div>
          </div>
          {/* Right: Image */}
          <div className="w-full md:w-7/12 flex justify-center relative mt-6 md:mt-0">
            <div className="rounded-lg overflow-hidden w-full h-[250px] sm:h-[280px] md:h-[320px] bg-gray-200 relative">
              <Image
                src={image}
                alt="Professional air duct cleaning"
                fill
                className="object-cover"
                style={{ position: "absolute" }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
