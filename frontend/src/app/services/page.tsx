import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesDetailList from "@/components/sections/ServicesDetailList";
import ServicesCTA from "@/components/sections/ServicesCTA";

export const metadata: Metadata = {
  title: "Services | Anchorpoint",
  description:
    "Platform engineering, API design, system migration, cloud infrastructure, security engineering, and performance engineering — scoped in detail.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesDetailList />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
