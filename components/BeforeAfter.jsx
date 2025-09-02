import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Container from "./common/Container";
import Image from "next/image";
import FullContainer from "./common/FullContainer";

import arrow from "../public/st-images/arrowhead.jpg";

export default function BeforeAfter({ project_id, niche }) {
  const chimeny = [
    {
      before: "/st-images/beforeafter/chimeny/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/chimeny/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/chimeny/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/chimeny/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/chimeny/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/chimeny/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/chimeny/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/chimeny/after4.webp",
      after_alt: "after",
    },
  ];
  const airduct = [
    {
      before: "/st-images/beforeafter/airduct/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/airduct/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/airduct/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/airduct/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/airduct/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/airduct/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/airduct/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/airduct/after4.webp",
      after_alt: "after",
    },
  ];
  const dryervent = [
    {
      before: "/st-images/beforeafter/dryervent/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/dryervent/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/dryervent/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/dryervent/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/dryervent/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/dryervent/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/dryervent/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/dryervent/after4.webp",
      after_alt: "after",
    },
  ];
  const carpet = [
    {
      before: "/st-images/beforeafter/carpet/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/carpet/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/carpet/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/carpet/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/carpet/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/carpet/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/carpet/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/carpet/after4.webp",
      after_alt: "after",
    },
  ];
  const roofing = [
    {
      before: "/st-images/beforeafter/roofing/before1.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/roofing/after1.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/roofing/before2.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/roofing/after2.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/roofing/before3.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/roofing/after3.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/roofing/before4.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/roofing/after4.jpeg",
      after_alt: "after",
    },
  ];

  const slidingDoor = [
    {
      before: "/st-images/beforeafter/slidingDoor/beforee1.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/slidingDoor/afterr1.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/slidingDoor/beforee2.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/slidingDoor/afterr2.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/slidingDoor/beforee3.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/slidingDoor/afterr3.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/slidingDoor/beforee4.png",
      before_alt: "before",
      after: "/st-images/beforeafter/slidingDoor/afterr4.jpeg",
      after_alt: "after",
    },
  ];

  const waterDamage = [
    {
      before: "/st-images/beforeafter/waterDamage/before1.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/waterDamage/after1.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/waterDamage/before2.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/waterDamage/after2.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/waterDamage/before3.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/waterDamage/after3.jpeg",
      after_alt: "after",
    },

    {
      before: "/st-images/beforeafter/waterDamage/before4.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/waterDamage/after4.jpeg",
      after_alt: "after",
    },
  ];

  const construction = [
    {
      before: "/st-images/beforeafter/construction/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/construction/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/construction/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/construction/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/construction/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/construction/after3.webp",
      after_alt: "after",
    },

    {
      before: "/st-images/beforeafter/construction/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/construction/after4.webp",
      after_alt: "after",
    },
  ];

  const kitchen = [
    {
      before: "/st-images/beforeafter/kitchen/kb1.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/kitchen/ka1.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/kitchen/kb2.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/kitchen/ka2.jpeg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/kitchen/kb3.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/kitchen/ka3.jpeg",
      after_alt: "after",
    },

    {
      before: "/st-images/beforeafter/kitchen/kb4.jpeg",
      before_alt: "before",
      after: "/st-images/beforeafter/kitchen/ka4.jpeg",
      after_alt: "after",
    },
  ];
  const hardScaping = [
    {
      before: "/st-images/beforeafter/hardScaping/jb1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/hardScaping/ja1.webp",
      after_alt: "after",
    },

    {
      before: "/st-images/beforeafter/hardScaping/jb2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/hardScaping/ja2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/hardScaping/jb3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/hardScaping/ja3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/hardScaping/jb4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/hardScaping/ja4.webp",
      after_alt: "after",
    },
    
  ];
  const locksmith = [
    {
      before: "/st-images/beforeafter/locksmith/1before.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/locksmith/2after.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/locksmith/2before.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/locksmith/2.2after.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/locksmith/3before.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/locksmith/3after.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/locksmith/4before.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/locksmith/4after.webp",
      after_alt: "after",
    },
  ];
    const Landscaping = [
      {
        before: "/st-images/beforeafter/landscaping/before1.webp",
        before_alt: "before",
        after: "/st-images/beforeafter/landscaping/after1.webp",
        after_alt: "after",
      },
      {
        before: "/st-images/beforeafter/landscaping/before2.webp",
        before_alt: "before",
        after: "/st-images/beforeafter/landscaping/after2.webp",
        after_alt: "after",
      },
      {
        before: "/st-images/beforeafter/landscaping/before3.webp",
        before_alt: "before",
        after: "/st-images/beforeafter/landscaping/after3.webp",
        after_alt: "after",
      },
      {
        before: "/st-images/beforeafter/landscaping/before4.webp",
        before_alt: "before",
        after: "/st-images/beforeafter/landscaping/after4.webp",
        after_alt: "after",
      },

  ];
  const Bathroom = [
    {
      before: "/st-images/beforeafter/bathroom/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/bathroom/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/bathroom/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/bathroom/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/bathroom/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/bathroom/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/bathroom/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/bathroom/after4.webp",
      after_alt: "after",
    },
  ];
 
  const GarageDoorRepair = [
    {
      before: "/st-images/beforeafter/garageDoor/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/garageDoor/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/garageDoor/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/garageDoor/after2.webp",
      after_alt: "after",
    },
    
    {
      before: "/st-images/beforeafter/garageDoor/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/garageDoor/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/garageDoor/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/garageDoor/after4.webp",
      after_alt: "after",
    },
  ]
  const fireDamage = [
    {
      before: "/st-images/beforeafter/fireDamage/before1.jpg",
      before_alt: "before",
      after: "/st-images/beforeafter/fireDamage/after1.jpg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/fireDamage/before2.jpg",
      before_alt: "before",
      after: "/st-images/beforeafter/fireDamage/after2.jpg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/fireDamage/before3.jpg",
      before_alt: "before",
      after: "/st-images/beforeafter/fireDamage/after3.jpg",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/fireDamage/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/fireDamage/after4.webp",
      after_alt: "after",
    },
  ]
  const moldRemoval = [
    {
      before: "/st-images/beforeafter/mold/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/mold/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/mold/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/mold/after2.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/mold/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/mold/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/mold/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/mold/after4.webp",
      after_alt: "after",
    },
  ]
  const painting = [
    {
      before: "/st-images/beforeafter/painting/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/painting/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/painting/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/painting/after2.webp",
      after_alt: "after",
    },
    
    {
      before: "/st-images/beforeafter/painting/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/painting/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/painting/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/painting/after4.webp",
      after_alt: "after",
    },
  ]
  const Moving = [
    {
      before: "/st-images/beforeafter/moving/before1.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/moving/after1.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/moving/before2.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/moving/after2.webp",
      after_alt: "after",
    },
    
    {
      before: "/st-images/beforeafter/moving/before3.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/moving/after3.webp",
      after_alt: "after",
    },
    {
      before: "/st-images/beforeafter/moving/before4.webp",
      before_alt: "before",
      after: "/st-images/beforeafter/moving/after4.webp",
      after_alt: "after",
    },
  ];

  // Memoize the selected images to prevent unnecessary re-computations
  const selectedImage = useMemo(() => {
    const imageMap = {
      "Chimney Cleaning": chimeny,
      "Air Conditioning": airduct,
      "Dryervent Cleaning": dryervent,
      "Carpet Cleaning": carpet,
      "Roofing": roofing,
      "Sliding Door": slidingDoor,
      "water damage": waterDamage,
      "Construction": construction,
      "Kitchen": kitchen,
      "Hardscaping": hardScaping,
      "Locksmith": locksmith,
      "Landscaping": Landscaping,
      "Bathroom": Bathroom,
      "Garage Door Repair": GarageDoorRepair,
      "Fire Damage": fireDamage,
      "Mold Removal": moldRemoval,
      "Painting": painting,
      "Moving": Moving,
    };
    return imageMap[niche] || carpet;
  }, [niche]);


  return (
    <FullContainer>
      <Container className="pb-16 pt-6 ">
        <h2 className="text-4xl text-center pb-6 font-extrabold text-[#002B5B] mb-2">
          Before And After Results {niche}
        </h2>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-5">
          {selectedImage.map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
            />
          ))}
        </div>
        <div className="md:hidden grid grid-cols-2 md:grid-cols-4 gap-5">
          {selectedImage.slice(0, 2).map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              beforeAlt={item.before_alt}
              afterAlt={item.after_alt}
            />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt }) {
  const [ishover, setIshover] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isActive, setIsActive] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const containerRectRef = useRef(null);

  // ⚡ Cache container rect to prevent forced reflows
  const updateContainerRect = useCallback(() => {
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsActive(true);
    updateContainerRect();
    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
  }, []);

  const handleTouchStart = useCallback((e) => {
    setIsActive(true);
    updateContainerRect();
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isActive && containerRectRef.current) {
      const containerRect = containerRectRef.current;
      const position = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  }, [isActive]);

  const handleTouchMove = useCallback((e) => {
    if (isActive && containerRectRef.current && e.touches[0]) {
      const containerRect = containerRectRef.current;
      const position = ((e.touches[0].clientX - containerRect.left) / containerRect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  }, [isActive]);

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsActive(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      className="relative w-full aspect-square overflow-hidden"
      onMouseEnter={() => setIshover(true)}
      onMouseLeave={() => setIshover(false)}
      ref={containerRef}
    >
      {/* Before Image (Static, always visible) */}
      <div className="absolute inset-0">
        <Image src={afterImage} alt={afterAlt} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 50vw, 25vw" />
        <div
          className={`${
            ishover ? "opacity-100" : "opacity-0"
          } transition-all duration-500 absolute top-32 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded z-10`}
        >
          After
        </div>
      </div>
 
      {/* After Image (Masked, always 100% size, only part revealed) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full">
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover object-left"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div
            className={`${
              ishover ? "opacity-100" : "opacity-0"
            } transition-all duration-500 absolute top-32 left-4 bg-black bg-opacity-70 z-10 text-white px-3 py-1 rounded`}
          >
            Before
          </div>
        </div>
      </div>
     
      {/* Slider Control */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-[3px] bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, marginLeft: "-2px" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          onMouseEnter={() => setIshover(false)}
          onMouseLeave={() => setIshover(true)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent border-[3px] border-white shadow-md flex items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className=" w-2.5 h-2.5"
            />
            <Image
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
              className="rotate-180  w-2.5 h-2.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
