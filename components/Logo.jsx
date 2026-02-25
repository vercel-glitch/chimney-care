import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ logo, imagePath }) => {
  const [hostName, setHostName] = useState("");
  const [windowWidth, setWindowWidth] = useState(1200);

  // Memoize the resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostName(window.location.hostname);
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Remove handleResize dependency to prevent infinite loops

  if (!logo || !logo.value) {
    return null;
  }

  const {
    logoType,
    logoText,
    logoHeight,
    logoWidth,
    fontSize,
    isBold,
    isItalic,
  } = logo.value;

  // Memoize expensive calculations
  const imageSrc = useMemo(() => `${imagePath}/${logo.file_name}`, [imagePath, logo.file_name]);

  const dynamicLogoHeight = useMemo(() => {
    return windowWidth < 760
      ? 35 // smallest on mobile
      : windowWidth < 1190
      ? 50 // larger than mobile on tablet
      : logoHeight; // full size on desktop (>= 1190)
  }, [windowWidth, logoHeight]);

  const dynamicLogoWidth = useMemo(() => {
    return windowWidth >= 1190
      ? logoWidth
      : Math.floor((logoWidth / logoHeight) * dynamicLogoHeight);
  }, [windowWidth, logoWidth, logoHeight, dynamicLogoHeight]);

  const logoStyle = useMemo(
    () => ({
      height: `${dynamicLogoHeight}px`,
      width: "auto",
      maxWidth: "100%",
    }),
    [dynamicLogoHeight]
  );

  return (
    <Link
      title={`Logo - ${hostName}`}
      href="/"
      className="flex items-center justify-center "
    >
      {logoType === "image" ? (
        <Image
          height={dynamicLogoHeight}
          width={dynamicLogoWidth}
          src={imageSrc}
          title={`Logo - ${hostName}`}
          alt={`${logoText || "logo"} - ${hostName}`}
          sizes="(max-width: 760px) 80px, (max-width: 1190px) 150px, 200px"
          style={logoStyle}
          // unoptimized={true}
        />
      ) : logoType === "text" ? (
        <h2
          className="text-2xl md:text-4xl font-extrabold py-1 whitespace-nowrap"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
          }}
        >
          {logoText}
        </h2>
      ) : null}
    </Link>
  );
};

export default Logo;
