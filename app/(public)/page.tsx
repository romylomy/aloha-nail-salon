import { Main, Section, Container, Box } from "@/components/craft";
import Hero from "@/components/hero"
import Services from "@/components/services"
import NailGallery from "@/components/photoGallery"
import Gallery from "@/components/gallery"
import ParallaxSection from '@/components/parallax';
import About from '@/components/about'
import Contact from '@/components/contact';
import Info from '@/components/info';
import NavBar from "@/components/navbar"
import Hero2 from "@/components/hero2"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <Main>
      <NavBar/>


        <div className="pt-40">

        <ParallaxSection/> 
        </div>
  
      


      <Section className="mb-20">
        <Container>
          <Hero /> 
        </Container>
      
      <Section >

      <div className="pt-40">

      <ParallaxSection/> 
      </div>

      
      </Section>
      <Section className="bg-yellow">

          <Services/>
      </Section>
     
     <Section >
     <Gallery/> 
     </Section>

     <Section>
      <Info/> 
     </Section>
     <Footer/> 
    
      </Section>
    </Main>
  );
}