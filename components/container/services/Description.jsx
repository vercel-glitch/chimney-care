import React from "react";
import Container from "../../common/Container";
import Image from "next/image";
import whyChooseImg from "../../../public/images/banner.webp";

import Markdown from "react-markdown";

export default function Description({ service }) {
  return (
    <div className="relative py-20">
      <Container className=" flex  md:flex-row gap-8 ">
        <div className=" py-10 flex-col w-2xl gap-4">
          <div className="space-y-4">
            <h2 className="text-xl text-[#002B5B] font-bold">
              {service.tagline}
            </h2>
            <p className="text-lg text-[#002B5B]">{service.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button />
            <ButtonSecondary />
          </div>
        </div>
        <div className="w-full hidden lg:block overflow-hidden">
          <Image
            title="Description Image"
            src={whyChooseImg}
            alt="Professional chimney services"
            className="object-cover h-full w-full"
            priority
          />
        </div>
      </Container>
      <About service={service} />
      <Important service={service} />
    </div>
  );
}

function About({ service, images }) {
  return (
    <Container className="py-16">
      <div className="text-center  mx-auto mb-12 ">
        <h3 className="text-4xl font-bold text-blue-900 mb-4">
          what is {service.title}?
        </h3>
        <p className="text-gray-700 text-lg">{service.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {images.map((image, index) => (
          <div
            key={index}
            className=" rounded-t-2xl  aspect-9/6 overflow-hidden"
          >
            <Image
              title="About Image"
              src={image.src}
              alt="About Image"
              className="object-cover aspect-9/6 hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button />
        <ButtonSecondary />
      </div>
    </Container>
  );
}

function Important({ service }) {
  return (
    <Container className="py-16">
      <h3 className="prose lg:prose-lg xl:prose-xl prose-gray font-bold text-blue-900 mb-4">
        important of {service.tagline}
      </h3>
      <div className="prose lg:prose-lg xl:prose-xl prose-gray max-w-full">
        <Markdown>{service.importance}</Markdown>
      </div>
    </Container>
  );
}
