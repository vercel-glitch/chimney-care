import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

import {
  CheckCircle,
  ArrowRight,
  Loader,
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
import CallButton from "@/components/CallButton";
import QuoteForm from "@/components/common/QuoteForm";

export default function Banner({
  image,
  contact_info,
  data,
  form_head,
  features,
  phone,
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Validate phone number
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate phone field as user types
    if (name === "phone") {
      if (value.length > 0 && !validatePhone(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          phone: "Phone number must be exactly 10 digits",
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone before submission
    if (!validatePhone(formData.phone)) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: "Phone number must be exactly 10 digits",
      }));
      return; // Prevent form submission
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        industry_code: "103",
        ...formData,
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_LOGICAL_CRM_API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer 202_86a297be5455",
          },
          body: JSON.stringify(payload),
        }
      );

      // Check if response is OK regardless of the response format
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Don't try to parse the response if it's not valid JSON
      try {
        const data = await response.json();
        console.log(data);
      } catch (jsonError) {
        console.warn("API didn't return valid JSON:", jsonError);
      }

      // Set form as submitted
      setFormSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          zip: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-b  from-black/60 via-black/40 to-black/70"></div>
      </div>

      <Container className="py-20 font-barlow relative z-10 mt-10 md:mt-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-banner gap-16 md:gap-[66px] text-white">
          <div className="relative -mt-10 flex items-center md:items-start flex-col justify-center">
            <h1 className="font-[900] uppercase text-4xl lg:text-[54px] mt-3 px-4 md:px-0 md:text-6xl leading-tight text-center md:text-start lg:text-left  text-shadow-lg">
              {data?.title}
            </h1>
            <h2 className="text-[28px] md:px-0 md:text-6xl uppercase font-[900] leading-tight text-[#90D4E1] text-center md:text-start lg:text-left mt-2">
              {data?.tagline}
            </h2>
            <p className="text-[16px] md:text-3xl text-center md:text-start lg:text-left mt-4 mb-1">
              {data?.description}
            </p>

            <ul className="mb-6 space-y-1 md:space-y-2">
              {features?.map((feature, idx) => {
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
