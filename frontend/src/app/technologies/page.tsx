import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechnologiesHero from "@/components/sections/TechnologiesHero";
import TechnologiesDetailList from "@/components/sections/TechnologiesDetailList";
import TechnologiesCTA from "@/components/sections/TechnologiesCTA";

export const metadata: Metadata = {
  title: "Technologies | Anchorpoint",
  description:
    "The tools and platforms Anchorpoint relies on to build reliable, secure, and maintainable software.",
};

export default function TechnologiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <TechnologiesHero />
        <TechnologiesDetailList />
        <TechnologiesCTA />
      </main>
      <Footer />
    </>
  );
}
