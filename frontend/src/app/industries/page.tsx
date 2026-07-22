import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IndustriesHero from "@/components/sections/IndustriesHero";
import IndustriesDetailList from "@/components/sections/IndustriesDetailList";
import IndustriesCTA from "@/components/sections/IndustriesCTA";

export const metadata: Metadata = {
  title: "Industries | Ferrowave",
  description:
    "Industries where Ferrowave has built the deepest domain context: FinTech, Healthcare, E-commerce, Logistics, SaaS, and EdTech.",
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustriesHero />
        <IndustriesDetailList />
        <IndustriesCTA />
      </main>
      <Footer />
    </>
  );
}
