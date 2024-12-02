import * as React from "react";
import Image from "next/image";

import { Section, Container } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import HeroImage1 from "@/public/heroImage1.jpg"
import HeroImage2 from "@/public/heroImage2.jpg"

import HeroImage3 from "@/public/heroImage3.jpg"
import HeroImage4 from "@/public/heroImage4.jpg"
import HeroImage5 from "@/public/heroImage5.jpg"
import HeroImage6 from "@/public/heroImage6.jpg"




const photos = [
  {
    src: HeroImage1,
  },
  {
    src: HeroImage2,
  },
  {
    src: HeroImage3,
  },
  {
    src: HeroImage4,
  },
  {
    src: HeroImage5,
  },
  {
    src: HeroImage6,
  }
];

const Gallery = () => {
  return (
    <Section>
      <Container>
        <Carousel className="mt-6 w-full">
          <CarouselContent className="-ml-1">
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="relative overflow-hidden">
                    <CardContent className="not-prose flex aspect-square items-center justify-center">
                      <Image
                        src={photo.src}
                        alt="Presets.com Example Image"
                        width={720}
                        height={480}
                        className="absolute inset-0 h-full w-full object-cover"
                      ></Image>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
       
      </Container>
    </Section>
  );
};

export default Gallery;
