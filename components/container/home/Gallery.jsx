import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import MarkdownIt from "markdown-it";
import Container from "../../common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function Gallery({
  phone,
  imagePath,
  data,
  service,
  city_name,
  file_names,
}) {
  // Memoize expensive operations
  const markdown = useMemo(() => new MarkdownIt(), []);
  
  const capitalizeFirstLetterOfEachWord = useMemo(() => {
    return (string) => {
      return string
        ?.split(" ")
        ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
        ?.join(" ");
    };
  }, []);

  const content = useMemo(() => {
    if (!data) return "";
    return markdown.render(
      data
        ?.replaceAll(
          "##service##",
          capitalizeFirstLetterOfEachWord(service?.replaceAll("-", " "))
        )
        ?.replaceAll("##city_name##", city_name)
    );
  }, [data, service, city_name, markdown, capitalizeFirstLetterOfEachWord]);

  return (
    <FullContainer className="pt-10 md:pt-16 pb-10 md:pb-16 ">
      <Container className="!px-4 md:!px-8">
        {data && (
          <div
            className="w-full prose prose-h1:!text-center prose-h2:!text-center prose-h3:!text-center prose-p:!text-center max-w-none text-primary prose-h1:!text-4xl md:prose-h1:!text-5xl prose-h1:!font-bold prose-h1:!text-blue-900 prose-p:!text-lg prose-p:!leading-relaxed prose-p:!mb-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {file_names && file_names.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            {file_names.map((fileName, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg "
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    title={`Gallery Image ${index + 1}`}
                    src={`${imagePath}/${fileName}`}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Call Button Below Image */}
                <div className="p-4 ">
                  <div className="flex justify-center">
                    <Link
                      href={`tel:${phone}`}
                      className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-full font-bold text-lg transition-colors duration-200 "
                    >
                      <Phone className="w-5 h-5" />
                      {phone || "(408) 762-6429"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
