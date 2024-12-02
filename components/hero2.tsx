// React and Next.js imports
import Link from "next/link";
import Image from "next/image";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

// Asset imports
import Poster from "@/public/poster.png"

const Hero2 = () => {
  return (
    <Section>
      <Container className="grid items-stretch">
        <div className="not-prose relative flex h-96 overflow-hidden rounded-lg border ">
          <Image
            src={Poster}
            alt="placeholder"
            className="fill object-cover"
          />
        </div>
        <h3 className="mt-32 mb-12 text-4xl"> Aloha Nail Salon</h3>
        <p className="text-muted-foreground">
          <Balancer>
          "Where Your Nails Tell a Beautiful Story".
          </Balancer>
        </p>
        <div className="not-prose mt-8 flex items-center gap-2">
          <Button className="w-fit" asChild>
            <Link href="#">Book Appointment</Link>
          </Button>
          
        </div>
      </Container>
    </Section>
  );
};

export default Hero2;
