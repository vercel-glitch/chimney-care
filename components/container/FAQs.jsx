"use client";
import React, { useState } from "react";
import Container from "../common/Container";
import { Plus, Minus } from "lucide-react";
import FullContainer from "../common/FullContainer";
import Heading from "../common/Heading";

export default function Faqs({ faqs = [], city_name }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FullContainer className="py-4" id="faqs">
      <Container className="px-4">
        <div className="text-center ">
          <Heading text="FAQs" className="pb-6" />
          <div className="mx-auto font-barlow text-[16px]">
            {(Array.isArray(faqs) ? faqs : [])?.map((faq, index) => (
              <div key={index} className="mb-2">
                <button
                  className={`w-full text-left py-3.5 px-4  bg-primary text-white rounded-lg flex items-center focus:outline-none ${
                    activeIndex === index ? "bg-[#1E64C1]" : "bg-secondary"
                  }`}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="flex-shrink-0 mr-3 text-lg">
                    {activeIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-500 ease-in-out"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-500 ease-in-out"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    )}
                  </span>
                  <span className="font-thin">
                    {faq.question?.replaceAll("##city_name##", city_name)}
                  </span>
                </button>

                {/* Answer panel with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-white p-4 border border-gray-200 border-t-0 rounded-b">
                    <p className="text-gray-900 text-start">
                      {faq.answer?.replaceAll("##city_name##", city_name)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
