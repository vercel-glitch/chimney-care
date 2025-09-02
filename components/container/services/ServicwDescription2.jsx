import React from "react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import MarkdownIt from "markdown-it";
import CallButton from "../../CallButton";
import QuoteButton from "../../QuoteButton";

const capitalizeFirstLetterOfEachWord = (string) => {
  return string
    ?.split(" ")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

export default function ServiceDescription2({
  data,
  service,
  city_name,
  phone,
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mx-4 md:mx-0">
          <div className="py-5">
            <div
              className=" mx-auto max-w-full  prose text-primary"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <div className="flex flex-wrap justify-center text-center items-center gap-4 lg:gap-6 pt-6">
            <CallButton phone={phone} />
            <QuoteButton phone={phone} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
