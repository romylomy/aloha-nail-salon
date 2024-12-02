// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Section, Container } from "@/components/craft";

// Icon imports
import { Coins, ArrowRight } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Classic Manicure",
    href: "/",
    description:
      "Pamper your hands with our classic manicure, featuring nail shaping, cuticle care, and a polish application for a sleek and tidy look",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Gel Polish Manicure",
    href: "/",
    description:
      "Long-lasting shine and vibrant colors await you with our gel polish manicure, perfect for any occasion.",
  },
  {
    icon: <Coins className="Deluxe Pedicure" />,
    title: "Deluxe Pedicure",
    href: "/",
    description:
      "Rejuvenate your feet with our deluxe pedicure, including exfoliation, a soothing massage, and a polish finish.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Nail Art & Design",
    href: "/",
    description:
      "Express yourself with our custom nail art and design services, crafted to reflect your unique personality.",
  },
];


const Services = () => {
  return (
    <Section className="border-b"
            >
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
            Discover Our Services            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
            Experience relaxation and style with our range of professional nail care and beauty treatments.

</Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-4">
            {featureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <Link
                  href={`${href}`}
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Link>
              ),
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
