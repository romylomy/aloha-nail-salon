// React and Next.js imports
import Link from "next/link";
import Image from "next/image";

// Local component imports
import { Section, Container } from "@/components/craft";

// Asset imports
import Placeholder from "@/public/placeholder.webp";
import HeroImage1 from "@/public/heroImage1.jpg"
import HeroImage3 from "@/public/heroImage3.jpg"

import Poster from "@/public/poster.png"

const Hero = () => {
  return (
    <Section className="relative h-[720px] w-full">
      <Container className="not-prose  ">
        {/* Name and Nav */}
        <div className="flex w-full justify-between">
          <div className="">
            <h1 className="mb-4 text-3xl font-normal md:text-6xl">
              <Link className="transition-all hover:opacity-70" href="#">
              "Where Your Nails <br></br>Tell a Beautiful Story".              </Link>
            </h1>
            <h2 className="w-48 text-lg font-light leading-6">
            Aloha Nail Salon
            </h2>
          </div>
          
        </div>

        {/* Images */}
        <div className="fit absolute bottom-0 right-0 flex items-end justify-end gap-2">
          
        
     

              
          {/* Image 3 */}
          <div className="h-[420px] w-fit md:w-96">
            <Image
              className="h-full w-full rounded-tl-3xl object-cover"
              src={Poster}
              alt="placeholder"
            ></Image>
          </div>
            
          
          {/* Image 3 */}
          <div className="h-[420px] w-fit md:w-96">
            <Image
              className="h-full w-full rounded-tl-3xl object-cover"
              src={Poster}
              alt="placeholder"
            ></Image>
          </div>
        </div>

        {/* Circle CTA */}
        <div className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black shadow-xl bg-yellow-200 p-12 text-center font-medium leading-4 transition-all hover:opacity-80">
          <Link className="-mt-1" href="/booking">
            Book now
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
