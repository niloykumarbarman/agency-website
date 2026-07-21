import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioHero from "@/components/sections/PortfolioHero";
import PortfolioCaseStudies from "@/components/sections/PortfolioCaseStudies";
import PortfolioCTA from "@/components/sections/PortfolioCTA";

export const metadata: Metadata = {
  title: "Portfolio | Anchorpoint",
  description:
    "A visual look at the systems we have shipped — browse the portfolio and open any project for the full case study.",
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
