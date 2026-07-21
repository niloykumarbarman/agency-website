import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioHero from "@/components/sections/PortfolioHero";
import PortfolioCaseStudies from "@/components/sections/PortfolioCaseStudies";
import PortfolioCTA from "@/components/sections/PortfolioCTA";

export const metadata: Metadata = {
  title: "Portfolio | Anchorpoint",
  description:
    "Detailed case studies covering fleet dispatch, healthcare records migration, multi-bank payment settlement, and this platform itself.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioCaseStudies />
        <PortfolioCTA />
      </main>
      <Footer />
    </>
  );
}
