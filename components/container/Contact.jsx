import React, { useState, useCallback, memo } from "react";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import { CheckCircle, Loader, TextQuote } from "lucide-react";
import toast from "react-hot-toast";

// Individual input components to prevent recreation issues
const NameInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="name" className="block text-lg font-bold mb-1">
      Name <span className="text-red-300">*</span>
    </label>
    <div className="relative">
      <input
        id="name"
        type="text"
        name="name"
        value={value}
        onChange={onChange}
        className={`w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder="Your full name"
        required
        aria-invalid={!!error}
        aria-describedby={error ? "name-error" : undefined}
      />
      {error && (
        <p id="name-error" className="text-red-300 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  </div>
));

const EmailInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="email" className="block text-lg font-bold mb-1">
      Email <span className="text-red-300">*</span>
    </label>
    <div className="relative">
      <input
        id="email"
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        className={`w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder="your@email.com"
        required
        aria-invalid={!!error}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <p id="email-error" className="text-red-300 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  </div>
));

const PhoneInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="phone" className="block text-lg font-bold mb-1">
      Phone Number <span className="text-red-300">*</span>
    </label>
    <div className="relative">
      <input
        id="phone"
        type="tel"
        name="phone"
        value={value}
        onChange={onChange}
        className={`w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder="(123) 456-7890"
        required
        aria-invalid={!!error}
        aria-describedby={error ? "phone-error" : undefined}
      />
      {error && (
        <p id="phone-error" className="text-red-300 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  </div>
));

const ZipcodeInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="zipcode" className="block text-lg font-bold mb-1">
      Zip Code <span className="text-red-300">*</span>
    </label>
    <div className="relative">
      <input
        id="zipcode"
        type="text"
        name="zipcode"
        value={value}
        onChange={onChange}
        className={`w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder="12345"
        required
        aria-invalid={!!error}
        aria-describedby={error ? "zipcode-error" : undefined}
      />
      {error && (
        <p id="zipcode-error" className="text-red-300 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  </div>
));

const MessageInput = memo(({ value, onChange, error }) => (
  <div>
    <label htmlFor="message" className="block text-lg font-bold mb-1">
      How can we help you? <span className="text-red-300">*</span>
    </label>
    <div className="relative">
      <textarea
        id="message"
        name="message"
        value={value}
        onChange={onChange}
        rows={4}
        className={`w-full max-h-[100px] pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
          error ? "border-2 border-red-500" : ""
        }`}
        placeholder="Tell us about your project or request"
        required
        aria-invalid={!!error}
        aria-describedby={error ? "message-error" : undefined}
      />
      {error && (
        <p id="message-error" className="text-red-300 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  </div>
));

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  // Function to handle first form interaction
  const handleFirstInteraction = () => {
    if (!formStarted && typeof window !== "undefined") {
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form start",
          url: window.location.href,
        });
        setFormStarted(true);
      } catch (error) {
        setFormStarted(true); // Still mark as started to prevent retries
      }
    }
  };

  // Function to fire GTM event
  const fireGTMEvent = (submittedFormData) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      try {
        window.dataLayer.push({
          event: "form_submit",
          url: window.location.href,
          formData: {
            name: submittedFormData.name,
            email: submittedFormData.email,
            phone: submittedFormData.phone.replace(/[-()\s]/g, ""), // Clean phone number
            message: submittedFormData.message,
            zipcode: submittedFormData.zipcode,
          },
        });
      } catch (error) {
        // GTM form submit event failed
      }
    }
  };

  // Function to fire Lead Submitted GTM event
  const fireLeadSubmittedEvent = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      try {
        window.dataLayer.push({
          event: "leadSubmitted",
          url: window.location.href,
        });
      } catch (error) {
        // GTM lead submitted event failed
      }
    }
  };

  // Function to close thank you popup and reset form
  const closeThankYouPopup = () => {
    // Fire Lead Submitted event when user acknowledges the thank you message
    fireLeadSubmittedEvent();

    setFormSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      zipcode: "",
      message: "",
    });
    setErrors({});
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

  // Validate zipcode
  const validateZipcode = (zipcode) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipcode);
  };

  // Validate message (min 10 characters)
  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name must be 2-50 characters and contain only letters";
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

    // Zipcode validation
    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    } else if (!validateZipcode(formData.zipcode)) {
      newErrors.zipcode = "Please enter a valid zipcode (12345 or 12345-6789)";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Split name into first and last name for API compatibility
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone.replace(/[-()\s]/g, ""), // Clean phone number
        message: `${formData.message}${
          formData.zipcode ? ` | Zipcode: ${formData.zipcode}` : ""
        }`, // Include zipcode in message
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
            if (error.includes("First name") || error.includes("name")) {
              serverErrors.name = error;
            } else if (error.includes("Email") || error.includes("email")) {
              serverErrors.email = error;
            } else if (error.includes("Phone") || error.includes("phone")) {
              serverErrors.phone = error;
            } else if (error.includes("Message") || error.includes("message")) {
              serverErrors.message = error;
            }
          });
          setErrors(serverErrors);
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Simple state update without formatting for now
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only clear errors if they exist and the field is now valid
    setErrors((prevErrors) => {
      if (!prevErrors[name]) return prevErrors;
      
      let isValid = false;
      switch (name) {
        case "name":
          isValid = value.trim() && validateName(value);
          break;
        case "email":
          isValid = value.trim() && validateEmail(value);
          break;
        case "phone":
          const cleanPhone = value.replace(/[-()\s]/g, "");
          isValid = cleanPhone && validatePhone(cleanPhone);
          break;
        case "zipcode":
          isValid = value.trim() && validateZipcode(value);
          break;
        case "message":
          isValid = value.trim() && validateMessage(value);
          break;
      }

      if (isValid) {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      }
      
      return prevErrors;
    });
  }, []);

  const FormSuccess = () => (
    <div
      className="h-full flex flex-col items-center justify-center text-center py-12"
      role="alert"
      aria-live="polite"
    >
      <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h4 className="text-3xl font-bold text-white mb-4">Thank You!</h4>
      <p className="text-white text-xl max-w-md mb-6">
        Your request has been submitted successfully. We'll contact you shortly
        with your personalized quote.
      </p>
      <button
        onClick={closeThankYouPopup}
        className="bg-white text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 hover:bg-gray-100"
      >
        OK Thanks
      </button>
    </div>
  );



  return (
    <FullContainer id="contact-us" className="pb-4 relative">
      <Container className="relative z-10">
        <div id="quote-form-section">
          <div className="bg-primary gap-0 rounded-[20px] overflow-hidden mb-5 shadow-lg">
            <div className="p-7 pt-6 md:pt-10 md:p-10 lg:p-12 bg-primary text-white font-barlow">
              {formSubmitted ? (
                <FormSuccess />
              ) : (
                <>
                  <h2 className="text-3xl leading-none md:text-4xl md:leading-7 font-bold mb-4 text-white text-center">
                    10% Off Total Price for Online Booking
                  </h2>
                  <h3 className="text-[25px] leading-none md:text-4xl md:leading-7 font-bold mb-7 text-white text-center">
                    Ask For A Quote Here
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <NameInput
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      <EmailInput
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                      <PhoneInput
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                      />
                      <ZipcodeInput
                        value={formData.zipcode}
                        onChange={handleChange}
                        error={errors.zipcode}
                      />
                    </div>

                    <MessageInput
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                    />

                    <div className="flex flex-col text-center justify-center items-center mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit mx-auto bg-white text-black py-3 px-8 rounded-md transition-all duration-300 font-medium flex text-xl items-center justify-center shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin mr-3 h-5 w-5" />
                            Processing...
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <TextQuote className="w-6 h-6" />
                            Get A Quote
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
