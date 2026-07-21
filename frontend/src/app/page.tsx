import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import Portfolio from "@/components/sections/Portfolio";
import CaseStudies from "@/components/sections/CaseStudies";
import TrustGuarantees from "@/components/sections/TrustGuarantees";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Process />
        <Technologies />
        <Portfolio />
        <CaseStudies />
        <TrustGuarantees />
      </main>
      <Footer />
    </>
  );
}
