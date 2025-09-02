import React from "react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import MarkdownIt from "markdown-it";

const capitalizeFirstLetterOfEachWord = (string) => {
  return string
    ?.split(" ")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

export default function ServiceDescription1({
  data,
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
        <div className="py-5">
          <div
            className=" mx-auto max-w-full  prose text-primary"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </Container>
    </FullContainer>
  );
}
