import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import WhyChooseUs from "@/components/why-choose-us/WhyChooseUs";
import Process from "@/components/process/Process";
import ObrasReales from "@/components/obras-reales/obras-reales";
import Projects from "@/components/projects/Projects";
import EnObra from "@/components/en-obra/EnObra";
import QuienesSomos from "@/components/quienes-somos/QuienesSomos";
import Cta from "@/components/cta/Cta";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <WhyChooseUs />
      <Process />
      <ObrasReales />
      <Projects />
      {/* <EnObra /> */}
      <QuienesSomos />
      <Cta />
      <Footer />
    </>
  );
}
 
