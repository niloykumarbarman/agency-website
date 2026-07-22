import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsDetailList from "@/components/sections/SolutionsDetailList";
import SolutionsCTA from "@/components/sections/SolutionsCTA";

export const metadata: Metadata = buildMetadata({
  title: "Solutions | Ferrowave",
  description:
    "Outcome-focused solutions from Ferrowave: custom software, modernization, cloud, data, and AI integration.",
  path: "/solutions",
});

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
