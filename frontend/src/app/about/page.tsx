import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/AboutHero";
import AboutMission from "@/components/sections/AboutMission";
import AboutPrinciples from "@/components/sections/AboutPrinciples";
import AboutCTA from "@/components/sections/AboutCTA";

export const metadata: Metadata = buildMetadata({
  title: "About | Ferrowave",
  description:
    "Ferrowave is a founder-led software engineering studio built on production-grade security, transparency, and real engineering standards.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutPrinciples />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
