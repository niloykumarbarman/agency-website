import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseStudiesHero from "@/components/sections/CaseStudiesHero";
import CaseStudiesList from "@/components/sections/CaseStudiesList";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";

export const metadata: Metadata = {
  title: "Case Studies | Ferrowave",
  description:
    "How we approach hard engineering problems, from the constraint we started with to the system running in production today.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudiesHero />
        <CaseStudiesList />
        <CaseStudiesCTA />
      </main>
      <Footer />
    </>
  );
}
