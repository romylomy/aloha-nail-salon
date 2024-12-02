// React and Next.js imports
import Link from "next/link";
import Image from "next/image";

// UI component imports
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
// Asset imports
import Placeholder from "@/public/firstPhoto.jpg";

const Info = () => {
  return (
    <Section>
      <Container className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0 text-4xl">Contact Us</h3>
          <p className="font-light leading-[1.4] opacity-70 text-2xl">
          We're always ready to help by providing the best services for you.

Let us provide you with comfortable manicure services and improve your quality of life.

Artwork on your fingertips
          </p>
          

          <div className="not-prose ">
          <p className="m-4 hover:text-gray-500 hover:underline">
              <a href="tel:000-000-0000" className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="w-5 text-yellow-600" />
                <span className="ml-2">Tel: 000-000-0000</span>
              </a>
            </p>
            <p className="m-4 hover:text-gray-500 hover:underline">
              <a href="mailto:aloha@nails.com" className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 text-yellow-600" />
                <span className="ml-2">Email: aloha@nails.com</span>
              </a>
            </p>
            <p className="m-4 hover:text-gray-500 hover:underline">
              <a className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="w-5 text-yellow-600" />
                1234 12 Ave SW, Calgary, AB
              </a>
            </p>
          
          </div>
        </div>
        <div className="not-prose relative flex h-96 overflow-hidden rounded-lg border">
          <Image
            src={Placeholder}
            alt="placeholder"
            className="fill object-cover"
          />
        </div>
      </Container>
    </Section>
  );
};

export default Info;
