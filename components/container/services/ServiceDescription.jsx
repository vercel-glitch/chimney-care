import React from "react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Image from "next/image";
import CallButton from "../../CallButton";
import QuoteButton from "../../QuoteButton";
import MarkdownIt from "markdown-it";
import PrimaryPhone from "../../common/PrimaryPhone";

const capitalizeFirstLetterOfEachWord = (string) => {
  return string
    ?.split(" ")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

export default function ServiceAbout({
  data,
  image,
  phone,
  service,
  city_name,
  state_,
}) {
  const markdown = new MarkdownIt();
  const content = markdown.render(
    data
      ?.replaceAll(
        "##service##",
        capitalizeFirstLetterOfEachWord(service?.replaceAll("-", " "))
      )
      ?.replaceAll(
        "##city_name##",
        capitalizeFirstLetterOfEachWord(city_name?.replaceAll("-", " "))
      )
      ?.replaceAll("##state_name##", `, ${state_}`)
  );

  return (
    <FullContainer className="py-6 md:py-8">
      <Container className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center   ">
          <div className="py-5">
            <div
              className="w-full prose text-primary text-start prose-h1:!text-start prose-h2:!text-start prose-h3:!text-start"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="hidden md:flex flex-wrap w-full justify-start items-center gap-4 lg:gap-7 pt-5">
              <PrimaryPhone phone={phone} />
              <QuoteButton phone={phone} />
            </div>
          </div>

          <div className="overflow-hidden rounded-md min-h-[360px] h-full w-full relative">
            <Image
              title="Service Description Image"
              src={image}
              alt="Service Description Image"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
