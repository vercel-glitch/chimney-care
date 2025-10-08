import React, { useState } from "react";
import { CheckCircle, Loader, FileText, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function QuoteForm({
  data,
  form_head,
  showArrowInButton = false,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  // Function to handle first form interaction
  const handleFirstInteraction = () => {
    if (!formStarted) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form start",
        url: window.location.href,
      });

      setFormStarted(true);
    }
  };

  // Validate email with stricter regex
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  // Validate phone number
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Validate name (no numbers, min 2 characters)
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  // Validate message (min 10 characters)
  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  // Comprehensive form validation
  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
        "First name must be 2-50 characters and contain only letters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName =
        "Last name must be 2-50 characters and contain only letters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/[-()\s]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to fire GTM event
  const fireGTMEvent = (submittedFormData) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        url: window.location.href,
        formData: {
          firstName: submittedFormData.firstName,
          lastName: submittedFormData.lastName,
          email: submittedFormData.email,
          phone: submittedFormData.phone.replace(/[-()\s]/g, ""), // Clean phone number
          message: submittedFormData.message,
        },
      });
    }
  };

  // Function to fire Lead Submitted GTM event
  const fireLeadSubmittedEvent = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "leadSubmitted",
        url: window.location.href,
      });
    }
  };

  // Function to close thank you popup and reset form
  const closeThankYouPopup = () => {
    // Fire Lead Submitted event when user acknowledges the thank you message
    fireLeadSubmittedEvent();

    setFormSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle phone number formatting
    let formattedValue = value;
    if (name === "phone") {
      // Remove all non-digits
      const digits = value.replace(/\D/g, "");
      // Format as (XXX) XXX-XXXX
      if (digits.length <= 3) {
        formattedValue = digits;
      } else if (digits.length <= 6) {
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(
          3,
          6
        )}-${digits.slice(6, 10)}`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Real-time validation
    if (fieldErrors[name]) {
      const newErrors = { ...fieldErrors };

      // Validate the specific field that changed
      switch (name) {
        case "firstName":
        case "lastName":
          if (formattedValue.trim() && validateName(formattedValue)) {
            delete newErrors[name];
          }
          break;
        case "email":
          if (formattedValue.trim() && validateEmail(formattedValue)) {
            delete newErrors.email;
          }
          break;
        case "phone":
          const cleanPhone = formattedValue.replace(/[-()\s]/g, "");
          if (cleanPhone && validatePhone(cleanPhone)) {
            delete newErrors.phone;
          }
          break;
        case "message":
          if (formattedValue.trim() && validateMessage(formattedValue)) {
            delete newErrors.message;
          }
          break;
      }

      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive form validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      if (result.success === false) {
        // Handle server-side validation errors
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors = {};
          result.errors.forEach((error) => {
            if (error.includes("First name")) {
              serverErrors.firstName = error;
            } else if (error.includes("Last name")) {
              serverErrors.lastName = error;
            } else if (error.includes("Email") || error.includes("email")) {
              serverErrors.email = error;
            } else if (error.includes("Phone") || error.includes("phone")) {
              serverErrors.phone = error;
            } else if (error.includes("Message") || error.includes("message")) {
              serverErrors.message = error;
            }
          });
          setFieldErrors((prev) => ({ ...prev, ...serverErrors }));
          throw new Error("Please fix the validation errors above");
        }
        throw new Error(result.message || "Form submission failed");
      }

      // Fire GTM event for successful form submission
      fireGTMEvent(formData);

      // Show success toast
      toast.success(
        result.message ||
          "Your request has been submitted successfully! We'll contact you shortly."
      );

      // Set form as submitted
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      // Show error toast instead of setting inline error
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] relative font-barlow rounded-[15px] h-fit px-4 md:px-7 py-7 mx-9 md:w-[370px]">
      {/* <div
        className={`${
          data?.price !== "Free Estimate"
            ? "text-4xl md:text-5xl h-20 md:h-24 w-20 md:w-24 rounded-full"
            : "text-2xl text-center drop-shadow-lg uppercase font-poppins h-20 w-32 md:h-20 md:w-44 rounded-full"
        } font-bold aspect-square flex items-center justify-center bg-gradient-to-br from-blue-800 via-sky-500 from-20% to-green-400 absolute   left-0 top-0 -translate-x-1/2 -translate-y-1/2 `}
      >
        {data?.price !== "Free Estimate" && (
          <sup className="text-xl lg:text-2xl">$</sup>
        )}
        {data?.price !== "Free Estimate" ? (
          data?.price || "49"
        ) : (
          <span className="flex items-center gap-2 relative">
            Free <br /> Estimate
          </span>
        )}
          
      </div> */}

      {!formSubmitted && (
        <>
          <h3 className="text-3xl md:text-[35px] leading-7 md:leading-[30px] px-2.5 font-bold text-center mb-2 text-primary">
            {form_head?.title}
          </h3>
          <h4 className="text-lg pt-2 font-bold text-center mb-4 text-[#11121A]">
            {form_head?.sub_title}
          </h4>
        </>
      )}

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 max-w-md mb-6">
            Your request has been submitted successfully. We'll contact you
            shortly with your personalized quote.
          </p>
          <button
            onClick={closeThankYouPopup}
            className="bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-2 px-6 rounded-md font-medium transition-colors duration-200"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5 text-black">
          <div className="grid grid-cols-2 gap-[8px]">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
                  fieldErrors.firstName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="First name"
                required
              />
              {fieldErrors.firstName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.firstName}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={handleFirstInteraction}
                className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
                  fieldErrors.lastName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Last name"
                required
              />
              {fieldErrors.lastName && (
                <div className="text-red-500 text-sm font-medium mt-1">
                  {fieldErrors.lastName}
                </div>
              )}
            </div>
          </div>

          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
              fieldErrors.phone ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="(123) 456-7890"
            required
          />
          {fieldErrors.phone && (
            <div className="text-red-500 text-sm font-medium">
              {fieldErrors.phone}
            </div>
          )}

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
              fieldErrors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="your@email.com"
            required
          />
          {fieldErrors.email && (
            <div className="text-red-500 text-sm font-medium">
              {fieldErrors.email}
            </div>
          )}

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows="3"
            className={`w-full pl-3 py-2 max-h-[75px] bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
              fieldErrors.message ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Message"
            required
          ></textarea>
          {fieldErrors.message && (
            <div className="text-red-500 text-sm font-medium">
              {fieldErrors.message}
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
                Sending...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                GET A QUOTE
                {showArrowInButton && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
