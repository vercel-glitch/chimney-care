import "@/styles/globals.css";
import { Barlow } from "next/font/google";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { reportWebVitals, trackPageLoad, preloadCriticalResources } from "@/lib/webVitals";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize performance tracking
    trackPageLoad();
    preloadCriticalResources();
  }, []);

  return (
    <div className={barlow.className}>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </div>
  );
}

// Export the reportWebVitals function for Next.js to use
export { reportWebVitals };
