import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/craft";

const About = () => {
  return (
    <Section>
      <Container className="flex flex-col">
        <h1 className="!mb-0 text-4xl">Lorem ipsum dolor sit amet consectetur</h1>
        <h3 className="text-muted-foreground  text-2xl">
          <Balancer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptate quidem natus.
          </Balancer>
        </h3>
        <div className="!mt-8 flex items-center gap-2">
          <Button>Get Started</Button>
          <Button variant={"outline"}>Learn More</Button>
        </div>
      </Container>
    </Section>
  );
};

export default About;
