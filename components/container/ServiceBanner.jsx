"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { CheckCircle, ArrowRight, Loader } from "lucide-react";

export default function ServiceBanner({ image, data, form_head }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip: "",
    message: "",
  });

  const router = useRouter();
  const { service } = router.query;
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

  return (
    <FullContainer className="relative bg-white overflow-hidden md:!h-[790px]">
      <div className="absolute inset-0 h-[600px] md:min-h-[790px] overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority={true}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/70"></div>
      </div>
      <Container className="py-10 font-barlow relative z-10 mt-10 md:mt-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-banner gap-10 md:gap-[66px] text-white">
          <div className="relative -mt-10 flex items-center md:items-start flex-col lg:pr-10 justify-center">
            <div className="bg-gradient-to-br  from-blue-800 to-sky-300 rounded-full text-5xl md:text-7xl font-bold aspect-square h-28 md:h-32 w-28 md:w-32 flex items-center justify-center">
              <sup className="text-3xl">$</sup>
              {data?.price || "80"}
            </div>

            <h1 className="font-[900] uppercase text-[28px] mt-3 px-4 md:px-0 md:text-6xl leading-tight text-center md:text-start lg:text-left text-shadow-lg">
              {data?.heading?.replaceAll(
                "##service##",
                service?.replace(/-/g, " ")
              )}
            </h1>
            <h2 className="text-[28px] md:px-0 md:text-4xl uppercase font-bold mt-3 leading-tight text-[#90D4E1] text-center md:text-start lg:text-left ">
              {data?.tagline?.replaceAll(
                "##service##",
                service?.replace(/-/g, " ")
              )}
            </h2>
            <p className="text-[16px] md:text-3xl text-center md:text-start lg:text-left mt-4 mb-1">
              {data?.description}
            </p>

            <ul className="flex flex-col gap-2 mb-6">
              {data?.list?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-base md:text-xl font-semibold gap-2"
                >
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center px-3">
            <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] relative font-barlow rounded-[15px] px-4 md:px-10 pb-8 md:pb-10 pt-10 md:pt-14">
              <div className="bg-gradient-to-br absolute -top-10 -left-5 md:-left-10 from-blue-800 via-sky-400 from-20% to-green-400 rounded-full p-3 text-4xl md:text-5xl font-bold aspect-square h-20 w-20 md:h-24 md:w-24 flex items-center justify-center text-white">
                <sup className="text-xl">$</sup>
                {data?.price || "80"}
              </div>

              <h3 className="text-3xl md:text-4xl leading-7 md:leading-[30px] font-bold text-center mb-2 text-primary">
                {form_head?.title || "10% Off Total Price for Online Booking"}
              </h3>
              <h4 className="text-lg pt-3 font-bold text-center mb-6 text-[#11121A]">
                {form_head?.sub_title || "Request a Quote"}
              </h4>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Your request has been submitted successfully. We'll contact
                    you shortly with your personalized quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-black">
                  <div className="grid grid-cols-2 gap-[10px]">
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600"
                      placeholder="First name"
                      required
                    />
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600"
                      placeholder="Last name"
                      required
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
                        fieldErrors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="(123) 456-7890"
                      required
                    />
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
                        fieldErrors.zip ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Zip Code"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
                      fieldErrors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full pl-3 py-2 max-h-[75px] bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
                      fieldErrors.message ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Message"
                    required
                  ></textarea>

                  {error && (
                    <div className="text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      <>
                        GET A QUOTE
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
