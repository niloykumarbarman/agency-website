import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsDetailList from "@/components/sections/SolutionsDetailList";
import SolutionsCTA from "@/components/sections/SolutionsCTA";

export const metadata: Metadata = {
  title: "Solutions | Anchorpoint",
  description:
    "Outcome-focused solutions from Anchorpoint: custom software, modernization, cloud, data, and AI integration.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionsHero />
        <SolutionsDetailList />
        <SolutionsCTA />
      </main>
      <Footer />
    </>
  );
}
