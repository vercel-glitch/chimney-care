import axios from "axios";

// Server-side validation functions
const validateEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{1,50}$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 1;
};

const validateMessage = (message) => {
  return message && message.trim().length >= 5;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
      method: req.method,
    });
  }

  try {
    const { first_name, last_name, email, phone, message } = req.body;

    // Comprehensive server-side validation
    const validationErrors = [];

    // Validate required fields
    if (!first_name?.trim()) {
      validationErrors.push("First name is required");
    } else if (!validateName(first_name)) {
      validationErrors.push(
        "First name must contain only letters and be 1-50 characters"
      );
    }

    if (!email?.trim()) {
      validationErrors.push("Email is required");
    } else if (!validateEmail(email)) {
      validationErrors.push("Please provide a valid email address");
    }

    if (!phone?.trim()) {
      validationErrors.push("Phone number is required");
    } else {
      const cleanPhone = phone.replace(/[-()\s]/g, "");
      if (!validatePhone(cleanPhone)) {
        validationErrors.push("Phone number must be exactly 10 digits");
      }
    }

    if (!message?.trim()) {
      validationErrors.push("Message is required");
    } else if (!validateMessage(message)) {
      validationErrors.push("Message must be at least 5 characters long");
    }

    // Optional last_name validation (if provided)
    if (last_name && !validateName(last_name)) {
      validationErrors.push(
        "Last name must contain only letters and be 1-50 characters"
      );
    }

    // Return validation errors if any
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
        receivedData: {
          first_name: first_name?.substring(0, 50), // Truncate for security
          last_name: last_name?.substring(0, 50),
          email: email?.substring(0, 100),
          phone: phone?.replace(/[-()\s]/g, "").substring(0, 15),
          message:
            message?.substring(0, 100) + (message?.length > 100 ? "..." : ""),
        },
      });
    }

    // Sanitize and prepare data
    const cleanPhone = phone.replace(/[-()\s]/g, "");
    const trimmedFirstName = first_name.trim();
    const trimmedLastName = last_name?.trim() || "";
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Get the host from headers or use the domain directly
    let host = req.headers.host;
    // Clean the host by removing www. and https://
    host = host.replace(/^www\./, "").replace(/^https?:\/\//, "");

    const requestData = {
      first_name: trimmedFirstName,
      last_name: trimmedLastName,
      email: trimmedEmail,
      phone: cleanPhone,
      message: trimmedMessage,
      domain_name: host,
    };

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/contact_us`,
      data: requestData,
      timeout: 10000, // 10 second timeout
    };

    const response = await axios.request(config);

    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Contact form error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    });

    // Return detailed error information
    const errorResponse = {
      success: false,
      message:
        error.response?.data?.message || error.message || "An error occurred",
      errorDetails: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        timeout: error.code === "ECONNABORTED" ? true : false,
      },
      timestamp: new Date().toISOString(),
    };

    // If it's a network error or external API error, include more details
    if (error.response) {
      errorResponse.externalApiError = {
        status: error.response.status,
        data: error.response.data,
      };
    }

    res.status(error.response?.status || 500).json(errorResponse);
  }
}
