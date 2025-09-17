"use client";

import { TextQuote } from "lucide-react";

export default function QuoteButton({ phone }) {
  const scrollToQuoteForm = () => {
    const quoteFormSection = document.getElementById("quote-form-section");
    if (quoteFormSection) {
      const offset = 80; // Account for fixed navbar
      const elementPosition =
        quoteFormSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    } else {
      // Fallback: try to find the quote form by class or other identifier
      const quoteForm = document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]'
      );
      if (quoteForm) {
        const offset = 80;
        const elementPosition =
          quoteForm.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <button
      onClick={scrollToQuoteForm}
      className=" inline-flex min-w-[160px] bg-[#6B9FE4] rounded-full md:text-base font-barlow py-3 p-6  w-[205px] font-bold text-black transition-colors hover:bg-[#6B9FE4]/80"
    >
      <div className="flex items-center gap-2">
        <TextQuote className="w-6 h-6" />
        <h2 className="text-md font-thin md:text-xl tracking-widest md:tracking-normal ml-2">
          GET A QUOTE
        </h2>
      </div>
    </button>
  );
}
