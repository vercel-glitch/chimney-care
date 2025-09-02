import React from "react";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import CallButton from "../../CallButton";
import QuoteButton from "../../QuoteButton";
import MarkdownIt from "markdown-it";

export default function ServiceText({
  phone,
  data = " ",
  service,
  data2 = " ",
}) {
  const markdown = new MarkdownIt();
  const markdown2 = new MarkdownIt();

  const capitalizeFirstLetterOfEachWord = (string) => {
    return string
      ?.split(" ")
      ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
      ?.join(" ");
  };

  // Ensure data is a string before processing
  const content =
    typeof data === "string"
      ? markdown.render(
          data.replaceAll(
            "##service##",
            capitalizeFirstLetterOfEachWord(service?.replaceAll("-", " "))
          )
        )
      : "";

  // Ensure data2 is a string before processing
  const content2 =
    typeof data2 === "string"
      ? markdown2.render(
          data2.replaceAll(
            "##service##",
            capitalizeFirstLetterOfEachWord(service?.replaceAll("-", " "))
          )
        )
      : "";

  return (
    <FullContainer className="py-6 md:py-8">
      <Container>
        {data && (
          <div className="flex flex-col gap-4 w-full">
            <div
              className="w-full prose max-w-none text-primary"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
        {data2 && (
          <div className="flex flex-col gap-4 p-4 md:p-8 rounded-3xl mt-16 shadow-[0_0_10px_0_rgba(0,0,0,0.4)]">
            <div className="flex flex-col gap-4 w-full">
              <div
                className="w-full prose prose-h3:text-primary prose-p:!text-[20px] max-w-none text-primary"
                dangerouslySetInnerHTML={{ __html: content2 }}
              />
            </div>
            <div className="hidden  md:flex flex-wrap w-full justify-start items-center md:justify-center gap-4 lg:gap-7 pt-4">
              <CallButton phone={phone} />
              <QuoteButton phone={phone} />
            </div>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
